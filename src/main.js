import { Actor, log } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

await Actor.init();

try {
    const input = await Actor.getInput();
    const { 
        keyword = 'IT-Beratung', 
        location = 'Berlin', 
        maxLeads = 100,
        proxyConfiguration 
    } = input || {};

    const proxyConfig = await Actor.createProxyConfiguration(proxyConfiguration || { 
        useApifyProxy: true,
        apifyProxyGroups: ['RESIDENTIAL'],
        apifyProxyCountry: 'DE'
    });

    log.info(`Searching GelbeSeiten (Germany) for "${keyword}" in "${location}"`);
    
    await Actor.charge({ eventName: 'apify-actor-start', count: 1 });

    let extractedCount = 0;

    const crawler = new PlaywrightCrawler({
        proxyConfiguration: proxyConfig,
        maxConcurrency: 2,
        navigationTimeoutSecs: 90,
        browserPoolOptions: {
            useFingerprints: true,
        },
        async requestHandler({ page, request, log, enqueueLinks }) {
            log.info(`Parsing directory page: ${request.url}`);
            
            // Accept cookies if presented
            await page.locator('button:has-text("Akzeptieren"), button:has-text("Zustimmen"), #cmpbntyestxt').click({ timeout: 5000 }).catch(() => {});
            
            await page.waitForSelector('article, .mod-Treffer, .listing_box, .gs_treffer', { timeout: 30000 }).catch(() => log.warning('Timeout waiting for DOM.'));

            const title = await page.title();
            if (title.includes('Just a moment') || title.includes('Access Denied') || title.includes('Attention Required')) {
                throw new Error('Blocked by WAF. Retrying with residential proxy...');
            }

            // Scroll down to trigger lazy loading
            await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
            await page.waitForTimeout(2000);

            const items = await page.$$('article, .mod-Treffer, .gs_treffer');
            
            for (const item of items) {
                if (extractedCount >= maxLeads) break;

                const nameElement = await item.$('h2, .mod-Treffer__name, .name, [data-wipe-name="Titel"]');
                if (!nameElement) continue;
                const businessName = (await nameElement.innerText()).trim();

                const addressElement = await item.$('.mod-Treffer__anschrift, address, .anschrift, [data-wipe-name="Adresse"]');
                const address = addressElement ? (await addressElement.innerText()).trim().replace(/\s+/g, ' ') : '';

                // Category
                const catElement = await item.$('.mod-Treffer__branche, .branche, [data-wipe-name="Branche"]');
                const industry = catElement ? (await catElement.innerText()).trim() : keyword;

                // Phones
                const phoneElement = await item.$('a[href^="tel:"], .mod-Treffer__telefon, [data-wipe-name="Telefon"]');
                let phone = '';
                if (phoneElement) {
                    const href = await phoneElement.getAttribute('href');
                    if (href && href.startsWith('tel:')) {
                        phone = href.replace('tel:', '').trim();
                    } else {
                        phone = (await phoneElement.innerText()).trim();
                    }
                }
                
                // Website
                const websiteElement = await item.$('.mod-Treffer__website, a[data-wipe-name="Webseite"], a.contains-icon-website');
                const website = websiteElement ? await websiteElement.getAttribute('href') : '';
                
                // URL
                const urlElement = await item.$('h2 a, .mod-Treffer__name, a[data-wipe-name="Titel"]');
                const listingUrl = urlElement ? await urlElement.getAttribute('href') : '';
                const fullListingUrl = listingUrl && !listingUrl.startsWith('http') ? new URL(listingUrl, 'https://www.gelbeseiten.de').toString() : listingUrl;

                if (businessName && businessName.length > 1) {
                    const record = {
                        businessName,
                        industry,
                        address,
                        phone,
                        website,
                        listingUrl: fullListingUrl || request.url,
                        scrapedAt: new Date().toISOString()
                    };

                    await Actor.pushData(record);
                    await Actor.charge({ eventName: 'lead-extracted', count: 1 });
                    extractedCount++;
                    log.info(`✅ Extracted: ${businessName} (${extractedCount}/${maxLeads})`);
                }
            }

            // Pagination
            if (extractedCount < maxLeads) {
                const hasNextPage = await page.$('.mod-Paginierung__next, a.next, a:has-text("Nächste")');
                if (hasNextPage) {
                    const nextUrl = await hasNextPage.getAttribute('href');
                    if (nextUrl) {
                        const absoluteUrl = new URL(nextUrl, 'https://www.gelbeseiten.de').toString();
                        log.info(`Enqueuing next page: ${absoluteUrl}`);
                        await enqueueLinks({
                            urls: [absoluteUrl],
                        });
                    }
                }
            }
        },
        async failedRequestHandler({ request, log }) {
            log.error(`Failed request: ${request.url}`);
        }
    });

    const formatKeyword = encodeURIComponent(keyword);
    const formatLocation = encodeURIComponent(location);
    // Standard GelbeSeiten Search URL
    const startUrl = `https://www.gelbeseiten.de/Suche/${formatKeyword}/${formatLocation}`;
    
    await crawler.addRequests([{
        url: startUrl
    }]);

    await crawler.run();

    log.info(`🎉 Done! Extracted ${extractedCount} German Business leads.`);

} catch (error) {
    console.error('CRASH:', error);
    throw error;
} finally {
    await Actor.exit();
}

import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';
import fs from 'fs';

await Actor.init();

const crawler = new PlaywrightCrawler({
    proxyConfiguration: await Actor.createProxyConfiguration({
        useApifyProxy: true,
        apifyProxyGroups: ['RESIDENTIAL'],
        apifyProxyCountry: 'DE'
    }),
    requestHandler: async ({ page, request, log }) => {
        log.info(`Scraping: ${request.url}`);
        
        await page.waitForTimeout(5000);
        
        const html = await page.content();
        fs.writeFileSync('de-dump.html', html);
        await page.screenshot({ path: 'de-screenshot.png', fullPage: true });
        
        log.info('Dump complete.');
    },
});

await crawler.run(['https://www.gelbeseiten.de/Suche/plumber/Berlin']);

await Actor.exit();

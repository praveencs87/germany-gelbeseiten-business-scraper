# Germany Business Scraper

**Extract verified German businesses, tradesmen, and local services from DasOertliche.de.**

The Germany Business Scraper is your gateway to extracting premium B2B data from the German market. Source highly valuable business leads effortlessly.

## What can Germany Business Scraper do?

- ✅ **Extract German B2B Leads** - Get business names, physical addresses, and direct contact numbers.
- ✅ **Target specific Industries** - Focus your search on plumbers, tradesmen, accountants, or local services.
- ✅ **Identify Local Footprint** - Target major economic hubs like Berlin, Munich, Hamburg, or Frankfurt.
- ✅ **Export formats** - Download data in JSON, CSV, Excel, or HTML formats.
- ✅ **Integrations** - Connect seamlessly with API, webhooks, Make, or Zapier.
- ✅ **No coding required** - Use our simple interface to start scraping immediately.

## Why scrape German Business Data?

Germany is the economic powerhouse of Europe. Sourcing B2B leads from the DACH region yields extremely high purchasing power:

- 🎯 **High-Ticket B2B Sales** - Connect with established German Mittelstand companies (mid-sized manufacturers) for software, logistics, and consulting sales.
- 📊 **Market Entry & Research** - Map out competitors and potential partners before entering the German market.
- 📍 **Targeted Local Services** - Extract contact info for specific professionals like doctors, lawyers (Rechtsanwälte), or tradesmen in specific ZIP codes.

## What data can you extract?

| Data Field | Description | Example |
|------------|-------------|---------|
| **businessName** | The name of the company | "Müller IT-Consulting GmbH" |
| **industry** | Business Category | "IT-Beratung" |
| **address** | The full DE address | "Friedrichstraße 123, 10117 Berlin" |
| **phone** | Direct contact number | "+49 30 1234567" |
| **website** | Company website | "https://www.mueller-it.de" |
| **listingUrl** | Link to the directory listing | "https://www.dasoertliche.de/..." |

## How to scrape DasOertliche.de data

1. **Click "Try for free"** to start using the actor.
2. **Enter your input** - Provide a search term (e.g., "Maschinenbau") and a location/zip code (e.g., "München" or "80331").
3. **Configure options** - Set the maximum number of leads you want to extract.
4. **Start the scraper** - Click Start and let the actor do the work.
5. **Download results** - Export your leads as JSON, CSV, or Excel.

## Input

Configure the scraper with these key settings:
- **Search Query** - The specific business category or name (e.g., 'IT-Beratung', 'Maschinenbau').
- **Location** - City or Zip Code in Germany (e.g., 'Berlin', 'München').
- **Maximum Leads** - The total number of records to extract.
- **Proxy Configuration** - Apify Residential Proxy (Germany targeted) is highly required to bypass European IP restrictions.

## Output

You can download data in multiple formats:
- **JSON** - For developers and programmatic access
- **CSV** - For easy import into Excel or CRM systems
- **Excel** - Ready-to-use spreadsheet

### Output example

```json
{
    "businessName": "Müller IT-Consulting GmbH",
    "industry": "IT-Beratung",
    "address": "Friedrichstraße 123, 10117 Berlin",
    "phone": "+49301234567",
    "website": "https://www.mueller-it.de",
    "listingUrl": "https://www.dasoertliche.de/...",
    "scrapedAt": "2026-07-02T15:00:00Z"
}
```

## How much does it cost?

This actor uses a Pay-Per-Event (PPE) pricing model tailored for premium European B2B leads:
- **Base Fee**: $0.25 per start
- **Lead Fee**: $4.00 per 1,000 business leads extracted ($0.004 per lead)

**Free tier**: Apify provides $5 in free monthly credits, allowing you to extract over 1,100 premium German business leads for free!

## Is it legal to scrape?

Yes, scraping publicly available data is generally legal. This Actor only extracts public information.

**Best practices**:
- Use the data ethically for B2B outreach in compliance with EU GDPR regulations. Ensure you understand B2B cold-outreach rules in Germany (UWG).
- Respect the target site's Terms of Service.
- Ensure compliance with data privacy regulations when handling contact information.

## Integrations

Connect with 1000+ apps:
- **Google Sheets** - Auto-update spreadsheets with new leads.
- **Slack** - Get notifications when scraping finishes.
- **Webhooks** - Send data directly to your CRM.
- **API** - Programmatic access for developers.

---

**License**: Apache-2.0 | **Version**: 1.0.0

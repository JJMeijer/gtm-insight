import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { serverLogger } from './loggers';
import { createClientFeedback } from './create-client-feedback';

puppeteer.use(StealthPlugin());

interface ScrapeResponse {
  gtmUrl?: string;
  message?: string;
  code?: number;
}

/**
 * a Puppeteer browser is created where the given
 * URL is visited. When the page is loaded a search is done for
 * GTM scripts on that page. The first found GTM script is returned
 */
export const scrapeWebsite = async (href: string): Promise<ScrapeResponse> => {
  const browser = await puppeteer.launch({});
  try {
    const page = await browser.newPage();

    // Set user agent
    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36',
    );

    // Go To URL
    await page.goto(href, { waitUntil: 'networkidle2' });

    // Check for GTM scripts
    const gtmUrl = await page.evaluate(() => {
      const scripts = <HTMLScriptElement[]>(
        Array.prototype.slice.call(
          document.querySelectorAll('script[src*="googletagmanager.com/gtm.js?id=GTM-"]'),
        )
      );
      return scripts.map((x) => x.src)[0];
    });

    await browser.close();
    return { gtmUrl };
  } catch (err) {
    await browser.close();
    const { name } = err;
    serverLogger.error(`${name}: `, err);
    return createClientFeedback('BROWSING_ERROR', { url: href });
  }
};

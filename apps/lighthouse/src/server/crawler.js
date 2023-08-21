const dotenv = require('dotenv');

dotenv.config();

const puppeteer = require('puppeteer');

module.exports = async function crawl(urls) {
  // create puppeteer browser
  const browser = puppeteer.launch({
    headless: 'new',
  });

  // get browser to get port
  const { port } = new URL(browser.wsEndpoint());

  // create pages
  const page = await browser.newPage();

  // Log in before navigating to the protected pages
  const loginPage = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/login/`;
  await page.goto(loginPage);
  await page.waitForSelector('#email'); // Wait for the email input field to appear
  await page.type('#email', 'xavier@example.com');

  await page.waitForSelector('#password'); // Wait for the password input field to appear
  await page.type('#password', 'password');

  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const { default: lighthouse } = await import('lighthouse');
  const results = [];

  for (const url of urls) {
    try {
      // Navigate to the target page
      console.log('Navigating to URL:', url);
      await page.goto(url);

      const { lhr } = await lighthouse(url, {
        port,
        output: 'json',
        logLevel: 'info',
      });

      const result = {
        url,
        performanceScore: lhr.categories.performance.score * 100,
        LCP: lhr.audits['largest-contentful-paint'].displayValue,
        CLS: lhr.audits['cumulative-layout-shift'].displayValue,
        TBT: lhr.audits['total-blocking-time'].displayValue,
      };

      results.push(result);
    } catch (error) {
      console.error('Error running Lighthouse for URL: ' + url, error);
    }
  }

  await browser.close();
  return results;
};

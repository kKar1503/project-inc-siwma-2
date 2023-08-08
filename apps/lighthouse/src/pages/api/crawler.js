const puppeteer = require('puppeteer');

const url = 'https://www.reddit.com/';

module.exports = async function crawl() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const { port } = new URL(browser.wsEndpoint());

  const { default: lighthouse } = await import('lighthouse');
  let result;

  try {
    const { lhr } = await lighthouse(url, {
      port,
      output: 'json',
      logLevel: 'info',
    });

    result = {
      performanceScore: lhr.categories.performance.score * 100,
      LCP: lhr.audits['largest-contentful-paint'].displayValue,
      CLS: lhr.audits['cumulative-layout-shift'].displayValue,
      TBT: lhr.audits['total-blocking-time'].displayValue,
    };
  } catch (error) {
    console.error('Error running Lighthouse', error);
    console.error('Lighthouse URL was: ' + url);
  } finally {
    console.log('Closing browser...');
    await browser.close();
    console.log('Browser closed');
  }

  return result;
};

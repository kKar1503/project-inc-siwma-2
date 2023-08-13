const puppeteer = require('puppeteer');

module.exports = async function crawl(urls) {
  const browser = await puppeteer.launch();
  const { port } = new URL(browser.wsEndpoint());

  const { default: lighthouse } = await import('lighthouse');
  const results = [];

  for (const url of urls) {
    try {
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

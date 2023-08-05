const puppeteer = require('puppeteer');

const url = 'https://www.wikipedia.org/';

module.exports = async function crawl() {
  const browser = await puppeteer.launch({headless: 'new'});
  const { port } = new URL(browser.wsEndpoint());
  
  const { default: lighthouse } = await import('lighthouse');

  const { lhr } = await lighthouse(url, {
    port,
    output: 'json',
    logLevel: 'info',
  });
  
  const result = {
    performanceScore: lhr.categories.performance.score * 100,
    LCP: lhr.audits['largest-contentful-paint'].displayValue,
    CLS: lhr.audits['cumulative-layout-shift'].displayValue,
    TBT: lhr.audits['total-blocking-time'].displayValue
  };
  
  await browser.close();

  return result;
}
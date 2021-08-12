describe('Input Puppeteer Tests', () => {
    describe('Index Tests', () => {
      //const url = 'http://localhost:4000/components/input/example-index.html';
      const puppeteer = require('puppeteer');

      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:4000/components/input/example-index.html');
        await page.screenshot({ path: 'input.png' });
      
        await jestPuppeteer.debug()
        await browser.close();
      })();
    
    });
});
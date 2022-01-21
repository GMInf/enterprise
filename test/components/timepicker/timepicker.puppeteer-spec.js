describe('Timepicker Puppeteer Tests', () => {
  describe('Index Tests', () => {
    const url = 'http://localhost:4000/components/timepicker/example-index';

    beforeAll(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
    });

    it('should show the title', async () => {
      await expect(page.title()).resolves.toMatch('IDS Enterprise');
    });

    it('should pass Axe accessibility tests', async () => {
      await page.setBypassCSP(true);
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport'] });
    });

    it('should not have errors', async () => {
      await page.on('error', function (err) {
        const theTempValue = err.toString();
        console.log(`Error: ${theTempValue}`);
      });
    });

    it('should open popup on icon click and show value', async () => {
      const timepickerEl = await page.$('#timepicker-id-1');

      await page.click('#timepicker-id-1-trigger');
      await page.click('.set-time');

      expect(await page.evaluate(el => el.value, timepickerEl)).toEqual('1:00 AM');
    });
  });

  describe('Timepicker Example Hour Range Tests', () => {
    const url = 'http://localhost:4000/components/timepicker/example-hour-range.html';

    beforeAll(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
    });

    it('should not have errors', async () => {
      await page.on('error', function (err) {
        const theTempValue = err.toString();
        console.log(`Error: ${theTempValue}`);
      });
    });

    it('should set the time and period', async () => {
      const timepickerEl = await page.$('#timepicker-id-1');

      await page.click('#timepicker-id-1-trigger');
      await page.click('#timepicker-id-1-period');
      await page.click('#list-option-1');
      await page.click('#timepicker-id-1-hours');

      // VERIFY IF 7 PM ONWARDS IS NOT AVAILABLE
      await expect(page).not.toMatchElement('#list-option-6');
      
      await page.click('.set-time');
      expect(await page.evaluate(el => el.value, timepickerEl)).toEqual('1:00 PM');
    });
  });

  describe('Timepicker Chinese Localization Tests', () => {
    const url = 'http://localhost:4000/components/timepicker/example-index.html?locale=zh-CN';

    beforeAll(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
    });

    it('should not have errors', async () => {
      await page.on('error', function (err) {
        const theTempValue = err.toString();
        console.log(`Error: ${theTempValue}`);
      });
    });

    it('should set the time and period without any error message', async () => {
      const timepickerEl = await page.$('#timepicker-id-1');
      const errorMessage = await page.$('#timepicker-id-1-error');

      await page.click('#timepicker-id-1-trigger');
      await page.click('.set-time');

      expect(await page.evaluate(el => el.value, timepickerEl)).toEqual('1:00 上午');
      expect(errorMessage === null).toBeTruthy(); // Error message should not be shown/presented.
    });
  });
});

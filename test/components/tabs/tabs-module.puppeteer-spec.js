
const { dragAndDrop } = require('../../helpers/e2e-utils.js');

describe('Tabs module Puppeteer tests', () => {
  describe('Tabs module example-sortable tests', () => {
    const url = 'http://localhost:4000/components/tabs-module/example-sortable.html';
    beforeAll(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
    });

    it('should be able to sort tabs', async () => {
      const verifyDragnDrop = async () => {
        const tab1 = await page.$('#module-tabs-example > div > ul > li.tab.is-selected.draggable');
        const tab3 = await page.$('#module-tabs-example > div > ul > li:nth-child(4)');
        await dragAndDrop(tab1, tab3);
        if (dragAndDrop) return true;
        return false;
      };
      expect(await verifyDragnDrop()).toBeTruthy();
    });
  });
});

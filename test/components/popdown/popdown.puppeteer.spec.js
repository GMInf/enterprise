// const { toMatchImageSnapshot } = require('jest-image-snapshot');

// expect.extend({ toMatchImageSnapshot });
const percySnapshot = require('@percy/puppeteer');
const { checkDataAutomationID, checkIfElementHasFocused, checkIfElementExist } = require('../../helpers/e2e-utils.js');

describe('Popdown Puppeteer Tests', () => {
  describe('Index Tests', () => {
    const url = 'http://localhost:4000/components/popdown/example-index?layout=nofrills';
    beforeEach(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle2'] });
    });

    it('should show the title', async () => {
      await expect(page.title()).resolves.toMatch('IDS Enterprise');
    });

    it('should check the test page with Axe', async () => {
      await page.setBypassCSP(true);
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
      /* Violations found:
      Rule: "color-contrast" (Elements must have sufficient color contrast)
      Rule: "region" (All page content should be contained by landmarks)
      Rule: "meta-viewport" (Zooming and scaling should not be disabled)
      */
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'aria-valid-attr-value', 'region'] });
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('.popdown', { visible: true });
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'color-contrast', 'region'] });
    });

    it('should have Accessibility', async () => {
      const webArea = await page.accessibility.snapshot();
      expect(webArea.children[0]).toMatchObject({
        name: 'Component Example Page',
        role: 'heading',
        level: 1
      });
      expect(webArea.children[1]).toMatchObject({
        name: 'My Cart',
        role: 'button'
      });
      expect(webArea.children[2]).toMatchObject({
        level: 2,
        name: 'My Cart (8 Items)',
        role: 'heading'
      });
      expect(webArea.children[3]).toMatchObject({
        name: '',
        role: 'generic'
      });
      expect(webArea.children[4]).toMatchObject({
        name: 'Edit Cart',
        role: 'button'
      });
      expect(webArea.children[5]).toMatchObject({
        name: 'Checkout',
        role: 'button'
      });
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('.popdown', { visible: true });
      expect(webArea).toMatchInlineSnapshot(`
Object {
  "children": Array [
    Object {
      "level": 1,
      "name": "Component Example Page",
      "role": "heading",
    },
    Object {
      "name": "My Cart",
      "role": "button",
    },
    Object {
      "level": 2,
      "name": "My Cart (8 Items)",
      "role": "heading",
    },
    Object {
      "name": "",
      "role": "generic",
    },
    Object {
      "name": "Edit Cart",
      "role": "button",
    },
    Object {
      "name": "Checkout",
      "role": "button",
    },
  ],
  "name": "IDS Enterprise",
  "role": "RootWebArea",
}
`);
    });

    it('should display on click', async () => {
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('.popdown', { visible: true });
      const popdown = await page.evaluate(() => !!document.querySelector('.popdown'));
      expect(popdown).toBeTruthy();
    });

    it('should have id/automation ids', async () => {
      const isFailed = [];
      isFailed.push(await checkDataAutomationID('#popdown', 'popdown-automation-id'));
      isFailed.push(await checkDataAutomationID('#popover-listview-example', 'popover-listview-example-automation-id'));
      isFailed.push(await checkDataAutomationID('#edit-cart', 'edit-cart-automation-id'));
      isFailed.push(await checkDataAutomationID('#checkout', 'checkout-automation-id'));
      expect(isFailed).not.toContain(true);
    });
  });

  describe('Popdown (with Dropdown) Tests', () => {
    const url = 'http://localhost:4000/components/popdown/test-contains-dropdown?layout=nofrills';
    beforeEach(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle2'] });
    });

    it('should show the title', async () => {
      await expect(page.title()).resolves.toMatch('IDS Enterprise');
    });

    it('should check the test page with Axe', async () => {
      await page.setBypassCSP(true);
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
      /* Violations found:
      Rule: "color-contrast" (Elements must have sufficient color contrast)
      Rule: "region" (All page content should be contained by landmarks)
      Rule: "meta-viewport" (Zooming and scaling should not be disabled)
      Rule: "aria-valid-attr-value" (ARIA attributes must conform to valid values)
      */
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'aria-valid-attr-value', 'region'] });
      // Open the Popdown
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('.popdown', { visible: true });

      // Open the Dropdown List
      await page.click('.popdown div.dropdown');
      await page.waitForSelector('.dropdown-list', { visible: true });

      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'color-contrast', 'region'] });
    });

    it('should have Accessibility', async () => {
      const webArea = await page.accessibility.snapshot();
      expect(webArea.children[0]).toMatchObject({
        name: 'Component Example Page',
        role: 'heading',
        level: 1
      });
      expect(webArea.children[1]).toMatchObject({
        name: 'Choose an option...',
        role: 'button'
      });
      expect(webArea.children[2]).toMatchObject({
        level: 2,
        name: 'Dropdown Container',
        role: 'heading'
      });
      expect(webArea.children[3]).toMatchObject({
        name: 'Option Picker',
        role: 'StaticText'
      });
      expect(webArea.children[4]).toMatchObject({
        name: 'Option Picker, (please select)',
        role: 'combobox',
        haspopup: 'listbox'
      });
      expect(webArea.children[5]).toMatchObject({
        name: 'Clear',
        role: 'button'
      });
      expect(webArea.children[6]).toMatchObject({
        name: 'Submit',
        role: 'button'
      });
      // Open the Popdown
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('.popdown', { visible: true });

      // Open the Dropdown List
      await page.click('.popdown div.dropdown');
      await page.waitForSelector('.dropdown-list', { visible: true });

      expect(webArea).toMatchInlineSnapshot(`
Object {
  "children": Array [
    Object {
      "level": 1,
      "name": "Component Example Page",
      "role": "heading",
    },
    Object {
      "name": "Choose an option...",
      "role": "button",
    },
    Object {
      "level": 2,
      "name": "Dropdown Container",
      "role": "heading",
    },
    Object {
      "name": "Option Picker",
      "role": "StaticText",
    },
    Object {
      "haspopup": "listbox",
      "name": "Option Picker, (please select)",
      "role": "combobox",
    },
    Object {
      "name": "Clear",
      "role": "button",
    },
    Object {
      "name": "Submit",
      "role": "button",
    },
  ],
  "name": "IDS Enterprise",
  "role": "RootWebArea",
}
`);
    });

    it('should keep the Popdown open while focused on an inline-Dropdown component\'s list', async () => {
      // Open the Popdown
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('.popdown', { visible: true });

      // Open the Dropdown List
      await page.click('.popdown div.dropdown');
      await page.waitForSelector('.dropdown-list', { visible: true });

      // Test that the Popdown remained open
      const popdown = () => page.evaluate(() => !!document.querySelector('.popdown.bottom.visible'));
      expect(await popdown()).toBeTruthy();

      // Choose an option from the Dropdown, which will close it.
      await page.click('li[data-val="1"]');
      await page.waitForTimeout(400);

      // Test that the Popdown remained open
      expect(await popdown()).toBeTruthy();
    });
  });

  describe('Popdown first last tab Tests', () => {
    const url = 'http://localhost:4000/components/popdown/test-first-last-tab?layout=nofrills';
    beforeEach(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle2'] });
    });

    it('should show the title', async () => {
      await expect(page.title()).resolves.toMatch('IDS Enterprise');
    });

    it('should check the test page with Axe', async () => {
      await page.setBypassCSP(true);
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
      /* Violations found:
      Rule: "color-contrast" (Elements must have sufficient color contrast)
      Rule: "region" (All page content should be contained by landmarks)
      Rule: "meta-viewport" (Zooming and scaling should not be disabled)
      Rule: "aria-valid-attr-value" (ARIA attributes must conform to valid values)
      */
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'aria-valid-attr-value', 'region'] });
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('.popdown', { visible: true });
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'region', 'color-contrast'] });
    });

    it('should have Accessibility', async () => {
      const webArea = await page.accessibility.snapshot();
      const root = {
        role: 'RootWebArea',
        name: 'IDS Enterprise',
        children: [
          { role: 'heading', name: 'Component Example Page', level: 1 },
          { role: 'heading', name: 'Popdown Example: Tabbing into and out from a popdown.', level: 2 },
          { role: 'StaticText', name: '1. When compound field opens, the first input in the popdown should be focused.' },
          { role: 'StaticText', name: '2. Shift + Tab on first input in the popdown should close the popdown and focus to previous element (Date Field).' },
          { role: 'StaticText', name: '3. Tab on last input in the popdown should close the popdown and focus to next element (Another Field).' },
          { role: 'StaticText', name: 'Date Field' },
          { role: 'StaticText', name: '. Press Down arrow to select' },
          { role: 'combobox', name: 'Date Field . Press Down arrow to select', haspopup: 'listbox' },
          { role: 'combobox', name: 'Date Picker Trigger', haspopup: 'dialog' },
          { role: 'StaticText', name: 'Compound Field, mouse click or tab into' },
          { role: 'generic', name: 'JoeSmith' },
          { role: 'StaticText', name: 'Another Field' },
          { role: 'textbox', name: 'Another Field' },
          { role: 'StaticText', name: 'First Name' },
          { role: 'textbox', name: 'First Name' },
          { role: 'StaticText', name: 'Last Name' },
          { role: 'textbox', name: 'Last Name' }
        ]
      };
      expect(webArea).toMatchObject(root);
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('.popdown', { visible: true });
      expect(webArea).toMatchInlineSnapshot(`
Object {
  "children": Array [
    Object {
      "level": 1,
      "name": "Component Example Page",
      "role": "heading",
    },
    Object {
      "level": 2,
      "name": "Popdown Example: Tabbing into and out from a popdown.",
      "role": "heading",
    },
    Object {
      "name": "1. When compound field opens, the first input in the popdown should be focused.",
      "role": "StaticText",
    },
    Object {
      "name": "2. Shift + Tab on first input in the popdown should close the popdown and focus to previous element (Date Field).",
      "role": "StaticText",
    },
    Object {
      "name": "3. Tab on last input in the popdown should close the popdown and focus to next element (Another Field).",
      "role": "StaticText",
    },
    Object {
      "name": "Date Field",
      "role": "StaticText",
    },
    Object {
      "name": ". Press Down arrow to select",
      "role": "StaticText",
    },
    Object {
      "haspopup": "listbox",
      "name": "Date Field . Press Down arrow to select",
      "role": "combobox",
    },
    Object {
      "haspopup": "dialog",
      "name": "Date Picker Trigger",
      "role": "combobox",
    },
    Object {
      "name": "Compound Field, mouse click or tab into",
      "role": "StaticText",
    },
    Object {
      "name": "JoeSmith",
      "role": "generic",
    },
    Object {
      "name": "Another Field",
      "role": "StaticText",
    },
    Object {
      "name": "Another Field",
      "role": "textbox",
    },
    Object {
      "name": "First Name",
      "role": "StaticText",
    },
    Object {
      "name": "First Name",
      "role": "textbox",
    },
    Object {
      "name": "Last Name",
      "role": "StaticText",
    },
    Object {
      "name": "Last Name",
      "role": "textbox",
    },
  ],
  "name": "IDS Enterprise",
  "role": "RootWebArea",
}
`);
    });

    // 1. On open first input should be focused.
    // 2. On first input (Shift + Tab) should close and focus to previous.
    // 3. On last input Tab should close and focus to next.
    it('should let close the popdown and if available focus to prev/next', async () => {
      const isFailed = [];
      // Tab on date field
      const dateField = await page.$('#date-field-normal');
      const dateIcon = await page.$('.btn-icon');
      dateField.click();
      await dateField.press('Tab', { delay: 100 });
      await dateIcon.press('Tab', { delay: 100 });
      await page.waitForSelector('.popdown', { visible: true });

      // Popdown should open and first input should be focused.

      /* const focusedId = () => page.evaluate(() => document.activeElement.getAttribute('id'));
      const popdown = () => page.evaluate(() => !!document.querySelector('.popdown.bottom.visible')); */
      const firstName = await page.$('#first-name');
      const lastName = await page.$('#last-name');

      /* expect(await popdown()).toBe(true);
      expect(await focusedId()).toEqual('first-name'); */
      isFailed.push(await checkIfElementExist('.popdown.bottom.visible'));
      isFailed.push(await checkIfElementHasFocused('#first-name'));

      // Tab on first input
      await firstName.press('Tab');

      // Last input should be focused in popdown.

      /* expect(await focusedId()).toEqual('last-name'); */
      isFailed.push(await checkIfElementHasFocused('#last-name'));

      await page.waitForTimeout(380);
      // Tab on last input in popdown
      await lastName.press('Tab');

      // Popdown should close and next input (another-field) should be focused.

      /* expect(await popdown()).toBe(false);
      expect(await focusedId()).toEqual('another-field'); */
      isFailed.push(!await checkIfElementExist('.popdown.bottom.visible'));
      isFailed.push(await checkIfElementHasFocused('#another-field'));

      // Shift + Tab on this next to popdown input (another-field)
      await page.waitForTimeout(500);
      const anotherField = await page.$('#another-field');
      await page.keyboard.down('Shift');
      await anotherField.press('Tab');
      await page.keyboard.up('Shift');

      // Popdown should open again and first input should be focused.

      /* expect(await popdown()).toBe(true);
      expect(await focusedId()).toEqual('first-name'); */
      isFailed.push(await checkIfElementExist('.popdown.bottom.visible'));
      isFailed.push(await checkIfElementHasFocused('#first-name'));

      // Shift + Tab on first input in popdown
      await page.waitForTimeout(380);
      await page.keyboard.down('Shift');
      await firstName.press('Tab');
      await page.keyboard.up('Shift');

      await page.waitForTimeout(100);
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab', { delay: 100 });
      await page.keyboard.up('Shift');

      // Popdown should close and previous input (date field) should be focused.

      /* expect(await popdown()).toBe(false);
      expect(await focusedId()).toEqual('date-field-normal'); */
      isFailed.push(!await checkIfElementExist('.popdown.bottom.visible'));
      isFailed.push(await checkIfElementHasFocused('#date-field-normal'));
      expect(isFailed).not.toContain(true);
    });
  });

  describe('Popdown/Lookup integration Tests', () => {
    const url = 'http://localhost:4000/components/popdown/test-contains-lookup.html?layout=nofrills';
    beforeEach(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle2'] });
    });

    it('should show the title', async () => {
      await expect(page.title()).resolves.toMatch('IDS Enterprise');
    });

    it('should check the test page with Axe', async () => {
      await page.setBypassCSP(true);
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
      /* Violations found:
      Rule: "color-contrast" (Elements must have sufficient color contrast)
      Rule: "region" (All page content should be contained by landmarks)
      Rule: "meta-viewport" (Zooming and scaling should not be disabled)
      */
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'aria-valid-attr-value', 'region'] });
      await page.click('#popdown-trigger');
      await page.click('.btn-icon');
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'color-contrast', 'region'] });
    });

    it('should have Accessibility', async () => {
      const webArea = await page.accessibility.snapshot();
      expect(webArea.children[0]).toMatchObject({
        name: 'Component Example Page',
        role: 'heading',
        level: 1
      });
      expect(webArea.children[1]).toMatchObject({
        name: 'Trigger Popdown',
        role: 'button'
      });
      expect(webArea.children[2]).toMatchObject({
        level: 2,
        name: 'Look Up Something',
        role: 'heading'
      });
      expect(webArea.children[3]).toMatchObject({
        name: 'Lookup',
        role: 'StaticText'
      });
      expect(webArea.children[4]).toMatchObject({
        name: '[Lookup]. [PressDown]',
        role: 'StaticText'
      });
      expect(webArea.children[5]).toMatchObject({
        name: 'Lookup [Lookup]. [PressDown]',
        role: 'textbox'
      });
      expect(webArea.children[6]).toMatchObject({
        name: '[LookupTriggerButton]',
        role: 'button'
      });
      expect(webArea.children[7]).toMatchObject({
        name: 'Reset',
        role: 'button'
      });
      expect(webArea.children[8]).toMatchObject({
        name: 'Accept',
        role: 'button'
      });
      await page.click('#popdown-trigger');
      await page.click('.btn-icon');
      expect(webArea).toMatchInlineSnapshot(`
Object {
  "children": Array [
    Object {
      "level": 1,
      "name": "Component Example Page",
      "role": "heading",
    },
    Object {
      "name": "Trigger Popdown",
      "role": "button",
    },
    Object {
      "level": 2,
      "name": "Look Up Something",
      "role": "heading",
    },
    Object {
      "name": "Lookup",
      "role": "StaticText",
    },
    Object {
      "name": "[Lookup]. [PressDown]",
      "role": "StaticText",
    },
    Object {
      "name": "Lookup [Lookup]. [PressDown]",
      "role": "textbox",
    },
    Object {
      "name": "[LookupTriggerButton]",
      "role": "button",
    },
    Object {
      "name": "Reset",
      "role": "button",
    },
    Object {
      "name": "Accept",
      "role": "button",
    },
  ],
  "name": "IDS Enterprise",
  "role": "RootWebArea",
}
`);
    });

    it('Should remain open when an inner Lookup component is opened', async () => {
      const isFailed = [];
      // Open the Popdown
      await page.click('#popdown-trigger');
      isFailed.push(await checkIfElementExist('.popdown.bottom.visible'));
      // await page.waitForSelector('.popdown.bottom.visible', { visible: true });
      /*       const popdown = () => page.evaluate(() => !!document.querySelector('.popdown.bottom.visible'));
      expect(await popdown()).toBe(true); */

      // Open the Lookup
      await page.click('.btn-icon');
      isFailed.push(await checkIfElementExist('.lookup-modal'));
      // await page.waitForSelector('.lookup-modal', { visible: true });
      /*       const modal = await page.evaluate(() => !!document.querySelector('.lookup-modal'));
      expect(modal).toBe(true); */

      // Test that the Popdown remained open
      isFailed.push(await checkIfElementExist('.popdown.bottom.visible'));
      /*  expect(await popdown()).toBe(true); */

      // Choose an option from the Lookup
      await page.click('#lookup-datagrid > div.datagrid-wrapper.center.scrollable-x.scrollable-y > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > a');
      const element = await page.$('#lookup-input');
      const input = await (await element.getProperty('value')).jsonValue();
      expect(input).toBe('2142201');

      // Test that the Popdown remained open
      isFailed.push(await checkIfElementExist('.popdown.bottom.visible'));
      /*  expect(await popdown()).toBe(true); */
      expect(isFailed).not.toContain(true);
    });
  });

  describe('Outside Event Tests', () => {
    const url = 'http://localhost:4000/components/popdown/test-click-outside.html';
    beforeEach(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle2'] });
    });

    it('should show the title', async () => {
      await expect(page.title()).resolves.toMatch('IDS Enterprise');
    });

    it('should check the test page with Axe', async () => {
      await page.setBypassCSP(true);
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
      /* Violations found:
      Rule: "color-contrast" (Elements must have sufficient color contrast)
      Rule: "region" (All page content should be contained by landmarks)
      Rule: "meta-viewport" (Zooming and scaling should not be disabled)
      */
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'aria-valid-attr-value', 'region'] });
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('#maincontent');
      await expect(page).toPassAxeTests({ disabledRules: ['meta-viewport', 'color-contrast', 'region'] });
    });

    it('should have Accessibility', async () => {
      const webArea = await page.accessibility.snapshot();
      expect(webArea.children[0]).toMatchObject({
        name: 'Skip to Main Content',
        role: 'link',
      });
      expect(webArea.children[1]).toMatchObject({
        level: 1,
        name: 'IDS Enterprise',
        role: 'heading'
      });
      expect(webArea.children[2]).toMatchObject({
        name: 'Header More Actions Button',
        haspopup: 'menu',
        role: 'combobox'
      });
      expect(webArea.children[3]).toMatchObject({
        name: 'My Cart',
        role: 'button'
      });
      expect(webArea.children[4]).toMatchObject({
        name: 'My Cart (8 Items)',
        level: 2,
        role: 'heading'
      });
      expect(webArea.children[5]).toMatchObject({
        name: '',
        role: 'generic'
      });
      expect(webArea.children[6]).toMatchObject({
        name: 'Edit Cart',
        role: 'button'
      });
      expect(webArea.children[7]).toMatchObject({
        name: 'Checkout',
        role: 'button'
      });
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('#maincontent');
      expect(webArea).toMatchInlineSnapshot(`
Object {
  "children": Array [
    Object {
      "name": "Skip to Main Content",
      "role": "link",
    },
    Object {
      "level": 1,
      "name": "IDS Enterprise",
      "role": "heading",
    },
    Object {
      "haspopup": "menu",
      "name": "Header More Actions Button",
      "role": "combobox",
    },
    Object {
      "name": "My Cart",
      "role": "button",
    },
    Object {
      "level": 2,
      "name": "My Cart (8 Items)",
      "role": "heading",
    },
    Object {
      "name": "",
      "role": "generic",
    },
    Object {
      "name": "Edit Cart",
      "role": "button",
    },
    Object {
      "name": "Checkout",
      "role": "button",
    },
  ],
  "name": "IDS Enterprise",
  "role": "RootWebArea",
}
`);
    });

    it('should show have outside event', async () => {
      expect.assertions(8);
      // |----------------------------------------------------------|
      // | https://github.com/infor-design/enterprise/issues/3618   |
      // |----------------------------------------------------------|
      page
        .on('console', (message) => {
          expect(message.text()).toContain('click outside');
          const { _type, _text, _args } = message;
          const { _remoteObject } = _args[0];
          const value = _remoteObject.value;
          expect(_type).toBe('log');
          expect(_text).toBe('click outside JSHandle@object');
          expect(value).toBe('click outside');
        });
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('#maincontent');
      await page.click('#maincontent', { delay: 500 });
      await page.click('[data-automation-id="popover-listview-example-automation-id"]', { delay: 500 });
    });
  });

  describe.skip('Popdown visual regression tests', () => {
    // const basePath = __dirname;
    // const baselineFolder = `${basePath}/baseline`;
    // const screenshotPath = `${basePath}/.tmp/`;
    // const getConfig = (customSnapshotIdentifier, customDiffDir) => ({
    //   customSnapshotIdentifier,
    //   customDiffDir
    // });
    beforeEach(async () => {
      await page.setViewport({
        width: 1200,
        height: 800,
        deviceScaleFactor: 1,
      });
      const url = 'http://localhost:4000/components/popdown/example-index?layout=nofrills';
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle2'] });
    });
    it('should not visual regress on index example', async () => {
      await page.waitForSelector('.container');
      await page.click('#popdown-example-trigger');
      await page.waitForSelector('#popdown', { visible: true });
      await page.waitForTimeout(500);

      /**
  |---------------------------------------|
  | Generate jest ImageSnaphsot           |
  |---------------------------------------|
  * */
      // const image = await page.screenshot({ fullPage: true });
      // const config = getConfig(baselineFolder, screenshotPath);
      // expect(image).toMatchImageSnapshot(config);
      /**
  |---------------------------------------|
  | Generate percy Snaphsot               |
  |---------------------------------------|
  * */
      await percySnapshot(page, 'popdown');
    });
  });
});

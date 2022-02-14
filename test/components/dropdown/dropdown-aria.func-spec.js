import { Dropdown } from '../../../src/components/dropdown/dropdown';
import { cleanup } from '../../helpers/func-utils';

const dropdownHTML = require('../../../app/views/components/dropdown/example-index.html');
const svg = require('../../../src/components/icons/theme-new-svg.html');

let dropdownEl;
let dropdownObj;

describe('Dropdown ARIA', () => {
  beforeEach(() => {
    dropdownEl = null;
    dropdownObj = null;
    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', dropdownHTML);
    dropdownEl = document.body.querySelector('.dropdown');
    dropdownEl.classList.add('no-init');
    dropdownObj = new Dropdown(dropdownEl);
  });

  afterEach(() => {
    dropdownObj.destroy();
    cleanup();
  });

  it('Should set ARIA labels', (done) => {
    dropdownObj.open();

    expect(document.querySelector('div.dropdown[aria-haspopup="listbox"]')).toBeTruthy();
    expect(document.querySelector('div.dropdown .audible').textContent).toEqual('State ');
    expect(document.querySelector('#dropdown-list ul[role="listbox"]')).toBeTruthy();
    expect(document.querySelectorAll('#dropdown-list [role="option"]').length).toBeTruthy();
    done();
  });
});

/**
 * Polyfills passive event support in jQuery
 * This eliminates a ton of console warnings when doing scrolling.
 * - https://github.com/jquery/jquery/issues/2871
 * - https://github.com/infor-design/enterprise/issues/414
 */
const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (!isIE11) {
  jQuery.event.special.touchstart = {
    setup(_, ns, handle) {
      if (ns.includes('noPreventDefault')) {
        this.addEventListener('touchstart', handle, {
          passive: false
        });
      } else {
        this.addEventListener('touchstart', handle, {
          passive: true
        });
      }
    }
  };
  jQuery.event.special.touchmove = {
    setup(_, ns, handle) {
      this.addEventListener('touchmove', handle, {
        passive: true
      });
    }
  };
  jQuery.event.special.mousewheel = {
    setup(_, ns, handle) {
      this.addEventListener('mousewheel', handle, {
        passive: true
      });
    }
  };
}

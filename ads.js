/* Skills BD App Studio - ad slots (Adsterra banner and native only)
   Ads run ONLY on the hostnames listed below. They never run on github.io or localhost. */
(function () {
  // Add the custom domain here later, for example "appstudio.skillsbdacademy.com"
  var ALLOWED = ["appstudio-skillsbd.pages.dev"];
  var on = ALLOWED.indexOf(location.hostname) !== -1;
  var T = "script";

  function label() {
    var bn = document.documentElement.lang === "bn";
    return '<small style="display:block;color:var(--muted);font-size:.75rem;margin-bottom:4px">' +
      (bn ? "বিজ্ঞাপন" : "Advertisement") + "</small>";
  }
  function open() { document.write('<div class="ad-slot on">' + label()); }
  function close() { document.write("</div>"); }

  function banner(key, w, h) {
    if (!on) return;
    open();
    document.write(
      "<" + T + ">atOptions={'key':'" + key + "','format':'iframe','height':" + h + ",'width':" + w + ",'params':{}};</" + T + ">" +
      "<" + T + ' src="https://bauval.org/22/' + key + '"></' + T + ">"
    );
    close();
  }

  window.Ads = {
    enabled: on,
    /* Native Banner (NativeBanner_1) */
    native: function () {
      if (!on) return;
      open();
      document.write(
        "<" + T + ' async="async" data-cfasync="false" src="https://bauval.org/21/8f66fec4cd64ba0d6be2e2f97bded342"></' + T + ">" +
        '<div id="container-8f66fec4cd64ba0d6be2e2f97bded342"></div>'
      );
      close();
    },
    /* Banner 300x250 (300x250_1) */
    banner300: function () { banner("80fe589267604e2b680d6a6b86739b40", 300, 250); },
    /* Banner 320x50 (320x50_1) - ready, not used on any page yet */
    banner320: function () { banner("f7f1f53c5d05486cb9d5550257895f02", 320, 50); }
  };
})();

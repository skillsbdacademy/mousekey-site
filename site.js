/* Skills BD App Studio - shared script */
(function () {
  var UI = {
    en: {
      langBtn: "বাংলা", toLight: "Light", toDark: "Dark",
      heroTitle: "Skills BD App Studio",
      heroText: "Download our apps directly. Every app page has install steps and answers to common questions.",
      version: "Version", privacy: "Privacy policy", contact: "Contact", about: "About", terms: "Terms of use",
      footer: "© 2026 Skills BD Academy",
      loadErr: "The app list could not be loaded. Check your internet connection and reload the page."
    },
    bn: {
      langBtn: "English", toLight: "হালকা", toDark: "গাঢ়",
      heroTitle: "Skills BD App Studio",
      heroText: "আমাদের অ্যাপ সরাসরি ডাউনলোড করুন। প্রতিটি অ্যাপের পাতায় ইনস্টলের ধাপ ও সাধারণ প্রশ্নের উত্তর আছে।",
      version: "সংস্করণ", privacy: "গোপনীয়তা নীতি", contact: "যোগাযোগ", about: "আমাদের সম্পর্কে", terms: "ব্যবহারের শর্ত",
      footer: "© 2026 Skills BD Academy",
      loadErr: "অ্যাপের তালিকা লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে পাতাটি আবার লোড করুন।"
    }
  };

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var root = document.documentElement;
  var lang = get("lang") === "bn" ? "bn" : "en";
  var theme = get("theme") === "light" ? "light" : "dark";
  root.lang = lang;
  root.setAttribute("data-theme", theme);

  var dataCache = null;
  var renderPage = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var Site = {
    esc: esc,
    get lang() { return lang; },
    ui: function (key) { return UI[lang][key]; },
    t: function (obj) { return obj && typeof obj === "object" ? (obj[lang] || obj.en) : obj; },

    loadData: function () {
      if (!dataCache) {
        dataCache = fetch("apps.json").then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        });
      }
      return dataCache;
    },

    chrome: function (data) {
      var h = document.getElementById("site-header");
      var f = document.getElementById("site-footer");
      if (h) {
        h.innerHTML =
          '<header class="site-header"><div class="wrap bar">' +
          '<a class="brand" href="index.html"><img src="images/favicon.png" width="34" height="34" alt="" style="border-radius:10px"><span>' +
          esc(data.site.name) + '</span></a>' +
          '<div class="tools">' +
          '<button class="chip" id="btn-lang" type="button">' + esc(UI[lang].langBtn) + '</button>' +
          '<button class="chip" id="btn-theme" type="button">' + esc(theme === "dark" ? UI[lang].toLight : UI[lang].toDark) + '</button>' +
          '</div></div></header>';
        document.getElementById("btn-lang").onclick = function () {
          lang = lang === "en" ? "bn" : "en"; set("lang", lang); root.lang = lang; Site.refresh();
        };
        document.getElementById("btn-theme").onclick = function () {
          theme = theme === "dark" ? "light" : "dark"; set("theme", theme); root.setAttribute("data-theme", theme); Site.refresh();
        };
      }
      if (f) {
        f.innerHTML =
          '<footer class="site-footer"><div class="wrap">' +
          '<div class="links">' +
          '<a href="about.html">' + esc(UI[lang].about) + '</a>' +
          '<a href="terms.html">' + esc(UI[lang].terms) + '</a>' +
          '<a href="' + esc(data.site.privacyUrl) + '">' + esc(UI[lang].privacy) + '</a>' +
          '<a href="mailto:' + esc(data.site.email) + '">' + esc(UI[lang].contact) + ': ' + esc(data.site.email) + '</a>' +
          '</div><div>' + esc(UI[lang].footer) + ' · ' + esc(Site.t(data.site.tagline)) + '</div>' +
          '</div></footer>';
      }
    },

    refresh: function () {
      Site.loadData().then(function (data) {
        Site.chrome(data);
        if (renderPage) renderPage(data);
      });
    },

    init: function (fn) {
      renderPage = fn;
      function go() {
        Site.loadData().then(function (data) {
          Site.chrome(data);
          fn(data);
        }).catch(function () {
          var m = document.getElementById("grid") || document.querySelector("main");
          if (m) m.innerHTML = '<p class="note">' + esc(UI[lang].loadErr) + '</p>';
        });
      }
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go);
      else go();
    }
  };

  window.Site = Site;
})();

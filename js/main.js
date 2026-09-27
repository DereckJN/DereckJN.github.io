(function () {
  "use strict";

  var root = document.documentElement;
  var LANGS = ["es", "en"];

  // ---------- Almacenamiento seguro (puede fallar en modo privado) ----------
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }

  // =========================================================
  // Idioma
  // =========================================================

  // Guarda el español original del HTML para poder volver a él.
  var original = {};
  var originalAttrs = [];
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    original[el.getAttribute("data-i18n")] = el.innerHTML;
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
    el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
      var parts = pair.split(":");
      originalAttrs.push({ el: el, attr: parts[0], key: parts[1], es: el.getAttribute(parts[0]) });
    });
  });

  function t(key, lang) {
    var scripted = window.I18N.scriptOnly[lang] || {};
    if (key in scripted) return scripted[key];
    if (lang === "es") return original[key];
    return (window.I18N[lang] || {})[key];
  }

  /**
   * Decide el idioma con el que se abre la página.
   * Se llama una sola vez al cargar; después manda el botón ES/EN.
   *
   * @param {string|null} saved   Idioma que el visitante eligió antes ("es", "en" o null)
   * @param {string} browserLang  Idioma del navegador, p. ej. "en-US" o "es-CR"
   * @returns {"es"|"en"}
   */
  function getInitialLang(saved, browserLang) {
    // 1. El enlace manda: ?lang=en permite enviar a un reclutador directo al inglés.
    var fromUrl = null;
    try { fromUrl = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (LANGS.indexOf(fromUrl) !== -1) return fromUrl;

    // 2. Respeta lo que el visitante eligió en una visita anterior.
    if (LANGS.indexOf(saved) !== -1) return saved;

    // 3. Navegador en español → español; cualquier otro idioma → inglés,
    //    que es más probable que entienda alguien que no habla español.
    return /^es\b/i.test(browserLang) ? "es" : "en";
  }

  // Si el visitante cambia de idioma a mano, quita ?lang de la URL
  // para que al recargar no lo regrese al idioma del enlace.
  function clearLangParam() {
    try {
      var url = new URL(location.href);
      if (!url.searchParams.has("lang")) return;
      url.searchParams.delete("lang");
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) {}
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "es";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = t(el.getAttribute("data-i18n"), lang);
      if (value != null) el.innerHTML = value;
    });
    originalAttrs.forEach(function (a) {
      var value = lang === "es" ? a.es : t(a.key, lang);
      if (value != null) a.el.setAttribute(a.attr, value);
    });
    root.lang = lang;
    document.title = t("meta.title", lang);
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description", lang));
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    currentLang = lang;
  }

  var currentLang = "es";
  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      setLang(b.getAttribute("data-lang"));
      save("lang", currentLang); // solo una elección manual cuenta como preferencia
      clearLangParam();
    });
  });
  setLang(getInitialLang(load("lang"), navigator.language || "es"));

  // =========================================================
  // Tema claro / oscuro
  // =========================================================
  var darkQuery = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  function isDark() {
    var forced = root.getAttribute("data-theme");
    if (forced) return forced === "dark";
    return !!(darkQuery && darkQuery.matches);
  }
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    save("theme", next);
    drawBarcode();
  });
  if (darkQuery && darkQuery.addEventListener) darkQuery.addEventListener("change", drawBarcode);

  // =========================================================
  // Código de barras de la "orden de trabajo"
  // =========================================================
  function drawBarcode() {
    if (!window.JsBarcode) return;
    var ink = getComputedStyle(root).getPropertyValue("--ink").trim();
    try {
      JsBarcode("#barcode", "DJN-2026", {
        format: "CODE128", lineColor: ink, background: "transparent",
        width: 2, height: 54, margin: 0, displayValue: true,
        font: "IBM Plex Mono", fontSize: 12, textMargin: 4
      });
      document.querySelectorAll("#barcode text").forEach(function (n) { n.setAttribute("fill", ink); });
    } catch (e) {}
  }
  drawBarcode();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawBarcode);

  // =========================================================
  // Gráfico: archivos tocados por servicio (misma escala para todas las barras)
  // =========================================================
  var files = [
    ["frontends/ecosystem", 744, true],
    ["laboratorio", 690],
    ["tickets", 662],
    ["pacientes", 386],
    ["ventas", 280],
    ["auth", 181],
    ["frontends/lab-recepcion", 124, true],
    ["database", 114],
    ["shared", 19],
    ["rrhh + inventario", 10]
  ];
  var max = Math.max.apply(null, files.map(function (d) { return d[1]; }));
  document.getElementById("bars").innerHTML = files.map(function (d) {
    var pct = (d[1] / max * 100).toFixed(1);
    return '<div class="bar' + (d[2] ? " fe" : "") + '">' +
      '<span class="n">' + d[0] + '</span>' +
      '<span class="track"><span class="v" style="width:' + pct + '%"></span></span>' +
      '<span class="c">' + d[1] + '</span></div>';
  }).join("");

  // =========================================================
  // Copiar correo
  // =========================================================
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 1800);
  }
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      function fallback() {
        var range = document.createRange();
        range.selectNodeContents(btn.firstChild);
        var sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
        showToast(t("toast.copyFail", currentLang));
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { showToast(t("toast.copied", currentLang)); }, fallback);
      } else {
        fallback();
      }
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // =========================================================
  // Movimiento
  // =========================================================
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canObserve = "IntersectionObserver" in window;

  // Índices para escalonar servicios del diagrama y barras del gráfico
  document.querySelectorAll(".svc, .bar").forEach(function (el) {
    el.style.setProperty("--i", Array.prototype.indexOf.call(el.parentNode.children, el));
  });

  // Brillo que sigue al cursor en las tarjetas
  document.querySelectorAll(".proj, .dom, .stat").forEach(function (card) {
    card.classList.add("glow");
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  // Barra de progreso de lectura
  var progress = document.querySelector(".progress");
  var ticking = false;
  function updateProgress() {
    var max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty("--p", max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
    ticking = false;
  }
  addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();

  if (!canObserve) return;

  // Resalta en el menú la sección que se está leyendo
  var navLinks = {};
  document.querySelectorAll(".nav .links a").forEach(function (a) { navLinks[a.getAttribute("href").slice(1)] = a; });
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      Object.keys(navLinks).forEach(function (id) { navLinks[id].classList.toggle("active", id === entry.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  Object.keys(navLinks).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });

  // Contadores: suben desde 0 hasta la cifra real al aparecer
  function countUp(el) {
    var match = el.textContent.trim().match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!match || reduceMotion) return;
    var prefix = match[1], target = parseFloat(match[2].replace(/,/g, "")), suffix = match[3];
    var start = null, duration = 1500;
    function frame(now) {
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Aparición al hacer scroll
  if (!reduceMotion) root.classList.add("anim");
  var revealSelectors = [".sec-head", ".job", ".proj", ".diagram", ".chart", ".dom", ".adr",
    ".stack > div", ".acad article", ".edu .item", ".footer"];
  var stageSelectors = [".tracker", ".diagram", ".chart", ".stats"];

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add("in");
      if (el.classList.contains("stats")) el.querySelectorAll("b").forEach(countUp);
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  revealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentNode.children, function (s) { return s.matches(sel); });
      el.style.setProperty("--d", (Math.min(siblings.indexOf(el), 5) * 0.08) + "s");
      el.classList.add("rv");
      revealObserver.observe(el);
    });
  });
  stageSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { revealObserver.observe(el); });
  });
})();

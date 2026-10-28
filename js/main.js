/* ===== JFPF Solutions — interactions ===== */
(function () {
  'use strict';

  var CONFIG = {
    // Web3Forms: free access key from https://web3forms.com (delivers to jfpfsolutions@gmail.com).
    // Leave empty to fall back to opening the visitor's email client (mailto).
    WEB3FORMS_ACCESS_KEY: '',
    MAIL_TO: 'jfpfsolutions@gmail.com'
  };

  // Each page can name itself per language on <html data-title-en/-pt>.
  var root = document.documentElement;
  var TITLES = {
    en: root.getAttribute('data-title-en') || 'JFPF Solutions — Web & Mobile Development',
    pt: root.getAttribute('data-title-pt') || 'JFPF Solutions — Desenvolvimento Web e Mobile'
  };

  /* ---- Year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Language ---- */
  function applyLang(lang) {
    if (lang !== 'pt') lang = 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val == null) return;
      if (el.tagName === 'OPTION') el.textContent = val;   // options: text only
      else el.innerHTML = val;                             // authored, trusted markup
    });
    document.title = TITLES[lang];
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('jfpf-lang', lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem('jfpf-lang'); } catch (e) {}
  var initial = saved || ((navigator.language || 'en').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en');
  applyLang(initial);

  document.querySelectorAll('.lang-toggle button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  /* ---- Mobile nav ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Logo scrolls to top ---- */
  document.querySelectorAll('.brand[href="#top"]').forEach(function (brand) {
    brand.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', location.pathname);
    });
  });

  /* ---- Contact form ---- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('contactStatus');
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');

  function isPT() { return document.documentElement.lang === 'pt'; }
  function t(en, pt) { return isPT() ? pt : en; }
  function val(n) { var el = form.elements[n]; return el ? el.value.trim() : ''; }

  function validate() {
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (el) {
      var bad = !el.value.trim() ||
        (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));
      el.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    return ok;
  }

  function body() {
    return 'Name: ' + val('name') +
      '\nEmail: ' + val('email') +
      '\nProject type: ' + val('project') +
      '\n\nMessage:\n' + val('message');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'form-status';
    if (val('website')) return;                 // honeypot
    if (!validate()) {
      status.textContent = t('Please fill in the required fields correctly.',
                             'Por favor preencha os campos obrigatórios corretamente.');
      status.classList.add('err');
      return;
    }
    var subject = 'New project enquiry — ' + val('name');

    if (CONFIG.WEB3FORMS_ACCESS_KEY) {
      if (btn) btn.disabled = true;
      status.textContent = t('Sending…', 'A enviar…');
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: CONFIG.WEB3FORMS_ACCESS_KEY,
          subject: subject, from_name: 'JFPF Solutions site',
          name: val('name'), email: val('email'),
          project: val('project'), message: val('message'), botcheck: ''
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.success) {
            status.textContent = t("Thanks! Your message was sent — we'll be in touch shortly.",
                                   'Obrigado! A sua mensagem foi enviada — entraremos em contacto em breve.');
            status.classList.add('ok'); form.reset();
          } else {
            status.textContent = t('Could not send: ', 'Não foi possível enviar: ') + (d.message || '');
            status.classList.add('err');
          }
        })
        .catch(function () {
          status.textContent = t('Connection error. Please email ', 'Erro de ligação. Envie email para ') + CONFIG.MAIL_TO + '.';
          status.classList.add('err');
        })
        .finally(function () { if (btn) btn.disabled = false; });
      return;
    }

    // fallback: mailto
    window.location.href = 'mailto:' + CONFIG.MAIL_TO +
      '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body());
    status.textContent = t('Opening your email app to send the message…',
                           'A abrir a sua aplicação de email para enviar a mensagem…');
    status.classList.add('ok');
    form.reset();
  });

})();

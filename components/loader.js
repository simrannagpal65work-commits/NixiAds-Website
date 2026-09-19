/**
 * Nixi component loader — inline template approach.
 * Works on file://, local servers, and production alike.
 *
 * Root-level pages:  <script src="components/loader.js" data-root=""></script>
 * One level deep:    <script src="../components/loader.js" data-root="../"></script>
 */
(function () {
  var script = document.currentScript ||
    (function () { var s = document.getElementsByTagName('script'); return s[s.length - 1]; })();

  var root = script.getAttribute('data-root') || '';
  if (root !== '' && root.slice(-1) !== '/') root += '/';

  /* ── NAV + FOOTER CSS ───────────────────────────────────── */
  var NAV_CSS = [
    'nav{position:fixed;top:0;left:0;right:0;z-index:200;height:62px;display:flex;align-items:center;background:rgba(255,255,255,.9);backdrop-filter:blur(20px);border-bottom:1px solid rgba(235,235,235,.6)}',
    '.nav-inner{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1140px;height:62px;margin:0 auto;padding:0 28px}',
    '.nav-logo img{height:100px;width:auto}',
    '.nav-links{display:flex;gap:28px;list-style:none;align-items:center}',
    '.nav-links a{font-size:13px;font-weight:500;color:#666;text-decoration:none;transition:color .2s}',
    '.nav-links a:hover{color:#212121}',
    '.nav-cta-group{display:flex;gap:10px;align-items:center}',
    '.btn-primary{background:linear-gradient(135deg,#F97316,#c2410c);color:#fff;padding:8px 18px;border-radius:50px;text-decoration:none;font-size:13px;font-weight:600;border:none;cursor:pointer;transition:all .2s}',
    '.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(249,115,22,.45)}',
    '.btn-demo{font-size:13px;font-weight:600;text-decoration:none;padding:7px 16px;border-radius:50px;border:1.5px solid #fed7aa;color:#F97316;background:#fff7ed;transition:all .2s}',
    '.btn-demo:hover{background:#fed7aa}',
    '.nav-dropdown{position:relative}',
    '.nav-dropdown-btn{display:inline-flex;align-items:center;gap:5px;font-size:13px;font-weight:500;color:#666;background:none;border:none;cursor:pointer;padding:0;font-family:inherit;transition:color .2s;vertical-align:middle;line-height:normal}',
    '.nav-dropdown-btn:hover,.nav-dropdown.open .nav-dropdown-btn{color:#212121}',
    '.nav-dropdown-btn svg{width:11px;height:11px;transition:transform .2s}',
    '.nav-dropdown.open .nav-dropdown-btn svg{transform:rotate(180deg)}',
    '.nav-dropdown-menu{position:absolute;top:calc(100% + 14px);left:-16px;background:#fff;border:1px solid #ebebeb;border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,.12);padding:8px;min-width:260px;opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .18s ease,transform .18s ease;z-index:300}',
    '.nav-dropdown.open .nav-dropdown-menu{opacity:1;transform:translateY(0);pointer-events:all}',
    '.nav-dropdown-item{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;text-decoration:none;color:#212121;transition:background .15s}',
    '.nav-dropdown-item:hover{background:#fafafa}',
    '.ndi-icon{width:30px;height:30px;flex-shrink:0;border-radius:8px;background:linear-gradient(135deg,#F97316,#c2410c);color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center}',
    '.ndi-title{font-size:13px;font-weight:600;color:#212121}',
    '.ndi-sub{font-size:11.5px;color:#666;margin-top:1px}',
    'footer{background:#fafafa;border-top:1px solid #ebebeb;padding:32px 28px}',
    '.footer-inner{max-width:1140px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center}',
    '.footer-links{display:flex;gap:20px;flex-wrap:wrap;justify-content:center}',
    '.footer-links a{font-size:12px;color:#666;text-decoration:none}',
    '.footer-links a:hover{color:#212121}',
    '.footer-social{display:flex;gap:14px;align-items:center}',
    '.footer-social a{display:flex;align-items:center;opacity:.6;transition:opacity .2s}',
    '.footer-social a:hover{opacity:1}',
    '.nav-toggle{display:none;flex-direction:column;justify-content:center;gap:5px;width:32px;height:32px;border:none;background:none;cursor:pointer;padding:0;flex-shrink:0}',
    '.nav-toggle span{display:block;width:100%;height:2px;background:#212121;border-radius:2px;transition:transform .25s,opacity .25s}',
    'nav.nav-open .nav-toggle span:nth-child(1){transform:translateY(7px) rotate(45deg)}',
    'nav.nav-open .nav-toggle span:nth-child(2){opacity:0}',
    'nav.nav-open .nav-toggle span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}',
    '@media(max-width:860px){',
    '.nav-toggle{display:flex}',
    'nav{height:62px;overflow:hidden}',
    'nav.nav-open{height:auto;max-height:calc(100vh - 62px);overflow-y:auto;background:#fff;backdrop-filter:none;align-items:flex-start}',
    'nav.nav-open .nav-inner{height:auto;min-height:62px}',
    '.nav-inner{flex-wrap:wrap;align-items:flex-start}',
    '.nav-toggle{height:62px;display:flex;align-items:center;align-self:flex-start;flex-shrink:0}',
    '.nav-logo{height:82px;display:flex;align-items:center;align-self:flex-start;flex-shrink:0;overflow:hidden}',
    '.nav-logo img{height:80px !important}',
    '.nav-links,.nav-cta-group{flex-basis:100%;width:100%;flex-direction:column;align-items:stretch;gap:0;opacity:0;transition:opacity .2s ease}',
    'nav.nav-open .nav-links,nav.nav-open .nav-cta-group{opacity:1}',
    '.nav-links{padding-top:8px;order:1}',
    '.nav-cta-group{order:2}',
    '.nav-links>a,.nav-links>.nav-dropdown{width:100%}',
    '.nav-links>a{padding:14px 0;border-bottom:1px solid #ebebeb}',
    '.nav-dropdown-btn{width:100%;justify-content:space-between;padding:14px 0;border-bottom:1px solid #ebebeb}',
    '.nav-dropdown-menu{position:static;opacity:1;transform:none;pointer-events:all;box-shadow:none;border:none;display:none;width:100%;min-width:0;margin-bottom:8px}',
    '.nav-dropdown.open .nav-dropdown-menu{display:block}',
    '.nav-cta-group{flex-direction:row;gap:10px;padding:4px 0 20px}',
    '.nav-cta-group>a{flex:1;text-align:center;padding:10px 12px}',
    '}'
  ].join('');

  if (!document.getElementById('nixi-nav-css')) {
    var style = document.createElement('style');
    style.id = 'nixi-nav-css';
    style.textContent = NAV_CSS;
    document.head.appendChild(style);
  }

  // /* ── PAGE ZOOM (site feels designed for ~80% browser zoom) ── */
  // if (!document.getElementById('nixi-zoom-css')) {
  //   var zoomStyle = document.createElement('style');
  //   zoomStyle.id = 'nixi-zoom-css';
  //   zoomStyle.textContent = 'html{zoom:0.8}';
  //   document.head.appendChild(zoomStyle);
  // }

  /* ── HEADER TEMPLATE ─────────────────────────────────── */
  var HEADER_HTML = [
    '<nav>',
    '  <div class="nav-inner">',
    '    <a class="nav-logo" href="' + root + 'index.html">',
    '      <img src="' + root + 'assets/logo/Nixi-logo-trans.webp" alt="Nixi" style="height:100px;width:auto">',
    '    </a>',
    '    <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">',
    '      <span></span><span></span><span></span>',
    '    </button>',
    '    <div class="nav-links">',
    '      <div class="nav-dropdown" id="adsDropdown">',
    '        <button class="nav-dropdown-btn" aria-haspopup="true" aria-expanded="false" id="adsDropBtn">',
    '          Ads Studio',
    '          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg>',
    '        </button>',
    '        <div class="nav-dropdown-menu" id="adsMenu" role="menu">',
    '          <a href="' + root + 'ads-studio.html" class="nav-dropdown-item" role="menuitem" style="background:var(--bg2)">',
    '            <div class="ndi-icon">✦</div>',
    '            <div><div class="ndi-title">Create Ad</div><div class="ndi-sub">From URL to campaign-ready ad in 2 minutes</div></div>',
    '          </a>',
    '          <a href="' + root + 'clone.html" class="nav-dropdown-item" role="menuitem">',
    '            <div class="ndi-icon">⧉</div>',
    '            <div><div class="ndi-title">Ad Clone</div><div class="ndi-sub">Clone any ad\'s structure for your brand</div></div>',
    '          </a>',
    '        </div>',
    '      </div>',
    '      <div class="nav-dropdown" id="catDropdown">',
    '        <button class="nav-dropdown-btn" aria-haspopup="true" aria-expanded="false" id="catDropBtn">',
    '          Catalog Studio',
    '          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg>',
    '        </button>',
    '        <div class="nav-dropdown-menu" id="catMenu" role="menu">',
    '          <a href="' + root + 'catalog-studio.html" class="nav-dropdown-item" role="menuitem" style="background:var(--bg2)">',
    '            <div class="ndi-icon">✦</div>',
    '            <div><div class="ndi-title">Catalog Photos</div><div class="ndi-sub">AI-generated lifestyle product shots</div></div>',
    '          </a>',
    '          <a href="' + root + 'catalog-videos.html" class="nav-dropdown-item" role="menuitem">',
    '            <div class="ndi-icon">⧉</div>',
    '            <div><div class="ndi-title">Catalog Videos</div><div class="ndi-sub">Turn any image into motion</div></div>',
    '          </a>',
    '        </div>',
    '      </div>',
    '      <a href="' + root + 'pricing.html">Pricing</a>',
    '      <a href="' + root + 'faq.html">FAQ</a>',
    '    </div>',
    '    <div class="nav-cta-group">',
    '      <a href="' + root + 'book-a-demo.html" class="btn-demo">Book a Demo</a>',
    '      <a href="https://app.nixiads.com" target="_blank" class="btn-primary">Try Now</a>',
    '    </div>',
    '  </div>',
    '</nav>'
  ].join('\n');

  /* ── FOOTER TEMPLATE ─────────────────────────────────── */
  var FOOTER_HTML = [
    '<footer>',
    '  <div class="footer-inner">',
    '    <a class="nav-logo" href="' + root + 'index.html" style="text-decoration:none">',
    '      <img src="' + root + 'assets/logo/Nixi-logo-trans.webp" alt="Nixi" style="height:90px;width:auto">',
    '    </a>',
    '    <div class="footer-links">',
    '      <a href="' + root + 'pages/privacy-policy.html">Privacy Policy</a>',
    '      <a href="' + root + 'pages/terms-of-use.html">Terms of Use</a>',
    '      <a href="' + root + 'pages/refund-policy.html">Refund Policy</a>',
    '      <a href="' + root + 'blogs/index.html">Blogs</a>',
    '    </div>',
    '    <div class="footer-social">',
    '      <a href="https://www.instagram.com/nixi_ads" target="_blank" rel="noopener" aria-label="Instagram">',
    '        <img src="' + root + 'assets/Instagram_icon.webp" alt="Instagram" width="24" height="24">',
    '      </a>',
    '      <a href="https://www.linkedin.com/company/nixi-ads" target="_blank" rel="noopener" aria-label="LinkedIn">',
    '        <img src="' + root + 'assets/linkedin.webp" alt="LinkedIn" width="24" height="24">',
    '      </a>',
    '    </div>',
    '    <div style="font-size:12px;color:var(--text-3)">&copy; <span id="copy-year"></span> Nixi. All rights reserved.</div>',
    '  </div>',
    '</footer>'
  ].join('\n');

  /* ── INJECT ──────────────────────────────────────────── */
  function inject(id, html) {
    var el = document.getElementById(id);
    if (!el) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    el.parentNode.replaceChild(tmp.firstElementChild, el);
  }

  inject('site-header', HEADER_HTML);
  inject('site-footer', FOOTER_HTML);

  // Footer year
  var yr = document.getElementById('copy-year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── NAV BEHAVIOUR ───────────────────────────────────── */
  var nav = document.querySelector('nav');
  var toggle = document.getElementById('navToggle');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  ['adsDropdown', 'catDropdown'].forEach(function (id) {
    var container = document.getElementById(id);
    if (!container) return;
    var btn = container.querySelector('.nav-dropdown-btn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = container.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        if (d !== container) {
          d.classList.remove('open');
          var b = d.querySelector('.nav-dropdown-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
      d.classList.remove('open');
      var b = d.querySelector('.nav-dropdown-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });
})();

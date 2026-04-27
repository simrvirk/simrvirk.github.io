/* ============================================================
   SHARED NAV INJECTOR
   Injects #navbar synchronously before this <script> tag.
   To update the nav across all pages, edit only this file.
   ============================================================ */
(function () {
  const nav = document.createElement('nav');
  nav.id = 'navbar';
  nav.style.position = 'relative';
  nav.innerHTML = [
    '<a href="/index.html" class="nav-brand">SV</a>',
    '<ul class="nav-links">',
    '  <li><a href="/index.html#projects">Projects</a></li>',
    '  <li><a href="/about/about.html">About</a></li>',
    '  <li><a href="/index.html#contact">Contact</a></li>',
    '</ul>',
    '<a href="/Simr_Resume_2026.pdf" target="_blank" class="nav-resume">',
    '  <i class="fas fa-file-alt"></i> Resume',
    '</a>',
    '<button class="nav-toggle" id="navToggle" aria-label="Menu">',
    '  <span></span><span></span><span></span>',
    '</button>',
  ].join('\n');

  const s = document.currentScript;
  s.parentNode.insertBefore(nav, s);
})();

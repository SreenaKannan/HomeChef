/* HomeChef — includes.js: injects nav + footer + scroll-top so pages stay DRY */
(function(){
  const page = (location.pathname.split('/').pop() || 'index.html');
  const nav = `
  <header class="nav">
    <div class="container">
      <a href="index.html" class="logo"><span class="logo-mark">H</span> Home<span>Chef</span></a>
      <nav>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="menu.html">Menu</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="chefs.html">Chefs</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="login.html">Login</a></li>
          <li><a href="register.html" style="color:var(--orange);font-weight:600">Register</a></li>
        </ul>
      </nav>
      <div class="nav-actions">
        <button class="icon-btn" id="themeToggle" aria-label="Toggle theme"></button>
        <a href="cart.html" class="icon-btn" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span class="cart-badge" id="cartBadge">0</span>
        </a>
        <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;

  const footer = `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="brand">
          <a href="index.html" class="logo"><span class="logo-mark">H</span> Home<span style="color:var(--orange-soft)">Chef</span></a>
          <p>Restaurant-quality meals delivered with love. Made by chefs, for food lovers.</p>
          <div class="social-row"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">ⓘ</a><a href="#" aria-label="Twitter">𝕏</a><a href="#" aria-label="YouTube">▶</a></div>
        </div>
        <div><h4>Quick Links</h4><ul><li><a href="index.html">Home</a></li><li><a href="menu.html">Menu</a></li><li><a href="about.html">About</a></li><li><a href="services.html">Services</a></li><li><a href="chefs.html">Chefs</a></li></ul></div>
        <div><h4>Support</h4><ul><li><a href="contact.html">Contact</a></li><li><a href="#">FAQ</a></li><li><a href="#">Delivery</a></li><li><a href="#">Terms</a></li><li><a href="#">Privacy</a></li></ul></div>
        <div>
          <h4>Contact</h4>
          <div class="contact-line"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>221 Baker Street, London, UK</span></div>
          <div class="contact-line"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.98.37 1.94.7 2.86a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.22-1.22a2 2 0 0 1 2.11-.45c.92.33 1.88.57 2.86.7A2 2 0 0 1 22 16.92z"/></svg><span>+44 20 7946 0000</span></div>
          <div class="contact-line"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>hello@homechef.com</span></div>
        </div>
      </div>
      <div class="copyright">© ${new Date().getFullYear()} HomeChef. All rights reserved. Made with ♥ for food lovers.</div>
    </div>
  </footer>
  <button id="scrollTop" class="scroll-top" aria-label="Scroll to top">↑</button>`;

  const navSlot = document.getElementById('nav-slot');
  const footSlot = document.getElementById('footer-slot');
  if(navSlot) navSlot.outerHTML = nav;
  if(footSlot) footSlot.outerHTML = footer;
})();

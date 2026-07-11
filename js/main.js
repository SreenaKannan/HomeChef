/* HomeChef — main.js: nav, theme, reveal, sliders, toast, scroll-top */
(function(){
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));

  // Theme
  const applyTheme = (t)=>{
    document.documentElement.setAttribute('data-theme',t);
    const btn = $('#themeToggle');
    if(btn) btn.innerHTML = t==='dark' ? sunIcon() : moonIcon();
  };
  const savedTheme = localStorage.getItem('hc_theme') || 'light';
  applyTheme(savedTheme);

  // Nav / hamburger / sticky / active link
  const nav = $('.nav');
  const links = $('.nav-links');
  const burger = $('.hamburger');
  if(burger){
    burger.addEventListener('click',()=>{
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
      burger.classList.remove('open');links.classList.remove('open');
    }));
  }
  const setScrolled = ()=>{
    if(!nav) return;
    if(window.scrollY>10) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    const st = $('#scrollTop');
    if(st){ if(window.scrollY>400) st.classList.add('show'); else st.classList.remove('show'); }
  };
  window.addEventListener('scroll',setScrolled,{passive:true});
  setScrolled();
  // Active link based on filename
  const page = (location.pathname.split('/').pop() || 'index.html');
  $$('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href===page || (page==='' && href==='index.html')) a.classList.add('active');
  });

  // Theme toggle button
  const tt = $('#themeToggle');
  if(tt){
    tt.addEventListener('click',()=>{
      const cur = document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
      localStorage.setItem('hc_theme',cur);applyTheme(cur);
    });
  }

  // Scroll-to-top button
  const st = $('#scrollTop');
  if(st) st.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Ripple position for buttons
  document.addEventListener('click',(e)=>{
    const b = e.target.closest('.btn');
    if(!b) return;
    const rect = b.getBoundingClientRect();
    b.style.setProperty('--x',(e.clientX-rect.left)+'px');
    b.style.setProperty('--y',(e.clientY-rect.top)+'px');
  });

  // IntersectionObserver reveals
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){en.target.classList.add('in-view');io.unobserve(en.target);}
    });
  },{threshold:0.12});
  $$('.reveal').forEach(el=>io.observe(el));

  // Lazy load for data-src
  const lz = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const img = en.target;
        if(img.dataset.src){img.src = img.dataset.src;img.removeAttribute('data-src');}
        lz.unobserve(img);
      }
    });
  },{rootMargin:'200px'});
  $$('img[data-src]').forEach(img=>lz.observe(img));

  // Testimonial slider
  const slider = $('[data-slider]');
  if(slider){
    const slides = slider.querySelector('.slides');
    const count = slides.children.length;
    let i=0;let timer;
    const dotsWrap = slider.querySelector('.slider-nav');
    for(let k=0;k<count;k++){
      const b = document.createElement('button');
      b.setAttribute('aria-label','Slide '+(k+1));
      b.addEventListener('click',()=>{i=k;update();reset();});
      dotsWrap.appendChild(b);
    }
    const dots = dotsWrap.querySelectorAll('button');
    const update = ()=>{
      slides.style.transform=`translateX(-${i*100}%)`;
      dots.forEach((d,k)=>d.classList.toggle('active',k===i));
    };
    const next=()=>{i=(i+1)%count;update();};
    const prev=()=>{i=(i-1+count)%count;update();};
    const reset=()=>{clearInterval(timer);timer=setInterval(next,5500);};
    slider.querySelector('[data-prev]')?.addEventListener('click',()=>{prev();reset();});
    slider.querySelector('[data-next]')?.addEventListener('click',()=>{next();reset();});
    update();reset();
  }

  // Toast helper
  const wrap = document.createElement('div');wrap.className='toast-wrap';document.body.appendChild(wrap);
  window.toast = (msg,type='success')=>{
    const el = document.createElement('div');
    el.className='toast '+type;
    el.innerHTML = `<div class="ticon">${type==='success'?checkIcon():type==='error'?xIcon():infoIcon()}</div><div>${msg}</div>`;
    wrap.appendChild(el);
    setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),350);},2800);
  };

  // Newsletter (any page)
  $$('.newsletter-form').forEach(f=>{
    f.addEventListener('submit',(e)=>{
      e.preventDefault();
      const email = f.querySelector('input').value.trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){toast('Please enter a valid email','error');return;}
      f.reset();toast('Thanks for subscribing!');
    });
  });

  // Cart badge sync
  const syncBadge = ()=>{
    const badge = $('#cartBadge');if(!badge) return;
    const items = JSON.parse(localStorage.getItem('homechef_cart')||'[]');
    const total = items.reduce((s,i)=>s+i.qty,0);
    badge.textContent = total;
    badge.style.display = total>0 ? 'grid' : 'none';
  };
  window.addEventListener('cart:change',syncBadge);
  syncBadge();

  // Icons (inline SVG)
  function sunIcon(){return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`}
  function moonIcon(){return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`}
  function checkIcon(){return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`}
  function xIcon(){return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`}
  function infoIcon(){return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`}
})();

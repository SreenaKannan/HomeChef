/* Menu — filter + search over the same dish cards */
(function(){
  const chips = document.querySelectorAll('.chip[data-cat]');
  const search = document.getElementById('search');
  const grid = document.getElementById('menuGrid');
  const empty = document.getElementById('menuEmpty');
  if(!grid) return;
  let cat = 'all';
  const filter = ()=>{
    const q = (search.value||'').trim().toLowerCase();
    let visible = 0;
    grid.querySelectorAll('.dish').forEach(el=>{
      const c = (el.dataset.cat||'').toLowerCase();
      const name = (el.dataset.name||'').toLowerCase();
      const desc = (el.querySelector('.desc')?.textContent||'').toLowerCase();
      const okCat = cat==='all' || c===cat;
      const okQ = !q || name.includes(q) || desc.includes(q);
      const ok = okCat && okQ;
      el.style.display = ok ? '' : 'none';
      if(ok) visible++;
    });
    empty.style.display = visible ? 'none' : 'block';
  };
  chips.forEach(ch=>ch.addEventListener('click',()=>{
    chips.forEach(c=>c.classList.remove('active'));
    ch.classList.add('active');
    cat = ch.dataset.cat;
    filter();
  }));
  search.addEventListener('input',filter);
})();

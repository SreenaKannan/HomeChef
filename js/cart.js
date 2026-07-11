/* HomeChef — cart.js: localStorage cart model */
(function(){
  const KEY = 'homechef_cart';
  const read = ()=>{ try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}};
  const write = (arr)=>{localStorage.setItem(KEY,JSON.stringify(arr));window.dispatchEvent(new Event('cart:change'));};

  const Cart = {
    items:()=>read(),
    add(item){
      const arr = read();
      const found = arr.find(i=>i.id===item.id);
      const qty = item.qty || 1;
      if(found){found.qty+=qty;} else {arr.push({...item,qty});}
      write(arr);
      if(window.toast) window.toast(`${item.name} added to cart`);
    },
    remove(id){write(read().filter(i=>i.id!==id));},
    setQty(id,n){
      const arr = read();
      const it = arr.find(i=>i.id===id);
      if(!it) return;
      it.qty = Math.max(1,n);
      write(arr);
    },
    inc(id){const arr=read();const it=arr.find(i=>i.id===id);if(it){it.qty++;write(arr);}},
    dec(id){const arr=read();const it=arr.find(i=>i.id===id);if(it){it.qty=Math.max(1,it.qty-1);write(arr);}},
    clear(){write([]);},
    subtotal(){return read().reduce((s,i)=>s+i.qty*i.price,0);},
    count(){return read().reduce((s,i)=>s+i.qty,0);},
  };
  window.Cart = Cart;

  // Delegate any [data-add-to-cart] button — reads data-* from nearest .dish or the button itself
  document.addEventListener('click',(e)=>{
    const btn = e.target.closest('[data-add-to-cart]');
    if(!btn) return;
    e.preventDefault();
    const host = btn.closest('[data-item]') || btn;
    const item = {
      id: host.dataset.id,
      name: host.dataset.name,
      price: parseFloat(host.dataset.price),
      image: host.dataset.image,
    };
    const qtyEl = host.querySelector('.qty span');
    const qty = qtyEl ? parseInt(qtyEl.textContent,10) : 1;
    Cart.add({...item,qty});
    if(qtyEl) qtyEl.textContent = '1';
  });

  // Delegate qty +/- inside dish cards
  document.addEventListener('click',(e)=>{
    const inc = e.target.closest('[data-qty-inc]');
    const dec = e.target.closest('[data-qty-dec]');
    if(!inc && !dec) return;
    const qtyEl = (inc||dec).parentElement.querySelector('span');
    let n = parseInt(qtyEl.textContent,10)||1;
    n = inc ? n+1 : Math.max(1,n-1);
    qtyEl.textContent = n;
  });
})();

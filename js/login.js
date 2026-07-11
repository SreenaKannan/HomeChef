/* Login */
(function(){
  const f = document.getElementById('loginForm');
  if(!f) return;
  const pw = f.password, email = f.email, remember = document.getElementById('l-remember');
  // Restore remembered email
  const saved = localStorage.getItem('hc_remember_email');
  if(saved){email.value = saved; if(remember) remember.checked = true;}
  // Toggle password
  document.querySelector('.pw-toggle').addEventListener('click',()=>{
    pw.type = pw.type==='password' ? 'text' : 'password';
  });
  f.addEventListener('submit',(e)=>{
    e.preventDefault();
    const V = window.HCV;
    let ok = true;
    if(!V.email(email.value)){V.showError(email,'Enter a valid email');ok=false;} else V.showError(email,'');
    if(!V.minLen(pw.value,6)){V.showError(pw,'Password must be at least 6 characters');ok=false;} else V.showError(pw,'');
    if(!ok){window.toast('Please check your details','error');return;}
    if(remember && remember.checked) localStorage.setItem('hc_remember_email',email.value);
    else localStorage.removeItem('hc_remember_email');
    localStorage.setItem('hc_user',JSON.stringify({email:email.value}));
    window.toast('Welcome back!');
    setTimeout(()=>location.href='index.html',900);
  });
})();

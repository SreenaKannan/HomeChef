/* Register */
(function(){
  const f = document.getElementById('registerForm');
  if(!f) return;
  const V = window.HCV;
  const pw = f.password, pw2 = f.password2;
  const meter = document.getElementById('pwMeter');
  const hint = document.getElementById('pwHint');
  document.querySelectorAll('.pw-toggle').forEach(btn=>btn.addEventListener('click',()=>{
    const inp = btn.parentElement.querySelector('input');
    inp.type = inp.type==='password' ? 'text' : 'password';
  }));
  pw.addEventListener('input',()=>{
    const r = V.passwordStrength(pw.value);
    meter.setAttribute('data-score',r.score);
    meter.querySelector('i').style.width = r.pct+'%';
    hint.textContent = pw.value ? `Strength: ${r.label}` : 'Use 8+ characters with a mix of letters, numbers and symbols';
  });
  f.addEventListener('submit',(e)=>{
    e.preventDefault();
    let ok = true;
    if(!V.required(f.name.value)){V.showError(f.name,'Enter your full name');ok=false;} else V.showError(f.name,'');
    if(!V.email(f.email.value)){V.showError(f.email,'Enter a valid email');ok=false;} else V.showError(f.email,'');
    if(!V.phone(f.phone.value)){V.showError(f.phone,'Enter a valid phone');ok=false;} else V.showError(f.phone,'');
    if(!V.required(f.address.value)){V.showError(f.address,'Enter your address');ok=false;} else V.showError(f.address,'');
    const r = V.passwordStrength(pw.value);
    if(r.score<3){V.showError(pw,'Password too weak — use 8+ chars, mix of letters, numbers & symbols');ok=false;} else V.showError(pw,'');
    if(pw.value !== pw2.value || !pw2.value){V.showError(pw2,'Passwords do not match');ok=false;} else V.showError(pw2,'');
    if(!ok){window.toast('Please fix the errors','error');return;}
    localStorage.setItem('hc_user',JSON.stringify({name:f.name.value,email:f.email.value}));
    window.toast('Account created! Redirecting…');
    setTimeout(()=>location.href='login.html',1100);
  });
})();

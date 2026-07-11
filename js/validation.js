/* HomeChef — validation.js: shared validators */
window.HCV = {
  email: (v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v||'').trim()),
  phone: (v)=>/^[+\d][\d\s\-()]{6,20}$/.test((v||'').trim()),
  required: (v)=> (v||'').trim().length>0,
  minLen: (v,n)=>((v||'').trim().length>=n),
  passwordStrength(v){
    v = v||'';
    let score=0;
    if(v.length>=8) score++;
    if(/[A-Z]/.test(v)) score++;
    if(/[a-z]/.test(v)) score++;
    if(/\d/.test(v)) score++;
    if(/[^A-Za-z0-9]/.test(v)) score++;
    const labels=['Too weak','Weak','Fair','Good','Strong','Excellent'];
    return {score,label:labels[score],pct:(score/5)*100};
  },
  showError(input,msg){
    const wrap = input.closest('.field') || input.parentElement;
    let err = wrap.querySelector('.err');
    if(!err){err=document.createElement('div');err.className='err';wrap.appendChild(err);}
    err.textContent = msg||'';
    input.classList.toggle('invalid',!!msg);
  },
};

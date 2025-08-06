window.onload = () => {
  const btn = document.createElement('button');
  btn.textContent = '📄 Download as PDF';
  btn.style.cssText = 'position:fixed;top:12px;right:12px;padding:8px 14px;border-radius:6px;background:#0ea5e9;color:black;font-weight:bold;cursor:pointer;border:none;z-index:1000;';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.print());
};    

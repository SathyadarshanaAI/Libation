// quamtom/chart-engine.js
(function () {
  function drawWheel(canvas, eph) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 20;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // outer circle
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();

    // zodiac sectors
    ctx.save();
    ctx.translate(cx, cy);
    for (let i = 0; i < 12; i++) {
      ctx.rotate(Math.PI / 6);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(R, 0);
      ctx.strokeStyle = '#1f3b5b';
      ctx.stroke();
    }
    ctx.restore();

    // planets
    ctx.fillStyle = '#e5e7eb';
    ctx.font = '12px sans-serif';
    for (const p of (eph?.planets || [])) {
      const a = (p.degree - 90) * Math.PI / 180;
      const x = cx + Math.cos(a) * (R - 20);
      const y = cy + Math.sin(a) * (R - 20);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(p.name, x + 6, y - 6);
    }
  }
  window.drawWheel = drawWheel; // expose globally
})();

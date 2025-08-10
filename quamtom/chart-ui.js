// quamtom/chart-ui.js — draw wheel on an existing <canvas id="wheel">
(function () {
  window.drawWheel = function drawWheel(canvasOrEl, eph) {
    const canvas = typeof canvasOrEl === 'string'
      ? document.getElementById(canvasOrEl)
      : canvasOrEl;
    if (!canvas) throw new Error('Canvas not found');

    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W/2, cy = H/2;
    const R  = Math.min(W, H)/2 - 20;

    // clear
    ctx.clearRect(0,0,W,H);

    // bg
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0,0,W,H);

    // outer circle
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI*2);
    ctx.stroke();

    // 12 houses
    ctx.save();
    ctx.translate(cx, cy);
    for (let i=0;i<12;i++){
      ctx.rotate(Math.PI/6);
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(0,-R);
      ctx.strokeStyle = '#1f8aa6';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    // planets
    if (eph && Array.isArray(eph.planets)){
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px system-ui, sans-serif';
      eph.planets.forEach(p=>{
        const rad = (p.degree % 360) * Math.PI/180;
        const r2  = R - 20;
        const x = cx + r2*Math.cos(-rad + Math.PI/2);
        const y = cy + r2*Math.sin(-rad + Math.PI/2);
        ctx.beginPath();
        ctx.arc(x,y,3,0,Math.PI*2);
        ctx.fill();
        ctx.fillText(p.name, x+6, y-6);
      });
    }
  };
})();

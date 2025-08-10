function drawChart() {
  const canvas = document.getElementById('wheel');
  const ctx = canvas.getContext('2d');

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 250;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Example Houses
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#94a3b8';
  ctx.stroke();
}

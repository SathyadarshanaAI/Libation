// 📈 quamtom/kp-chart-summary.js — Draws KP Style Circular Chart on Canvas

function drawKPChart(canvasId, chartData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !chartData || !chartData.planets) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  // 🔄 Clear Canvas
  ctx.clearRect(0, 0, width, height);

  // 🌀 Draw Zodiac Circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;
  ctx.stroke();

  // 📚 Draw 12 divisions (30° each for 12 Signs)
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 * Math.PI) / 180;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 🌟 Plot Planets
  chartData.planets.forEach(planet => {
    const angle = (planet.degree - 90) * (Math.PI / 180); // Start from left
    const px = centerX + (radius - 30) * Math.cos(angle);
    const py = centerY + (radius - 30) * Math.sin(angle);

    // 🪐 Planet Dot
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#facc15";
    ctx.fill();

    // 🏷️ Label
    ctx.font = "12px Segoe UI";
    ctx.fillStyle = "#e0f2fe";
    ctx.fillText(planet.name, px - 20, py - 10);
  });
}

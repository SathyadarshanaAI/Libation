// ✅ quamtom/chart-ui.js — KP Chart UI Renderer (Fixed)

function renderChartUI(chartData, containerId = 'chart-container') {
  const container = document.getElementById(containerId);
  if (!container || !chartData) return;

  // 🎯 Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  canvas.style.display = 'block';
  canvas.style.margin = '2rem auto';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // ♻️ Draw circular chart
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 200;

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();

  // 🧭 Plot planets
  Object.entries(chartData).forEach(([planet, info], index) => {
    const totalDegree = zodiacSigns.indexOf(info.sign) * 30 + parseFloat(info.degree);
    const angle = (totalDegree * Math.PI) / 180;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.fillStyle = '#e0f2fe';
    ctx.font = '14px Segoe UI';
    ctx.fillText(planet, x - 15, y);
  });
}

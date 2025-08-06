// 🪐 quamtom/chart-ui.js — KP Chart Canvas Renderer (Uses chart-style.css)

// ⛺ Wait for DOM to render
window.onload = () => {
  const container = document.createElement('div');
  container.className = 'report-container';
  document.body.appendChild(container);

  const title = document.createElement('h1');
  title.textContent = '🪐 KP Birth Chart View';
  container.appendChild(title);

  // 🎯 Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  canvas.style.display = 'block';
  canvas.style.margin = '2rem auto';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // 🔄 Load chart data from chart-engine.js
  const { renderChart } = window.kpChartEngine || {}; // assume it's attached globally
  const positions = renderChart && renderChart();

  if (!positions) {
    ctx.fillStyle = '#e11d48';
    ctx.fillText('Error: No chart data found.', 50, 50);
    return;
  }

  // ♻️ Draw circular chart
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 200;

  // 🟢 Circle outline
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();

  // 🧭 Plot planets
  const planets = Object.keys(positions);
  planets.forEach((planet, index) => {
    const deg360 = samplePositions[planet]; // use global positions
    const angle = (deg360 * Math.PI) / 180;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.fillStyle = '#e0f2fe';
    ctx.font = '14px Segoe UI';
    ctx.fillText(planet, x - 15, y);
  });
};

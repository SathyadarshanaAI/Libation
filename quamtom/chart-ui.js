// ✅ quamtom/chart-ui.js — KP Chart UI Renderer (Fixed)

// Zodiac signs array (required for plotting)
const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

function renderChartUI(chartData, containerId = 'chart-container') {
  const container = document.getElementById(containerId);
  if (!container || !chartData) return;

  // 🎯 Clear container first
  container.innerHTML = '';

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
  Object.entries(chartData).forEach(([planet, info]) => {
    const signIndex = zodiacSigns.indexOf(info.sign);
    if (signIndex === -1) return;

    const totalDegree = signIndex * 30 + parseFloat(info.degree);
    const angle = (totalDegree - 90) * Math.PI / 180; // -90 to align Aries to top
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.fillStyle = '#e0f2fe';
    ctx.font = '13px Segoe UI';
    ctx.fillText(planet, x - 15, y);
  });
}

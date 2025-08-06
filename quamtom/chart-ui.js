// 🎨 quamtom/chart-ui.js — KP Birth Chart UI Renderer (Canvas Based)

function drawChartUI(positions, canvasId = 'chartCanvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return console.error('Canvas element not found');

  const ctx = canvas.getContext('2d');
  const center = canvas.width / 2;
  const radius = center - 20;

  // 🌟 Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 🌀 Draw zodiac circle
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 🪐 Draw 12 zodiac segments
  const step = (2 * Math.PI) / 12;
  for (let i = 0; i < 12; i++) {
    const angle = i * step;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#94a3b8';
    ctx.stroke();
  }

  // 🪐 Draw planet positions
  for (const [planet, deg] of Object.entries(positions)) {
    const angle = (deg / 360) * 2 * Math.PI - Math.PI / 2;
    const px = center + (radius - 40) * Math.cos(angle);
    const py = center + (radius - 40) * Math.sin(angle);

    ctx.fillStyle = '#e0f2fe';
    ctx.font = '12px Segoe UI';
    ctx.fillText(planet, px - 10, py + 4);
  }
}

// 🧪 Example usage
if (typeof window !== 'undefined') {
  window.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'chartCanvas';
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas);

    const samplePositions = {
      Sun: 123.5,
      Moon: 83.2,
      Mars: 15.8,
      Mercury: 140.3,
      Jupiter: 280.1,
      Venus: 210.5,
      Saturn: 305.0,
      Rahu: 66.6,
      Ketu: 246.6,
      Ascendant: 97.3
    };

    drawChartUI(samplePositions);
  };
}

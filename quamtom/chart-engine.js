// 🌌 quamtom/chart-engine.js — Render KP Style Birth Chart (No UI, Data Only)

// ♈ Zodiac signs in 30° steps
const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// 🪐 Sample planetary positions (degrees in 360° format)
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

// 🔁 Convert degree to sign and degree-within-sign
function getZodiacPosition(degree) {
  const signIndex = Math.floor(degree / 30);
  const sign = zodiacSigns[signIndex % 12];
  const signDegree = degree % 30;
  return { sign, degree: signDegree.toFixed(2) };
}

// 🧾 Render chart data summary (like traditional chart sheet)
function renderChart(positions = samplePositions) {
  const chart = {};
  for (const [planet, deg] of Object.entries(positions)) {
    chart[planet] = getZodiacPosition(deg);
  }
  return chart;
}

// 🧪 Example usage (for developer test only)
const chartData = renderChart();
console.table(chartData);

// 🖥️ Export for Node.js usage (backend)
if (typeof module !== 'undefined') {
  module.exports = {
    renderChart,
    getZodiacPosition
  };
}

// 🌍 Export for Browser access (frontend UI)
if (typeof window !== 'undefined') {
  window.kpChartEngine = {
    renderChart,
    getZodiacPosition
  };
}

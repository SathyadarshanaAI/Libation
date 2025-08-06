// 📊 quamtom/chart-ui.js — Handles UI and Canvas Setup for KP Chart

window.onload = () => {
  // 🖼️ Dynamically add canvas to report if not present
  const reportContainer = document.querySelector(".report-container");
  if (!reportContainer) return;

  const canvas = document.createElement("canvas");
  canvas.id = "kpCanvas";
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.display = "block";
  canvas.style.margin = "2rem auto";
  canvas.style.border = "2px solid #38bdf8";
  canvas.style.borderRadius = "12px";
  canvas.style.backgroundColor = "#1e293b";

  reportContainer.appendChild(canvas);

  // 🌌 Sample dummy data (will later fetch real planet positions from ephemeris)
  const sampleChartData = {
    planets: [
      { name: "☉ Sun", degree: 120 },
      { name: "☽ Moon", degree: 245 },
      { name: "♂ Mars", degree: 330 },
      { name: "♀ Venus", degree: 75 },
      { name: "☿ Mercury", degree: 180 },
      { name: "♃ Jupiter", degree: 60 },
      { name: "♄ Saturn", degree: 310 },
      { name: "☊ Rahu", degree: 45 },
      { name: "☋ Ketu", degree: 225 },
    ],
  };

  // 🧠 Draw the chart
  drawKPChart("kpCanvas", sampleChartData);
};

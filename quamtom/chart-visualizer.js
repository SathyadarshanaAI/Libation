// quamtom/chart-visualizer.js — SVG-based KP Chakra Chart Renderer

function renderKPChartSVG(chartData) {
  const svgNS = "http://www.w3.org/2000/svg";
  const size = 400;
  const center = size / 2;
  const radius = 160;
  const angleStep = 30;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.style.display = "block";
  svg.style.margin = "auto";

  // Outer circle
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", center);
  circle.setAttribute("cy", center);
  circle.setAttribute("r", radius);
  circle.setAttribute("fill", "#1e293b");
  circle.setAttribute("stroke", "#38bdf8");
  circle.setAttribute("stroke-width", "2");
  svg.appendChild(circle);

  // Zodiac sectors
  for (let i = 0; i < 12; i++) {
    const angle = (i * angleStep - 90) * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", center);
    line.setAttribute("y1", center);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#38bdf8");
    svg.appendChild(line);
  }

  // Planets on chart
  for (const [planet, pos] of Object.entries(chartData)) {
    const signIndex = zodiacSigns.indexOf(pos.sign);
    const angle = ((signIndex * angleStep + parseFloat(pos.degree)) - 90) * (Math.PI / 180);
    const x = center + (radius - 20) * Math.cos(angle);
    const y = center + (radius - 20) * Math.sin(angle);
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("fill", "#e0f2fe");
    text.setAttribute("font-size", "12");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.textContent = planet;
    svg.appendChild(text);
  }

  return svg;
}

// 🌐 Auto-attach if browser
if (typeof window !== 'undefined') {
  window.renderKPChartSVG = renderKPChartSVG;
}

// 🌌 quamtom/chart-visualizer.js — Render KP Chart as SVG Chakra

function renderSVGChart(containerId, chartData) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const size = 300;
  const center = size / 2;
  const radius = size / 2 - 10;
  const sectorAngle = (2 * Math.PI) / 12;

  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.style.border = '2px solid #38bdf8';
  svg.style.borderRadius = '50%';

  // Draw 12 houses (triangle/pie)
  for (let i = 0; i < 12; i++) {
    const x1 = center + radius * Math.cos(i * sectorAngle);
    const y1 = center + radius * Math.sin(i * sectorAngle);
    const x2 = center + radius * Math.cos((i + 1) * sectorAngle);
    const y2 = center + radius * Math.sin((i + 1) * sectorAngle);

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', `M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`);
    path.setAttribute('fill', i % 2 === 0 ? '#1e293b' : '#0f172a');
    path.setAttribute('stroke', '#38bdf8');
    path.setAttribute('stroke-width', '1');
    svg.appendChild(path);

    // Add house number
    const angle = (i + 0.5) * sectorAngle;
    const tx = center + (radius - 40) * Math.cos(angle);
    const ty = center + (radius - 40) * Math.sin(angle);
    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', tx);
    label.setAttribute('y', ty);
    label.setAttribute('fill', '#e0f2fe');
    label.setAttribute('font-size', '12');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'middle');
    label.textContent = (i + 1);
    svg.appendChild(label);
  }

  // Plot planets inside houses
  for (const [planet, { sign, degree }] of Object.entries(chartData)) {
    const index = zodiacSigns.indexOf(sign);
    if (index < 0) continue;

    const angle = (index + 0.5) * sectorAngle;
    const px = center + (radius - 20) * Math.cos(angle);
    const py = center + (radius - 20) * Math.sin(angle);

    const pt = document.createElementNS(svgNS, 'text');
    pt.setAttribute('x', px);
    pt.setAttribute('y', py);
    pt.setAttribute('fill', 'gold');
    pt.setAttribute('font-size', '11');
    pt.setAttribute('text-anchor', 'middle');
    pt.setAttribute('dominant-baseline', 'middle');
    pt.textContent = planet.slice(0, 2); // eg: 'Su', 'Mo'
    svg.appendChild(pt);
  }

  container.appendChild(svg);
}

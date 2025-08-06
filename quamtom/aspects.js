// 🔭 aspects.js — Identify aspects (drishti) between planets

function calculateAspects(planetPositions) {
  const aspects = [];

  const planetNames = Object.keys(planetPositions);
  for (let i = 0; i < planetNames.length; i++) {
    const p1 = planetNames[i];
    const pos1 = planetPositions[p1];

    for (let j = 0; j < planetNames.length; j++) {
      if (i === j) continue;

      const p2 = planetNames[j];
      const pos2 = planetPositions[p2];

      const diff = Math.abs(pos1 - pos2);
      const angle = diff > 180 ? 360 - diff : diff;

      let type = null;

      // ⚖️ Define classical aspects (Vedic-style)
      if (angle === 180) type = 'Opposition (7th house aspect)';
      else if (angle === 120) type = 'Trine (5th/9th house)';
      else if (angle === 90) type = 'Square (4th/10th)';
      else if (angle === 60) type = 'Sextile (3rd/11th)';
      else if (angle === 30) type = 'Semi-sextile';
      else if (angle === 150) type = 'Quincunx';
      else if (angle === 0) type = 'Conjunction';

      if (type) {
        aspects.push({
          from: p1,
          to: p2,
          angle,
          type
        });
      }
    }
  }

  return aspects;
}

// 🧪 Example
const positions = {
  Sun: 10,
  Moon: 130,
  Mars: 250,
  Saturn: 10 // Conjunction example
};

console.log("🔮 Aspects Detected:");
console.table(calculateAspects(positions));

// 🪐 If running in browser with KP Report, attach summary:
if (typeof document !== 'undefined') {
  window.onload = () => {
    const section = document.createElement('div');
    section.style.marginTop = '2rem';
    section.innerHTML = `<h2>🔭 Graha Aspects</h2>`;
    const aspects = calculateAspects(positions);

    aspects.forEach(a => {
      const div = document.createElement('div');
      div.textContent = `${a.from} ➤ ${a.to}: ${a.type} (${a.angle}°)`;
      section.appendChild(div);
    });

    document.querySelector('.report-container')?.appendChild(section);
  };
}

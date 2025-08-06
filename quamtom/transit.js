// 🚀 quamtom/transit.js — Real-Time Transit Analysis with NASA Planet Positions

import { currentPlanetPositions } from './ephemeris-data.js';
import { calculateSubLord } from './kp-subload.js';

// 🔭 Define simple transit impact messages
const transitEffects = {
  Sun: '☀️ Focus on ego, health, and recognition',
  Moon: '🌙 Emotional sensitivity and intuition rise',
  Mars: '🔥 High energy, aggression, courage',
  Mercury: '🧠 Quick thinking, communication boost',
  Jupiter: '📚 Wisdom, growth, and blessings',
  Venus: '💖 Love, beauty, and relationships activated',
  Saturn: '⏳ Karma, delays, discipline',
  Rahu: '🌫️ Obsession, foreign links, confusion',
  Ketu: '🪬 Detachment, spiritual openings'
};

// 🌌 Build Transit Summary
export function generateTransitReport() {
  const positions = currentPlanetPositions(); // degrees for each graha
  let report = `🌠 <strong>Current Planetary Transits</strong><br><br>`;

  for (const planet in positions) {
    const deg = positions[planet];
    const sublord = calculateSubLord(deg);
    const effect = transitEffects[planet] || '🔮 Undefined Influence';

    report += `
      <div style="margin-bottom: 1rem;">
        <strong>${planet}</strong> at <em>${deg.toFixed(2)}°</em><br>
        🔍 Sub-Lord: <strong>${sublord}</strong><br>
        ✨ Effect: ${effect}
      </div>
    `;
  }

  return report;
}

// 🧾 Auto-insert into report if on browser
if (typeof document !== 'undefined') {
  window.onload = () => {
    const container = document.querySelector('#transit-report');
    if (container) {
      container.innerHTML = generateTransitReport();
    }
  };
}

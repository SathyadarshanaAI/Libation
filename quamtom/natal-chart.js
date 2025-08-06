// 📜 natal-chart.js — Assign planets to Houses & Rasis (Signs) based on Lagna

// Each Rasi spans 30°; Aries starts at 0°
const rasiNames = [
  'Mesha (Aries)', 'Vrushabha (Taurus)', 'Mithuna (Gemini)', 'Kataka (Cancer)',
  'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrischika (Scorpio)',
  'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
];

// 🧿 Input: Lagna Degree + Planetary Degrees (from ephemeris)
function assignHouses(lagnaDeg, planetDegrees) {
  const chart = {};
  const lagnaRasiIndex = Math.floor(lagnaDeg / 30); // Ascendant Rasi (House 1)
  
  // Loop 12 houses
  for (let i = 0; i < 12; i++) {
    const houseNumber = i + 1;
    const rasiIndex = (lagnaRasiIndex + i) % 12;
    chart[`House ${houseNumber}`] = {
      sign: rasiNames[rasiIndex],
      planets: []
    };
  }

  // Assign each planet to house
  for (const [planet, deg] of Object.entries(planetDegrees)) {
    const relativeDeg = (deg - lagnaDeg + 360) % 360;
    const houseNum = Math.floor(relativeDeg / 30) + 1;
    chart[`House ${houseNum}`].planets.push({ planet, deg });
  }

  return chart;
}

// 🧪 Example usage:
const exampleLagna = 123.2; // Cancer 3° (Kataka)
const examplePlanets = {
  Sun: 124.6,
  Moon: 92.1,
  Mars: 278.5,
  Mercury: 119.2,
  Venus: 149.8,
  Jupiter: 190.5,
  Saturn: 300.0,
  Rahu: 68.3,
  Ketu: 248.3
};

const result = assignHouses(exampleLagna, examplePlanets);
console.log(result);

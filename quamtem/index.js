// 12 Zodiac SVGs - Pencil Outline Neon Style
const zodiacSVGs = [
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M7 33 Q5 12 20 10 Q35 12 33 33" stroke="#fff" stroke-width="2.3" fill="none" /><circle cx="7" cy="33" r="1.5" fill="#6d7cff"/><circle cx="33" cy="33" r="1.5" fill="#6d7cff"/></svg>`, // Aries
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><ellipse cx="20" cy="25" rx="10" ry="8" stroke="#fff" stroke-width="2.2" fill="none"/><path d="M12 12 Q18 4 20 10 Q22 4 28 12" stroke="#fff" stroke-width="2" fill="none"/></svg>`, // Taurus
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M13 8 L13 32 M27 8 L27 32" stroke="#fff" stroke-width="2"/><path d="M10 8 Q20 2 30 8" stroke="#fff" stroke-width="2" fill="none"/><path d="M10 32 Q20 38 30 32" stroke="#fff" stroke-width="2" fill="none"/></svg>`, // Gemini
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M14 26 Q7 22 12 16 Q17 10 26 14" stroke="#fff" stroke-width="2.1" fill="none"/><path d="M26 14 Q33 18 28 24 Q23 30 14 26" stroke="#fff" stroke-width="2.1" fill="none"/></svg>`, // Cancer
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M30 11 Q34 31 15 31 Q8 31 12 22 Q16 13 26 19" stroke="#fff" stroke-width="2.1" fill="none"/><circle cx="30" cy="11" r="2" fill="#00ffe7"/></svg>`, // Leo
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M10 10 L10 30 M20 10 L20 30 Q20 34 25 32 Q30 30 25 25" stroke="#fff" stroke-width="2"/><path d="M10 15 Q15 10 20 15" stroke="#fff" stroke-width="2" fill="none"/></svg>`, // Virgo
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><rect x="10" y="24" width="20" height="8" rx="4" stroke="#fff" stroke-width="2" fill="none"/><path d="M10 24 Q20 8 30 24" stroke="#fff" stroke-width="2" fill="none"/></svg>`, // Libra
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M10 10 L10 30 M20 10 L20 30 Q20 34 25 32 Q30 30 25 25 M30 22 Q34 34 25 34" stroke="#fff" stroke-width="2"/><circle cx="25" cy="34" r="1.5" fill="#00ffe7"/></svg>`, // Scorpio
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M10 30 L30 10 M22 10 L30 10 L30 18" stroke="#fff" stroke-width="2" fill="none"/></svg>`, // Sagittarius
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M10 10 Q20 34 30 24 Q36 12 20 14 Q4 16 10 34" stroke="#fff" stroke-width="2" fill="none"/></svg>`, // Capricorn
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M6 20 Q11 16 16 20 Q21 24 26 20 Q31 16 36 20" stroke="#fff" stroke-width="2" fill="none"/><path d="M6 28 Q11 24 16 28 Q21 32 26 28 Q31 24 36 28" stroke="#fff" stroke-width="2" fill="none"/></svg>`, // Aquarius
  `<svg class="zodiac-icon" viewBox="0 0 40 40"><path d="M10 10 Q20 20 10 30" stroke="#fff" stroke-width="2" fill="none"/><path d="M30 10 Q20 20 30 30" stroke="#fff" stroke-width="2" fill="none"/><line x1="10" y1="20" x2="30" y2="20" stroke="#fff" stroke-width="2"/></svg>` // Pisces
];
const zodiacs = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];
const planets = [
  "Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"
];

// Example: Simulate API data, or replace with your fetch logic!
const planetData = [
  { name: "Sun", degree: 23.4567, sign: 0 },
  { name: "Moon", degree: 54.1234, sign: 1 },
  { name: "Mercury", degree: 89.9876, sign: 2 },
  { name: "Venus", degree: 120.7654, sign: 3 },
  { name: "Mars", degree: 178.5432, sign: 5 },
  { name: "Jupiter", degree: 290.3210, sign: 9 },
  { name: "Saturn", degree: 330.6543, sign: 11 }
];

// Show current date & time
document.getElementById('date-info').textContent =
  'Date: 2025-08-23 &nbsp; Time: 12:00:00 &nbsp; (Colombo, Sri Lanka)';

// Render KP Chart Table
const table = document.getElementById('kp-table');
planetData.forEach(p => {
  const row = table.insertRow();
  row.innerHTML = `
    <td class="zodiac-cell">${zodiacSVGs[p.sign]}${zodiacs[p.sign]}</td>
    <td class="planet-cell">${p.name}</td>
    <td class="degree-cell">${p.degree.toFixed(4)}</td>
  `;
});

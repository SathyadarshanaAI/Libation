// quantom/kp-calc-engine.js

// 🔭 KP Astrology Engine (Placeholder Data)
// TODO: Replace with NASA/API integration later

document.addEventListener("DOMContentLoaded", () => {
  const chartBox = document.getElementById("chart-container");
  if (!chartBox) return;

  const planetaryData = [
    { planet: "☀ Sun", degree: "22° Taurus", house: "2" },
    { planet: "🌙 Moon", degree: "03° Cancer", house: "4" },
    { planet: "♂ Mars", degree: "15° Gemini", house: "3" },
    { planet: "☿ Mercury", degree: "08° Taurus", house: "2" },
    { planet: "♃ Jupiter", degree: "29° Pisces", house: "12" },
    { planet: "♀ Venus", degree: "12° Aries", house: "1" },
    { planet: "♄ Saturn", degree: "05° Aquarius", house: "11" },
    { planet: "☊ Rahu", degree: "18° Leo", house: "5" },
    { planet: "☋ Ketu", degree: "18° Aquarius", house: "11" },
    { planet: "♅ Uranus", degree: "11° Taurus", house: "2" },
    { planet: "♆ Neptune", degree: "23° Pisces", house: "12" },
    { planet: "♇ Pluto", degree: "01° Capricorn", house: "10" }
  ];

  const chartHTML = planetaryData.map(p => 
    `<p><strong>${p.planet}:</strong> ${p.degree}, House ${p.house}</p>`
  ).join("");

  chartBox.innerHTML += `
    <hr />
    <h3>🔭 KP Planetary Chart</h3>
    ${chartHTML}
    <p style="margin-top:1.5rem;color:#94a3b8;font-size:0.9rem;">
      <em>Note: This is sample data. Real-time planetary positions will be integrated soon.</em>
    </p>
  `;
});

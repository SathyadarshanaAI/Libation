// Quamtem/kp-calc-engine.js

// Placeholder KP Planetary Engine – to be replaced with actual NASA/API-based logic
document.addEventListener("DOMContentLoaded", () => {
  const chartBox = document.getElementById("chart-container");

  if (!chartBox) return;

  // Simulated planetary positions (fake values for testing)
  const planetaryData = [
    { planet: "☀ Sun", degree: "22° Taurus", house: "2" },
    { planet: "🌙 Moon", degree: "03° Cancer", house: "4" },
    { planet: "♂ Mars", degree: "15° Gemini", house: "3" },
    { planet: "☿ Mercury", degree: "08° Taurus", house: "2" },
    { planet: "♃ Jupiter", degree: "29° Pisces", house: "12" },
    { planet: "♀ Venus", degree: "12° Aries", house: "1" },
    { planet: "♄ Saturn", degree: "05° Aquarius", house: "11" },
    { planet: "☊ Rahu (North Node)", degree: "18° Leo", house: "5" },
    { planet: "☋ Ketu (South Node)", degree: "18° Aquarius", house: "11" },
    { planet: "♅ Uranus", degree: "11° Taurus", house: "2" }, // optional
    { planet: "♆ Neptune", degree: "23° Pisces", house: "12" }, // optional
    { planet: "♇ Pluto", degree: "01° Capricorn", house: "10" }  // optional
  ];

  const chartHTML = planetaryData.map(p => 
    `<p><strong>${p.planet}:</strong> ${p.degree}, House ${p.house}</p>`
  ).join("");

  // Append to existing chart result
  chartBox.innerHTML += `
    <hr />
    <h3>🔭 KP Planetary Chart:</h3>
    ${chartHTML}
    <p style="margin-top:1.5rem;color:#94a3b8;font-size:0.9rem;"><em>Note: This is sample placeholder data for testing purposes.</em></p>
  `;
});

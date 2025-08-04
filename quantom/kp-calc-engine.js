// File: quantom/kp-calc-engine.js

document.addEventListener("DOMContentLoaded", () => {
  const planetaryData = [
    { planet: "☀ Sun", house: "2" },
    { planet: "🌙 Moon", house: "1" },
    { planet: "♂ Mars", house: "3" },
    { planet: "☿ Mercury", house: "2" },
    { planet: "♃ Jupiter", house: "12" },
    { planet: "♀ Venus", house: "1" },
    { planet: "♄ Saturn", house: "11" },
    { planet: "☊ Rahu", house: "5" },
    { planet: "☋ Ketu", house: "11" },
    { planet: "♅ Uranus", house: "2" },
    { planet: "♆ Neptune", house: "12" },
    { planet: "♇ Pluto", house: "10" }
  ];

  planetaryData.forEach(p => {
    const box = document.querySelector(`.box[data-house="${p.house}"]`);
    if (box) {
      const span = document.createElement("span");
      span.textContent = p.planet;
      box.appendChild(span);
    }
  });
});

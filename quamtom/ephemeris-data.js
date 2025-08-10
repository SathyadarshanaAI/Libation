// quamtom/ephemeris-data.js
(function () {
  // 🚀 Mock Ephemeris – replace later with real API
  function computeEphemeris(dt, lat, lon) {
    const base = (new Date(dt || Date.now())).getTime() / 1000;
    const norm = deg => ((deg % 360) + 360) % 360;

    const planets = [
      { name: "Sun",     degree: norm((base/86400)*0.985 + 120) },
      { name: "Moon",    degree: norm((base/ 3600)*13.176 +  60) },
      { name: "Mars",    degree: norm((base/86400)*0.524 + 330) },
      { name: "Venus",   degree: norm((base/86400)*1.62  +  75) },
      { name: "Mercury", degree: norm((base/86400)*4.09  + 180) },
      { name: "Jupiter", degree: norm((base/86400)*0.083 +  60) },
      { name: "Saturn",  degree: norm((base/86400)*0.033 + 310) },
      { name: "Rahu",    degree: norm(45) },
      { name: "Ketu",    degree: norm(225) }
    ];

    // extra shape for other modules
    const positions = {
      Moon: planets.find(p => p.name === 'Moon').degree
    };

    return { planets, positions };
  }

  window.computeEphemeris = computeEphemeris; // expose globally
})();

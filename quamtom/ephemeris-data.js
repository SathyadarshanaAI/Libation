// quamtom/ephemeris-data.js
(function () {
  function computeEphemeris(dt, lat, lon) {
    const t = (new Date(dt || Date.now())).getTime() / 1000;
    const norm = d => ((d % 360) + 360) % 360;
    return {
      planets: [
        { name: "Sun",     degree: norm((t/86400)*0.985 + 120) },
        { name: "Moon",    degree: norm((t/ 3600)*13.176 +  60) },
        { name: "Mars",    degree: norm((t/86400)*0.524 + 330) },
        { name: "Venus",   degree: norm((t/86400)*1.620 +  75) },
        { name: "Mercury", degree: norm((t/86400)*4.090 + 180) },
        { name: "Jupiter", degree: norm((t/86400)*0.083 +  60) },
        { name: "Saturn",  degree: norm((t/86400)*0.033 + 310) },
        { name: "Rahu",    degree: norm(45) },
        { name: "Ketu",    degree: norm(225) }
      ]
    };
  }
  window.computeEphemeris = computeEphemeris;
})();

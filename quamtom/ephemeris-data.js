// quamtom/ephemeris-data.js
(function () {
  // Simple mock ephemeris so the wheel ALWAYS draws.
  // Replace later with your real computeEphemeris().
  function norm(deg){ return ((deg % 360) + 360) % 360; }

  function computeMockEphemeris(dtISO, lat, lon){
    const t = (new Date(dtISO || Date.now())).getTime() / 1000;
    const d = t/86400;

    const planets = [
      { name: "Sun",     degree: norm(d*0.985   * 1 + 120) },
      { name: "Moon",    degree: norm(t/3600 *13.176 +  60) },
      { name: "Mercury", degree: norm(d*4.09   + 180) },
      { name: "Venus",   degree: norm(d*1.62   +  75) },
      { name: "Mars",    degree: norm(d*0.524  + 330) },
      { name: "Jupiter", degree: norm(d*0.083  +  60) },
      { name: "Saturn",  degree: norm(d*0.033  + 310) },
      { name: "Rahu",    degree: norm(45)  },
      { name: "Ketu",    degree: norm(225) }
    ];
    return { planets };
  }

  // If you already have a real computeEphemeris, keep it.
  if (typeof window.computeEphemeris !== 'function') {
    window.computeMockEphemeris = computeMockEphemeris;
  }
})();

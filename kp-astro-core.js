// KP Astrology Core JS (Browser) - Astronomy Engine අවශ්‍යයි
// <script src="https://cdn.jsdelivr.net/npm/astronomy-engine@2.1.19/astronomy.browser.min.js"></script>

const KP = (() => {
  function lahiriAyanamshaDegrees(date) {
    const base = 23.8568611; // deg at J2000 (2000-01-01)
    const y = date.getUTCFullYear();
    const m = (date.getUTCMonth() + 1) / 12;
    const yearsFrom2000 = (y - 2000) + m;
    const rate = 50.290966; // arcsec/year
    return base + yearsFrom2000 * (rate/3600);
  }
  function norm360(x) { return (x%360+360)%360; }
  function siderealLon(tropicalLonDeg, date) {
    return norm360(tropicalLonDeg - lahiriAyanamshaDegrees(date));
  }

  function getPlanets(date) {
    const bodies = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn"];
    const planets = [];
    for (const body of bodies) {
      const ecl = Astronomy.EclipticLongitude(body, date); // tropical longitude
      planets.push({
        name: body,
        degree: siderealLon(ecl, date),
        tropical: ecl,
        sidereal: siderealLon(ecl, date)
      });
    }
    // Rahu/Ketu (mean node, retrograde)
    const moonEcl = Astronomy.EclipticLongitude("Moon", date);
    const sunEcl = Astronomy.EclipticLongitude("Sun", date);
    let rahuTrop = norm360(sunEcl - moonEcl + 180);
    let ketuTrop = norm360(rahuTrop + 180);
    planets.push({
      name: "Rahu",
      degree: siderealLon(rahuTrop, date),
      tropical: rahuTrop,
      sidereal: siderealLon(rahuTrop, date)
    });
    planets.push({
      name: "Ketu",
      degree: siderealLon(ketuTrop, date),
      tropical: ketuTrop,
      sidereal: siderealLon(ketuTrop, date)
    });
    return planets;
  }

  // Ascendant (Lagna, sidereal)
  function getAscendant(date, lat, lon) {
    const observer = new Astronomy.Observer(lat, lon, 0);
    const hor = Astronomy.Horizon(observer, date, 90, 0);
    const ascTropical = hor.ra * 15;
    return siderealLon(ascTropical, date);
  }

  // MC (sidereal)
  function getMC(date, lat, lon) {
    const observer = new Astronomy.Observer(lat, lon, 0);
    const et = Astronomy.MakeTime(date);
    const equ = Astronomy.Equator("date", et, observer, true, true);
    return siderealLon(equ.ra * 15, date);
  }

  // Main compute function: returns all KP-relevant values
  function compute(date, lat, lon) {
    const planets = getPlanets(date);
    const ascendant = getAscendant(date, lat, lon);
    const mc = getMC(date, lat, lon);
    const ayanamsha = lahiriAyanamshaDegrees(date);
    return {
      planets,    // [{name, degree, tropical, sidereal}]
      ascendant,  // deg (sidereal)
      mc,         // deg (sidereal)
      ayanamsha   // deg
    };
  }

  return { compute, getPlanets, getAscendant, getMC, lahiriAyanamshaDegrees, siderealLon, norm360 };
})();

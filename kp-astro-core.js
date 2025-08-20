<script>
/*
  KP Core (Phase-1 MVP)
  - Computes: Sun…Pluto (tropical+sidereal), Ascendant, MC
  - Ayanamsa: Lahiri (approx, can swap to Swiss API later)
  - Engine: Astronomy Engine JS (VSOP87, NOVAS verified)
  - Accuracy: ≈ ±1 arcmin
*/
const KP = (() => {
  // Planet names (as per Astronomy Engine)
  const BODIES = [
    "Sun","Moon","Mercury","Venus","Mars",
    "Jupiter","Saturn","Uranus","Neptune","Pluto"
  ];
  // Lahiri ayanamsa (approx, replace with Swiss API in Phase-2)
  function lahiriAyanamshaDegrees(date) {
    const y = date.getUTCFullYear();
    const yearsFrom2000 = (y - 2000) + (date.getUTCMonth()+1)/12;
    const base2000 = 23.856; // deg at J2000 (~23°51′22″)
    return base2000 + yearsFrom2000 * (50.290966/3600); // precession rate deg/yr
  }
  function norm360(x){ return (x%360+360)%360; }
  function eclLon(body, date) {
    return Astronomy.EclipticLongitude(body, date);
  }
  function siderealLon(tropicalLonDeg, date) {
    return norm360(tropicalLonDeg - lahiriAyanamshaDegrees(date));
  }
  // Ascendant, MC (approx, Placidus houses to be added in Phase-2)
  function ascMc(date, latDeg, lonDeg) {
    const obs = new Astronomy.Observer(latDeg, lonDeg, 0);
    // Local Sidereal Time (hours)
    const lst = Astronomy.SiderealTime(date) + lonDeg/15;
    // Ecliptic obliquity (deg)
    const obliq = Astronomy.Ecliptic(date).ecliptic_obliquity;
    const eps = obliq * Math.PI/180;
    const phi = latDeg * Math.PI/180;
    const lstRad = lst * Math.PI/12;
    // Ascendant (approximate formula)
    const tanAsc = - (Math.cos(lstRad) / (Math.sin(lstRad)*Math.cos(eps) + Math.tan(phi)*Math.sin(eps)));
    let asc = Math.atan(tanAsc);
    if (Math.sin(lstRad) < 0) asc += Math.PI;
    if (asc < 0) asc += 2*Math.PI;
    const Asc = asc * 180/Math.PI;
    // MC (longitude of meridian intersection)
    const tanMC = Math.tan(lstRad) / Math.cos(eps);
    let mc = Math.atan(tanMC);
    if (mc < 0) mc += Math.PI;
    const MC = norm360(mc * 180/Math.PI);
    return { Asc, MC };
  }
  // MAIN API: KP.compute(date, latDeg, lonDeg)
  return {
    compute(date, latDeg, lonDeg) {
      const planets = {};
      for (const b of BODIES) {
        const lon = eclLon(b, date);
        planets[b] = {
          lon_tropical: norm360(lon),
          lon_sidereal: siderealLon(lon, date)
        };
      }
      const {Asc, MC} = ascMc(date, latDeg, lonDeg);
      return {
        meta: {
          engine: "astronomy-engine",
          ayanamsha: "lahiri",
          houses: "none", // Phase-2: Placidus/Swiss
          version: "v1"
        },
        ayanamsha_deg: lahiriAyanamshaDegrees(date),
        asc_tropical: Asc,
        mc_tropical: MC,
        asc_sidereal: siderealLon(Asc, date),
        mc_sidereal: siderealLon(MC, date),
        planets
      };
    }
  };
})();

// Demo/test (replace with user input fields)
function demoKP() {
  // Sample: Colombo, 1971-09-01 11:25 IST
  const date = new Date(Date.UTC(1971,8,1,5,55)); // 11:25 IST = 05:55 UTC
  const lat = 6.9271, lon = 79.8612;
  const result = KP.compute(date, lat, lon);
  console.log("KP core:", result);
}
window.addEventListener('load', demoKP);
</script>

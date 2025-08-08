// --- KP Sub-Lord (browser JS) ---
// Vimshottari dasha order + years
const VIM_ORDER = [
  { lord: 'Ketu',     years: 7  },
  { lord: 'Venus',    years: 20 },
  { lord: 'Sun',      years: 6  },
  { lord: 'Moon',     years: 10 },
  { lord: 'Mars',     years: 7  },
  { lord: 'Rahu',     years: 18 },
  { lord: 'Jupiter',  years: 16 },
  { lord: 'Saturn',   years: 19 },
  { lord: 'Mercury',  years: 17 },
];
const TOTAL_YEARS = 120;            // Vimshottari cycle total
const NAK_LEN_MIN = 13*60 + 20;     // 800 minutes

// Find nakshatra index (0..26) and lord from ephemeris-data.js
function getNakIndex(deg) {
  return Math.floor(norm360(deg) / (360/27));
}

// Build sub-lord segments for a given starting lord (nak lord)
function buildSublordSegments(startLord) {
  // rotate VIM_ORDER to start from startLord
  const startIdx = VIM_ORDER.findIndex(x => x.lord === startLord);
  const seq = [...VIM_ORDER.slice(startIdx), ...VIM_ORDER.slice(0, startIdx)];

  // segment length (in minutes) proportional to years/120
  let acc = 0;
  const segs = seq.map(item => {
    const len = NAK_LEN_MIN * (item.years / TOTAL_YEARS); // minutes
    const from = acc;
    const to   = acc + len; // not inclusive of end
    acc = to;
    return { lord: item.lord, from, to };
  });
  // numerical drift guard: force last to end at 800
  segs[segs.length - 1].to = NAK_LEN_MIN;
  return segs;
}

// Main: determine Nakshatra, Star Lord, Sub-Lord
function kpSubLordFromMoonDeg(moonDeg) {
  const nakIndex = getNakIndex(moonDeg);
  const nak      = NAKSHATRAS[nakIndex]; // from ephemeris-data.js
  const nakLord  = nak.lord;

  // minutes into current nakshatra
  const startDeg = nakIndex * (360/27);
  const deltaDeg = norm360(moonDeg - startDeg);
  const minutesIntoNak = (deltaDeg * 60); // 1° = 60'

  const segs = buildSublordSegments(nakLord);
  const sub = segs.find(s => minutesIntoNak >= s.from && minutesIntoNak < s.to) || segs[segs.length-1];

  return {
    nakIndex,
    nakName: nak.name,
    starLord: nakLord,
    subLord: sub.lord,
    moonDeg: +norm360(moonDeg).toFixed(4),
    rasi: rasiOf(moonDeg) // from kp-astro.js
  };
}

// Convenience: from date (uses mock or your real ephemeris if available)
function getSubLordFromDate(dt, moonDegOverride = null, lat = 0, lon = 0) {
  let moonDeg;
  if (moonDegOverride !== null && !isNaN(moonDegOverride)) {
    moonDeg = norm360(moonDegOverride);
  } else {
    // If you have a real Moon calculator, replace this with real value.
    // For now use the mock engine to stay fully client-side.
    const eph = computeMockEphemeris(dt, lat, lon); // from chart-engine.js
    moonDeg   = eph.positions.Moon;
  }
  return kpSubLordFromMoonDeg(moonDeg);
}

// export (optional for modules)
// window.getSubLordFromDate = getSubLordFromDate;

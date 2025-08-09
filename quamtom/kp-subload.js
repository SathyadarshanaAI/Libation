// --- KP Sub-Lord (browser JS) ---
// Depends on: ephemeris-data.js (NAKSHATRAS), kp-astro.js (norm360, rasiOf),
// optionally chart-engine.js (computeMockEphemeris).

// Vimshottari order + years
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
const TOTAL_YEARS = 120;           // Vimshottari total
const NAK_LEN_MIN = 13*60 + 20;    // 800 minutes (13°20')

// fallbacks
function _norm360(x){ const v=(x%360+360)%360; return isNaN(v)?0:v; }
function norm360Safe(x){ return (typeof norm360==='function') ? norm360(x) : _norm360(x); }

// --- helpers ---
function getNakIndex(deg){
  return Math.floor(norm360Safe(deg) / (360/27)); // 0..26
}

function buildSublordSegments(startLord){
  const startIdx = VIM_ORDER.findIndex(x => x.lord === startLord);
  if (startIdx < 0) throw new Error('Invalid startLord: '+startLord);

  const seq = [...VIM_ORDER.slice(startIdx), ...VIM_ORDER.slice(0, startIdx)];
  let acc = 0;
  const segs = seq.map(item => {
    const len = NAK_LEN_MIN * (item.years / TOTAL_YEARS); // minutes
    const from = acc;
    const to = acc + len;
    acc = to;
    return { lord: item.lord, from, to };
  });
  segs[segs.length - 1].to = NAK_LEN_MIN; // guard drift → exactly 800
  return segs;
}

// --- core: from any ecliptic degree (0..360) ---
function kpSubLordFromDegree(deg){
  if (typeof NAKSHATRAS==='undefined' || !Array.isArray(NAKSHATRAS)){
    throw new Error('NAKSHATRAS not found — load ephemeris-data.js first.');
  }
  const nakIndex = getNakIndex(deg);
  const nak = NAKSHATRAS[nakIndex];
  const nakLord = nak.lord;

  // minutes into this nakshatra
  const startDeg = nakIndex * (360/27);
  const deltaDeg = norm360Safe(deg - startDeg);
  const minutesIntoNak = deltaDeg * 60; // 1° = 60'

  const segs = buildSublordSegments(nakLord);
  const sub = segs.find(s => minutesIntoNak >= s.from && minutesIntoNak < s.to) || segs[segs.length-1];

  const rasiName = (typeof rasiOf==='function') ? rasiOf(deg) : undefined;

  return {
    nakIndex,
    nakName: nak.name,
    starLord: nakLord,
    subLord: sub.lord,
    degree: +norm360Safe(deg).toFixed(4),
    rasi: rasiName
  };
}

// --- Moon-focused API (keeps original shape) ---
function kpSubLordFromMoonDeg(moonDeg){
  return kpSubLordFromDegree(moonDeg);
}

// from date/time (uses mock or your real ephemeris)
function getSubLordFromDate(dt, moonDegOverride=null, lat=0, lon=0){
  let moonDeg;
  if (moonDegOverride !== null && !isNaN(moonDegOverride)) {
    moonDeg = norm360Safe(moonDegOverride);
  } else {
    if (typeof computeMockEphemeris !== 'function'){
      throw new Error('computeMockEphemeris not found — provide Moon degree or load chart-engine.js');
    }
    const eph = computeMockEphemeris(dt, lat, lon); // { positions: { Moon: deg, ... } }
    moonDeg = eph.positions.Moon;
  }
  return kpSubLordFromMoonDeg(moonDeg);
}

// exports (globals)
window.kpSubLordFromDegree = kpSubLordFromDegree;
window.kpSubLordFromMoonDeg = kpSubLordFromMoonDeg;
window.getSubLordFromDate = getSubLordFromDate;

// --- vimshottari.js ---
// Requires: ephemeris-data.js (NAKSHATRAS), kp-astro.js (norm360), chart-engine.js (computeEphemeris/Mock), kp-subload.js helpers OK

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
const TOTAL_YEARS = 120;
const NAK_LEN_MIN = 13*60 + 20; // 800'

function _norm360(x){ const v=(x%360+360)%360; return isNaN(v)?0:v; }
function norm360Safe(x){ return (typeof norm360==='function') ? norm360(x) : _norm360(x); }
function getNakIndex(deg){ return Math.floor(norm360Safe(deg) / (360/27)); }

// Remaining years at birth for current MD lord (from Moon nakshatra)
function vimGetStartBasisFromMoon(moonDeg){
  if (typeof NAKSHATRAS==='undefined') throw new Error('NAKSHATRAS missing');
  const nakIndex = getNakIndex(moonDeg);
  const nak = NAKSHATRAS[nakIndex];
  const startLord = nak.lord;

  const startDeg = nakIndex * (360/27);
  const deltaDeg = norm360Safe(moonDeg - startDeg);
  const minutesIntoNak = deltaDeg * 60;              // 1° = 60'
  const fracIntoNak = minutesIntoNak / NAK_LEN_MIN;  // 0..1

  const mdYears = VIM_ORDER.find(x => x.lord === startLord).years;
  const remYears = (1 - fracIntoNak) * mdYears;

  return { nakName: nak.name, startLord, fracIntoNak, remYears };
}

// Time helpers (use mean tropical year)
function addYearsISO(isoStart, years){
  const start = new Date(isoStart);
  const ms = years * 365.2425 * 24 * 3600 * 1000;
  return new Date(start.getTime() + ms).toISOString();
}
function addDaysISO(isoStart, days){
  const start = new Date(isoStart);
  const ms = days * 24 * 3600 * 1000;
  return new Date(start.getTime() + ms).toISOString();
}

// Rotate Vim order from a given lord
function rotateFromLord(lord){
  const i = VIM_ORDER.findIndex(x => x.lord === lord);
  return [...VIM_ORDER.slice(i), ...VIM_ORDER.slice(0, i)];
}

// Build Mahadasha timeline from birth (first segment uses remaining years)
function vimBuildMDTimeline(birthISO, startLord, startRemYears, count=9){
  const out = [];
  let current = birthISO;
  const seq = rotateFromLord(startLord);
  for (let i=0; i<count; i++){
    const item = seq[i % seq.length];
    const years = (i===0) ? startRemYears : item.years;
    const start = current;
    const end = addYearsISO(start, years);
    out.push({ level:'MD', lord:item.lord, start, end, years });
    current = end;
  }
  return out;
}

// Build AD or PD timeline inside a segment proportionally (years/120)
function vimBuildSubTimeline(segment, level /* 'AD' | 'PD' */){
  const mdDays = (new Date(segment.end) - new Date(segment.start)) / (24*3600*1000);
  const seq = rotateFromLord(segment.lord);

  const out = [];
  let acc = 0;
  for (let i=0;i<seq.length;i++){
    const p = seq[i].years / TOTAL_YEARS;   // share
    const days = mdDays * p;
    const s = addDaysISO(segment.start, acc);
    const e = addDaysISO(segment.start, acc + days);
    out.push({ level, lord: seq[i].lord, start: s, end: e, days });
    acc += days;
  }
  if (out.length){
    out[out.length-1].end = segment.end; // guard
  }
  return out;
}

// Simple HTML table
function vimRenderTable(headers, rows){
  let html = '<table><tr>';
  headers.forEach(h => html += `<th>${h}</th>`);
  html += '</tr>';
  rows.forEach(r => { html += '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>'; });
  html += '</table>';
  return html;
}

// Expose
window.vimGetStartBasisFromMoon = vimGetStartBasisFromMoon;
window.vimBuildMDTimeline = vimBuildMDTimeline;
window.vimBuildSubTimeline = vimBuildSubTimeline;
window.vimRenderTable = vimRenderTable;

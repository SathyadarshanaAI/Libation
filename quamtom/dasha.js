// 📆 quamtom/dasa.js — Vimshottari Dasha Calculator (MD → AD → PD)

// Vimshottari sequence & years
const dashaSequence = [
  { lord: 'Ketu', span: 7 },
  { lord: 'Venus', span: 20 },
  { lord: 'Sun', span: 6 },
  { lord: 'Moon', span: 10 },
  { lord: 'Mars', span: 7 },
  { lord: 'Rahu', span: 18 },
  { lord: 'Jupiter', span: 16 },
  { lord: 'Saturn', span: 19 },
  { lord: 'Mercury', span: 17 },
];

// Calculate starting index from Nakshatra degree
function getDashaStartIndex(degree) {
  const totalNakshatras = 27;
  const nakIndex = Math.floor(degree / (360 / totalNakshatras));
  return nakIndex % dashaSequence.length;
}

// Major Dasha generation
function generateMajorDasha(startLord, birthDate) {
  const dashas = [];
  let date = new Date(birthDate);
  let idx = startLord;

  for (let i = 0; i < dashaSequence.length; i++) {
    const lord = dashaSequence[idx];
    const start = new Date(date);
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + lord.span);
    dashas.push({ type: 'MD', lord: lord.lord, start, end });

    date = new Date(end);
    idx = (idx + 1) % dashaSequence.length;
  }
  return dashas;
}

// Antardasha generation
function generateAntardasha(md) {
  const adList = [];
  let startDate = new Date(md.start);

  for (let i = 0; i < dashaSequence.length; i++) {
    const lord = dashaSequence[i];
    const years = md.end - md.start;
    const portion = years * (lord.span / 120);
    const endDate = new Date(startDate.getTime() + portion);
    adList.push({ type: 'AD', mainLord: md.lord, subLord: lord.lord, start: startDate, end: endDate });
    startDate = new Date(endDate);
  }
  return adList;
}

// Pratyantardasha generation
function generatePratyantardasha(ad) {
  const pdList = [];
  let startDate = new Date(ad.start);

  for (let i = 0; i < dashaSequence.length; i++) {
    const lord = dashaSequence[i];
    const duration = ad.end - ad.start;
    const portion = duration * (lord.span / 120);
    const endDate = new Date(startDate.getTime() + portion);
    pdList.push({ type: 'PD', mainLord: ad.mainLord, subLord: ad.subLord, pdLord: lord.lord, start: startDate, end: endDate });
    startDate = new Date(endDate);
  }
  return pdList;
}

// Generate Full Dasha List
function generateFullDasha(degree, birthDate) {
  const startIndex = getDashaStartIndex(degree);
  const major = generateMajorDasha(startIndex, birthDate);
  const fullList = [];

  major.forEach(md => {
    fullList.push(md);
    const ads = generateAntardasha(md);
    ads.forEach(ad => {
      fullList.push(ad);
      const pds = generatePratyantardasha(ad);
      fullList.push(...pds);
    });
  });

  return fullList;
}

// Export to window for HTML usage
window.generateFullDasha = generateFullDasha;

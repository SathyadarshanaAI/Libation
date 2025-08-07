// 📆 quamtom/dasha.js — Vimshottari Dasha Period Generator (KP-Compatible)

// Dasha period spans in years (standard Vimshottari order)
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

// 🧠 Calculate Dasha Start Index based on Nakshatra Degree
function getDashaStartIndex(degree) {
  const totalNakshatras = 27;
  const nakIndex = Math.floor(degree / (360 / totalNakshatras));
  const startIndex = nakIndex % dashaSequence.length;
  return startIndex;
}

// 🧾 Generate Full Dasha Timeline
function generateDashaTimeline(startLord, birthYear) {
  const startIdx = dashaSequence.findIndex(d => d.lord === startLord);
  let year = birthYear;
  let timeline = [];

  for (let i = 0; i < dashaSequence.length; i++) {
    const lord = dashaSequence[(startIdx + i) % dashaSequence.length];
    timeline.push({
      lord: lord.lord,
      start: year,
      end: year + lord.span,
    });
    year += lord.span;
  }

  return timeline;
}

// 🌕 Example:
const exampleStartLord = 'Venus';
const exampleBirthYear = 1990;
const dasha = generateDashaTimeline(exampleStartLord, exampleBirthYear);
console.table(dasha);

// Export if needed
if (typeof module !== 'undefined') {
  module.exports = { generateDashaTimeline, getDashaStartIndex };
}

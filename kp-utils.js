const vimshottariDashaYears = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17
};

function getSubSubLord(nakshatraStartDeg, userDeg) {
  const totalArc = 13.333; // one nakshatra
  const userOffset = userDeg - nakshatraStartDeg;

  // 1. Find Sub Lord range (using dasha year % of arc)
  // 2. Inside that sub-section, find sub-sub lord (again % logic)
  // ...
}function getSubSubLord(degree) {
  const subs = [
    { name: "Ketu", range: 0 },
    { name: "Venus", range: 1.2 },
    { name: "Sun", range: 2.4 },
    { name: "Moon", range: 3.6 },
    { name: "Mars", range: 4.8 },
    { name: "Rahu", range: 6.0 },
    { name: "Jupiter", range: 7.2 },
    { name: "Saturn", range: 8.4 },
    { name: "Mercury", range: 9.6 }
  ];
  const mod = degree % 13.3333;
  const index = Math.floor(mod / 1.48148); // rough subdivision
  return subs[index % subs.length].name;
}

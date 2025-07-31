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
}

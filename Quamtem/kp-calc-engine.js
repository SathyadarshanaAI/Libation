// Quamtem/kp-calc-engine.js

export function getKPLords(degree) {
  let nakshatra = '', starLord = '', subLord = '', subSubLord = '';

  if (degree >= 13.2 && degree < 26.4) {
    nakshatra = "Bharani";
    starLord = "Venus";

    // Example logic (approximate). Replace with precise KP table.
    if (degree < 16) {
      subLord = "Sun";
      subSubLord = "Mercury";
    } else if (degree < 20) {
      subLord = "Saturn";
      subSubLord = "Moon";
    } else {
      subLord = "Mars";
      subSubLord = "Jupiter";
    }
  } else {
    return {
      error: "Degree not within Bharani Nakshatra range (13.2° – 26.4°)"
    };
  }

  return {
    nakshatra,
    starLord,
    subLord,
    subSubLord
  };
}

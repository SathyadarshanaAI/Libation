function calculateKP() {
  const planet = document.getElementById('planet').value;
  const degree = parseFloat(document.getElementById('degree').value);
  let nakshatra = '', starLord = '', subLord = '', subSubLord = '';

  if (degree >= 13.2 && degree < 26.4) {
    nakshatra = "Bharani";
    starLord = "Venus";

    // Sample logic (replace with accurate KP table)
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
    document.getElementById("result").innerText = "Try with Bharani Nakshatra (13.2°–26.4°)";
    return;
  }

  const resultText = `
🌌 Planet: ${planet}
📍 Degree: ${degree.toFixed(2)}°
🌟 Nakshatra: ${nakshatra}
🪐 Star Lord: ${starLord}
🔸 Sub Lord: ${subLord}
🔹 Sub Sub Lord: ${subSubLord}
  `;
  document.getElementById('result').innerText = resultText;
}

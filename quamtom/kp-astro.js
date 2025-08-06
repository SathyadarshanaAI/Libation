window.onload = () => {
  const name = 'බබානිස්';
  const dob = '1836-09-03';
  const tob = '07:45';
  const pob = 'පොලොන්නරැව රෝහල';

  document.getElementById('name').textContent = name;
  document.getElementById('dob').textContent = dob;
  document.getElementById('tob').textContent = tob;
  document.getElementById('pob').textContent = pob;

  const moonDeg = ephemeris.moon.degree;
  const subLord = calculateSubLord(moonDeg);

  document.getElementById('moonDeg').textContent = `${moonDeg.toFixed(2)}°`;
  document.getElementById('sublord').textContent = subLord;
};

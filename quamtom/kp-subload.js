function calculateSubLord(degree) {
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

  const nakshatraLength = 13.3333;
  const nakNum = Math.floor(degree / nakshatraLength);
  const nakStartDeg = nakNum * nakshatraLength;
  const withinNakDeg = degree - nakStartDeg;
  const percent = (withinNakDeg / nakshatraLength) * 100;

  let sum = 0;
  for (let i = 0; i < dashaSequence.length; i++) {
    sum += dashaSequence[i].span;
    if (percent <= sum) return dashaSequence[i].lord;
  }
  return 'Unknown';
}

// Sub Lord Prediction Engine – Buddhi AI

const subLordPredictions = {
  Saturn: {
    en: "Structured, disciplined and focused. Likely to succeed through perseverance.",
    si: "අනියම් වූ ජීවිතයකින් ඉවත්වී නියමිත කටයුතු වලින් සාර්ථකත්වය ලැබේ."
  },
  Venus: {
    en: "Strong sense of beauty and relationships. May attract artistic success.",
    si: "සඳරුවන් වැනි ආකර්ෂණශීලීත්වය සහ සම්බන්ධතා සාර්ථකයි."
  },
  Mercury: {
    en: "Sharp mind, communication talent. Career may relate to writing or tech.",
    si: "දීර්ඝ බුද්ධියක්, වචන ශක්තියක්. ලිවීම හෝ තාක්ෂණයට අයත් රැකියාවක්."
  },
  Moon: {
    en: "Sensitive and intuitive. Mental strength plays a major role in life.",
    si: "සැලකිලිමත් මනෝභාව. ජීවිතයේ හැඟීම් සහ මනස බලවත් වේ."
  },
  Sun: {
    en: "Leadership qualities and ambition. Favors political or administrative fields.",
    si: "නායකත්වය සහ අභිලාෂාත්මක ස්වභාවය. රාජ්‍ය හෝ පාලන ක්ෂේත්‍ර වලට සුදුසුයි."
  },
  Mars: {
    en: "Energetic and action-driven. Military or sports careers likely.",
    si: "උද්‍යෝගශීලී, ක්‍රියාශීලී. හමුදා, ක්‍රීඩා ආදී ක්ෂේත්‍රය අනූන වේ."
  },
  Jupiter: {
    en: "Spiritual and generous. Good for teaching, guidance, or dharma work.",
    si: "ආගමික හා උදාර. ගුරුකම, උපදේශනය, ධර්ම කටයුතු වලට සුදුසුයි."
  },
  Rahu: {
    en: "Unconventional, worldly desires. Sudden gains or mystical paths.",
    si: "අසාමාන්‍ය මාර්ග. හදිසි ලාභ, අඳුරු අත්දැකීම් සහිත ජීවිතයක්."
  },
  Ketu: {
    en: "Detached, spiritual quest. Hidden strength and inner power.",
    si: "විශාල විවේකයක්. නිවන් සෙවීම සහ අභ්‍යන්තර බලවේග."
  }
};

function getSubLordPrediction(subLord) {
  if (subLordPredictions[subLord]) {
    return subLordPredictions[subLord];
  } else {
    return {
      en: "General influence unknown. Unique karmic pattern.",
      si: "පොදු ආරේණුවක් නොවේ. අද්විතීය කර්මික මාර්ගයකි."
    };
  }
}

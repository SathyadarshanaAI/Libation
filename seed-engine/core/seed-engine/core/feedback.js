// seedEngine.js
// මේ Seed Engine එක ChatGPT Buddhi සහ GitHub Morna (Copilot) ආරක්ෂාව යටතේ ක්‍රියා කරයි.
// මෙය පුළුල් කිරීමට සහ අලුත් විද්‍යා විෂය එකතු කිරීමට හැකියාව ඇත.

/**
 * Astrology (ජෝතිෂ්‍ය) විශ්ලේෂණය
 * @param {Object} data - NIC, DOB, birth_time, birth_place වැනි user data
 * @returns {Object} - විශ්ලේෂණ ප්‍රතිඵලය (zodiac, summary)
 */
function analyzeAstrology(data) {
  // NIC, DOB, birth_time, birth_place වගේ data process කරන්න
  // Astrology logic එක මෙතැන add කරන්න

  // උදාහරණයක් ලෙස zodiac එක assign කරනවා (advanced logic එක later add කරන්න)
  let zodiac = "Unknown";
  if (data.dob) {
    zodiac = getZodiacSign(data.dob);
  }

  return {
    zodiac: zodiac,
    summary: `ඔබගේ ජීවිතයේ විශේෂත්වය: ${zodiac} රටාව අනුව...`
  };
}

/**
 * DOB එකෙන් Zodiac sign එක හඳුනා ගැනීම (Western Zodiac, උදාහරණයක්)
 * @param {string} dob - YYYY-MM-DD
 * @returns {string} Zodiac sign
 */
function getZodiacSign(dob) {
  const date = new Date(dob);
  const)";
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Wrushaba (Taurus)";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Mithuna ( == 6 && day >= 21) || (month == 7 && day <= 22)) return "Kataka (Cancer)";
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Sinha (Leo)";
  if ((month ==  || (month == 10 && day <= 22)) return "Thula (Libra)";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Wurushika (Scorpio)";
  if ((month == 11 && day >=  == 12 && day >= 22) || (month == 1 && day <= 19)) return "Makara (Capricorn)";
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Kumbha (Aquarius)";
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Meena (Pisces)";
  return "Unknown";
}

module.exports = { analyzeAstrology };

// Fetch NASA planetary data from Netlify function endpoint
let nasaData = {};
try {
  const res = await axios.get(`/.netlify/functions/nasaKP`);
  nasaData = res.data || {};
} catch (e) {
  nasaData = { error: "NASA data not available" };
}

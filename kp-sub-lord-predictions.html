<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KP Life Report - Sathyadarshana</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="/assets/favicon.png">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <style>
    body { font-family: Arial, sans-serif; background:#0f172a; color:#e0f2fe; margin:0; }
    main { max-width: 540px; margin: 40px auto; border:1px solid #38bdf8; padding:24px; border-radius:8px; background:rgba(30,41,59,0.94);}
    label, input, select, textarea, button {display:block; width:100%; margin-top:12px; padding:10px; border-radius:6px; font-size:15px;}
    button {background:#38bdf8; color:#0f172a; font-weight:bold; cursor:pointer;}
    button:hover {background:#0ea5e9; color:#fff;}
    .preview-box, .message, .spinner, .rating, .tariff {margin-top:16px;}
    .preview-box {background:#1e293b; padding:18px; border-radius:8px; border:1px solid #38bdf8;}
    .spinner {display:none; margin:auto; border:5px solid #bae6fd; border-top:5px solid #38bdf8; border-radius:50%; width:40px; height:40px; animation:spin 1s linear infinite;}
    @keyframes spin {100% {transform: rotate(360deg);}}
    .floating-lang {position:fixed;top:10px;right:10px;background:#38bdf8;padding:8px 12px;border-radius:6px;cursor:pointer;color:#0f172a;font-weight:bold;}
  </style>
</head>
<body>
<div class="floating-lang" onclick="toggleLang()">🌐</div>

<main id="report">
  <h1 style="text-align:center;">🔮 KP Life Prediction</h1>
  <form id="kpForm">
    <label>Full Name</label>
    <input type="text" id="name" required>
    <label>Date of Birth</label>
    <input type="date" id="dob" required>
    <label>Time of Birth</label>
    <input type="time" id="tob" required>
    <label>Place of Birth</label>
    <input type="text" id="pob" required>
    <label>Gender</label>
    <select id="gender" required>
      <option value="">Select</option>
      <option>Male</option><option>Female</option><option>Other</option>
    </select>
    <label>Question (optional)</label>
    <textarea id="userQ" placeholder="Eg: When will I get married?" rows="2"></textarea>
    <label><input type="checkbox" id="consent" required> I consent to generate my KP life report ($5)</label>
    <button type="button" onclick="previewReport()">🔍 Preview</button>
    <button type="submit">📥 Download PDF</button>
  </form>

  <div class="spinner" id="spinner"></div>
  <div class="message" id="resultMsg"></div>
  <div class="preview-box" id="preview" style="display:none;"></div>
  <button onclick="speakReport()" id="speakBtn" style="display:none;">🔊 Listen to Summary</button>
  <div class="tariff">Tariff: $5 - Premium One-Time</div>
</main>

<script>
function getFields() {
  return {
    name: document.getElementById('name').value.trim(),
    dob: document.getElementById('dob').value,
    tob: document.getElementById('tob').value,
    pob: document.getElementById('pob').value.trim(),
    gender: document.getElementById('gender').value,
    userQ: document.getElementById('userQ').value.trim(),
    consent: document.getElementById('consent').checked
  };
}
function getPrediction(name, userQ) {
  const lines = [
    "Strong determination in profession and life mission.",
    "Will achieve positive turning points after age 30.",
    "Spiritual growth is supported by planetary alignment.",
    "Sudden financial rise is likely through foreign connection."
  ];
  const rand = () => lines[Math.floor(Math.random() * lines.length)];
  return `KP Life Prediction for ${name}:\n\n• ${rand()}\n• ${rand()}\n${userQ ? "🧿 Question: "+userQ : ""}`;
}
function previewReport() {
  const f = getFields();
  if (!f.name || !f.dob || !f.tob || !f.pob || !f.gender || !f.consent) return alert("Please complete all required fields.");
  const msg = getPrediction(f.name, f.userQ);
  document.getElementById('preview').innerHTML = `<b>Name:</b> ${f.name}<br><b>DOB:</b> ${f.dob}<br><b>TOB:</b> ${f.tob}<br><b>Place:</b> ${f.pob}<br><b>Gender:</b> ${f.gender}<hr><pre>${msg}</pre>`;
  document.getElementById('preview').style.display = "block";
  document.getElementById('speakBtn').style.display = "block";
  window.latestReportText = msg;
}
function speakReport() {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(window.latestReportText);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  } else alert("Text-to-speech not supported in this browser.");
}
document.getElementById('kpForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const f = getFields();
  if (!f.name || !f.dob || !f.tob || !f.pob || !f.gender || !f.consent) return alert("Please complete all required fields.");
  document.getElementById('spinner').style.display = 'block';
  setTimeout(() => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const report = `Sathyadarshana KP Life Report\n\nName: ${f.name}\nDOB: ${f.dob} Time: ${f.tob}\nPlace: ${f.pob}\nGender: ${f.gender}\n\n${getPrediction(f.name, f.userQ)}\n\nTariff: $5 (Premium)\nGenerated: ${new Date().toLocaleString()}\n\n© Sathyadarshana 2025`;
    doc.setFontSize(12);
    doc.text(report, 20, 30);
    doc.save(`${f.name.replace(/\s+/g,'_')}_KP_Report.pdf`);
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('resultMsg').innerText = "✅ PDF Report generated!";
  }, 700);
});
function toggleLang() {
  const script = document.createElement('script');
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,si,ta', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, document.body);
  };
}
</script>
</body>
</html>

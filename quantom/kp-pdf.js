// kp-pdf.js - Export KP report to PDF
function downloadPDF() {
  const name = document.getElementById("name").innerText;
  const dob = document.getElementById("dob").innerText;
  const tob = document.getElementById("tob").innerText;
  const pob = document.getElementById("pob").innerText;
  const ascendant = document.getElementById("ascendant").innerText;
  const sublord = document.getElementById("sublord").innerText;
  const rulers = document.getElementById("rulers").innerText;
  const traits = document.getElementById("traits").innerText;

  const content = `
    KP Astrology Birth Report

    Full Name: ${name}
    Date of Birth: ${dob}
    Time of Birth: ${tob}
    Place of Birth: ${pob}

    Ascendant (Lagna): ${ascendant}
    Sub-Lord: ${sublord}
    Ruling Planets: ${rulers}

    Traits:
    ${traits}
  `;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.download = "kp_birth_report.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
}

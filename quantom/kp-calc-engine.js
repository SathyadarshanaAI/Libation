// 📁 File: quantom/kp-calc-engine.js

window.addEventListener('DOMContentLoaded', () => { const data = JSON.parse(localStorage.getItem('kpData'));

if (!data) return;

// 🟦 Insert data into report fields document.getElementById("name").innerText = data.name; document.getElementById("dob").innerText = data.dob; document.getElementById("tob").innerText = data.tob; document.getElementById("pob").innerText = data.pob;

// 🌀 Generate mock KP chart logic (Replace later with real logic) const grahas = [ "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu" ]; const subs = ["Venus", "Mars", "Mercury", "Saturn", "Moon", "Jupiter"];

const kpChartDiv = document.getElementById("kpChart"); kpChartDiv.innerHTML = "";

for (let i = 1; i <= 12; i++) { const graha = grahas[Math.floor(Math.random() * grahas.length)]; const sub = subs[Math.floor(Math.random() * subs.length)];

const box = document.createElement("div");
box.className = "chart-box";
box.innerHTML = `<strong>House ${i}</strong><br>${graha}<br><small>Sub: ${sub}</small>`;
kpChartDiv.appendChild(box);

}

// 🔮 Sample mock prediction (to be replaced with AI-powered logic later) const prediction = According to your birth chart, you are influenced by ${grahas[0]} and Sub Lord ${subs[0]}, indicating a spiritual nature and leadership quality.;

const predictionDiv = document.getElementById("prediction"); predictionDiv.innerText = prediction; });


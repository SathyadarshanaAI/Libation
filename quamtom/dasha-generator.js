// 📆 quamtom/dasha.js — Vimshottari Dasha Period Generator (KP-Compatible)

// Dasha period spans in years (standard Vimshottari order) const dashaSequence = [ { lord: 'Ketu', span: 7 }, { lord: 'Venus', span: 20 }, { lord: 'Sun', span: 6 }, { lord: 'Moon', span: 10 }, { lord: 'Mars', span: 7 }, { lord: 'Rahu', span: 18 }, { lord: 'Jupiter', span: 16 }, { lord: 'Saturn', span: 19 }, { lord: 'Mercury', span: 17 }, ];

// 🧠 Calculate Dasha Start Index based on Nakshatra Degree function getDashaStartIndex(degree) { const totalNakshatras = 27; const nakIndex = Math.floor(degree / (360 / totalNakshatras)); const startIndex = nakIndex % dashaSequence.length; return startIndex; }

// 🧾 Generate Full Dasha Timeline function generateDashaTimeline(startLord, birthYear) { const startIdx = dashaSequence.findIndex(d => d.lord === startLord); const timeline = []; let year = birthYear; for (let i = 0; i < dashaSequence.length; i++) { const lord = dashaSequence[(startIdx + i) % dashaSequence.length]; timeline.push({ lord: lord.lord, from: year, to: year + lord.span }); year += lord.span; } return timeline; }

// 🧪 Example Usage const sampleNakDegree = 110; // e.g., in Cancer const birthYear = 1992; const dashaStartIdx = getDashaStartIndex(sampleNakDegree); const startLord = dashaSequence[dashaStartIdx].lord; const dashaTimeline = generateDashaTimeline(startLord, birthYear);

console.log("📜 Vimshottari Dasha Timeline:"); dashaTimeline.forEach(d => { console.log(🔮 ${d.lord}: ${d.from} ➝ ${d.to}); });

// 🌐 Optional: attach to DOM if (typeof document !== 'undefined') { window.onload = () => { const output = document.createElement('div'); output.style.cssText = 'margin-top:2rem;background:#1e293b;padding:1rem;border-radius:10px;color:#38bdf8;font-size:1rem'; output.innerHTML = <h2>🔮 Vimshottari Dasha Periods</h2> + dashaTimeline.map(d => <div>${d.lord}: ${d.from} ➝ ${d.to}</div>).join(''); document.body.appendChild(output); } }


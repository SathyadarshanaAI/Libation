import { useEffect, useState } from "react";

// --- Helper data for astrology calculations ---
const zodiacs = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];
const nakshatras = [
  { name: "Ashwini",    start: 0,        end: 13.3333,  lord: "Ketu" },
  { name: "Bharani",    start: 13.3333,  end: 26.6666,  lord: "Venus" },
  { name: "Krittika",   start: 26.6666,  end: 40,       lord: "Sun" },
  { name: "Rohini",     start: 40,       end: 53.3333,  lord: "Moon" },
  { name: "Mrigashira", start: 53.3333,  end: 66.6666,  lord: "Mars" },
  { name: "Ardra",      start: 66.6666,  end: 80,       lord: "Rahu" },
  { name: "Punarvasu",  start: 80,       end: 93.3333,  lord: "Jupiter" },
  { name: "Pushya",     start: 93.3333,  end: 106.6666, lord: "Saturn" },
  { name: "Ashlesha",   start: 106.6666, end: 120,      lord: "Mercury" },
  { name: "Magha",      start: 120,      end: 133.3333, lord: "Ketu" },
  { name: "Purva Phalguni", start: 133.3333, end: 146.6666, lord: "Venus" },
  { name: "Uttara Phalguni", start: 146.6666, end: 160, lord: "Sun" },
  { name: "Hasta",      start: 160,      end: 173.3333, lord: "Moon" },
  { name: "Chitra",     start: 173.3333, end: 186.6666, lord: "Mars" },
  { name: "Swati",      start: 186.6666, end: 200,      lord: "Rahu" },
  { name: "Vishakha",   start: 200,      end: 213.3333, lord: "Jupiter" },
  { name: "Anuradha",   start: 213.3333, end: 226.6666, lord: "Saturn" },
  { name: "Jyeshta",    start: 226.6666, end: 240,      lord: "Mercury" },
  { name: "Mula",       start: 240,      end: 253.3333, lord: "Ketu" },
  { name: "Purva Ashadha", start: 253.3333, end: 266.6666, lord: "Venus" },
  { name: "Uttara Ashadha", start: 266.6666, end: 280,   lord: "Sun" },
  { name: "Shravana",   start: 280,      end: 293.3333, lord: "Moon" },
  { name: "Dhanishta",  start: 293.3333, end: 306.6666, lord: "Mars" },
  { name: "Shatabhisha", start: 306.6666, end: 320,     lord: "Rahu" },
  { name: "Purva Bhadrapada", start: 320, end: 333.3333, lord: "Jupiter" },
  { name: "Uttara Bhadrapada", start: 333.3333, end: 346.6666, lord: "Saturn" },
  { name: "Revati",     start: 346.6666, end: 360,      lord: "Mercury" }
];
const subLords = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"
];

function getZodiacSign(degree) {
  return zodiacs[Math.floor((degree % 360) / 30)];
}
function getNakshatra(degree) {
  let normalized = degree % 360;
  for (let nak of nakshatras) {
    if (normalized >= nak.start && normalized < nak.end) {
      return nak;
    }
  }
  return nakshatras[0];
}
function getSubLord(degree) {
  const posIn360 = degree % 360;
  const nakIndex = Math.floor(posIn360 / 13.3333);
  const startOfNak = nakIndex * 13.3333;
  const posInNak = posIn360 - startOfNak;
  const subLength = 13.3333 / 9;
  const subIndex = Math.floor(posInNak / subLength);
  return subLords[subIndex];
}

function KPChart() {
  // User input states
  const [date, setDate] = useState("2025-08-23");
  const [time, setTime] = useState("12:00:00");
  const [lat, setLat] = useState("6.9271");
  const [lon, setLon] = useState("79.8612");
  // Data states
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPlanets = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `http://localhost:3000/api/planets?date=${date}&time=${time}&lat=${lat}&lon=${lon}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      setPlanets(data);
    } catch (e) {
      setError("Unable to load planet data. Check your input or API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlanets(); }, []); // Initial load

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPlanets();
  };

  // Copy as CSV
  const handleCopy = () => {
    if (!planets.length) return;
    const header = "Planet,Degree,Zodiac,Nakshatra,Nakshatra Lord,Sub Lord";
    const rows = planets.map(p => {
      const nak = getNakshatra(p.degree);
      return [
        p.name,
        p.degree.toFixed(4),
        getZodiacSign(p.degree),
        nak.name,
        nak.lord,
        getSubLord(p.degree)
      ].join(",");
    });
    navigator.clipboard.writeText([header, ...rows].join("\n"));
    alert("KP chart copied to clipboard!");
  };

  return (
    <div style={{maxWidth:800,margin:"30px auto",background:"#1e2340",borderRadius:10,padding:22,boxShadow:"0 4px 24px #00ffe755"}}>
      <h2 style={{color:"#00ffe7",textAlign:"center"}}>KP Chart Calculator</h2>
      <form onSubmit={handleSubmit} style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:18}}>
        <label>Date: <input type="date" value={date} onChange={e=>setDate(e.target.value)} required /></label>
        <label>Time: <input type="time" value={time} onChange={e=>setTime(e.target.value)} required /></label>
        <label>Lat: <input type="number" step="0.0001" value={lat} onChange={e=>setLat(e.target.value)} required /></label>
        <label>Lon: <input type="number" step="0.0001" value={lon} onChange={e=>setLon(e.target.value)} required /></label>
        <button type="submit" style={{background:"#00ffe7",color:"#181824",borderRadius:5,padding:"0 12px",fontWeight:700}}>Get Chart</button>
        <button type="button" onClick={handleCopy} style={{background:"#6d7cff",color:"#fff",borderRadius:5,padding:"0 12px",fontWeight:700}}>Copy as CSV</button>
      </form>
      {loading && <div style={{textAlign:"center",color:"#6d7cff"}}>Loading planet data...</div>}
      {error && <div style={{color:"red",textAlign:"center",margin:"18px 0"}}>{error}</div>}
      {!loading && !error && !planets.length && <div style={{color:"#6d7cff",textAlign:"center"}}>No data to display.</div>}
      {!loading && !error && !!planets.length && (
        <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",background:"#24264a",borderRadius:8,boxShadow:"0 2px 8px #00ffe744"}}>
          <thead>
            <tr>
              <th>Planet</th>
              <th>Degree</th>
              <th>Zodiac</th>
              <th>Nakshatra</th>
              <th>Nakshatra Lord</th>
              <th>Sub Lord</th>
            </tr>
          </thead>
          <tbody>
            {planets.map(planet => {
              const nak = getNakshatra(planet.degree);
              return (
                <tr key={planet.name}>
                  <td style={{fontWeight:700,color:"#6d7cff"}}>{planet.name}</td>
                  <td style={{fontFamily:"monospace",color:"#00ffe7"}}>{planet.degree.toFixed(4)}</td>
                  <td style={{fontWeight:700}}>{getZodiacSign(planet.degree)}</td>
                  <td style={{fontWeight:700,color:"#00ffe7"}}>{nak.name}</td>
                  <td>{nak.lord}</td>
                  <td style={{color:"#71ffe7"}}>{getSubLord(planet.degree)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default KPChart;

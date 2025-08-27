<div style={{
  maxWidth:800,
  margin:"30px auto",
  background:"#fff",
  borderRadius:10,
  padding:22,
  boxShadow:"0 4px 24px #00968822"
}}>
  <h2 style={{
    color:"#009688", // Teal accent
    textAlign:"center"
  }}>KP Chart Calculator</h2>
  <form onSubmit={handleSubmit}
    style={{
      display:"flex",gap:12,flexWrap:"wrap",
      justifyContent:"center",marginBottom:18
    }}>
    {/* ...fields... */}
    <button type="submit" style={{
      background:"#009688",color:"#fff",
      borderRadius:5,padding:"0 12px",fontWeight:700,
      border:"none"
    }}>Get Chart</button>
    <button type="button" onClick={handleCopy} style={{
      background:"#ff9800",color:"#fff",
      borderRadius:5,padding:"0 12px",fontWeight:700,
      border:"none"
    }}>Copy as CSV</button>
  </form>
  {loading && <div style={{textAlign:"center",color:"#009688"}}>Loading planet data...</div>}
  {error && <div style={{color:"red",textAlign:"center",margin:"18px 0"}}>{error}</div>}
  {!loading && !error && !planets.length && <div style={{color:"#666",textAlign:"center"}}>No data to display.</div>}
  {!loading && !error && !!planets.length && (
    <div style={{overflowX:"auto"}}>
    <table style={{
      width:"100%",background:"#f7f7fa",borderRadius:8,
      boxShadow:"0 2px 8px #00968811"
    }}>
      <thead>
        <tr>
          <th style={{color:"#009688"}}>Planet</th>
          <th style={{color:"#009688"}}>Degree</th>
          <th style={{color:"#009688"}}>Zodiac</th>
          <th style={{color:"#009688"}}>Nakshatra</th>
          <th style={{color:"#009688"}}>Nakshatra Lord</th>
          <th style={{color:"#009688"}}>Sub Lord</th>
        </tr>
      </thead>
      <tbody>
        {planets.map(planet => {
          const nak = getNakshatra(planet.degree);
          return (
            <tr key={planet.name}>
              <td style={{fontWeight:700,color:"#ff9800"}}>{planet.name}</td>
              <td style={{fontFamily:"monospace",color:"#009688"}}>{planet.degree.toFixed(4)}</td>
              <td style={{fontWeight:700}}>{getZodiacSign(planet.degree)}</td>
              <td style={{fontWeight:700,color:"#009688"}}>{nak.name}</td>
              <td>{nak.lord}</td>
              <td style={{color:"#ff9800"}}>{getSubLord(planet.degree)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  )}
</div>

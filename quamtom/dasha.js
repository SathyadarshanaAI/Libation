// quamtom/dasha.js
(function(){
  const MD_ORDER = [
    { lord: "Ketu",    years: 7  },
    { lord: "Venus",   years: 20 },
    { lord: "Sun",     years: 6  },
    { lord: "Moon",    years: 10 },
    { lord: "Mars",    years: 7  },
    { lord: "Rahu",    years: 18 },
    { lord: "Jupiter", years: 16 },
    { lord: "Saturn",  years: 19 },
    { lord: "Mercury", years: 17 },
  ];

  const NAK_LEN = 360/27;                 // 13°20′
  const norm360 = d => ((d % 360) + 360) % 360;
  const clamp   = (v,min,max)=> Math.max(min, Math.min(max, v));

  function parseLocalISO(iso){
    if(!iso) return new Date();
    const [d,t='00:00'] = iso.split('T');
    const [Y,M,D] = (d||'').split('-').map(Number);
    const [h,m]   = (t||'').split(':').map(Number);
    const dt = new Date(Y||1970, (M||1)-1, D||1, h||0, m||0, 0);
    return isNaN(dt.getTime()) ? new Date() : dt;
  }

  function addDays(date, days){
    const d = new Date(date.getTime());
    d.setDate(d.getDate() + days);
    return d;
  }

  const Y2D = y => y * 365.2425;          // tropical year → days approx
  const fmt = d => {
    const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), dd=String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${dd}`;
  };

  function nakshatraLordIndex(moonDeg){
    const ix27 = Math.floor(norm360(moonDeg) / NAK_LEN); // 0..26
    return ix27 % 9;                                     // map to MD order
  }

  /**
   * Compute Vimshottari Maha Dasha list.
   * @param {number} moonDeg  - **Sidereal** Moon longitude (deg 0..360)
   * @param {string} birthISO - Local ISO "YYYY-MM-DDTHH:MM"
   * @param {number} maxYears - span to compute (default 120y)
   * @returns {Array<{lord,start:Date,end:Date,years:number}>}
   */
  function computeVimshottariDasha(moonDeg, birthISO, maxYears=120){
    // Safety
    if (isNaN(moonDeg)) moonDeg = 0;
    maxYears = clamp(+maxYears || 120, 0.1, 120);

    const startDate = parseLocalISO(birthISO);
    const orderStart = nakshatraLordIndex(moonDeg);

    // Balance left in current nakshatra
    const posInNak = norm360(moonDeg) % NAK_LEN;
    const fracLeft = 1 - (posInNak / NAK_LEN);
    const startLord = MD_ORDER[orderStart];

    const out = [];
    let cursor = new Date(startDate.getTime());

    // 1) First (balance) dasha
    const firstYears = startLord.years * fracLeft;
    let end = addDays(cursor, Y2D(firstYears));
    out.push({ lord:startLord.lord, start:new Date(cursor), end, years:firstYears });
    cursor = new Date(end.getTime());

    // 2) Subsequent full dashas up to maxYears
    let totalYears = firstYears;
    let i = (orderStart + 1) % 9;
    while (totalYears < maxYears - 1e-6) {
      const lord = MD_ORDER[i];
      const durYears = Math.min(lord.years, Math.max(0, maxYears - totalYears));
      const nextEnd = addDays(cursor, Y2D(durYears));

      out.push({ lord: lord.lord, start: new Date(cursor), end: nextEnd, years: durYears });

      totalYears += durYears;
      cursor = nextEnd;
      i = (i + 1) % 9;
      if (out.length > 60) break; // guard
    }
    return out;
  }

  function renderDashaTable(targetId, list){
    const host = document.getElementById(targetId);
    if(!host) return;
    host.innerHTML =
      '<table style="width:100%;border-collapse:collapse">' +
      '<thead><tr><th>#</th><th>Lord</th><th>Start</th><th>End</th><th style="font-variant-numeric:tabular-nums">Years</th></tr></thead>' +
      '<tbody>' +
      list.map((r,i)=>`<tr>
        <td>${i+1}</td>
        <td>${r.lord}</td>
        <td>${fmt(r.start)}</td>
        <td>${fmt(r.end)}</td>
        <td style="font-variant-numeric:tabular-nums">${r.years.toFixed(2)}</td>
      </tr>`).join('') +
      '</tbody></table>';
  }

  // expose
  window.computeVimshottariDasha = computeVimshottariDasha;
  window.renderDashaTable = renderDashaTable;
})();

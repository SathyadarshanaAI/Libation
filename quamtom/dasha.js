<!-- quamtom/dasha.js -->
<script>
(function(){
  // ---------- Vimshottari Maha Dasha (MD) ----------
  // Order + years
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
  const NAK_LEN = 360/27; // 13.333...

  const norm360 = d => ((d % 360) + 360) % 360;

  function parseLocalISO(iso){
    if(!iso) return new Date();
    const [d,t='00:00'] = iso.split('T');
    const [Y,M,D] = d.split('-').map(Number);
    const [h,m]   = t.split(':').map(Number);
    return new Date(Y, M-1, D, h||0, m||0, 0);
  }
  function addDays(date, days){
    const d = new Date(date.getTime());
    d.setDate(d.getDate() + days);
    return d;
  }
  const Y2D = y => y * 365.2425; // approx tropical year

  function formatLocal(d){
    const y = d.getFullYear();
    const m = (d.getMonth()+1).toString().padStart(2,'0');
    const dd= d.getDate().toString().padStart(2,'0');
    return `${y}-${m}-${dd}`;
  }

  // Determine nakshatra lord sequence index for a given Moon degree
  function nakshatraLordIndex(moonDeg){
    const ix27 = Math.floor(norm360(moonDeg) / NAK_LEN); // 0..26
    return ix27 % 9; // maps into MD_ORDER
  }

  // Build Maha Dasha list from birth ISO & Moon degree at birth
  function computeVimshottariDasha(birthISO, moonDeg, maxYears=120){
    const startDate = parseLocalISO(birthISO);
    const orderStart = nakshatraLordIndex(moonDeg);

    // Balance left in current nakshatra
    const posInNak = norm360(moonDeg) % NAK_LEN; // [0..13.33)
    const fracLeft = 1 - (posInNak / NAK_LEN);   // portion remaining
    const startLord = MD_ORDER[orderStart];

    const out = [];
    let cursor = new Date(startDate.getTime());

    // 1) first (balance) dasha
    const firstYears = startLord.years * fracLeft;
    let end = addDays(cursor, Y2D(firstYears));
    out.push({ lord:startLord.lord, start:new Date(cursor), end, years:firstYears });

    cursor = new Date(end.getTime());

    // 2) subsequent full dashas until maxYears
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
      if (out.length > 60) break; // safety
    }
    return out;
  }

  // Render helper (simple table body fill)
  function renderDashaTable(targetTbodyId, dashaList){
    const tb = document.getElementById(targetTbodyId);
    if(!tb) return;
    tb.innerHTML = '';
    dashaList.forEach((row, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx+1}</td>
        <td>${row.lord}</td>
        <td>${formatLocal(row.start)}</td>
        <td>${formatLocal(row.end)}</td>
        <td class="mono">${row.years.toFixed(2)}</td>
      `;
      tb.appendChild(tr);
    });
  }

  // expose
  window.computeVimshottariDasha = computeVimshottariDasha;
  window.renderDashaTable = renderDashaTable;
})();
</script>

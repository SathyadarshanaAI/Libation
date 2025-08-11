// quamtom/dasha.js
(function () {
  const MD_ORDER = [
    { lord: "Ketu", years: 7 }, { lord: "Venus", years: 20 },
    { lord: "Sun", years: 6 },  { lord: "Moon", years: 10 },
    { lord: "Mars", years: 7 }, { lord: "Rahu", years: 18 },
    { lord: "Jupiter", years: 16 }, { lord: "Saturn", years: 19 },
    { lord: "Mercury", years: 17 },
  ];
  const NAK_LEN = 360/27; // 13°20′
  const norm360 = d => ((d % 360) + 360) % 360;

  function parseLocalISO(iso){
    if(!iso) return new Date();
    const [d,t='00:00'] = iso.split('T');
    const [Y,M,D] = d.split('-').map(Number);
    const [h,m]   = t.split(':').map(Number);
    return new Date(Y, M-1, D, h||0, m||0, 0);
  }
  function addDays(date, days){ const d=new Date(date); d.setDate(d.getDate()+days); return d; }
  const Y2D = y => y * 365.2425;
  const fmt = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

  function nakIxInOrder(moonDeg){
    const ix27 = Math.floor(norm360(moonDeg) / NAK_LEN); // 0..26
    return ix27 % 9; // map to 0..8
  }

  function computeVimshottariDasha(birthISO, moonDeg, maxYears=120){
    const startDate = parseLocalISO(birthISO);
    const orderStart = nakIxInOrder(moonDeg);
    const posInNak = norm360(moonDeg) % NAK_LEN;
    const fracLeft = 1 - (posInNak / NAK_LEN);

    const out = [];
    let cursor = new Date(startDate);
    const firstLord = MD_ORDER[orderStart];
    const firstYears = firstLord.years * fracLeft;
    let end = addDays(cursor, Y2D(firstYears));
    out.push({ lord:firstLord.lord, start:new Date(cursor), end, years:firstYears });
    cursor = new Date(end);
    let total = firstYears;

    let i = (orderStart + 1) % 9;
    while (total < maxYears - 1e-6) {
      const lord = MD_ORDER[i];
      const dur = Math.min(lord.years, Math.max(0, maxYears - total));
      const nextEnd = addDays(cursor, Y2D(dur));
      out.push({ lord: lord.lord, start:new Date(cursor), end:nextEnd, years:dur });
      total += dur; cursor = nextEnd; i = (i+1)%9;
      if(out.length > 60) break;
    }
    return out;
  }

  function renderDashaTable(containerId, list){
    const el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML =
      `<table><thead><tr>
        <th>#</th><th>Lord</th><th>Start</th><th>End</th><th class="mono">Years</th>
      </tr></thead><tbody>` +
      list.map((r,i)=>`<tr>
        <td>${i+1}</td><td>${r.lord}</td><td>${fmt(r.start)}</td>
        <td>${fmt(r.end)}</td><td class="mono">${r.years.toFixed(2)}</td>
      </tr>`).join('') + `</tbody></table>`;
  }

  window.computeVimshottariDasha = computeVimshottariDasha;
  window.renderDashaTable = renderDashaTable;
})();

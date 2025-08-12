// quamtom/dasha.js
(function () {
  // ---------- Vimshottari ----------
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
  const NAK_LEN = 360 / 27; // 13°20′
  const TOTAL = 120;        // years
  const norm360 = d => ((d % 360) + 360) % 360;

  // ---- date utils
  function parseLocalISO(iso) {
    if (!iso) return new Date();
    const [d, t = "00:00"] = iso.split("T");
    const [Y, M, D] = d.split("-").map(Number);
    const [h = 0, m = 0] = t.split(":").map(Number);
    return new Date(Y, (M || 1) - 1, D || 1, h, m, 0);
  }
  function addDays(date, days) {
    const d = new Date(date.getTime());
    d.setDate(d.getDate() + days);
    return d;
  }
  const Y2D = y => y * 365.2425; // tropical year (approx)
  function fmt(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  }

  // ---- helpers
  const lordIndex = lord => MD_ORDER.findIndex(x => x.lord === lord);
  function nakshatraLordIndex(moonDeg) {
    const ix27 = Math.floor(norm360(moonDeg) / NAK_LEN);
    return ix27 % 9;
  }

  // ---- Maha Dasha
  // API: computeVimshottariDasha(moonDeg, birthISO, maxYears=120)
  function computeVimshottariDasha(moonDeg, birthISO, maxYears = 120) {
    const startDate = parseLocalISO(birthISO);
    const orderStart = nakshatraLordIndex(moonDeg);
    const posInNak = norm360(moonDeg) % NAK_LEN;
    const fracLeft = 1 - (posInNak / NAK_LEN);
    const startLord = MD_ORDER[orderStart];

    const out = [];
    let cursor = new Date(startDate.getTime());

    // first (balance) dasha
    const firstYears = startLord.years * fracLeft;
    let end = addDays(cursor, Y2D(firstYears));
    out.push({ lord: startLord.lord, start: new Date(cursor), end, years: firstYears });

    cursor = new Date(end.getTime());

    // subsequent full dashas until limit
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

  // ---- Sub-dasha (Bhukti)
  function computeBhuktiForMahadasha(mahaLord, mahaStartDate, mahaYears) {
    const startIx = lordIndex(mahaLord);
    if (startIx < 0) return [];
    const seq = [...MD_ORDER.slice(startIx), ...MD_ORDER.slice(0, startIx)];
    const out = [];

    let cursor = new Date(mahaStartDate instanceof Date ? mahaStartDate : new Date(mahaStartDate));
    const spanDays = Y2D(mahaYears);
    let accDays = 0;

    for (const seg of seq) {
      const partYears = (seg.years / TOTAL) * mahaYears;
      const partDays = Y2D(partYears);
      const end = addDays(cursor, partDays);

      const safeEnd = accDays + partDays <= spanDays + 0.5
        ? end
        : addDays(cursor, Math.max(0, spanDays - accDays));

      out.push({ lord: seg.lord, start: new Date(cursor), end: new Date(safeEnd), years: partYears });
      accDays += partDays;
      cursor = safeEnd;

      if (accDays >= spanDays - 0.5) break;
      if (out.length > 20) break;
    }
    return out;
  }

  // ---- Render helpers
  function renderDashaTable(tbodyId, list) {
    const tb = document.getElementById(tbodyId);
    if (!tb) return;
    tb.innerHTML = "";
    list.forEach((r, i) => {
      const tr = document.createElement("tr");
      tr.dataset.index = String(i);
      tr.dataset.lord = r.lord;
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${r.lord}</td>
        <td>${fmt(r.start)}</td>
        <td>${fmt(r.end)}</td>
        <td class="mono">${r.years.toFixed(2)}</td>`;
      tb.appendChild(tr);
    });
  }

  function renderBhuktiTable(tbodyId, list) {
    const tb = document.getElementById(tbodyId);
    if (!tb) return;
    tb.innerHTML = "";
    list.forEach((r, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${r.lord}</td>
        <td>${fmt(r.start)}</td>
        <td>${fmt(r.end)}</td>
        <td class="mono">${r.years.toFixed(2)}</td>`;
      tb.appendChild(tr);
    });
  }

  function attachBhuktiOnClick(mahaTbodyId, bhuktiTbodyId, mahaList) {
    const tb = document.getElementById(mahaTbodyId);
    if (!tb) return;
    tb.onclick = (ev) => {
      const tr = ev.target.closest("tr");
      if (!tr) return;
      const i = Number(tr.dataset.index || -1);
      if (i < 0 || !mahaList[i]) return;
      const m = mahaList[i];
      const bh = computeBhuktiForMahadasha(m.lord, m.start, m.years);
      renderBhuktiTable(bhuktiTbodyId, bh);
    };
  }

  // expose
  window.computeVimshottariDasha   = computeVimshottariDasha;
  window.computeBhuktiForMahadasha = computeBhuktiForMahadasha;
  window.renderDashaTable          = renderDashaTable;
  window.renderBhuktiTable         = renderBhuktiTable;
  window.attachBhuktiOnClick       = attachBhuktiOnClick;
  window.formatDashaDate           = fmt;
})();

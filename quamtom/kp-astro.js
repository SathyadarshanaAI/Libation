// quamtom/kp-astro.js
(function () {
  // Vimshottari order
  const VIM = [
    { lord: 'Ketu',    years: 7  },
    { lord: 'Venus',   years: 20 },
    { lord: 'Sun',     years: 6  },
    { lord: 'Moon',    years: 10 },
    { lord: 'Mars',    years: 7  },
    { lord: 'Rahu',    years: 18 },
    { lord: 'Jupiter', years: 16 },
    { lord: 'Saturn',  years: 19 },
    { lord: 'Mercury', years: 17 },
  ];
  const TOTAL_YEARS = 120;
  const NAK_LEN_MIN = 13*60 + 20; // 800'

  // 27 nakshatras with lords (start from 0° Aries = Ashwini/Ketu)
  const NAK = [
    { name:'Ashwini', lord:'Ketu' },{ name:'Bharani', lord:'Venus' },{ name:'Krittika', lord:'Sun' },
    { name:'Rohini', lord:'Moon' },{ name:'Mrigashira', lord:'Mars' },{ name:'Ardra', lord:'Rahu' },
    { name:'Punarvasu', lord:'Jupiter' },{ name:'Pushya', lord:'Saturn' },{ name:'Ashlesha', lord:'Mercury' },
    { name:'Magha', lord:'Ketu' },{ name:'Purva Phalguni', lord:'Venus' },{ name:'Uttara Phalguni', lord:'Sun' },
    { name:'Hasta', lord:'Moon' },{ name:'Chitra', lord:'Mars' },{ name:'Svati', lord:'Rahu' },
    { name:'Vishakha', lord:'Jupiter' },{ name:'Anuradha', lord:'Saturn' },{ name:'Jyeshtha', lord:'Mercury' },
    { name:'Mula', lord:'Ketu' },{ name:'Purva Ashadha', lord:'Venus' },{ name:'Uttara Ashadha', lord:'Sun' },
    { name:'Shravana', lord:'Moon' },{ name:'Dhanishtha', lord:'Mars' },{ name:'Shatabhisha', lord:'Rahu' },
    { name:'Purva Bhadrapada', lord:'Jupiter' },{ name:'Uttara Bhadrapada', lord:'Saturn' },{ name:'Revati', lord:'Mercury' },
  ];

  const norm360 = d => ((d%360)+360)%360;

  function nakIndex(deg){ return Math.floor(norm360(deg) / (360/27)); }

  function subSegments(startLord){
    const i = VIM.findIndex(v=>v.lord===startLord);
    const seq = [...VIM.slice(i), ...VIM.slice(0,i)];
    let acc=0;
    const segs = seq.map(it=>{
      const len = NAK_LEN_MIN * (it.years/TOTAL_YEARS);
      const from = acc, to = acc+len; acc = to;
      return { lord: it.lord, from, to };
    });
    segs[segs.length-1].to = NAK_LEN_MIN; // guard
    return segs;
  }

  // Public: Sub-Lord for ecliptic longitude (deg, sidereal/tropical already applied outside)
  function calculateSubLord(deg){
    const idx = nakIndex(deg);
    const nak = NAK[idx];
    // minutes into current nakshatra
    const startDeg = idx * (360/27);
    const deltaDeg = norm360(deg - startDeg);
    const minutes  = deltaDeg * 60;
    const seg = subSegments(nak.lord)
      .find(s => minutes >= s.from && minutes < s.to) || { lord: nak.lord };
    return seg.lord;
  }

  window.calculateSubLord = calculateSubLord;
})();

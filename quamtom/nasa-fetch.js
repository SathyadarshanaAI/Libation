// ⚠️ Browser CORS may block this. Use only for server/proxy.
async function fetchPlanetaryLongitudes(date, time, location={lat:6.9271, lon:79.8612, alt:0}) {
  const bodies = { Sun:'10', Moon:'301', Mercury:'199', Venus:'299', Mars:'499', Jupiter:'599', Saturn:'699', Uranus:'799', Neptune:'899', Pluto:'999' };
  const positions = {};
  for (const [name, cmd] of Object.entries(bodies)) {
    const url = new URL('https://ssd.jpl.nasa.gov/api/horizons.api');
    const iso = `${date} ${time}`;
    url.searchParams.set('format','json');
    url.searchParams.set('COMMAND', `'${cmd}'`);
    url.searchParams.set('EPHEM_TYPE','OBSERVER');
    url.searchParams.set('CENTER', `'coord@399'`);
    url.searchParams.set('COORD_TYPE','GEODETIC');
    url.searchParams.set('SITE_COORD', `'${location.lat},${location.lon},${location.alt||0}'`);
    url.searchParams.set('START_TIME', `'${iso}'`);
    url.searchParams.set('STOP_TIME', `'${iso}'`);
    url.searchParams.set('STEP_SIZE', `'1 m'`);
    url.searchParams.set('QUANTITIES', `'1'`);
    const r = await fetch(url).then(res=>res.json());
    const row = r?.result?.observer_table?.data?.[0];
    positions[name] = row ? { ra: +row.RA, dec: +row.DEC } : null;
  }
  return positions;
}

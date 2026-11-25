/* Prana app logic. Content lives in content/*.js (window.PRANA). Nothing leaves the phone
   except an optional store lookup (OpenStreetMap) when the user taps "Use my location". */
(() => {
'use strict';
const P = window.PRANA;
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const S = {
  get(k, d) { try { const v = localStorage.getItem('prana-' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('prana-' + k, JSON.stringify(v)); } catch (e) {} }
};
const M = Object.fromEntries(P.meals.map(m => [m.id, m]));
const PR = Object.fromEntries(P.practices.map(p => [p.id, p]));
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isAndroid = /Android/i.test(navigator.userAgent);
const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

/* ---------------- routing ---------------- */
const views = ['today', 'shop', 'meals', 'practice', 'learn'];
function show(v) {
  if (!views.includes(v)) v = 'today';
  for (const x of views) $('v-' + x).hidden = x !== v;
  for (const a of document.querySelectorAll('nav a')) {
    if (a.dataset.v === v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => show(location.hash.slice(1)));

/* ---------------- time helpers ---------------- */
const toMin = s => { if (!s) return null; const [h, m] = s.split(':').map(Number); return h * 60 + m; };
const fmt = m => { m = ((m % 1440) + 1440) % 1440; let h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + String(mm).padStart(2, '0') + ' ' + ap; };
const dayKey = (d = new Date()) => d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
const todayName = () => P.days[(new Date().getDay() + 6) % 7];
const dayOfYear = () => { const d = new Date(); return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5); };
const mmss = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const timerLen = t => t.once ? t.phases.reduce((a, p) => a + p[1], 0) : t.minutes * 60;

/* ---------------- shared bits ---------------- */
const mealBtn = id => `<button type="button" class="mlink" data-open="${id}">${esc(M[id].name)}</button>`;
const pracBtn = (id, label) => `<button type="button" class="mlink" data-p="${id}">${esc(label || PR[id].name)}</button>`;
const startBtn = (id, k) => PR[id] && PR[id].timer ? `<button type="button" class="tbtn" data-t="${id}"${k ? ` data-k="${k}"` : ''}>Start ${mmss(timerLen(PR[id].timer))}</button>` : '';

function practiceBody(p) {
  return `<p>${esc(p.why)}</p>` +
    (p.when && p.when !== '—' ? `<p class="small"><b>When:</b> ${esc(p.when)}</p>` : '') +
    `<h4>${p.cat === 'teacher' ? 'How to learn it' : 'How'}</h4><ol>${p.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>` +
    (p.caution ? `<div class="caution"><b>Take care</b><ul>${p.caution.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>` : '') +
    (p.timer ? `<p style="margin-top:12px">${startBtn(p.id)}</p>` : '') +
    (p.src ? `<p class="src">Source: ${esc(p.src)}</p>` : '');
}
function practiceMeta(p) {
  return `<div class="meta"><span class="badge ${p.cat === 'teacher' ? 'teach' : 'limb'}">${esc(p.cat === 'teacher' ? 'Teacher only' : p.limb)}</span>` +
    (p.cat === 'teacher' ? '' : `<span><b>${esc(p.freq)}</b></span>${p.time && p.time !== '—' ? `<span>${esc(p.time)}</span>` : ''}`) + `</div>`;
}
function openPractice(id) {
  const p = PR[id]; if (!p) return;
  $('sbody').innerHTML = `<button type="button" class="close" data-close>Close</button><h2 style="font-size:28px">${esc(p.name)}</h2>${p.sk ? `<div class="sk">${esc(p.sk)}</div>` : ''}${practiceMeta(p)}<div class="xb" style="padding:8px 0 0">${practiceBody(p)}</div>`;
  $('sheet').showModal();
}

/* ---------------- TODAY ---------------- */
let selDay = todayName();
$('wake').value = S.get('wake', '07:00');
$('prac').value = S.get('prac', '');

function todayPurif() {
  const list = P.dailyPurifications;
  const shift = S.get('purif-shift-' + dayKey(), 0);
  return list[(dayOfYear() + shift) % list.length];
}
function windDown() { return ['sit', 'trataka', 'bhramari', 'sit', 'legsup', 'trataka', 'sit'][(new Date().getDay())]; }

function buildDay() {
  const W = toMin($('wake').value) ?? 420, Pm = toMin($('prac').value);
  const plan = P.week[todayName()];
  const pur = todayPurif(), wd = windDown();
  const it = [
    {k:'wake',m:W,kind:'prac',t:'Wake: tongue, teeth, warm water',d:'Scrape your tongue, brush, then slowly drink a mug of warm water.',links:['tongue','water']},
    {k:'purif',m:W+15,kind:'prac',t:'Today\'s purification',pid:pur,another:true},
    {k:'breath',m:W+30,kind:'prac',t:'3-minute calming breath',pid:'slowbreath'},
    {k:'b',m:W+60,kind:'food',t:'Breakfast (light)',meal:plan.b},
    {k:'twist',m:W+315,kind:'prac',t:'Before lunch: gentle twist',pid:'twist'},
    {k:'l',m:W+330,kind:'food',t:'Lunch (biggest meal)',meal:plan.l},
    {k:'after',m:W+360,kind:'prac',t:'After lunch: sit, then walk',d:'4 minutes in thunderbolt pose, then a 10-minute easy walk.',links:['vajrasana','walk'],timer:'vajrasana'},
    {k:'s',m:W+510,kind:'food',t:'Afternoon snack or tea',meal:plan.s},
    {k:'d',m:W+690,kind:'food',t:'Dinner (light, early)',meal:plan.d,extra:'Then a short walk.'},
    {k:'wind',m:W+780,kind:'prac',t:'Wind-down',pid:wd},
    {k:'e',m:W+810,kind:'food',t:'Evening drink',meal:plan.e},
    {k:'refl',m:W+840,kind:'prac',t:'One-line reflection',reflect:true},
    {k:'bed',m:W+930,kind:'prac',t:'Lights out',d:'Screens off. At least 3 hours since dinner.',links:['sleep']}
  ];
  if (Pm != null) {
    const pm = Pm < W ? Pm + 1440 : Pm;
    it.push({k:'p',m:pm,kind:'prac',t:'Your practice',d:'On an empty stomach, water only in the hour before. Try the awareness sit or alternate nostril breathing.',links:['sit','nadi']});
  }
  it.sort((a, b) => a.m - b.m);
  for (const x of it) x.part = x.m < W + 270 ? 'm' : x.m < W + 660 ? 'd' : 'e';
  return {it, W, Pm, plan};
}

function itemBody(x, P_) {
  let h = '';
  if (x.meal) h += `${mealBtn(x.meal)}<div class="d">${esc(M[x.meal].portion)}${x.extra ? '. ' + esc(x.extra) : ''}</div>`;
  else if (x.pid) {
    const p = PR[x.pid];
    h += `${pracBtn(x.pid, p.name === x.t ? 'How and why' : p.name)}${p.sk ? ` <span class="sk">${esc(p.sk)}</span>` : ''}<div class="d">${esc(p.why.split('. ')[0].replace(/\.$/, ''))}.</div>`;
  } else if (x.d) h += `<div class="d">${esc(x.d)}</div>`;
  const acts = [];
  if (x.links) acts.push(...x.links.map(l => pracBtn(l, 'How: ' + PR[l].name.toLowerCase())));
  const tid = x.timer || x.pid;
  if (tid && PR[tid] && PR[tid].timer) acts.push(startBtn(tid, x.k));
  if (x.another) acts.push(`<button type="button" class="mlink" id="another">Show another</button>`);
  if (acts.length) h += `<div class="acts">${acts.join('')}</div>`;
  if (x.reflect) {
    const note = S.get('note-' + dayKey(), '');
    h += `<div class="d">Where did I feel clear and light today? Where heavy or rushed, and what came just before?</div>
      <label for="note" class="small" style="margin-top:6px">Tonight's line (stays on this phone)</label>
      <textarea id="note" rows="2" placeholder="One honest line…">${esc(note)}</textarea>${pastNotes()}`;
  }
  if (x.kind === 'food' && P_ != null) {
    const gap = P_ - x.m;
    if (gap > 0 && gap < 120) h += `<span class="warn">Less than 2 hours before practice. Practice first, or have only fruit or tea.</span>`;
    if (gap <= 0 && gap > -30) h += `<span class="warn">Wait 30 minutes after practice before eating.</span>`;
  }
  return h;
}
function pastNotes() {
  const rows = [];
  for (let i = 1; i <= 14 && rows.length < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const n = S.get('note-' + dayKey(d), '');
    if (n) rows.push(`<li><b>${d.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'})}:</b> ${esc(n)}</li>`);
  }
  return rows.length ? `<details style="margin-top:6px"><summary class="small">Past reflections</summary><ul class="small">${rows.join('')}</ul></details>` : '';
}

const PARTS = {m:['Morning','Light food, clear body'], d:['Midday','Main meal, steady energy'], e:['Evening','Light and early, then wind down']};
function renderToday() {
  const {it, Pm, W, plan} = buildDay();
  const pm = Pm == null ? null : (Pm < W ? Pm + 1440 : Pm);
  const done = S.get('done-' + dayKey(), {});
  let html = '', part = '';
  for (const x of it) {
    if (x.part !== part) { if (part) html += '</ul>'; part = x.part; html += `<div class="part"><h3>${PARTS[part][0]}</h3><span>${PARTS[part][1]}</span></div><ul class="tl">`; }
    html += `<li class="${done[x.k] ? 'done' : ''}"><time>${fmt(x.m)}</time><div><div class="t"><span class="k ${x.kind}">${x.kind === 'food' ? 'FOOD' : 'PRACTICE'}</span>${esc(x.t)}</div>${itemBody(x, pm)}</div><button type="button" class="tick" data-k="${x.k}" aria-pressed="${!!done[x.k]}" aria-label="Mark ${esc(x.t)} done">✓</button></li>`;
  }
  $('tl').innerHTML = html + '</ul>';
  const d = new Date(), now = d.getHours() * 60 + d.getMinutes();
  const nowAdj = now < W - 120 ? now + 1440 : now;
  const next = it.find(x => !done[x.k] && x.m >= nowAdj - 45);
  let nh;
  if (next) {
    const what = next.meal ? mealBtn(next.meal) : next.pid ? pracBtn(next.pid) : `<span>${esc(next.d || '')}</span>`;
    nh = `<small>Up next · ${fmt(next.m)}</small><b>${esc(next.t)}</b>${what}`;
  } else nh = `<small>Day complete</small><b>Rest. The kitchen is closed.</b><span>Tomorrow's plan is ready below.</span>`;
  if (plan.note) nh += `<p class="small" style="color:var(--onleaf);opacity:.9">${esc(plan.note)}</p>`;
  $('now').innerHTML = nh;
  renderWeek();
}
function renderWeek() {
  $('week').innerHTML = P.days.map(d => `<button type="button" data-day="${d}" aria-pressed="${d === selDay}">${d}</button>`).join('');
  const p = P.week[selDay];
  $('menu').innerHTML = [['Breakfast', p.b], ['Lunch', p.l], ['Snack', p.s], ['Dinner', p.d], ['Evening', p.e]].map(([l, id]) => `<div><span>${l}</span>${mealBtn(id)}</div>`).join('') + (p.note ? `<p class="small">${esc(p.note)}</p>` : '');
}
function markDone(k, val) {
  const key = 'done-' + dayKey(), dn = S.get(key, {});
  dn[k] = val === undefined ? !dn[k] : val; S.set(key, dn);
}
$('tl').addEventListener('click', e => {
  const b = e.target.closest('.tick');
  if (b) { markDone(b.dataset.k); renderToday(); return; }
  if (e.target.id === 'another') { S.set('purif-shift-' + dayKey(), S.get('purif-shift-' + dayKey(), 0) + 1); renderToday(); }
});
let noteT;
$('tl').addEventListener('input', e => {
  if (e.target.id !== 'note') return;
  clearTimeout(noteT); const v = e.target.value;
  noteT = setTimeout(() => S.set('note-' + dayKey(), v.trim()), 300);
});
$('week').addEventListener('click', e => { const b = e.target.closest('[data-day]'); if (!b) return; selDay = b.dataset.day; renderWeek(); });
$('wake').addEventListener('change', () => { S.set('wake', $('wake').value); renderToday(); });
$('prac').addEventListener('change', () => { S.set('prac', $('prac').value); renderToday(); });
$('noprac').addEventListener('click', () => { $('prac').value = ''; S.set('prac', ''); renderToday(); });

/* ---------------- MEALS ---------------- */
const SLOTS = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack & evening'];
let slot = 'All';
function renderMeals() {
  $('mchips').innerHTML = SLOTS.map(s => `<button type="button" data-slot="${s}" aria-pressed="${s === slot}">${s}</button>`).join('');
  $('mlist').innerHTML = P.meals.filter(m => slot === 'All' || m.slot === slot).map(m => `<details class="x" id="m-${m.id}"><summary><h3>${esc(m.name)}</h3><div class="meta"><span>${esc(m.slot)}</span><span><b>${m.min} min</b></span><span>Dishes: <b>${esc(m.dishes)}</b></span></div><div class="por"><b>Portion:</b> ${esc(m.portion)}</div></summary><div class="xb"><h4>Buy</h4><ul>${m.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul><h4>Make</h4><ol>${m.steps.map(i => `<li>${esc(i)}</li>`).join('')}</ol><p class="tip"><b>Why:</b> ${esc(m.why)}</p></div></details>`).join('');
}
$('mchips').addEventListener('click', e => { const b = e.target.closest('[data-slot]'); if (!b) return; slot = b.dataset.slot; renderMeals(); });

/* ---------------- SHOP ---------------- */
const SUPER = ['wf', 'tj', 'sp', 'co'];
let store = S.get('store', 'all'), freq = S.get('freq', 'all');
const itemKey = (c, i) => c.cat + '|' + i.n;
function shopVisible(i) {
  const okStore = store === 'all' || i.at.includes(store) || (SUPER.includes(store) && i.at.includes('any'));
  return okStore && (freq === 'all' || i.f === freq);
}
function renderShop() {
  $('storechips').innerHTML = [['all', 'All stores'], ...Object.entries(P.stores).filter(([k]) => k !== 'any').map(([k, v]) => [k, v.short])].map(([k, l]) => `<button type="button" data-store="${k}" aria-pressed="${k === store}">${esc(l)}</button>`).join('');
  $('freqchips').innerHTML = [['all', 'Everything'], ['w', 'Weekly'], ['m', 'Monthly'], ['once', 'One-time']].map(([k, l]) => `<button type="button" data-freq="${k}" aria-pressed="${k === freq}">${l}</button>`).join('');
  const got = S.get('shop', {});
  let total = 0, have = 0;
  const html = P.shop.map(c => {
    const items = c.items.filter(shopVisible);
    if (!items.length) return '';
    return `<div class="store"><h3>${esc(c.cat)}<small>${items.length} items</small></h3>` + items.map(i => {
      const k = itemKey(c, i); total++; if (got[k]) have++;
      const at = i.at.map(a => P.stores[a].short).join(' · ');
      return `<label class="item ${got[k] ? 'got' : ''}"><input type="checkbox" data-k="${esc(k)}" ${got[k] ? 'checked' : ''}><span><span class="n">${esc(i.n)}</span><span class="tag">${i.f === 'w' ? 'weekly' : i.f === 'm' ? 'monthly' : 'one-time'}</span><br><span class="q">${esc(i.size)}${i.rec ? ' · ' + esc(i.rec) : ''}</span><br><span class="at">Find it at: ${esc(at)}</span></span></label>`;
    }).join('') + '</div>';
  }).join('');
  $('shop').innerHTML = html || '<p class="small">Nothing on the list for this store. Try "All stores".</p>';
  $('shopcount').textContent = total ? `${have} of ${total} in the cart` : '';
}
$('shop').addEventListener('change', e => {
  const k = e.target.dataset.k; if (!k) return;
  const g = S.get('shop', {}); g[k] = e.target.checked; S.set('shop', g);
  e.target.closest('.item').classList.toggle('got', e.target.checked);
  const all = [...$('shop').querySelectorAll('input[type=checkbox]')];
  $('shopcount').textContent = `${all.filter(x => x.checked).length} of ${all.length} in the cart`;
});
$('storechips').addEventListener('click', e => { const b = e.target.closest('[data-store]'); if (!b) return; store = b.dataset.store; S.set('store', store); renderShop(); });
$('freqchips').addEventListener('click', e => { const b = e.target.closest('[data-freq]'); if (!b) return; freq = b.dataset.freq; S.set('freq', freq); renderShop(); });
$('clearshop').addEventListener('click', () => { if (confirm('Clear all ticks on the shopping list?')) { S.set('shop', {}); renderShop(); } });

/* ---------------- NEARBY STORES ---------------- */
let here = null; // {lat, lon} kept in memory only
const useMiles = /^en-(US|GB|LR|MM)$/i.test(navigator.language || 'en-US') || !navigator.language;
function mapSearch(q) {
  if (isIOS) return `https://maps.apple.com/?q=${encodeURIComponent(q)}${here ? `&sll=${here.lat},${here.lon}` : ''}`;
  return here ? `https://www.google.com/maps/search/${encodeURIComponent(q)}/@${here.lat},${here.lon},13z` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + ' near me')}`;
}
function placeLink(p) {
  if (isIOS) return `https://maps.apple.com/?q=${encodeURIComponent(p.name)}&ll=${p.lat},${p.lon}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + (p.city ? ' ' + p.city : ''))}%20${p.lat}%2C${p.lon}`;
}
function renderNearLinks() {
  $('near').innerHTML = P.nearby.map(n => `<a href="${mapSearch(n.q)}" target="_blank" rel="noopener"><b>${esc(n.label)}</b><span>${esc(n.why)}</span><i>Map ↗</i></a>`).join('');
}
function dist(a, b) {
  const R = 6371, r = x => x * Math.PI / 180;
  const dl = r(b.lat - a.lat), dn = r(b.lon - a.lon);
  const h = Math.sin(dl / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dn / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
const CHAINS = [[/whole foods/i, 'Whole Foods'], [/trader joe/i, 'Trader Joe\'s'], [/sprouts/i, 'Sprouts'], [/natural grocers/i, 'Natural Grocers'], [/earth fare/i, 'Earth Fare'], [/fresh thyme/i, 'Fresh Thyme'], [/wegmans/i, 'Wegmans'], [/costco/i, 'Costco']];
function classify(t) {
  const name = t.name || t.brand || '', n = name.toLowerCase(), shop = t.shop || '', cuisine = (t.cuisine || '').toLowerCase();
  if (/(india|indian|patel|desi|bazaa?r|apna|masala|subzi|sabzi|mandi|namaste|spice)/.test(n) || /indian|south_asian/.test(cuisine) || shop === 'spices') return ['Indian grocery', 0];
  if (t.amenity === 'marketplace' || /farmers'? ?market|green ?market/.test(n)) return ['Farmers market', 1];
  for (const [re, label] of CHAINS) if (re.test(name)) return [label, label === 'Costco' ? 3 : 2];
  if (shop === 'health_food' || shop === 'organic' || /natural|co-?op|organic|health/.test(n)) return ['Natural foods', 2];
  if (shop === 'greengrocer' || shop === 'farm') return ['Produce', 2];
  if (shop === 'supermarket') return ['Supermarket', 4];
  return ['Grocery', 5];
}
async function overpass(lat, lon) {
  const r = 12000;
  const q = `[out:json][timeout:25];(nwr(around:${r},${lat},${lon})["shop"~"^(supermarket|greengrocer|health_food|organic|farm|spices)$"];nwr(around:${r},${lat},${lon})["amenity"="marketplace"];);out center tags 250;`;
  const urls = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
  let lastErr;
  for (const u of urls) {
    const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 25000);
    try {
      const res = await fetch(u, {method: 'POST', body: 'data=' + encodeURIComponent(q), headers: {'Content-Type': 'application/x-www-form-urlencoded'}, signal: ctl.signal});
      clearTimeout(to);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return (await res.json()).elements || [];
    } catch (e) { clearTimeout(to); lastErr = e; }
  }
  throw lastErr;
}
function getPos() {
  return new Promise((ok, no) => {
    if (!navigator.geolocation) return no(new Error('nogeo'));
    navigator.geolocation.getCurrentPosition(p => ok({lat: p.coords.latitude, lon: p.coords.longitude}), no, {enableHighAccuracy: false, timeout: 15000, maximumAge: 600000});
  });
}
async function findNearby() {
  const out = $('nearres'), btn = $('locbtn');
  btn.disabled = true; out.innerHTML = '<p class="small">Finding your location…</p>';
  try { here = await getPos(); }
  catch (e) {
    btn.disabled = false;
    out.innerHTML = `<p class="small">${e && e.code === 1 ? 'Location permission was turned down. You can still use the map searches below, or allow location for this site in your browser settings.' : 'Couldn\'t get your location. Try again, or use the map searches below.'}</p>`;
    return;
  }
  renderNearLinks();
  out.innerHTML = '<p class="small">Looking for stores near you…</p>';
  let els;
  try { els = await overpass(here.lat, here.lon); }
  catch (e) {
    btn.disabled = false;
    out.innerHTML = '<p class="small">The store directory didn\'t answer just now. The map searches below already use your location. Try the button again in a minute.</p>';
    return;
  }
  const seen = new Set(), places = [];
  for (const el of els) {
    const t = el.tags || {}, name = t.name || t.brand;
    const lat = el.lat ?? el.center?.lat, lon = el.lon ?? el.center?.lon;
    if (!name || lat == null) continue;
    const key = name.toLowerCase() + '|' + lat.toFixed(3) + lon.toFixed(3);
    if (seen.has(key)) continue; seen.add(key);
    const [kind, rank] = classify(t);
    places.push({name, lat, lon, kind, rank, city: t['addr:city'] || '', street: t['addr:street'] ? `${t['addr:housenumber'] || ''} ${t['addr:street']}`.trim() : '', d: dist(here, {lat, lon})});
  }
  places.sort((a, b) => a.rank - b.rank || a.d - b.d);
  const top = [], perRank = {};
  for (const p of places) {
    perRank[p.rank] = (perRank[p.rank] || 0) + 1;
    if (p.rank >= 4 && perRank[p.rank] > 4) continue;
    if (perRank[p.rank] > 6) continue;
    top.push(p); if (top.length >= 16) break;
  }
  btn.disabled = false; btn.textContent = 'Search again';
  if (!top.length) { out.innerHTML = '<p class="small">No grocery stores are mapped close to you yet. The map searches below will look wider.</p>'; return; }
  const dtxt = km => useMiles ? (km * 0.621371).toFixed(1) + ' mi' : km.toFixed(1) + ' km';
  out.innerHTML = `<div class="near">${top.map(p => `<a href="${placeLink(p)}" target="_blank" rel="noopener"><b>${esc(p.name)}</b><span>${esc(p.kind)} · ${dtxt(p.d)}${p.street ? ' · ' + esc(p.street) : ''}</span><i>Map ↗</i></a>`).join('')}</div>
    <p class="small">Indian groceries are best for dal, basmati, ghee and spices. Farmers markets for produce and honey. Store data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors; some stores may be missing.</p>`;
}
$('locbtn').addEventListener('click', findNearby);

/* ---------------- PRACTICE ---------------- */
let pcat = 'all';
function renderPractice() {
  const q = $('pq').value.trim().toLowerCase();
  $('pchips').innerHTML = P.practiceCats.map(([k, l]) => `<button type="button" data-pc="${k}" aria-pressed="${k === pcat}">${l}</button>`).join('');
  const list = P.practices.filter(p => (pcat === 'all' ? p.cat !== 'teacher' || q : p.cat === pcat) && (!q || [p.name, p.sk, p.why, p.limb, p.when].join(' ').toLowerCase().includes(q)));
  let h = list.map(p => `<details class="x" id="p-${p.id}"><summary><h3>${esc(p.name)}</h3>${p.sk ? ` <span class="sk">${esc(p.sk)}</span>` : ''}${practiceMeta(p)}</summary><div class="xb">${practiceBody(p)}</div></details>`).join('');
  if (pcat === 'all' && !q) h += `<p class="small">Six more classical cleansings are listed under <button type="button" class="mlink" data-pc="teacher">Teacher only</button>. They are described there, not taught, because they need in-person guidance.</p>`;
  if (pcat === 'teacher') h = `<div class="caution"><b>Know about these, don't try them at home.</b> The Hatha texts describe them, but they are learned in person, often at an ashram or retreat. Experienced practitioners have hurt themselves trying them alone.</div>` + h;
  $('plist').innerHTML = h || '<p class="small">No practice matches that search.</p>';
}
$('pq').addEventListener('input', renderPractice);
document.addEventListener('click', e => {
  const c = e.target.closest('[data-pc]'); if (!c) return;
  pcat = c.dataset.pc; renderPractice(); if (!c.closest('#pchips')) window.scrollTo(0, 0);
});

/* ---------------- LEARN ---------------- */
const LTABS = [['food', 'Energy of food'], ['eat', 'Can I eat this?'], ['limbs', '8 limbs'], ['traps', 'Common traps'], ['habits', 'Daily habits'], ['reads', 'Short reads'], ['about', 'About']];
let ltab = 'food', fv = 'all';
const VL = {f: 'Balanced', s: 'Activating', a: 'Heavy'};
function renderLearn() {
  $('lchips').innerHTML = LTABS.map(([k, l]) => `<button type="button" data-lt="${k}" aria-pressed="${k === ltab}">${l}</button>`).join('');
  const L = $('lbody');
  if (ltab === 'food') {
    L.innerHTML = `<h3>Sattva · Rajas · Tamas</h3><p>Yoga describes food, like everything in nature, by three qualities: clarity, stimulation and heaviness. Rather than strict rules, notice how food, portion size and timing affect you.</p>
    <div class="gunas">${P.gunas.map(g => `<div class="guna ${g.k}"><div class="hd"><span>${esc(g.sk)} · ${esc(g.quality)}</span><b>${esc(g.name)}</b></div><div class="bd"><p><b>${esc(g.lean)}.</b> ${esc(g.desc)}</p><ul>${g.ex.map(x => `<li>${esc(x)}</li>`).join('')}</ul>${g.note ? `<p class="small">${esc(g.note)}</p>` : ''}<div class="ask">Notice: "${esc(g.notice)}"</div></div></div>`).join('')}</div>
    <h3 style="margin-top:20px">Important distinctions</h3><ul>${P.distinctions.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
    <h3 style="margin-top:20px">Keep it simple</h3><ul>${P.keepSimple.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
    <p class="quote"><b>Nourishment · Awareness · Moderation.</b> Choose consistently, stay flexible, and watch your own experience.</p>`;
  } else if (ltab === 'eat') {
    L.innerHTML = `<p>Search any food. <b>Balanced</b> foods are sattvic, so lean into them. <b>Activating</b> foods are rajasic: keep them moderate. <b>Heavy</b> foods are tamasic, or traditionally left out: keep them limited.</p><input type="search" id="fq" placeholder="Search: coffee, mushrooms, paneer…" aria-label="Search foods"><div class="chips" id="fchips"></div><div id="flist"></div>`;
    renderFoods();
    $('fq').addEventListener('input', renderFoods);
  } else if (ltab === 'limbs') {
    L.innerHTML = `<p>${esc(P.limbsIntro)}</p>${P.limbs.map(l => `<div class="limbrow"><div class="n">${l.n}</div><div><h3>${esc(l.name)} <span class="sk">${esc(l.en)}</span></h3><p>${esc(l.body)}</p><div class="pr"><b>In Prana:</b> ${esc(l.prana)}</div></div></div>`).join('')}<h3 style="margin-top:22px">Why cleanliness comes first</h3><p class="quote">${esc(P.sauchaFruits)}</p>`;
  } else if (ltab === 'traps') {
    L.innerHTML = `<p>The mistakes almost everyone makes at the start, and what to do instead.</p>` + P.traps.map(t => `<div class="trap"><h3>${esc(t.t)}</h3><p>${esc(t.d)}</p><div class="fix"><b>Instead:</b> ${esc(t.fix)}</div></div>`).join('');
  } else if (ltab === 'habits') {
    let last = '', h = '<p>The traditional guidelines, each with exactly what to do. Get the first few right and the rest come easily.</p>';
    for (const [g, t, d, how] of P.rules) { if (g !== last) { h += `<div class="grp">${esc(g)}</div>`; last = g; } h += `<div class="rule"><h3>${esc(t)}</h3><p>${esc(d)}</p><div class="how"><b>Do this:</b> ${esc(how)}</div></div>`; }
    L.innerHTML = h;
  } else if (ltab === 'reads') {
    L.innerHTML = P.reads.map((r, i) => `<details class="lrn"${i === 0 ? ' open' : ''}><summary>${esc(r.t)}</summary><div>${r.h}</div></details>`).join('');
  } else {
    L.innerHTML = `<h3>About Prana</h3><p>Prana makes the move into a yogic lifestyle simple: what to buy, how to shape your day, and why each habit supports your energy (prana) and a clear mind. It starts with the most accessible habit, balanced sattvic food and a daily rhythm, and weaves in the purifications, breath and postures of the 8 limbs of Raja Yoga.</p><p>${esc(P.credit)}</p>
    <h3 style="margin-top:18px">Not medical advice</h3><p>Prana is a traditional lifestyle guide. Breath practices, cleansings, fasting and sauna aren't right for everyone. Read the "Take care" notes, and check with your doctor if you are pregnant, have a health condition, or take medication.</p>
    <h3 style="margin-top:18px">Your privacy</h3><p>Your ticks, times and reflections stay on this phone. Prana has no account and no tracking. If you tap "Use my location", your approximate position is sent once to OpenStreetMap's public directory to find stores, and it is never stored.</p>
    <h3 style="margin-top:18px">Sources</h3><ul class="small"><li>Patanjali, Yoga Sutras 2.29–2.41 (the eight limbs; cleanliness and its fruits)</li><li>Hatha Yoga Pradipika, chapter 2 (the six cleansings and pranayama)</li><li>Gheranda Samhita, chapter 1 (dhauti and the other cleansings)</li><li>Bhagavad Gita 17.8–10 (the three kinds of food)</li><li><a href="https://www.fda.gov/consumers/consumer-updates/rinsing-your-sinuses-neti-pots-safe" target="_blank" rel="noopener">U.S. FDA: Is rinsing your sinuses with neti pots safe?</a></li></ul>
    <p><button type="button" id="aboutwelcome">Show the welcome and install steps</button></p>`;
    $('aboutwelcome').addEventListener('click', () => openWelcome(false));
  }
}
function renderFoods() {
  const q = ($('fq')?.value || '').trim().toLowerCase();
  $('fchips').innerHTML = [['all', 'All'], ['f', 'Balanced'], ['s', 'Activating'], ['a', 'Heavy']].map(([k, l]) => `<button type="button" data-fv="${k}" aria-pressed="${k === fv}">${l}</button>`).join('');
  const list = P.foods.filter(([n, v, no]) => (fv === 'all' || v === fv) && (!q || (n + ' ' + no).toLowerCase().includes(q)));
  $('flist').innerHTML = list.length ? list.map(([n, v, no]) => `<div class="food"><b>${esc(n)}</b><span class="v ${v}">${VL[v]}</span><span class="note">${esc(no)}</span></div>`).join('') : `<p class="small">Not listed. Ask: is it fresh, whole and gentle? Then eat it and notice: balanced, activated, or heavy?</p>`;
}
$('lchips').addEventListener('click', e => { const b = e.target.closest('[data-lt]'); if (!b) return; ltab = b.dataset.lt; renderLearn(); });
$('lbody').addEventListener('click', e => { const b = e.target.closest('[data-fv]'); if (!b) return; fv = b.dataset.fv; renderFoods(); });

/* ---------------- global clicks: meal links, practice sheets, timers, close ---------------- */
document.addEventListener('click', e => {
  const m = e.target.closest('[data-open]');
  if (m) {
    if ($('sheet').open) $('sheet').close();
    slot = 'All'; renderMeals(); location.hash = 'meals'; show('meals');
    const d = $('m-' + m.dataset.open); if (d) { d.open = true; setTimeout(() => d.scrollIntoView({block: 'start'}), 30); }
    return;
  }
  const p = e.target.closest('[data-p]'); if (p) { openPractice(p.dataset.p); return; }
  const t = e.target.closest('[data-t]'); if (t) { if ($('sheet').open) $('sheet').close(); startTimer(t.dataset.t, t.dataset.k); return; }
  if (e.target.closest('[data-close]')) { e.target.closest('dialog').close(); }
});
for (const d of [$('sheet'), $('welcome')]) d.addEventListener('click', e => { if (e.target === d) d.close(); });

/* ---------------- TIMER ---------------- */
let T = null, audio = null, wakeLock = null;
function chime(f = 528) {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime;
    o.type = 'sine'; o.frequency.value = f; o.connect(g); g.connect(audio.destination);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    o.start(t); o.stop(t + 1.7);
  } catch (e) {}
}
const phaseKind = l => /^(breathe in|in through)/i.test(l) ? 'in' : /(breathe out|out through|hum out)/i.test(l) ? 'out' : 'hold';
function setPhase(i) {
  const ph = T.phases[i % T.phases.length];
  T.pi = i; T.phaseEnd = T.elapsed + ph[1];
  $('tphase').textContent = ph[0];
  const orb = $('orb'), k = phaseKind(ph[0]);
  orb.style.transitionDuration = (k === 'hold' ? 1.2 : ph[1]) + 's';
  orb.style.transform = k === 'in' ? 'scale(1)' : k === 'out' ? 'scale(.55)' : 'scale(.78)';
  if (ph[1] >= 15 || T.once) { if (i > 0) chime(); }
  if (navigator.vibrate && ph[1] >= 15 && i > 0) navigator.vibrate(40);
}
function tick() {
  if (!T || T.paused) return;
  const now = performance.now(); T.elapsed += (now - T.last) / 1000; T.last = now;
  if (T.elapsed >= T.total) return finishTimer();
  if (T.elapsed >= T.phaseEnd) setPhase(T.pi + 1);
  $('tleft').textContent = mmss(T.total - T.elapsed) + ' left';
}
async function startTimer(id, k) {
  const p = PR[id]; if (!p || !p.timer) return;
  T = {id, k, phases: p.timer.phases, once: !!p.timer.once, total: timerLen(p.timer), elapsed: 0, last: performance.now(), paused: false};
  $('tname').textContent = p.name; $('tpause').textContent = 'Pause'; $('tstop').textContent = 'Stop';
  $('timer').showModal();
  try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === 'suspended') audio.resume(); } catch (e) {}
  try { if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); } catch (e) {}
  $('orb').style.transitionDuration = '0s'; $('orb').style.transform = 'scale(.55)';
  requestAnimationFrame(() => requestAnimationFrame(() => { setPhase(0); tick(); }));
  T.iv = setInterval(tick, 200);
}
function finishTimer() {
  clearInterval(T.iv); T.done = true;
  chime(660); setTimeout(() => chime(528), 350);
  if (navigator.vibrate) navigator.vibrate([60, 80, 60]);
  $('tphase').textContent = 'Complete. Sit for a moment before you move on.';
  $('tleft').textContent = ''; $('orb').style.transitionDuration = '2s'; $('orb').style.transform = 'scale(.78)';
  $('tstop').textContent = 'Done'; $('tpause').hidden = true;
  if (T.k) { markDone(T.k, true); renderToday(); }
}
function stopTimer() {
  if (T) clearInterval(T.iv); T = null; $('tpause').hidden = false;
  try { wakeLock && wakeLock.release(); } catch (e) {} wakeLock = null;
  if ($('timer').open) $('timer').close();
}
$('tpause').addEventListener('click', () => {
  if (!T || T.done) return;
  T.paused = !T.paused; T.last = performance.now();
  $('tpause').textContent = T.paused ? 'Resume' : 'Pause';
  $('tphase').textContent = T.paused ? 'Paused' : T.phases[T.pi % T.phases.length][0];
});
$('tstop').addEventListener('click', stopTimer);
$('timer').addEventListener('cancel', e => { e.preventDefault(); stopTimer(); });
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && T && !T.done && 'wakeLock' in navigator) { try { wakeLock = await navigator.wakeLock.request('screen'); } catch (e) {} }
});

/* ---------------- WELCOME & INSTALL ---------------- */
let deferred = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; if ($('welcome').open) openWelcome(!S.get('onboarded', false)); });
window.addEventListener('appinstalled', () => { deferred = null; });
function installHTML() {
  if (standalone()) return `<div class="install"><b>You're using the installed app.</b>Prana works offline, so the shopping list is ready even with no signal in the store.</div>`;
  if (deferred) return `<div class="install"><b>Add Prana to your home screen</b>It opens full screen like an app and works offline.<p><button type="button" class="primary" id="installbtn">Install Prana</button></p></div>`;
  if (isIOS) return `<div class="install"><b>Add Prana to your home screen</b><ol class="steps"><li>Open this page in <b>Safari</b>.</li><li>Tap the <b>Share</b> button (the square with an arrow pointing up).</li><li>Scroll down and tap <b>Add to Home Screen</b>, then <b>Add</b>.</li></ol>Prana then opens full screen from its own icon and works offline.</div>`;
  if (isAndroid) return `<div class="install"><b>Add Prana to your home screen</b><ol class="steps"><li>Tap the <b>⋮</b> menu in Chrome.</li><li>Tap <b>Install app</b> or <b>Add to Home screen</b>.</li></ol>Prana then opens full screen from its own icon and works offline.</div>`;
  return `<div class="install"><b>Best on your phone</b>Open this page on your phone and add it to your home screen. On a computer, look for the install icon in the address bar.</div>`;
}
function openWelcome(first) {
  $('wbody').innerHTML = `${first ? '' : '<button type="button" class="close" data-close>Close</button>'}<h2 id="wtitle">Welcome to Prana</h2>
  <p>A gentle guide to sattvic food and a yogic daily rhythm. It tells you exactly what to buy, how to shape your day, and why each habit supports your energy and a clear mind.</p>
  <ul class="steps"><li><b>Today</b> plans your day from your wake-up time: meals, a purification, short breathwork and postures.</li><li><b>Shop</b> is a grocery list for any store, with tick boxes and nearby store suggestions.</li><li><b>Practice</b> holds the purifications, breath and postures, with timers.</li><li><b>Learn</b> explains the why in plain language.</li></ul>
  ${first ? `<label for="wwake" style="margin:12px 0">What time do you usually wake up?<input type="time" id="wwake" value="${esc($('wake').value || '07:00')}"></label>` : ''}
  ${installHTML()}
  <p class="small">Go slowly and add one habit at a time. Prana is a traditional lifestyle guide, not medical advice.</p>
  ${first ? '<p><button type="button" class="primary" id="wstart" style="width:100%">Start my day</button></p>' : ''}`;
  if (!$('welcome').open) $('welcome').showModal();
  $('installbtn')?.addEventListener('click', async () => { deferred.prompt(); try { await deferred.userChoice; } catch (e) {} deferred = null; openWelcome(first); });
  $('wstart')?.addEventListener('click', () => {
    const w = $('wwake').value; if (w) { $('wake').value = w; S.set('wake', w); }
    S.set('onboarded', true); $('welcome').close(); renderToday();
  });
}
$('welcome').addEventListener('close', () => S.set('onboarded', true));
$('helpbtn').addEventListener('click', () => openWelcome(false));

/* ---------------- start ---------------- */
renderToday(); renderMeals(); renderShop(); renderNearLinks(); renderPractice(); renderLearn();
show(location.hash.slice(1) || 'today');
setInterval(() => { if (!$('v-today').hidden && !document.activeElement?.matches('textarea,input')) renderToday(); }, 60000);
if (!S.get('onboarded', false)) openWelcome(true);
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
})();

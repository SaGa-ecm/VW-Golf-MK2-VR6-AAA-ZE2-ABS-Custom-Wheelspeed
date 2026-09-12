// Pflicht-Verifikation: laeuft gegen das AUSGELIEFERTE index.html. Einmalig, danach loeschen.
const fs = require('fs');
const crypto = require('crypto');
const assert = require('assert');
const base = 'C:/Users/Admin/AppData/Local/hermes/tmp-vw-analyse/';
const html = fs.readFileSync(base + 'index.html', 'utf8');
let pass = 0;
function ok(name, fn) { fn(); pass++; console.log('PASS:', name); }

// 1) Skripte extrahieren
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
assert(scripts.length === 2, 'erwarte 2 inline-scripts, habe ' + scripts.length);
fs.writeFileSync(base + 'verify-app.js', scripts[0]);
fs.writeFileSync(base + 'verify-ui.js', scripts[1]);
console.log('scripts extrahiert:', scripts[0].length, '/', scripts[1].length);

// 2) HTML-Parser-Check: Tag-Balance (void-Elemente ausgenommen)
ok('HTML-Balance', () => {
  const voids = new Set(['meta', 'br', 'hr', 'img', 'input', 'link', 'wbr']);
  const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)(\s[^<>]*)?\/?>/g;
  const stack = [];
  let m;
  while ((m = re.exec(html))) {
    const full = m[0], tag = m[1].toLowerCase();
    if (full.startsWith('</')) {
      if (tag === 'script' || tag === 'style') continue;
      assert(stack.length && stack[stack.length - 1] === tag, 'Mismatch: /' + tag + ' (Stack: ' + stack.slice(-3) + ')');
      stack.pop();
    } else if (full.endsWith('/>') || voids.has(tag) || tag === 'script' || tag === 'style' || full.startsWith('<!')) {
      // ok (script/style als Block geprueft)
    } else stack.push(tag);
  }
  // script/style-Tags zaehlen
  assert((html.match(/<script>/g) || []).length === (html.match(/<\/script>/g) || []).length, 'script-Tags');
  assert((html.match(/<style>/g) || []).length === (html.match(/<\/style>/g) || []).length, 'style-Tags');
  assert(stack.length === 0, 'offene Tags: ' + JSON.stringify(stack.slice(0, 10)));
});

// 3) App-Logik aus Auslieferung laden
const A = require(base + 'verify-app.js');
const G = A.GRAPH;

// 4) BFS-Asserts
ok('U1/03->T28/08 Oeldruck (kein Kuehlmittel)', () => {
  const e = G.edges.filter(e => e.von === 'U1/03' && e.nach === 'T28/08');
  assert(e.length === 1, 'Kante fehlt');
  assert(/ldruck/i.test(e[0].signal), 'Signal: ' + e[0].signal);
  assert(!/kuehlmittel/i.test(e[0].signal), 'darf kein Kuehlmittel sein');
  const up = A.bfsUp(G, 'T28/08');
  assert(up.order.includes('U1/03'), 'U1/03 in HERKUNFT von T28/08');
  const km = G.edges.filter(e => e.von === 'U2/09' && e.nach === 'T28/23');
  assert(km.length === 1 && /hlmittel/i.test(km[0].signal), 'Kuehlmittel = U2/09->T28/23');
});
ok('T28/27-Kette beidseitig', () => {
  const up = A.bfsUp(G, 'T28/27');
  assert(up.order.includes('G1/11'), 'G1/11 in HERKUNFT T28/27: ' + up.order);
  assert(up.order.includes('U1/11'), 'U1/11 in HERKUNFT T28/27');
  // Ausgangsast: T28/07 -> U2/02 -> ECU:65/Tempomat (Team-Fix 12.09: Richtung korrigiert,
  // Tacho-intern T28/27 -> T28/07 ergaenzt)
  const dn07 = A.bfsDown(G, 'T28/07');
  assert(dn07.order.includes('ECU:65'), 'ECU:65 in VERLAUF T28/07');
  assert(dn07.order.includes('Tempomat'), 'Tempomat in VERLAUF T28/07');
  const up07 = A.bfsUp(G, 'T28/07');
  assert(up07.order.includes('T28/27'), 'T28/27 speist T28/07 (Tacho-intern)');
  assert(!up07.order.includes('U2/02'), 'U2/02 speist T28/07 NICHT (Richtung T28/07 -> U2/02)');
  const dnU2 = A.bfsDown(G, 'U2/02');
  assert(dnU2.order.includes('ECU:65'), 'ECU:65 in VERLAUF U2/02');
});
ok('ECU:22->T28/10 via G1/12,U1/06', () => {
  const dn = A.bfsDown(G, 'ECU:22');
  assert(dn.order.includes('T28/10'), 'T28/10 erreichbar ab ECU:22');
  assert(dn.order.includes('G1/12') && dn.order.includes('U1/06'), 'Zwischenstationen');
});
ok('W/1-Zweige Radio/Tempomat/ECU', () => {
  const dn = A.bfsDown(G, 'W/1');
  assert(dn.order.includes('Radio'), 'Radio-Zweig');
  const viaG = A.bfsDown(G, 'G1/11');
  assert(viaG.order.includes('Tempomat'), 'Tempomat-Zweig');
  assert(viaG.order.includes('ECU:65'), 'ECU-Zweig');
});
ok('G47->SG-Pin5/23', () => {
  const e1 = G.edges.filter(e => e.von === 'G47' && e.nach === 'MK02:5');
  assert(e1.length === 1, 'G47->MK02:5 fehlt');
  const e2 = G.edges.filter(e => e.von === 'MK02:23' && e.nach === 'G47');
  assert(e2.length === 1, 'MK02:23->G47 fehlt');
});
ok('MK02:19 KONFLIKT-Kante', () => {
  const e = G.edges.filter(e => e.von === 'MK02:19' && e.nach === 'W/1');
  assert(e.length === 1 && /KONFLIKT/.test(e[0].signal), 'Konfliktmarker fehlt');
});
ok('Zweige ECU:65 (Schwesterpfad Tempomat, gleiche Quelle T28/07/U2/02)', () => {
  const z = A.zweige(G, 'ECU:65');
  assert(z.includes('Tempomat'), 'Tempomat erwartet, habe: ' + z.slice(0, 8));
});
ok('pfadAnalyse T28/27 vollständig', () => {
  const a = A.pfadAnalyse(G, 'T28/27');
  assert(!a.fehler, a.fehler);
  assert(a.herkunft.order.length > 3, 'HERKUNFT zu klein');
  assert(a.intern && /T28\/07/.test(a.intern), 'Tacho-intern-Hinweis fehlt');
});

// 5) Zaehler
ok('Zaehler SG/Pins/Knoten/Kanten', () => {
  const st = A.sgStatistik();
  console.log('  SG:', st.sg, 'Pins:', st.pins, 'Knoten:', st.knoten, 'Kanten:', st.kanten);
  assert(st.sg === 27 && st.pins === 755 && st.knoten === 467 && st.kanten === 135, JSON.stringify(st));
});

// 6) Rueckfuehrbarkeit: jeder Pin hat Quelle aus bekannter Datei
ok('Pins rueckfuehrbar', () => {
  const bekannte = ['pinout_audit', 'xjamiex', 'golf1g60', 'Batch2', 'doppel-wobber', 'a2resource', 'wissensdatenbank', 'pins-motor-sg.md', 'pins-abs-getriebe.md', 'pins-komfort-wfs.md'];
  const ohne = A.SG_DATEN.pinouts.filter(p => !p.quelle || !bekannte.some(b => p.quelle.includes(b)));
  assert(ohne.length === 0, 'Pins ohne bekannte Quelle: ' + JSON.stringify(ohne.slice(0, 3)));
  const sgIds = new Set(A.SG_DATEN.sg.map(s => s.id));
  const waisen = A.SG_DATEN.pinouts.filter(p => !sgIds.has(p.steuergeraet_id));
  assert(waisen.length === 0, 'Waisen-Pins');
});

// 7) Firmware byte-identisch
ok('Firmware byte-identisch', () => {
  const orig = fs.readFileSync('C:/Users/Admin/AppData/Local/hermes/tmp-vw-priv/firmware/v1.0/tacho.ino', 'utf8');
  const h1 = crypto.createHash('sha256').update(orig, 'utf8').digest('hex');
  const h2 = crypto.createHash('sha256').update(A.FIRMWARE_INO, 'utf8').digest('hex');
  assert(h1 === h2, h1 + ' vs ' + h2);
  console.log('  SHA:', h2, '| Zeilen:', A.FIRMWARE_INO.split('\n').length);
});

// 8) sg7 55-polig + VSS-Optionen + Si/Relais
ok('Inhalte: sg7/VSS/Si/Relais', () => {
  const sg7 = A.SG_DATEN.sg.find(s => s.id === 7);
  assert(/55-pol/.test(sg7.stecker), sg7.stecker);
  const fwOpt = (globalThis.__VSS__ = null, null);
  assert(scripts[0].includes('Option A: GALA-Hallgeber'), 'VSS A fehlt');
  assert(scripts[0].includes('Option B: Arduino Nano V3'), 'VSS B fehlt');
  assert(scripts[0].includes('Motorelektronik (Steuerger'), 'Si-Liste fehlt');
  assert(scripts[0].includes('Lastabwurfrelais (X-Relais)'), 'Relais-Liste fehlt');
  assert(scripts[1].includes('FAKTOR') || scripts[1].includes('faktorRechner'), 'FAKTOR fehlt');
});

console.log('\nALLE ' + pass + ' CHECKS BESTANDEN');

/* UI-Schicht – braucht document; Logik kommt aus app-template.js */
(function () {
if (typeof document === 'undefined') return;
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function badge(txt, cls) { return '<span class="badge ' + cls + '">' + esc(txt) + '</span>'; }
function konfBadge(k) {
  if (!k) return '';
  var v = String(k).toUpperCase();
  if (v === 'HOCH' || v === 'SICHER' || v === 'AUDIT') return '';
  if (v === '-' || v === 'UNBELEGT') return badge('UNBELEGT', 'b-unbest');
  if (v.indexOf('NIEDRIG') >= 0) return badge(k + ' – prüfen!', 'b-unbest');
  return badge(k, 'b-annahme');
}
function warnBadge(w) {
  if (!w) return '';
  if (w === 'KONFLIKT') return badge('KONFLIKT – prüfen!', 'b-unbest');
  if (w === 'unbestätigt') return badge('unbestätigt', 'b-unbest');
  return badge(w, 'b-annahme');
}
function nodeLink(id) { return '<button class="nl" data-node="' + esc(id) + '">' + esc(id) + '</button>'; }

var TABLABEL = { ze2: 'ZE2', sicherungen: 'Si/Relais', tacho: 'T28', ecu: 'ECU', abs: 'ABS' };
var q = document.getElementById('q'), tabsEl = document.getElementById('tabs'), mainEl = document.getElementById('main');
var TAB = 0, kat = 'alle', selSg = null, selStecker = 'U1', selNode = null, checkState = {};
var CHECK_KEY = 'vss-check-v2';
try { checkState = JSON.parse(localStorage.getItem(CHECK_KEY) || '{}'); } catch (e) { checkState = {}; }
var CHECKS = ['Geber 321907345B: Weiß-Gelb Durchgang', 'G1/11: Signal an ZE', 'U1/11 intern: Durchgang',
  'T28/27 Blau-Weiß: Rechteck EINGANG', 'Tacho k=960 prüfen (ANNAHME – per GPS gegenmessen)',
  'T28/07 Violett: AUSGANG', 'U2/02: Verteiler Durchgang', 'ECU Pin 65 Blau-Weiß: Signal',
  'Tempomat: GRA übernimmt', 'Radio W/1 Weiß-Gelb: GALA'];
var TABS = ['Systeme', 'Stecker', 'Signalpfad', 'VSS-Lösungen', 'Rechner & Tracer', 'Check & Failsafe', 'Firmware'];

function kats() {
  var k = ['alle'];
  SG_DATEN.sg.forEach(function (s) { if (k.indexOf(s.kategorie) < 0) k.push(s.kategorie); });
  return k;
}
function pinCount(id) {
  var n = 0;
  SG_DATEN.pinouts.forEach(function (p) { if (p.steuergeraet_id === id) n++; });
  return n;
}
function matchQ(s) {
  var t = q.value.trim().toLowerCase();
  if (!t) return true;
  return s.toLowerCase().indexOf(t) >= 0;
}

function renderTabs() {
  var h = '';
  TABS.forEach(function (t, i) { h += '<button class="tab-btn' + (TAB === i ? ' active' : '') + '" data-tab="' + i + '">' + (i + 1) + ' · ' + t + '</button>'; });
  tabsEl.innerHTML = h;
  tabsEl.querySelectorAll('[data-tab]').forEach(function (b) { b.onclick = function () { TAB = +b.dataset.tab; render(); }; });
}

function renderSysteme() {
  var ks = kats(), h = '<div class="kats">';
  ks.forEach(function (k) {
    var n = k === 'alle' ? SG_DATEN.sg.length : SG_DATEN.sg.filter(function (s) { return s.kategorie === k; }).length;
    h += '<button class="kat-btn' + (kat === k ? ' active' : '') + '" data-kat="' + esc(k) + '">' + esc(k) + ' <small>' + n + '</small></button>';
  });
  h += '</div><div class="cols"><div class="list">';
  var items = SG_DATEN.sg.filter(function (s) {
    if (kat !== 'alle' && s.kategorie !== kat) return false;
    return matchQ(s.name + ' ' + (s.teilenummern || '') + ' ' + (s.stecker || ''));
  });
  if (!items.length) h += '<div class="empty">Keine Treffer.</div>';
  items.forEach(function (s) {
    var n = pinCount(s.id);
    h += '<button class="sg-btn' + (selSg === s.id ? ' active' : '') + '" data-sg="' + s.id + '"><strong>' + esc(s.name) + '</strong>' +
      (n > 0 ? badge(n + ' Pins', 'b-pins') : badge('nur Stammdaten', 'b-stamm')) +
      '<span class="tn">' + esc(s.teilenummern || s.stecker || '') + '</span></button>';
  });
  h += '</div><div class="detail">';
  var s = null;
  SG_DATEN.sg.forEach(function (x) { if (x.id === selSg) s = x; });
  if (!s) { h += '<div class="empty">System wählen, Steuergerät anklicken. Jeder Pin mit Graph-Knoten ist klickbar → Signalpfad.</div>'; }
  else {
    h += '<h2>' + esc(s.name) + '</h2><div class="mut">System: ' + esc(s.kategorie) + '</div><dl class="kv">';
    if (s.teilenummern) h += '<dt>Teilenummern</dt><dd>' + esc(s.teilenummern) + '</dd>';
    if (s.bosch_nummern) h += '<dt>Bosch-Nrn.</dt><dd>' + esc(s.bosch_nummern) + '</dd>';
    if (s.stecker) h += '<dt>Stecker</dt><dd>' + esc(s.stecker) + '</dd>';
    if (s.einbauort) h += '<dt>Einbauort</dt><dd>' + esc(s.einbauort) + '</dd>';
    if (s.fahrzeuge) h += '<dt>Fahrzeuge</dt><dd>' + esc(s.fahrzeuge) + '</dd>';
    if (s.diagnose) h += '<dt>Diagnose</dt><dd>' + esc(s.diagnose) + '</dd>';
    if (s.notizen) h += '<dt>Notizen</dt><dd>' + esc(s.notizen) + '</dd>';
    h += '</dl>';
    var pins = SG_DATEN.pinouts.filter(function (p) { return p.steuergeraet_id === s.id; });
    if (pins.length) {
      h += '<h3>Pinbelegung (' + pins.length + ')</h3><table class="pins"><tr><th>Pin</th><th>Funktion</th><th>Farbe</th><th>Hinweis / Quelle</th></tr>';
      pins.forEach(function (p) {
        var kn = sgPinZuKnoten(s.id, p.pin);
        var pinCell = kn ? nodeLink(kn) : esc(p.pin);
        var unbest = /unbest|UNBELEGT|KONFLIKT|prüfen|Annahme|ANNAHME/i.test((p.hinweis || '') + ' ' + (p.funktion || ''));
        h += '<tr><td>' + pinCell + '</td><td>' + esc(p.funktion) + '</td><td>' + esc(p.kabelfarbe || '–') + '</td><td>' +
          esc(p.hinweis || '') + ' ' + konfBadge(p.konfidenz) + (unbest ? warnBadge('unbestätigt') : '') +
          '<div class="src">Quelle: ' + esc(p.quelle || '–') + '</div></td></tr>';
      });
      h += '</table>';
    } else h += '<div class="hint">Nur Stammdaten – keine Pin-Tabelle. Vor Verdrahtung am Fahrzeug/Bentley prüfen.</div>';
  }
  h += '</div></div>';
  mainEl.innerHTML = h;
  mainEl.querySelectorAll('[data-kat]').forEach(function (b) { b.onclick = function () { kat = b.dataset.kat; selSg = null; render(); }; });
  mainEl.querySelectorAll('[data-sg]').forEach(function (b) { b.onclick = function () { selSg = +b.dataset.sg; render(); }; });
  bindNodes();
}

/* Stecker-Ansicht aus GRAPH-Knoten + sg-daten-Details */
function steckerGruppen() {
  var g = {};
  GRAPH.nodes.forEach(function (n) {
    var grp;
    if (n.tab === 'tacho') grp = 'T28';
    else if (n.tab === 'ecu') grp = 'ECU';
    else if (n.tab.indexOf('abs-') === 0) grp = n.tab === 'abs-mk02' ? 'ABS Mk02' : (n.tab === 'abs-mk04' ? 'ABS Mk04' : 'ABS Mk20');
    else if (n.tab === 'extern') grp = 'Si/Relais';
    else { var m = n.id.match(/^([A-Za-z]+\d*)\//); grp = m ? m[1] : 'ZE2 sonst'; }
    (g[grp] = g[grp] || []).push(n);
  });
  Object.keys(g).forEach(function (k) { g[k].sort(function (a, b) { return a.id < b.id ? -1 : 1; }); });
  return g;
}
function sgDetailZuKnoten(nid) {
  for (var i = 0; i < SG_DATEN.pinouts.length; i++) {
    var p = SG_DATEN.pinouts[i];
    if (sgPinZuKnoten(p.steuergeraet_id, p.pin) === nid) return p;
  }
  return null;
}
function renderStecker() {
  var grps = steckerGruppen(), keys = Object.keys(grps).sort();
  if (keys.indexOf(selStecker) < 0) selStecker = keys[0];
  var h = '<div class="kats">';
  keys.forEach(function (k) { h += '<button class="kat-btn' + (selStecker === k ? ' active' : '') + '" data-st="' + esc(k) + '">' + esc(k) + ' <small>' + grps[k].length + '</small></button>'; });
  h += '</div>';
  if (selStecker === 'Si/Relais') {
    h += '<div class="cols"><div class="detail"><h2>Sicherungen (ZE2, 22)</h2><table class="pins"><tr><th>Nr.</th><th>A</th><th>Funktion</th></tr>';
    SI_LISTE.forEach(function (s) { h += '<tr><td>Si. ' + esc(s.nr) + '</td><td>' + esc(s.amp) + '</td><td>' + esc(s.funktion) + '</td></tr>'; });
    h += '</table><div class="src">Quelle: index-v3-archiv.html (Alt-Bundle)</div>';
    h += '<h2>Relaisplätze (24)</h2><table class="pins"><tr><th>Platz</th><th>Funktion</th></tr>';
    RELAIS_LISTE.forEach(function (r) { h += '<tr><td>' + esc(r.nr) + '</td><td>' + esc(r.funktion) + '</td></tr>'; });
    h += '</table><div class="src">Quelle: index-v3-archiv.html (Alt-Bundle)</div>';
    h += '<h2>Externe Knoten (klickbar → Signalpfad)</h2><div class="crumbs">';
    grps['Si/Relais'].forEach(function (n) {
      if (!matchQ(n.id + ' ' + n.label)) return;
      h += '<button class="crumb" data-node="' + esc(n.id) + '">' + esc(n.id) + '</button>';
    });
    h += '</div></div></div>';
  } else {
    var nodes = grps[selStecker].filter(function (n) {
      if (!matchQ(n.id + ' ' + n.label)) return false;
      return true;
    });
    h += '<div class="card"><h2>' + esc(selStecker) + ' (' + nodes.length + ' Pins/Knoten)</h2>' +
      '<p class="mut">Klick auf Pin öffnet Signalpfad (HERKUNFT + VERLAUF). Quelle je Pin in der Zeile.</p>' +
      '<table class="pins"><tr><th>Pin</th><th>Funktion</th><th>Kanten</th><th>Quelle</th></tr>';
    var adj = buildAdj(GRAPH);
    nodes.forEach(function (n) {
      var d = sgDetailZuKnoten(n.id);
      var nk = ((adj.out[n.id] || []).length) + ((adj.inp[n.id] || []).length);
      h += '<tr><td>' + nodeLink(n.id) + '</td><td>' + esc(d ? d.funktion : n.label) +
        (d ? ' ' + konfBadge(d.konfidenz) : '') + (n.tab === 'extern' ? ' ' + badge(externTyp(n.id, n.label), 'b-ext') : '') + '</td>' +
        '<td>' + nk + '</td><td><div class="src">' + esc(d ? ('sg-daten: ' + d.quelle) : ('graph: ' + n.label)) + '</div></td></tr>';
    });
    h += '</table></div>';
  }
  mainEl.innerHTML = h;
  mainEl.querySelectorAll('[data-st]').forEach(function (b) { b.onclick = function () { selStecker = b.dataset.st; render(); }; });
  bindNodes('Si/Relais');
}

function kantenTabelle(liste, richtung) {
  if (!liste.length) return '<div class="empty">–</div>';
  var h = '<table class="pins"><tr><th>' + (richtung === 'up' ? 'Von (Quelle)' : 'Nach (Ziel)') + '</th><th>Signal</th><th>Quelle</th></tr>';
  liste.forEach(function (x) {
    var other = richtung === 'up' ? x.e.von : x.e.nach;
    var w = kantenWarnung(x.e);
    h += '<tr><td>' + nodeLink(other) + '</td><td>' + esc(x.e.signal || '–') + ' ' + warnBadge(w) + '</td><td><div class="src">' + esc(x.e.quelle || '–') + '</div></td></tr>';
  });
  return h + '</table>';
}
function renderPfad() {
  var h = '<div class="card"><h2>Signalpfad – Klick auf jeden Pin/Knoten</h2>' +
    '<p class="mut">HERKUNFT = alle vorgeschalteten Stationen (BFS upstream über GRAPH-Kanten) · VERLAUF = alle nachgeschalteten (BFS downstream) · ZWEIGE = Geschwisterknoten (gleiche Vor-/Nachgänger).</p>';
  var adj = buildAdj(GRAPH);
  var treffer = GRAPH.nodes.filter(function (n) { return matchQ(n.id + ' ' + n.label); }).slice(0, 60);
  h += '<div class="crumbs">' + treffer.map(function (n) { return '<button class="crumb' + (selNode === n.id ? ' sel' : '') + '" data-node="' + esc(n.id) + '">' + esc(n.id) + '</button>'; }).join('<span class="arrow">·</span>') + '</div>';
  if (!selNode) h += '<div class="empty">Knoten wählen (Suche oben oder Klick in Systeme/Stecker).</div>';
  else {
    var a = pfadAnalyse(GRAPH, selNode);
    if (a.fehler) h += '<div class="empty">' + esc(a.fehler) + '</div>';
    else {
      var d = sgDetailZuKnoten(selNode);
      h += '<h2>' + esc(selNode) + ' <span class="mut">' + esc(a.knoten.label || '') + '</span></h2>';
      if (d) h += '<p>' + esc(d.funktion) + ' ' + konfBadge(d.konfidenz) + '<div class="src">Quelle: sg-daten – ' + esc(d.quelle || '') + '</div></p>';
      if (a.knoten.tab === 'extern') h += badge(externTyp(selNode, a.knoten.label), 'b-ext');
      if (a.intern) h += '<div class="hint">' + badge('Tacho-intern', 'b-annahme') + ' ' + esc(a.intern) + '</div>';
      var upIds = a.herkunft.order.filter(function (x) { return x !== selNode; });
      var dnIds = a.verlauf.order.filter(function (x) { return x !== selNode; });
      h += '<h3>HERKUNFT (' + upIds.length + ' Stationen vorgeschaltet)</h3>';
      h += '<div class="crumbs">' + (upIds.length ? upIds.map(nodeLink).join('<span class="arrow">→</span>') : '<span class="mut">keine (Signalursprung)</span>') + '</div>';
      h += kantenTabelle((adj.inp[selNode] || []).map(function (e) { return { e: e }; }), 'up');
      h += '<h3>VERLAUF (' + dnIds.length + ' Stationen nachgeschaltet)</h3>';
      h += '<div class="crumbs">' + (dnIds.length ? dnIds.map(nodeLink).join('<span class="arrow">→</span>') : '<span class="mut">keine (Senke)</span>') + '</div>';
      h += kantenTabelle((adj.out[selNode] || []).map(function (e) { return { e: e }; }), 'down');
      h += '<h3>ZWEIGE – Geschwisterknoten (' + a.zweige.length + ')</h3>';
      h += '<div class="crumbs">' + (a.zweige.length ? a.zweige.map(nodeLink).join('<span class="arrow">·</span>') : '<span class="mut">keine</span>') + '</div>';
      if (a.extern.length) {
        h += '<h3>EXTERN-Anschlüsse</h3><div>' + a.extern.map(function (x) { return nodeLink(x.id) + ' ' + badge(x.typ, 'b-ext'); }).join(' ') + '</div>';
      }
    }
  }
  h += '</div>';
  mainEl.innerHTML = h;
  bindNodes();
}

function renderVSS() {
  var h = '';
  VSS_OPTS.forEach(function (o) {
    h += '<div class="card"><h2>' + esc(o.titel) + '</h2><div>' + badge(o.schwierigkeit, 'b-pins') + ' ' + badge(o.kosten, 'b-stamm') + '</div>' +
      '<p>' + esc(o.beschreibung) + '</p><p class="warn">' + badge('Voraussetzung', 'b-annahme') + ' ' + esc(o.voraussetzung) + '</p>';
    if (o.teile && o.teile.length) {
      h += '<h3>Teile</h3><table class="pins"><tr><th>Bauteil</th><th>Nummer</th><th>Preis</th></tr>';
      o.teile.forEach(function (t) { h += '<tr><td>' + esc(t.bezeichnung) + '</td><td>' + esc(t.teilenummer) + '</td><td>' + esc(t.preis) + '</td></tr>'; });
      h += '</table>';
    }
    if (o.schritte && o.schritte.length) {
      h += '<h3>Schritte</h3>';
      o.schritte.forEach(function (s) { h += '<div class="step"><b>' + s.nr + '.</b> ' + esc(s.text) + (s.kabel ? '<div class="mono">Verkabelung: ' + esc(s.kabel) + '</div>' : '') + '</div>'; });
    }
    h += '<div class="src">Quelle: index-v3-archiv.html (VSS-Option ' + esc(o.id) + ')</div></div>';
  });
  h += '<div class="card"><h2>Firmware v1.0 (tacho.ino, byte-identisch)</h2>' +
    '<p class="mut">SHA-256: <span class="mono">' + esc(FIRMWARE_SHA) + '</span> · ' + FIRMWARE_INO.split('\n').length + ' Zeilen · ' +
    '<button class="calc" id="fwCopy">Code kopieren</button> <a class="calc" id="fwDl" download="tacho.ino">tacho.ino laden</a></p>' +
    '<pre id="fwPre">' + esc(FIRMWARE_INO) + '</pre><div class="src">Quelle: firmware/v1.0/tacho.ino (privates Repo, byte-identisch eingebettet)</div></div>';
  mainEl.innerHTML = h;
  document.getElementById('fwCopy').onclick = function () {
    if (navigator.clipboard) navigator.clipboard.writeText(FIRMWARE_INO);
  };
  document.getElementById('fwDl').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(FIRMWARE_INO);
}

function renderRechner() {
  var h = '<div class="card"><h2>FAKTOR-Rechner</h2>' +
    '<p class="mut">FAKTOR = (960 × 4) / (Zähne × 1000 / Reifenumfang). Hz@100 km/h = v / Umfang × Zähne × FAKTOR. (ANNAHME k=960 – per GPS verifizieren!)</p>' +
    '<label>Reifenumfang (m), z. B. 195/50R15 ≈ 1,83</label><input id="circ" type="number" step="0.001" value="1.83">' +
    '<label>Zähnezahl ABS-Ring (VA)</label><input id="teeth" type="number" step="1" value="45">' +
    '<label>k-Zahl Tacho (Annahme)</label><input id="kval" type="number" step="1" value="960">' +
    '<button class="calc" id="calcBtn">Berechnen</button><div class="result" id="calcOut">–</div>' +
    '<p class="mut">Referenz: 195/50R15 (1,83 m), 45 Zähne, k=960 → FAKTOR ≈ 0,156 · Hz@100 ≈ 107 Hz.</p>' +
    '<div class="src">Quelle: signalpfad.html (FAKTOR-Rechner)</div></div>';
  h += '<div class="card"><h2>DZM-Tracer</h2><table class="pins"><tr><th>Von</th><th>Nach</th><th>Sollwert</th></tr>' +
    '<tr><td>' + nodeLink('ECU:22') + '</td><td>→ ' + nodeLink('G1/12') + '</td><td>Drehzahlsignal ab ECU</td></tr>' +
    '<tr><td>' + nodeLink('G1/12') + '</td><td>→ ' + nodeLink('U1/06') + '</td><td>ZE-intern</td></tr>' +
    '<tr><td>' + nodeLink('U1/06') + '</td><td>→ ' + nodeLink('T28/10') + '</td><td>DZM-Eingang Tacho</td></tr></table>' +
    '<p class="warn">6-Zylinder-ECU an 4-Zylinder-DZM → 6→4-Wandler nötig, sonst falsche Anzeige!</p><div class="src">Quelle: docs/graph-notizen.md + signalpfad.html</div></div>';
  h += '<div class="card"><h2>MFA-Tracer</h2><table class="pins"><tr><th>Von</th><th>Nach</th><th>Sollwert</th></tr>' +
    '<tr><td>' + nodeLink('ECU:51') + '</td><td>→ ' + nodeLink('T28/26') + '</td><td>Verbrauchssignal MFA (direkt, kein ZE-Umweg)</td></tr></table>' +
    '<div class="src">Quelle: signalpfad.html (MFA-Tracer)</div></div>';
  mainEl.innerHTML = h;
  document.getElementById('calcBtn').onclick = function () {
    var r = faktorRechner(parseFloat(document.getElementById('circ').value), parseFloat(document.getElementById('teeth').value), parseFloat(document.getElementById('kval').value));
    document.getElementById('calcOut').textContent = r.fehler ? r.fehler : ('FAKTOR = ' + r.faktor.toFixed(4) + '  ·  Hz@100 km/h ≈ ' + r.hz.toFixed(1) + ' Hz');
  };
  bindNodes();
}

function renderCheck() {
  var done = 0, h = '<div class="card"><h2>Checkliste <span class="mut" id="progTxt"></span></h2><div class="prog"><div id="progBar"></div></div><div id="checks"></div>';
  h += '<button class="calc" id="resetBtn" style="background:#222;color:#bbb">Fortschritt zurücksetzen</button><div class="src">Quelle: signalpfad.html (Checkliste)</div></div>';
  h += '<div class="card"><h2>Failsafe-Hinweise (belegt, vor Verdrahtung lesen)</h2><table class="pins"><tr><th>Hinweis</th><th>Quelle</th></tr>';
  var fails = [
    ['Arduino-Masse (5V) und Bordnetz-Masse (12V) NICHT verbinden – galvanisch getrennt (PC817), sonst Masseschleifen/Spannungsspitzen.', 'VSS-Option B, Schritt 2'],
    ['ABS-VR-Paar (Pin 5 Braun / Pin 23 Braun-Weiß) nur hochohmig abgreifen, verdrillt lassen, KEINEN Leiter auf Masse legen.', 'VSS-Option B, Schritt 3'],
    ['ECU nur über Standard-Pfad T28/07 → U2/02 → ECU:65 versorgen; Parallel-Abgriff vom Geber nur als Ausnahme (Pegelbelastung/Rückwirkung).', 'VSS-Option A, Schritt 4'],
    ['GALA-12V an Kl.15 über Si. 16 (15A) absichern; Masse an Karosserie.', 'VSS-Option A, Schritt 5'],
    ['VR6-DZM (ECU:22) braucht 6→4-Zylinder-Wandler + Zündsignalsimulator – ohne Wandler keine Anzeige.', 'T28/10-Hinweis (Alt-Bundle)'],
    ['Mk04 Ventil-Rückleitungen: KEIN Dauerplus, nicht auf 12 V legen (Kurzschlussgefahr).', 'Alt-Bundle Mk04 Pins 33/34'],
    ['k=960 und ~107 Hz @100 km/h sind ANNAHMEN – per GPS gegenmessen (DB nennt ~525 Hz).', 'docs/graph-notizen.md Konflikt 3'],
    ['Mk02 Pin 19 (VSS) ist UMSTRITTEN (KEIN VSS lt. index.html m19) – am Fahrzeug verifizieren.', 'docs/graph-notizen.md Konflikt 1'],
    ['Airbag: Zünder-/Sensor-Pins ohne SLP nicht belegbar – NIEMALS an Zünderpins messen/prüfen.', 'docs/pins-komfort-wfs.md'],
    ['Alle Angaben ohne Gewähr – vor Verdrahtung gegenmessen (Bentley-Stromlaufplan Nr. 33–35).', 'Alt-Bundle / signalpfad.html']
  ];
  fails.forEach(function (f) { h += '<tr><td>' + esc(f[0]) + '</td><td><div class="src">' + esc(f[1]) + '</div></td></tr>'; });
  h += '</table></div>';
  mainEl.innerHTML = h;
  var box = document.getElementById('checks');
  function renderChecks() {
    box.innerHTML = ''; done = 0;
    CHECKS.forEach(function (t, i) {
      if (checkState[i]) done++;
      var d = document.createElement('label'); d.className = 'chk' + (checkState[i] ? ' done' : '');
      var c = document.createElement('input'); c.type = 'checkbox'; c.checked = !!checkState[i];
      c.onchange = function () { checkState[i] = c.checked; try { localStorage.setItem(CHECK_KEY, JSON.stringify(checkState)); } catch (e) {} renderChecks(); };
      var s = document.createElement('span'); s.className = 'txt'; s.textContent = (i + 1) + '. ' + t;
      d.appendChild(c); d.appendChild(s); box.appendChild(d);
    });
    document.getElementById('progBar').style.width = (done / CHECKS.length * 100) + '%';
    document.getElementById('progTxt').textContent = done + '/' + CHECKS.length;
  }
  renderChecks();
  document.getElementById('resetBtn').onclick = function () { checkState = {}; try { localStorage.removeItem(CHECK_KEY); } catch (e) {} renderChecks(); };
}

function renderFw() {
  mainEl.innerHTML = '<div class="card"><h2>Firmware v1.0 – tacho.ino</h2><p class="mut">Siehe Tab „VSS-Lösungen“ (Firmware-Box, byte-identisch, SHA-256 <span class="mono">' + esc(FIRMWARE_SHA.slice(0, 16)) + '…</span>).</p></div>';
}

function bindNodes(extraStecker) {
  mainEl.querySelectorAll('[data-node]').forEach(function (b) {
    b.onclick = function () { selNode = b.dataset.node; TAB = 2; render(); };
  });
}

function render() {
  renderTabs();
  if (TAB === 0) renderSysteme();
  else if (TAB === 1) renderStecker();
  else if (TAB === 2) renderPfad();
  else if (TAB === 3) renderVSS();
  else if (TAB === 4) renderRechner();
  else if (TAB === 5) renderCheck();
  else renderFw();
  var st = sgStatistik();
  document.getElementById('stat').textContent = st.sg + ' Steuergeräte · ' + st.pins + ' Pins · ' + st.knoten + ' Knoten · ' + st.kanten + ' Kanten';
}
q.addEventListener('input', function () { render(); });
document.addEventListener('keydown', function (e) {
  if (e.key === '/' && document.activeElement !== q && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
  else if (e.key === 'Escape') { q.value = ''; selNode = null; render(); q.blur(); }
  else if (/^[1-7]$/.test(e.key) && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { TAB = +e.key - 1; render(); }
});
render();
})();

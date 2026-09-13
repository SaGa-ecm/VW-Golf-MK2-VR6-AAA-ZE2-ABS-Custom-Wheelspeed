/* UI-Schicht – gefuehrter Assistent: 1 Fahrzeug, 2 Steuergeraete, 3 Verarbeiten, 4 Ergebnis */
(function () {
if (typeof document === 'undefined') return;
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function badge(txt, cls) { return '<span class="badge ' + cls + '">' + esc(txt) + '</span>'; }
/* Sicherheits-Markierung: nur ⚠ wenn unbestätigt/Annahme/Konflikt (keine Herkunftsangaben) */
function safetyMark(p) {
  var t = ((p && p.hinweis) || '') + ' ' + ((p && p.funktion) || '') + ' ' + ((p && p.konfidenz) || '');
  if (/KONFLIKT/i.test(t)) return ' ' + badge('⚠ Konflikt – prüfen!', 'b-unbest');
  if (/unbest|UNBELEGT|Annahme|ANNAHME|NIEDRIG/i.test(t)) return ' ' + badge('⚠ prüfen', 'b-unbest');
  return '';
}
function nodeLink(id) { return '<button class="nl" data-node="' + esc(id) + '">' + esc(id) + '</button>'; }

var SCHRITTE = ['1 · Fahrzeug', '2 · Steuergeräte', '3 · Verarbeiten', '4 · Ergebnis'];
var q = document.getElementById('q'), tabsEl = document.getElementById('tabs'), mainEl = document.getElementById('main');
var STORE_KEY = 'vw-assistent-v1';
var state = { step: 0, cfg: JSON.parse(JSON.stringify(FAHRZEUG_DEFAULT)), sel: [], selSg: null, selNode: null, checkState: {}, gebaut: false };
try {
  var saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
  if (saved && saved.cfg) state = saved;
} catch (e) {}
if (!state.cfg) state.cfg = JSON.parse(JSON.stringify(FAHRZEUG_DEFAULT));
if (!state.sel || !state.sel.length) state.sel = fahrzeugZuSg(state.cfg);
function speichern() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
function sgById(id) { for (var i = 0; i < SG_DATEN.sg.length; i++) if (SG_DATEN.sg[i].id === id) return SG_DATEN.sg[i]; return null; }
function pinCount(id) { var n = 0; SG_DATEN.pinouts.forEach(function (p) { if (p.steuergeraet_id === id) n++; }); return n; }
function matchQ(s) { var t = q.value.trim().toLowerCase(); if (!t) return true; return String(s).toLowerCase().indexOf(t) >= 0; }
function go(n) { state.step = n; speichern(); render(); window.scrollTo(0, 0); }

function renderSteps() {
  var h = '';
  SCHRITTE.forEach(function (t, i) {
    var cls = 'tab-btn' + (state.step === i ? ' active' : '') + (i === 3 && !state.gebaut ? ' disabled' : '');
    h += '<button role="tab" aria-selected="' + (state.step === i ? 'true' : 'false') + '" class="' + cls + '" data-step="' + i + '">' + t + '</button>';
  });
  tabsEl.innerHTML = h;
  tabsEl.querySelectorAll('[data-step]').forEach(function (b) {
    b.onclick = function () { var n = +b.dataset.step; if (n === 3 && !state.gebaut) return; go(n); };
  });
}

/* ---- Schritt 1: Fahrzeugauswahl ---- */
function renderFahrzeug() {
  var h = '<div class="card"><h2>Dein Fahrzeug – was ist verbaut?</h2>' +
    '<p class="mut">Wähle Motor, ABS, Getriebe und Ausstattung. Daraus werden automatisch die relevanten Steuergeräte bestimmt (nächster Schritt).</p></div>';
  FAHRZEUG_GRUPPEN.forEach(function (g) {
    h += '<div class="card"><h2>' + esc(g.titel) + '</h2><div class="opts">';
    g.optionen.forEach(function (o) {
      var aktiv = g.typ === 'single' ? (state.cfg[g.id] === o.id) : ((state.cfg[g.id] || []).indexOf(o.id) >= 0);
      h += '<button class="opt' + (aktiv ? ' active' : '') + '" data-grp="' + g.id + '" data-opt="' + o.id + '">' + esc(o.label) + '</button>';
    });
    h += '</div></div>';
  });
  var auto = fahrzeugZuSg(state.cfg);
  h += '<div class="card"><h2>Vorschau: ' + auto.length + ' Steuergeräte erkannt</h2><div>' +
    auto.map(function (id) { var s = sgById(id); return s ? '<span class="chip">' + esc(s.name) + '</span>' : ''; }).join('') +
    '</div><button class="calc" data-weiter>Weiter zu den Steuergeräten →</button></div>';
  mainEl.innerHTML = h;
  mainEl.querySelectorAll('[data-grp]').forEach(function (b) {
    b.onclick = function () {
      var g = FAHRZEUG_GRUPPEN.filter(function (x) { return x.id === b.dataset.grp; })[0];
      if (g.typ === 'single') state.cfg[g.id] = b.dataset.opt;
      else {
        var arr = state.cfg[g.id] || (state.cfg[g.id] = []);
        var ix = arr.indexOf(b.dataset.opt);
        if (ix >= 0) arr.splice(ix, 1); else arr.push(b.dataset.opt);
      }
      state.sel = fahrzeugZuSg(state.cfg);
      state.gebaut = false;
      speichern(); render();
    };
  });
  mainEl.querySelectorAll('[data-weiter]').forEach(function (b) { b.onclick = function () { go(1); }; });
}

/* ---- Schritt 2: Steuergeräte auswählen ---- */
function renderSteuergeraete() {
  var kats = {};
  SG_DATEN.sg.forEach(function (s) { (kats[s.kategorie] = kats[s.kategorie] || []).push(s); });
  var h = '<div class="card"><h2>Steuergeräte prüfen und anpassen</h2>' +
    '<p class="mut">Aus deiner Fahrzeugauswahl übernommen – hake an/ab, was wirklich verbaut ist. ' +
    badge(state.sel.length + ' gewählt', 'b-pins') + '</p>' +
    '<button class="kat-btn" data-alle>Alle wählen</button> ' +
    '<button class="kat-btn" data-auto>Aus Fahrzeug übernehmen</button> ' +
    '<button class="kat-btn" data-keine>Keine</button></div>';
  Object.keys(kats).sort().forEach(function (k) {
    h += '<div class="card"><h2>' + esc(k) + '</h2>';
    kats[k].forEach(function (s) {
      if (!matchQ(s.name + ' ' + (s.teilenummern || ''))) return;
      var an = state.sel.indexOf(s.id) >= 0;
      h += '<label class="chk' + (an ? ' done-chk' : '') + '"><input type="checkbox" data-sg="' + s.id + '"' + (an ? ' checked' : '') + '>' +
        '<span class="txt"><strong>' + esc(s.name) + '</strong> ' + badge(pinCount(s.id) + ' Pins', 'b-pins') +
        '<br><span class="mut small">' + esc([s.teilenummern, s.stecker].filter(Boolean).join(' · ')) + '</span></span></label>';
    });
    h += '</div>';
  });
  h += '<div class="card"><button class="calc" data-zurueck>← Fahrzeug</button> ' +
    '<button class="calc" data-weiter>Weiter zum Verarbeiten →</button></div>';
  mainEl.innerHTML = h;
  mainEl.querySelectorAll('[data-sg]').forEach(function (c) {
    c.onchange = function () {
      var id = +c.dataset.sg, ix = state.sel.indexOf(id);
      if (c.checked && ix < 0) state.sel.push(id);
      if (!c.checked && ix >= 0) state.sel.splice(ix, 1);
      state.sel.sort(function (a, b) { return a - b; });
      state.gebaut = false;
      speichern(); render();
    };
  });
  mainEl.querySelectorAll('[data-alle]').forEach(function (b) { b.onclick = function () { state.sel = SG_DATEN.sg.map(function (s) { return s.id; }); state.gebaut = false; speichern(); render(); }; });
  mainEl.querySelectorAll('[data-keine]').forEach(function (b) { b.onclick = function () { state.sel = FAHRZEUG_IMMER.slice(); state.gebaut = false; speichern(); render(); }; });
  mainEl.querySelectorAll('[data-auto]').forEach(function (b) { b.onclick = function () { state.sel = fahrzeugZuSg(state.cfg); state.gebaut = false; speichern(); render(); }; });
  mainEl.querySelectorAll('[data-zurueck]').forEach(function (b) { b.onclick = function () { go(0); }; });
  mainEl.querySelectorAll('[data-weiter]').forEach(function (b) { b.onclick = function () { go(2); }; });
}

/* ---- Schritt 3: Verarbeiten ---- */
function renderVerarbeiten() {
  var erg = baueErgebnis(state.sel);
  var h = '<div class="card"><h2>Verarbeiten – deine Auswahl im Überblick</h2>' +
    '<p>' + badge(erg.anzahlSg + ' Steuergeräte', 'b-pins') + ' ' + badge(erg.anzahlPins + ' Pins', 'b-pins') + '</p><div>' +
    erg.sgs.map(function (s) { return '<span class="chip">' + esc(s.name) + '</span>'; }).join('') + '</div></div>';
  h += '<div class="card"><h2>Signalprüfung</h2><table class="pins"><tr><th>Signal</th><th>Status</th></tr>';
  erg.pruefungen.forEach(function (p) {
    h += '<tr><td><strong>' + esc(p.titel) + '</strong><br><span class="mut small">' + esc(p.text) + '</span></td>' +
      '<td>' + (p.ok ? badge('✓ OK', 'b-pins') : badge('⚠ Lücke', 'b-unbest')) + '</td></tr>';
  });
  h += '</table></div>';
  h += '<div class="card"><button class="calc" data-zurueck>← Steuergeräte</button> ' +
    '<button class="calc" data-bauen>Fertiges Pinout erstellen →</button></div>';
  mainEl.innerHTML = h;
  mainEl.querySelectorAll('[data-zurueck]').forEach(function (b) { b.onclick = function () { go(1); }; });
  mainEl.querySelectorAll('[data-bauen]').forEach(function (b) { b.onclick = function () { state.gebaut = true; speichern(); go(3); }; });
}

/* ---- Schritt 4: fertiges interaktives Pinout ---- */
function sgDetailZuKnoten(nid) {
  for (var i = 0; i < SG_DATEN.pinouts.length; i++) {
    var p = SG_DATEN.pinouts[i];
    if (sgPinZuKnoten(p.steuergeraet_id, p.pin) === nid) return p;
  }
  return null;
}
function kantenTabelle(liste, richtung) {
  if (!liste.length) return '<div class="empty">–</div>';
  var h = '<table class="pins"><tr><th>' + (richtung === 'up' ? 'Von' : 'Nach') + '</th><th>Signal</th></tr>';
  liste.forEach(function (x) {
    var other = richtung === 'up' ? x.e.von : x.e.nach;
    h += '<tr><td>' + nodeLink(other) + '</td><td>' + esc(x.e.signal || '–') + '</td></tr>';
  });
  return h + '</table>';
}
function renderErgebnis() {
  var erg = baueErgebnis(state.sel);
  var h = '<div class="card result-head"><h2>Fertiges Pinout: ' + erg.anzahlSg + ' Steuergeräte · ' + erg.anzahlPins + ' Pins</h2>' +
    '<p class="mut">Suche oben filtern · jeder Pin mit Verknüpfung öffnet seinen Signalpfad weiter unten.</p>' +
    '<div class="kats"><button class="kat-btn" data-goto="sec-pins">Pinbelegung</button>' +
    '<button class="kat-btn" data-goto="sec-pfad">Signalpfad</button>' +
    '<button class="kat-btn" data-goto="sec-vss">VSS-Lösung</button>' +
    '<button class="kat-btn" data-goto="sec-rechner">Rechner</button>' +
    '<button class="kat-btn" data-goto="sec-check">Checkliste</button>' +
    '<button class="kat-btn" data-goto="sec-fw">Firmware</button>' +
    '<button class="kat-btn" data-edit>Auswahl ändern</button></div></div>';

  /* Pinbelegung je Steuergerät */
  h += '<div class="card" id="sec-pins"><h2>Pinbelegung</h2>';
  erg.sgs.forEach(function (s) {
    var pins = SG_DATEN.pinouts.filter(function (p) { return p.steuergeraet_id === s.id; })
      .filter(function (p) { return matchQ(p.pin + ' ' + p.funktion + ' ' + (p.kabelfarbe || '') + ' ' + s.name); });
    if (!pins.length && q.value.trim()) return;
    h += '<h3>' + esc(s.name) + ' (' + pins.length + ')' + (s.stecker ? ' <span class="mut small">' + esc(s.stecker) + '</span>' : '') + '</h3>';
    if (!pins.length) { h += '<div class="hint">Nur Stammdaten – keine Pin-Tabelle. Vor Verdrahtung am Fahrzeug prüfen.</div>'; return; }
    h += '<table class="pins"><tr><th>Pin</th><th>Funktion</th><th>Farbe</th></tr>';
    pins.forEach(function (p) {
      var kn = sgPinZuKnoten(s.id, p.pin);
      h += '<tr><td>' + (kn ? nodeLink(kn) : esc(p.pin)) + '</td><td>' + esc(p.funktion) + safetyMark(p) + '</td><td>' + esc(p.kabelfarbe || '–') + '</td></tr>';
    });
    h += '</table>';
  });
  h += '</div>';

  /* Signalpfad */
  var adj = buildAdj(GRAPH);
  var treffer = GRAPH.nodes.filter(function (n) { return matchQ(n.id + ' ' + n.label); }).slice(0, 60);
  h += '<div class="card" id="sec-pfad"><h2>Signalpfad – VSS verfolgen</h2>' +
    '<p class="mut">HERKUNFT = alle vorgeschalteten Stationen · VERLAUF = alle nachgeschalteten · ZWEIGE = Geschwisterknoten.</p>' +
    '<div class="crumbs">' + treffer.map(function (n) { return '<button class="crumb' + (state.selNode === n.id ? ' sel' : '') + '" data-node="' + esc(n.id) + '">' + esc(n.id) + '</button>'; }).join('<span class="arrow">·</span>') + '</div>';
  if (!state.selNode) h += '<div class="empty">Knoten wählen – z. B. T28/27 (VSS-Eingang), T28/07 (VSS-Ausgang) oder ECU:65.</div>';
  else {
    var a = pfadAnalyse(GRAPH, state.selNode);
    if (a.fehler) h += '<div class="empty">' + esc(a.fehler) + '</div>';
    else {
      var d = sgDetailZuKnoten(state.selNode);
      h += '<h3>' + esc(state.selNode) + ' <span class="mut">' + esc(a.knoten.label || '') + '</span></h3>';
      if (d) h += '<p>' + esc(d.funktion) + safetyMark(d) + '</p>';
      if (a.intern) h += '<div class="hint">' + badge('Tacho-intern', 'b-annahme') + ' ' + esc(a.intern) + '</div>';
      var upIds = a.herkunft.order.filter(function (x) { return x !== state.selNode; });
      var dnIds = a.verlauf.order.filter(function (x) { return x !== state.selNode; });
      h += '<h3>HERKUNFT (' + upIds.length + ' Stationen)</h3>';
      h += '<div class="crumbs">' + (upIds.length ? upIds.map(nodeLink).join('<span class="arrow">→</span>') : '<span class="mut">keine (Signalursprung)</span>') + '</div>';
      h += kantenTabelle((adj.inp[state.selNode] || []).map(function (e) { return { e: e }; }), 'up');
      h += '<h3>VERLAUF (' + dnIds.length + ' Stationen)</h3>';
      h += '<div class="crumbs">' + (dnIds.length ? dnIds.map(nodeLink).join('<span class="arrow">→</span>') : '<span class="mut">keine (Senke)</span>') + '</div>';
      h += kantenTabelle((adj.out[state.selNode] || []).map(function (e) { return { e: e }; }), 'down');
      if (a.zweige.length) h += '<h3>ZWEIGE (' + a.zweige.length + ')</h3><div class="crumbs">' + a.zweige.map(nodeLink).join('<span class="arrow">·</span>') + '</div>';
      if (a.extern.length) h += '<h3>Externe Anschlüsse</h3><div>' + a.extern.map(function (x) { return nodeLink(x.id) + ' ' + badge(x.typ, 'b-ext'); }).join(' ') + '</div>';
    }
  }
  h += '</div>';

  /* VSS-Lösungen */
  h += '<div class="card" id="sec-vss"><h2>VSS-Lösung</h2>';
  VSS_OPTS.forEach(function (o) {
    h += '<div class="card"><h3>' + esc(o.titel) + '</h3><div>' + badge(o.schwierigkeit, 'b-pins') + ' ' + badge(o.kosten, 'b-stamm') + '</div>' +
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
    h += '</div>';
  });
  h += '</div>';

  /* Rechner */
  h += '<div class="card" id="sec-rechner"><h2>FAKTOR-Rechner</h2>' +
    '<p class="mut">k = 960 ist eine Annahme – per GPS verifizieren!</p>' +
    '<label>Reifenumfang (m), z. B. 195/50R15 ≈ 1,83</label><input id="circ" type="number" step="0.001" value="1.83">' +
    '<label>Zähnezahl ABS-Ring (VA)</label><input id="teeth" type="number" step="1" value="45">' +
    '<label>k-Zahl Tacho (Annahme)</label><input id="kval" type="number" step="1" value="960">' +
    '<button class="calc" id="calcBtn">Berechnen</button><div class="result" id="calcOut">–</div></div>';
  h += '<div class="card"><h2>Drehzahl- und MFA-Prüfung</h2><table class="pins"><tr><th>Von</th><th>Nach</th><th>Sollwert</th></tr>' +
    '<tr><td>' + nodeLink('ECU:22') + '</td><td>→ ' + nodeLink('T28/10') + '</td><td>Drehzahlsignal via G1/12, U1/06</td></tr>' +
    '<tr><td>' + nodeLink('ECU:51') + '</td><td>→ ' + nodeLink('T28/26') + '</td><td>Verbrauchssignal MFA (direkt)</td></tr></table>' +
    '<p class="warn">6-Zylinder-ECU an 4-Zylinder-DZM → 6→4-Wandler nötig, sonst falsche Anzeige!</p></div>';

  /* Checkliste + Failsafe */
  var CHECKS = ['Geber 321907345B: Weiß-Gelb Durchgang', 'G1/11: Signal an ZE', 'U1/11 intern: Durchgang',
    'T28/27 Blau-Weiß: Rechteck EINGANG', 'Tacho k=960 prüfen (Annahme – per GPS gegenmessen)',
    'T28/07 Violett: AUSGANG', 'U2/02: Verteiler Durchgang', 'ECU Pin 65 Blau-Weiß: Signal',
    'Tempomat: GRA übernimmt', 'Radio W/1 Weiß-Gelb: GALA'];
  var done = CHECKS.filter(function (_, i) { return state.checkState[i]; }).length;
  h += '<div class="card" id="sec-check"><h2>Checkliste ' + done + '/' + CHECKS.length + '</h2><div class="prog"><div style="width:' + (done / CHECKS.length * 100) + '%"></div></div><div id="checks"></div>' +
    '<button class="calc" id="resetBtn" style="background:#222;color:#bbb">Fortschritt zurücksetzen</button></div>';
  h += '<div class="card"><h2>Wichtig – vor Verdrahtung lesen</h2><table class="pins"><tr><th>Hinweis</th></tr>';
  ['Arduino-Masse (5V) und Bordnetz-Masse (12V) NICHT verbinden – galvanisch getrennt (PC817), sonst Masseschleifen/Spannungsspitzen.',
   'ABS-Geberpaar nur hochohmig abgreifen, verdrillt lassen, KEINEN Leiter auf Masse legen.',
   'ECU nur über Standard-Pfad T28/07 → U2/02 → ECU:65 versorgen.',
   'GALA-12V an Kl.15 über Si. 16 (15A) absichern; Masse an Karosserie.',
   'VR6-DZM (ECU:22) braucht 6→4-Zylinder-Wandler – ohne Wandler keine Anzeige.',
   'Mk04 Ventil-Rückleitungen: KEIN Dauerplus, nicht auf 12 V legen (Kurzschlussgefahr).',
   'k=960 und ~107 Hz @100 km/h sind ANNAHMEN – per GPS gegenmessen.',
   'Mk02 Pin 19 (VSS) ist UMSTRITTEN – am Fahrzeug verifizieren.',
   'Airbag: NIEMALS an Zünderpins messen/prüfen.',
   'Alle Angaben ohne Gewähr – vor Verdrahtung gegenmessen.'
  ].forEach(function (f) { h += '<tr><td>' + esc(f) + '</td></tr>'; });
  h += '</table></div>';

  /* Sicherungen/Relais + Firmware */
  h += '<div class="card"><h2>Sicherungen (ZE2, 22)</h2><table class="pins"><tr><th>Nr.</th><th>A</th><th>Funktion</th></tr>';
  SI_LISTE.forEach(function (s) { h += '<tr><td>Si. ' + esc(s.nr) + '</td><td>' + esc(s.amp) + '</td><td>' + esc(s.funktion) + '</td></tr>'; });
  h += '</table><h2>Relaisplätze (24)</h2><table class="pins"><tr><th>Platz</th><th>Funktion</th></tr>';
  RELAIS_LISTE.forEach(function (r) { h += '<tr><td>' + esc(r.nr) + '</td><td>' + esc(r.funktion) + '</td></tr>'; });
  h += '</table></div>';
  h += '<div class="card" id="sec-fw"><h2>Firmware v1.0 (tacho.ino)</h2>' +
    '<p class="mut">SHA-256: <span class="mono">' + esc(FIRMWARE_SHA) + '</span> · ' + FIRMWARE_INO.split('\n').length + ' Zeilen · ' +
    '<button class="calc" id="fwCopy">Code kopieren</button> <a class="calc" id="fwDl" download="tacho.ino">tacho.ino laden</a></p>' +
    '<pre id="fwPre">' + esc(FIRMWARE_INO) + '</pre></div>';

  mainEl.innerHTML = h;
  mainEl.querySelectorAll('[data-goto]').forEach(function (b) {
    b.onclick = function () { var el = document.getElementById(b.dataset.goto); if (el) el.scrollIntoView(); };
  });
  mainEl.querySelectorAll('[data-edit]').forEach(function (b) { b.onclick = function () { go(1); }; });
  mainEl.querySelectorAll('[data-node]').forEach(function (b) {
    b.onclick = function () {
      state.selNode = b.dataset.node; speichern(); render();
      var el = document.getElementById('sec-pfad'); if (el) el.scrollIntoView();
    };
  });
  document.getElementById('calcBtn').onclick = function () {
    var r = faktorRechner(parseFloat(document.getElementById('circ').value), parseFloat(document.getElementById('teeth').value), parseFloat(document.getElementById('kval').value));
    document.getElementById('calcOut').textContent = r.fehler ? r.fehler : ('FAKTOR = ' + r.faktor.toFixed(4) + '  ·  Hz@100 km/h ≈ ' + r.hz.toFixed(1) + ' Hz');
  };
  var box = document.getElementById('checks');
  function renderChecks() {
    box.innerHTML = '';
    CHECKS.forEach(function (t, i) {
      var d = document.createElement('label'); d.className = 'chk' + (state.checkState[i] ? ' done' : '');
      var c = document.createElement('input'); c.type = 'checkbox'; c.checked = !!state.checkState[i];
      c.onchange = function () { state.checkState[i] = c.checked; speichern(); render(); };
      var s = document.createElement('span'); s.className = 'txt'; s.textContent = (i + 1) + '. ' + t;
      d.appendChild(c); d.appendChild(s); box.appendChild(d);
    });
  }
  renderChecks();
  document.getElementById('resetBtn').onclick = function () { state.checkState = {}; speichern(); render(); };
  document.getElementById('fwCopy').onclick = function () { if (navigator.clipboard) navigator.clipboard.writeText(FIRMWARE_INO); };
  document.getElementById('fwDl').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(FIRMWARE_INO);
}

function render() {
  renderSteps();
  q.style.display = state.step === 3 ? '' : 'none';
  if (state.step === 0) renderFahrzeug();
  else if (state.step === 1) renderSteuergeraete();
  else if (state.step === 2) renderVerarbeiten();
  else renderErgebnis();
  var st = sgStatistik();
  document.getElementById('stat').textContent = st.sg + ' Steuergeräte · ' + st.pins + ' Pins · ' + st.knoten + ' Knoten · ' + st.kanten + ' Kanten';
}
q.addEventListener('input', function () { if (state.step === 3) render(); });
document.addEventListener('keydown', function (e) {
  if (e.key === '/' && document.activeElement !== q && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
  else if (e.key === 'Escape') { q.value = ''; state.selNode = null; if (state.step === 3) render(); q.blur(); }
  else if (/^[1-4]$/.test(e.key) && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { var n = +e.key - 1; if (n === 3 && !state.gebaut) return; go(n); }
});
render();
})();

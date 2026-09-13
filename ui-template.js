/* UI-Schicht – gefuehrter Assistent: 1 Fahrzeug, 2 Steuergeraete, 3 Verarbeiten, 4 Ergebnis (v3-Ordnung) */
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
var state = { step: 0, cfg: JSON.parse(JSON.stringify(FAHRZEUG_DEFAULT)), sel: [], selSg: null, selNode: null, checkState: {}, gebaut: false, sub: null, subKat: 'alle', subConn: 'alle', open: {}, absVar: null };
try {
  var saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
  if (saved && saved.cfg) { for (var k in saved) state[k] = saved[k]; }
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
      state.gebaut = false; state.sub = null;
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
  function selGeaendert() { state.sel.sort(function (a, b) { return a - b; }); state.gebaut = false; state.sub = null; speichern(); render(); }
  mainEl.querySelectorAll('[data-sg]').forEach(function (c) {
    c.onchange = function () {
      var id = +c.dataset.sg, ix = state.sel.indexOf(id);
      if (c.checked && ix < 0) state.sel.push(id);
      if (!c.checked && ix >= 0) state.sel.splice(ix, 1);
      selGeaendert();
    };
  });
  mainEl.querySelectorAll('[data-alle]').forEach(function (b) { b.onclick = function () { state.sel = SG_DATEN.sg.map(function (s) { return s.id; }); selGeaendert(); }; });
  mainEl.querySelectorAll('[data-keine]').forEach(function (b) { b.onclick = function () { state.sel = FAHRZEUG_IMMER.slice(); selGeaendert(); }; });
  mainEl.querySelectorAll('[data-auto]').forEach(function (b) { b.onclick = function () { state.sel = fahrzeugZuSg(state.cfg); selGeaendert(); }; });
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
  mainEl.querySelectorAll('[data-bauen]').forEach(function (b) { b.onclick = function () { state.gebaut = true; state.sub = null; speichern(); go(3); }; });
}

/* ---- Schritt 4: Ergebnis in v3-Ordnung (Reiter pro Baugruppe + Sidebar) ---- */
function sgDetailZuKnoten(nid) {
  for (var i = 0; i < SG_DATEN.pinouts.length; i++) {
    var p = SG_DATEN.pinouts[i];
    if (sgPinZuKnoten(p.steuergeraet_id, p.pin) === nid) return p;
  }
  return null;
}
function sgKurz(s) {
  if (s.id === 26) return 'Tacho T28';
  if (s.id === 27) return 'ZE2 Stecker';
  var m;
  if (s.kategorie === 'Motor') { m = s.name.match(/M\d\.\d+|Digifant \S+|Mono-\S+|KE-Motronic/); return 'ECU ' + (m ? m[0] : s.name.slice(0, 12)); }
  if (s.kategorie === 'ABS') { m = s.name.match(/Mk\d+/); return 'ABS ' + (m ? m[0] : s.name.slice(0, 12)); }
  if (s.kategorie === 'Getriebe') return s.name.slice(0, 18);
  return (s.kategorie + ' ' + s.name).slice(0, 22);
}
function connVonPin(pin) { var i = String(pin).indexOf('/'); return i > 0 ? String(pin).slice(0, i) : '–'; }
/* Stecker-Name je Pin: bei Pins ohne '/' (T28, ECU) aus dem Steuergerät ableiten */
function connFuerPin(s, pin) {
  var c = connVonPin(pin);
  if (c !== '–') return c;
  if (s.id === 26) return 'T28';
  if (s.kategorie === 'Motor') return 'ECU';
  return '–';
}
/* Reiterliste aus Auswahl: SG-Reiter, dann Sonderreiter */
function ergReiter() {
  var tabs = [], seen = {};
  var sgs = state.sel.map(sgById).filter(Boolean);
  var rang = function (s) {
    if (s.id === 27) return 0;
    if (s.id === 26) return 1;
    if (s.kategorie === 'Motor') return 2;
    if (s.kategorie === 'ABS') return 3;
    if (s.kategorie === 'Getriebe') return 4;
    return 5;
  };
  sgs.sort(function (a, b) { return rang(a) - rang(b) || (a.name < b.name ? -1 : 1); });
  sgs.forEach(function (s) {
    if (s.kategorie === 'ABS') return; /* ABS-SGs kommen gebündelt in einen Reiter */
    var n = pinCount(s.id);
    tabs.push({ id: 'sg-' + s.id, label: sgKurz(s), count: n, sg: s });
    seen['sg-' + s.id] = 1;
  });
  var absSgs = sgs.filter(function (s) { return s.kategorie === 'ABS'; });
  if (absSgs.length) {
    var absPins = 0;
    absSgs.forEach(function (s) { absPins += pinCount(s.id); });
    /* an der ABS-Position einsortieren (Rang 3) */
    var pos = tabs.length;
    for (var ti = 0; ti < tabs.length; ti++) {
      var ts = tabs[ti].sg;
      if (ts && (ts.kategorie === 'Getriebe' || (ts.kategorie !== 'Motor' && ts.id !== 26 && ts.id !== 27))) { pos = ti; break; }
    }
    tabs.splice(pos, 0, { id: 'abs', label: 'ABS System', count: absPins, absIds: absSgs.map(function (s) { return s.id; }) });
  }
  if (state.sel.indexOf(27) >= 0) tabs.push({ id: 'sirel', label: 'Sicherungen & Relais', count: SI_LISTE.length + RELAIS_LISTE.length });
  tabs.push({ id: 'pfad', label: 'Signalpfad', count: GRAPH.nodes.length });
  tabs.push({ id: 'vss', label: 'VSS-Lösung', count: VSS_OPTS.length });
  tabs.push({ id: 'rechner', label: 'Rechner', count: null });
  tabs.push({ id: 'check', label: 'Checkliste', count: null });
  tabs.push({ id: 'fw', label: 'Firmware', count: null });
  return tabs;
}
function nachbarn(id) {
  var adj = buildAdj(GRAPH), out = [], seen = {};
  ((adj.out[id] || []).concat(adj.inp[id] || [])).forEach(function (e) {
    var o = e.von === id ? e.nach : e.von;
    if (o !== id && !seen[o]) { seen[o] = 1; out.push(o); }
  });
  out.sort();
  return out;
}
function kantenTabelle(liste, richtung) {
  if (!liste.length) return '<div class="empty">–</div>';
  var h = '<table class="pins"><tr><th>' + (richtung === 'up' ? 'Von' : 'Nach') + '</th><th>Signal</th><th></th></tr>';
  liste.forEach(function (x) {
    var other = richtung === 'up' ? x.e.von : x.e.nach;
    var copy = ((richtung === 'up' ? x.e.von : state.selNode) + ' → ' + (richtung === 'up' ? state.selNode : x.e.nach) + (x.e.signal ? ' (' + x.e.signal + ')' : '')).replace(/"/g, '&quot;');
    h += '<tr class="copy-row"><td>' + nodeLink(other) + '</td><td>' + esc(x.e.signal || '–') +
      '</td><td><button class="copy-btn" data-copy="' + esc(copy) + '" title="Zeile kopieren" aria-label="Signal kopieren">⧉</button></td></tr>';
  });
  return h + '</table>';
}
var SCHLUESSEL = [
  { gruppe: 'VSS-Weg', id: 'G1/11', label: 'Geber an ZE' }, { gruppe: 'VSS-Weg', id: 'U1/11', label: 'Weiterleitung' },
  { gruppe: 'VSS-Weg', id: 'T28/27', label: 'Eingang Tacho' }, { gruppe: 'VSS-Weg', id: 'T28/07', label: 'Ausgang Tacho' },
  { gruppe: 'VSS-Weg', id: 'U2/02', label: 'Verteiler' }, { gruppe: 'VSS-Weg', id: 'ECU:65', label: 'An der ECU' },
  { gruppe: 'Drehzahl', id: 'ECU:22', label: 'An der ECU' }, { gruppe: 'Drehzahl', id: 'G1/12', label: 'Durch die ZE' },
  { gruppe: 'Drehzahl', id: 'U1/06', label: 'Weiterleitung' }, { gruppe: 'Drehzahl', id: 'T28/10', label: 'Anzeige' },
  { gruppe: 'MFA', id: 'ECU:51', label: 'An der ECU' }, { gruppe: 'MFA', id: 'T28/26', label: 'Anzeige' }
];
var FRAGEN = [
  { id: 'T28/27', titel: 'Tacho zeigt nichts – wo kommt das Signal her?', unter: 'Geber → ZE2 → Tacho → ECU' },
  { id: 'ECU:22', titel: 'Drehzahlmesser spinnt – wo kommt die Drehzahl her?', unter: 'ECU → ZE2 → Anzeige' },
  { id: 'ECU:51', titel: 'Bordcomputer ohne Verbrauch – wo kommt das MFA-Signal her?', unter: 'ECU → Anzeige' }
];
/* Klarnamen für Schlüsselknoten (Code nur als Zusatz) */
var KLARNAMEN = {
  'T28/27': 'Tachosignal – Eingang am Tacho', 'T28/07': 'Tachosignal – Ausgang am Tacho',
  'U2/02': 'VSS-Verteiler in der ZE', 'ECU:65': 'Tachosignal an der ECU',
  'G1/11': 'Geber an der ZE', 'U1/11': 'Weiterleitung in der ZE',
  'ECU:22': 'Drehzahl an der ECU', 'G1/12': 'Drehzahl durch die ZE',
  'U1/06': 'Drehzahl-Weiterleitung', 'T28/10': 'Drehzahl-Anzeige',
  'ECU:51': 'Verbrauch an der ECU', 'T28/26': 'Verbrauchs-Anzeige'
};
function klarname(id, label) { return KLARNAMEN[id] || (label || id); }
function pfadSektion(key, titel, count, bodyHtml, defOffen) {
  if (!state.open) state.open = {};
  var o = state.open['pfad|' + key];
  var offen = o === undefined ? !!defOffen : !!o;
  var h = '<button class="conn-header" data-ptoggle="' + key + '" aria-expanded="' + offen + '">' +
    '<span class="conn-badge" style="background:#27272a;color:#E8A020">' + count + '</span>' +
    '<strong>' + esc(titel) + '</strong><span class="chev">' + (offen ? '▾' : '▸') + '</span></button>';
  return h + (offen && bodyHtml ? bodyHtml : '');
}
/* SG-Reiter wie v3: Kategorie-Chips, "Alle aufklappen", Bereichs-Sidebar, Stecker-Akkordeons */
function kabelZelle(k) {
  if (!k || k === '–' || /^unbelegt$/i.test(k)) return '<span class="mut">–</span>';
  return String(k).split('/').map(function (teil) {
    var st = farbeStyle(teil);
    return '<span class="kbadge" style="background:' + st.bg + ';color:' + st.fg + '">' + esc(teil.trim()) + '</span>';
  }).join('');
}
function connGruppen(s, conns) {
  if (s.id !== 27) return [{ label: s.name, ids: conns }];
  var drin = {}, out = [];
  BEREICH_GROUPS.forEach(function (g) {
    var ids = g.ids.filter(function (c) { return conns.indexOf(c) >= 0; });
    ids.forEach(function (c) { drin[c] = 1; });
    if (ids.length) out.push({ label: g.label, ids: ids });
  });
  var rest = conns.filter(function (c) { return !drin[c]; });
  if (rest.length) out.push({ label: 'Weitere', ids: rest });
  return out;
}
function pinZeile(s, p) {
  var kn = sgPinZuKnoten(s.id, p.pin);
  var nb = kn ? nachbarn(kn) : [];
  var ziel = nb.length ? nb.slice(0, 5).map(nodeLink).join(' ') + (nb.length > 5 ? ' <span class="mut small">+' + (nb.length - 5) + '</span>' : '') : '–';
  var hw = hinweisSauber(p.hinweis);
  var warn = safetyMark(p) ? ' warn-bar' : '';
  var dim = (!p.kabelfarbe || p.kabelfarbe === '–' || /^unbelegt$/i.test(p.kabelfarbe || '')) && !safetyMark(p) ? ' dim-row' : '';
  var copy = (s.name + ' ' + p.pin + ': ' + p.funktion + (p.kabelfarbe && p.kabelfarbe !== '–' ? ' (' + p.kabelfarbe + ')' : '')).replace(/"/g, '&quot;');
  var alabel = ('Kopieren: ' + s.name + ' Pin ' + p.pin).replace(/"/g, '&quot;');
  return '<tr class="copy-row' + warn + dim + '"><td>' + (kn ? nodeLink(kn) : esc(p.pin)) + '</td><td>' + esc(p.funktion) + safetyMark(p) +
    '</td><td>' + kabelZelle(p.kabelfarbe) + '</td><td>' + ziel + '</td><td class="mut small">' + esc(hw || '–') +
    '</td><td><button class="copy-btn" data-copy="' + esc(copy) + '" title="Zeile kopieren" aria-label="' + esc(alabel) + '">⧉</button></td></tr>';
}
function sgTabHtml(s) {
  var alle = SG_DATEN.pinouts.filter(function (p) { return p.steuergeraet_id === s.id; });
  var kats = [];
  alle.forEach(function (p) { if (p.kategorie && kats.indexOf(p.kategorie) < 0) kats.push(p.kategorie); });
  var conns = [];
  alle.forEach(function (p) { var c = connFuerPin(s, p.pin); if (conns.indexOf(c) < 0) conns.push(c); });
  conns.sort();
  var kat = state.subKat || 'alle', conn = state.subConn || 'alle';
  if (!state.open) state.open = {};
  var h = '';
  if (kats.length) {
    h += '<div class="kats"><button class="kat-btn' + (kat === 'alle' ? ' active' : '') + '" data-kat="alle">Alle</button>';
    kats.forEach(function (k) { h += '<button class="kat-btn' + (kat === k ? ' active' : '') + '" data-kat="' + esc(k) + '">' + esc(k) + '</button>'; });
    h += '</div>';
  }
  function connPins(c) {
    return alle.filter(function (p) {
      if (connFuerPin(s, p.pin) !== c) return false;
      if (kat !== 'alle' && p.kategorie !== kat) return false;
      return matchQ(p.pin + ' ' + p.funktion + ' ' + (p.kabelfarbe || '') + ' ' + (p.hinweis || '') + ' ' + s.name);
    });
  }
  var sichtConns = conns.filter(function (c) { return conn === 'alle' || c === conn; });
  var treffer = 0;
  sichtConns.forEach(function (c) { treffer += connPins(c).length; });
  var sucht = q.value.trim().length > 0;
  h += '<div class="kats"><span class="chip">Alle Stecker: ' + alle.length + '</span>' +
    '<button class="kat-btn" data-allopen>Alle aufklappen</button>' +
    '<button class="kat-btn" data-allshut>Alle zuklappen</button></div>';
  h += '<div class="side-cols">';
  {
    h += '<div class="sidebar">';
    connGruppen(s, conns).forEach(function (g) {
      h += '<div class="side-grp">' + esc(g.label) + '</div>';
      g.ids.forEach(function (c) {
        var n = alle.filter(function (p) { return connFuerPin(s, p.pin) === c; }).length;
        var mm = connMeta(c);
        var sst = mm ? farbeStyle(mm.farbe) : { bg: '#27272a', fg: '#a1a1aa' };
        var kurz = mm ? mm.beschreibung.split(' ')[0] : c;
        var pol = mm ? ' <small>' + mm.pole + 'p</small>' : ' <small>' + n + '</small>';
        h += '<button class="sidebar-btn' + (conn === c ? ' active' : '') + '" data-conn="' + esc(c) + '">' +
          '<span class="kbadge" style="background:' + sst.bg + ';color:' + sst.fg + '">' + esc(c) + '</span><span class="side-kurz">' + esc(kurz) + '</span>' + pol + '</button>';
      });
    });
    h += '</div>';
  }
  h += '<div class="side-main">';
  h += '<h2>' + esc(s.name) + ' <span class="mut small">' + treffer + ' von ' + alle.length + ' Pins' + (s.stecker ? ' · ' + esc(s.stecker) : '') + '</span></h2>';
  if (s.teilenummern) h += '<div class="mut small">' + esc(s.teilenummern) + '</div>';
  if (!sichtConns.length || !treffer) h += '<div class="empty">Keine Treffer.</div>';
  sichtConns.forEach(function (c) {
    var pins = connPins(c);
    if (!pins.length) return;
    var key = (state.sub || '') + '|' + c;
    var offen = sucht || conn !== 'alle' || state.open[key] || sichtConns.length === 1;
    var m = connMeta(c) || { farbe: 'Grau', pole: pins.length, beschreibung: s.name };
    var st = farbeStyle(m.farbe);
    var name = (s.id === 27 && connMeta(c)) ? m.beschreibung : (s.id === 27 ? (c === '–' ? 'Sonstige Pins' : 'Stecker ' + c) : m.beschreibung);
    var det = (s.id === 27 && connMeta(c)) ? esc(m.farbe) + ' · ' + m.pole + '-polig' : esc(String(pins.length)) + ' Pins' + (s.stecker ? ' · ' + esc(s.stecker) : '');
    h += '<button class="conn-header" data-toggle="' + esc(c) + '" aria-expanded="' + offen + '">' +
      '<span class="conn-badge" style="background:' + st.bg + ';color:' + st.fg + '">' + esc(c) + '</span>' +
      '<strong>' + esc(name) + '</strong>' + (det ? '<span class="mut small">' + det + '</span>' : '') +
      '<span class="conn-count">' + pins.length + 'P</span><span class="chev">' + (offen ? '▾' : '▸') + '</span></button>';
    if (offen) {
      h += '<table class="pins"><tr><th>Pin</th><th>Funktion</th><th>Kabel</th><th>Verbunden mit</th><th>Hinweis</th><th></th></tr>';
      pins.forEach(function (p) { h += pinZeile(s, p); });
      h += '</table>';
    }
  });
  h += '</div></div>';
  return h;
}
/* ABS-Reiter: Variantenumschalter (wie v3) + gewählte Variante im ZE2-Akkordeon-Stil */
function absHtml(absIds) {
  var sgs = absIds.map(sgById).filter(Boolean);
  if (!sgs.length) return '<div class="empty">Kein ABS gewählt.</div>';
  var cur = sgById(state.absVar);
  if (!cur || absIds.indexOf(cur.id) < 0) { cur = sgs[0]; state.absVar = cur.id; }
  var h = '<h2>ABS-Varianten</h2><div class="kats">';
  sgs.forEach(function (s) {
    h += '<button class="kat-btn' + (cur.id === s.id ? ' active' : '') + '" data-absvar="' + s.id + '">' + esc(sgKurz(s)) + ' <small>' + pinCount(s.id) + '</small></button>';
  });
  h += '</div>';
  h += '<dl class="kv">';
  if (cur.teilenummern) h += '<dt>Teilenummern</dt><dd>' + esc(cur.teilenummern) + '</dd>';
  if (cur.bosch_nummern) h += '<dt>Bosch-Nrn.</dt><dd>' + esc(cur.bosch_nummern) + '</dd>';
  if (cur.stecker) h += '<dt>Stecker</dt><dd>' + esc(cur.stecker) + '</dd>';
  if (cur.fahrzeuge) h += '<dt>Fahrzeuge</dt><dd>' + esc(cur.fahrzeuge) + '</dd>';
  if (cur.einbauort) h += '<dt>Einbauort</dt><dd>' + esc(cur.einbauort) + '</dd>';
  if (cur.diagnose) h += '<dt>Diagnose</dt><dd>' + esc(cur.diagnose) + '</dd>';
  if (cur.notizen) h += '<dt>Notizen</dt><dd>' + esc(cur.notizen) + '</dd>';
  h += '</dl>';
  return h + sgTabHtml(cur);
}
function ampBadge(a) {
  var n = parseInt(a, 10) || 0;
  var cls = n >= 30 ? 'fuse-30' : n >= 20 ? 'fuse-20' : n >= 15 ? 'fuse-15' : 'fuse-10';
  return '<span class="fuse-amp ' + cls + '">' + esc(String(a)) + 'A</span>';
}
function sirelHtml() {
  var si = SI_LISTE.filter(function (s) { return matchQ(s.nr + ' ' + s.funktion); });
  var rel = RELAIS_LISTE.filter(function (r) { return matchQ(r.nr + ' ' + r.funktion); });
  var h = '<div class="grid2"><div><h2>Sicherungen (' + si.length + ')</h2><table class="pins"><tr><th>Nr.</th><th>A</th><th>Funktion</th><th></th></tr>';
  si.forEach(function (s) {
    var copy = ('Si. ' + s.nr + ' | ' + s.amp + 'A | ' + s.funktion).replace(/"/g, '&quot;');
    h += '<tr class="copy-row"><td>Si. ' + esc(s.nr) + '</td><td>' + ampBadge(s.amp) + '</td><td>' + esc(s.funktion) +
      '</td><td><button class="copy-btn" data-copy="' + esc(copy) + '" title="Zeile kopieren" aria-label="Kopieren: Sicherung ' + esc(s.nr) + '">⧉</button></td></tr>';
  });
  h += '</table></div><div><h2>Relais (' + rel.length + ')</h2><table class="pins"><tr><th>Nr.</th><th>Funktion</th><th></th></tr>';
  rel.forEach(function (r) {
    var copy = ('Rel. ' + r.nr + ' | ' + r.funktion).replace(/"/g, '&quot;');
    h += '<tr class="copy-row"><td>' + esc(r.nr) + '</td><td>' + esc(r.funktion) +
      '</td><td><button class="copy-btn" data-copy="' + esc(copy) + '" title="Zeile kopieren" aria-label="Kopieren: Relais ' + esc(r.nr) + '">⧉</button></td></tr>';
  });
  return h + '</table></div></div>';
}
function pfadHtml() {
  var adj = buildAdj(GRAPH);
  var treffer = GRAPH.nodes.filter(function (n) { return matchQ(n.id + ' ' + n.label); }).slice(0, 60);
  var h = '<h2>Signalpfad – VSS verfolgen</h2>' +
    '<p class="mut">HERKUNFT = woher kommt das Signal · VERLAUF = wohin geht es weiter · ZWEIGE = Abzweige zum selben Ziel.</p>';
  h += '<div class="side-cols"><div class="sidebar">';
  var grp = null;
  SCHLUESSEL.forEach(function (k) {
    if (!nodeById(GRAPH, k.id)) return;
    if (k.gruppe !== grp) { grp = k.gruppe; h += '<div class="side-grp">' + esc(grp) + '</div>'; }
    h += '<button class="sidebar-btn' + (state.selNode === k.id ? ' active' : '') + '" data-node="' + esc(k.id) + '">' +
      '<span class="kbadge" style="background:#27272a;color:#E8A020">' + esc(k.id) + '</span><span class="side-kurz">' + esc(k.label) + '</span></button>';
  });
  h += '</div><div class="side-main">';
  var sucht = q.value.trim().length > 0;
  if (sucht) {
    h += '<div class="crumbs">' + treffer.map(function (n) { return '<button class="crumb' + (state.selNode === n.id ? ' sel' : '') + '" data-node="' + esc(n.id) + '">' + esc(n.id) + '</button>'; }).join('<span class="arrow">·</span>') + '</div>';
  }
  if (!state.selNode) {
    h += '<div class="card"><h3>Welche Frage hast du?</h3><div class="opts">';
    FRAGEN.forEach(function (f) {
      h += '<button class="opt" data-node="' + esc(f.id) + '">' + esc(f.titel) + '<br><span class="mut small">' + esc(f.unter) + '</span></button>';
    });
    h += '</div><p class="mut">Oder links einen Schlüsselknoten wählen – oder oben suchen.</p></div>';
    return h + '</div></div>';
  }
  var a = pfadAnalyse(GRAPH, state.selNode);
  if (a.fehler) return h + '<div class="empty">' + esc(a.fehler) + '</div></div></div>';
  var d = sgDetailZuKnoten(state.selNode);
  h += '<h3>' + esc(klarname(state.selNode, (a.knoten.label || ''))) + ' <span class="mut">(' + esc(state.selNode) + ')</span></h3>';
  if (d) h += '<p>' + esc(d.funktion) + safetyMark(d) + '</p>';
  if (a.intern) h += '<div class="hint">' + badge('Tacho-intern', 'b-annahme') + ' ' + esc(a.intern) + '</div>';
  var upIds = a.herkunft.order.filter(function (x) { return x !== state.selNode; });
  var dnIds = a.verlauf.order.filter(function (x) { return x !== state.selNode; });
  var satz = '';
  if (upIds.length) satz += 'Kommt von ' + upIds.slice().reverse().join(' → ') + ' → ' + state.selNode;
  else satz += 'Hier entsteht das Signal (' + state.selNode + ') – davor gibt es nichts zu prüfen';
  if (dnIds.length) satz += '; geht weiter nach ' + dnIds.join(' → ');
  else satz += '; hier endet das Signal – weiter geht es nicht';
  h += '<div class="hint"><strong>Signalweg in Worten:</strong> ' + esc(satz) + '</div>';
  var upBody = '<div class="crumbs">' + (upIds.length ? upIds.map(nodeLink).join('<span class="arrow">→</span>') : '<span class="mut">Hier entsteht das Signal</span>') + '</div>' +
    kantenTabelle((adj.inp[state.selNode] || []).map(function (e) { return { e: e }; }), 'up');
  var dnBody = '<div class="crumbs">' + (dnIds.length ? dnIds.map(nodeLink).join('<span class="arrow">→</span>') : '<span class="mut">Hier endet das Signal</span>') + '</div>' +
    kantenTabelle((adj.out[state.selNode] || []).map(function (e) { return { e: e }; }), 'down');
  h += pfadSektion('herkunft', 'HERKUNFT – woher kommt das Signal (' + upIds.length + ' Stationen)', upIds.length, upBody, true);
  h += pfadSektion('verlauf', 'VERLAUF – wohin geht es weiter (' + dnIds.length + ' Stationen)', dnIds.length, dnBody, true);
  if (a.zweige.length) h += pfadSektion('zweige', 'ZWEIGE – Abzweige zum selben Ziel (' + a.zweige.length + ')', a.zweige.length,
    '<div class="crumbs">' + a.zweige.map(nodeLink).join('<span class="arrow">·</span>') + '</div>', false);
  if (a.extern.length) h += pfadSektion('extern', 'EXTERN – Anschlüsse nach außen (' + a.extern.length + ')', a.extern.length,
    '<div>' + a.extern.map(function (x) { return nodeLink(x.id) + ' ' + badge(x.typ, 'b-ext'); }).join(' ') + '</div>', false);
  return h + '</div></div>';
}
function vssHtml() {
  var h = '<h2>VSS-Lösung</h2>';
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
  return h;
}
function rechnerHtml() {
  var h = '<h2>FAKTOR-Rechner</h2>' +
    '<p class="mut">k = 960 ist eine Annahme – per GPS verifizieren!</p>' +
    '<label for="circ">Reifenumfang (m), z. B. 195/50R15 ≈ 1,83</label><input id="circ" type="number" step="0.001" value="1.83">' +
    '<label for="teeth">Zähnezahl ABS-Ring (VA)</label><input id="teeth" type="number" step="1" value="45">' +
    '<label for="kval">k-Zahl Tacho (Annahme)</label><input id="kval" type="number" step="1" value="960">' +
    '<button class="calc" id="calcBtn">Berechnen</button><div class="result" id="calcOut">–</div>';
  h += '<h2>Drehzahl- und MFA-Prüfung</h2><table class="pins"><tr><th>Von</th><th>Nach</th><th>Sollwert</th></tr>' +
    '<tr><td>' + nodeLink('ECU:22') + '</td><td>→ ' + nodeLink('T28/10') + '</td><td>Drehzahlsignal via G1/12, U1/06</td></tr>' +
    '<tr><td>' + nodeLink('ECU:51') + '</td><td>→ ' + nodeLink('T28/26') + '</td><td>Verbrauchssignal MFA (direkt)</td></tr></table>' +
    '<p class="warn">6-Zylinder-ECU an 4-Zylinder-DZM → 6→4-Wandler nötig, sonst falsche Anzeige!</p>';
  return h;
}
var CHECKS = ['Geber 321907345B: Weiß-Gelb Durchgang', 'G1/11: Signal an ZE', 'U1/11 intern: Durchgang',
  'T28/27 Blau-Weiß: Rechteck EINGANG', 'Tacho k=960 prüfen (Annahme – per GPS gegenmessen)',
  'T28/07 Violett: AUSGANG', 'U2/02: Verteiler Durchgang', 'ECU Pin 65 Blau-Weiß: Signal',
  'Tempomat: GRA übernimmt', 'Radio W/1 Weiß-Gelb: GALA'];
function checkHtml() {
  var done = CHECKS.filter(function (_, i) { return state.checkState[i]; }).length;
  var h = '<h2>Checkliste ' + done + '/' + CHECKS.length + '</h2><div class="prog"><div style="width:' + (done / CHECKS.length * 100) + '%"></div></div><div id="checks"></div>' +
    '<button class="calc" id="resetBtn" style="background:#222;color:#bbb">Fortschritt zurücksetzen</button>';
  h += '<h2>Wichtig – vor Verdrahtung lesen</h2><table class="pins"><tr><th>Hinweis</th></tr>';
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
  return h + '</table>';
}
function fwHtml() {
  return '<h2>Firmware v1.0 (tacho.ino)</h2>' +
    '<p class="mut">SHA-256: <span class="mono">' + esc(FIRMWARE_SHA) + '</span> · ' + FIRMWARE_INO.split('\n').length + ' Zeilen · ' +
    '<button class="calc" id="fwCopy">Code kopieren</button> <a class="calc" id="fwDl" download="tacho.ino">tacho.ino laden</a></p>' +
    '<pre id="fwPre">' + esc(FIRMWARE_INO) + '</pre>';
}
function renderErgebnis() {
  var erg = baueErgebnis(state.sel);
  var tabs = ergReiter();
  var ok = tabs.some(function (t) { return t.id === state.sub; });
  if (!ok) { state.sub = tabs.length ? tabs[0].id : null; state.subKat = 'alle'; state.subConn = 'alle'; }
  var h = '<div class="card result-head"><h2>Fertiges Pinout: ' + erg.anzahlSg + ' Steuergeräte · ' + erg.anzahlPins + ' Pins</h2>' +
    '<p class="mut">Suche oben filtert alle Reiter · Klick auf einen verknüpften Pin öffnet seinen Signalpfad.</p>' +
    '<div><button class="kat-btn" data-edit>Auswahl ändern</button></div></div>';
  h += '<nav class="tabs" role="tablist">';
  tabs.forEach(function (t) {
    var c = t.count == null ? '' : ' <small>' + t.count + '</small>';
    h += '<button role="tab" aria-selected="' + (state.sub === t.id ? 'true' : 'false') + '" class="tab-btn' + (state.sub === t.id ? ' active' : '') + '" data-sub="' + t.id + '">' + esc(t.label) + c + '</button>';
  });
  h += '</nav><div class="card" id="submain">';
  var cur = tabs.filter(function (t) { return t.id === state.sub; })[0];
  if (!cur) h += '<div class="empty">Keine Steuergeräte gewählt.</div>';
  else if (cur.sg) h += sgTabHtml(cur.sg);
  else if (state.sub === 'abs') h += absHtml(cur.absIds || []);
  else if (state.sub === 'sirel') h += sirelHtml();
  else if (state.sub === 'pfad') h += pfadHtml();
  else if (state.sub === 'vss') h += vssHtml();
  else if (state.sub === 'rechner') h += rechnerHtml();
  else if (state.sub === 'check') h += checkHtml();
  else if (state.sub === 'fw') h += fwHtml();
  h += '</div>';
  mainEl.innerHTML = h;
  mainEl.querySelectorAll('[data-edit]').forEach(function (b) { b.onclick = function () { go(1); }; });
  mainEl.querySelectorAll('[data-sub]').forEach(function (b) {
    b.onclick = function () { state.sub = b.dataset.sub; state.subKat = 'alle'; state.subConn = 'alle'; speichern(); render(); };
  });
  mainEl.querySelectorAll('[data-kat]').forEach(function (b) { b.onclick = function () { state.subKat = b.dataset.kat; speichern(); render(); }; });
  mainEl.querySelectorAll('[data-absvar]').forEach(function (b) { b.onclick = function () { state.absVar = +b.dataset.absvar; speichern(); render(); }; });
  mainEl.querySelectorAll('[data-conn]').forEach(function (b) { b.onclick = function () { state.subConn = (state.subConn === b.dataset.conn) ? 'alle' : b.dataset.conn; speichern(); render(); }; });
  if (!state.open) state.open = {};
  mainEl.querySelectorAll('[data-toggle]').forEach(function (b) {
    b.onclick = function () { var key = (state.sub || '') + '|' + b.dataset.toggle; state.open[key] = !state.open[key]; speichern(); render(); };
  });
  mainEl.querySelectorAll('[data-ptoggle]').forEach(function (b) {
    b.onclick = function () { var key = 'pfad|' + b.dataset.ptoggle; var o = state.open[key]; state.open[key] = (o === undefined) ? false : !o; speichern(); render(); };
  });
  mainEl.querySelectorAll('[data-allopen]').forEach(function (b) {
    b.onclick = function () {
      var cur = ergReiter().filter(function (t) { return t.id === state.sub; })[0];
      if (cur && cur.sg) SG_DATEN.pinouts.forEach(function (p) { if (p.steuergeraet_id === cur.sg.id) state.open[state.sub + '|' + connFuerPin(cur.sg, p.pin)] = true; });
      speichern(); render();
    };
  });
  mainEl.querySelectorAll('[data-allshut]').forEach(function (b) {
    b.onclick = function () { state.open = {}; speichern(); render(); };
  });
  mainEl.querySelectorAll('[data-copy]').forEach(function (b) {
    b.onclick = function (ev) { if (ev) ev.stopPropagation(); if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy); };
  });
  mainEl.querySelectorAll('[data-node]').forEach(function (b) {
    b.onclick = function () { state.selNode = b.dataset.node; state.sub = 'pfad'; speichern(); render(); };
  });
  var calcBtn = document.getElementById('calcBtn');
  if (calcBtn) calcBtn.onclick = function () {
    var r = faktorRechner(parseFloat(document.getElementById('circ').value), parseFloat(document.getElementById('teeth').value), parseFloat(document.getElementById('kval').value));
    document.getElementById('calcOut').textContent = r.fehler ? r.fehler : ('FAKTOR = ' + r.faktor.toFixed(4) + '  ·  Hz@100 km/h ≈ ' + r.hz.toFixed(1) + ' Hz');
  };
  var box = document.getElementById('checks');
  if (box) {
    box.innerHTML = '';
    CHECKS.forEach(function (t, i) {
      var d = document.createElement('label'); d.className = 'chk' + (state.checkState[i] ? ' done' : '');
      var c = document.createElement('input'); c.type = 'checkbox'; c.checked = !!state.checkState[i];
      c.onchange = function () { state.checkState[i] = c.checked; speichern(); render(); };
      var s = document.createElement('span'); s.className = 'txt'; s.textContent = (i + 1) + '. ' + t;
      d.appendChild(c); d.appendChild(s); box.appendChild(d);
    });
    document.getElementById('resetBtn').onclick = function () { state.checkState = {}; speichern(); render(); };
  }
  var fwCopy = document.getElementById('fwCopy');
  if (fwCopy) {
    fwCopy.onclick = function () { if (navigator.clipboard) navigator.clipboard.writeText(FIRMWARE_INO); };
    document.getElementById('fwDl').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(FIRMWARE_INO);
  }
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

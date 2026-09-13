/* VW Golf 2 GTI – Zentrale Pinout-Referenz v4 (App-Logik, standalone, ohne DOM lauffaehig) */
var SG_DATEN = __SG_JSON__;
var GRAPH = __GRAPH_JSON__;
var FIRMWARE_INO = __FW_JSON__;
var FIRMWARE_SHA = "__FW_SHA__";
var VSS_OPTS = __VSS_JSON__;
var SI_LISTE = __SI_JSON__;
var RELAIS_LISTE = __RELAIS_JSON__;

/* ---------- Graph-Logik (DOM-frei, testbar) ---------- */
function buildAdj(g) {
  var out = {}, inp = {};
  g.edges.forEach(function (e) {
    (out[e.von] = out[e.von] || []).push(e);
    (inp[e.nach] = inp[e.nach] || []).push(e);
  });
  return { out: out, inp: inp };
}
function bfsUp(g, start) {
  var adj = buildAdj(g), seen = {}, q = [start], order = [];
  seen[start] = 0;
  var via = {};
  while (q.length) {
    var cur = q.shift(); order.push(cur);
    var ins = adj.inp[cur] || [];
    for (var i = 0; i < ins.length; i++) {
      var v = ins[i].von;
      if (!(v in seen)) { seen[v] = seen[cur] + 1; via[v] = { von: v, nach: cur, e: ins[i] }; q.push(v); }
    }
  }
  return { order: order, dist: seen, via: via };
}
function bfsDown(g, start) {
  var adj = buildAdj(g), seen = {}, q = [start], order = [];
  seen[start] = 0;
  var via = {};
  while (q.length) {
    var cur = q.shift(); order.push(cur);
    var outs = adj.out[cur] || [];
    for (var i = 0; i < outs.length; i++) {
      var n = outs[i].nach;
      if (!(n in seen)) { seen[n] = seen[cur] + 1; via[n] = { von: cur, nach: n, e: outs[i] }; q.push(n); }
    }
  }
  return { order: order, dist: seen, via: via };
}
function nodeById(g, id) {
  for (var i = 0; i < g.nodes.length; i++) if (g.nodes[i].id === id) return g.nodes[i];
  return null;
}
/* Geschwister: teilen mind. einen Vorgaenger oder Nachfolger */
function zweige(g, id) {
  var adj = buildAdj(g), sib = {}, out = [];
  var pred = {}, succ = {};
  (adj.inp[id] || []).forEach(function (e) { pred[e.von] = 1; });
  (adj.out[id] || []).forEach(function (e) { succ[e.nach] = 1; });
  g.edges.forEach(function (e) {
    if (e.von !== id && (pred[e.von])) sib[e.nach] = sib[e.nach] || e.von;
    if (e.nach !== id && (succ[e.nach])) sib[e.von] = sib[e.von] || e.nach;
  });
  delete sib[id];
  for (const k in sib) out.push(k);
  out.sort();
  return out;
}
var TACHO_INTERN = {
  'T28/27': 'Tacho-intern weiter zu T28/07 (VSS-Ausgang, keine Kabel-Kante)',
  'T28/07': 'Tacho-intern von T28/27 (VSS-Eingang, keine Kabel-Kante)'
};
var EXTERN_TYP = {
  'Kl.15': 'Versorgung', 'Kl.31': 'Masse', 'Kl.X': 'Versorgung',
  'Radio': 'Komfort', 'Radio (GALA)': 'Komfort', 'Tempomat': 'Komfort', 'Tempomat (GRA)': 'Komfort',
  'GALA': 'Komfort', 'Kombi (MIL)': 'Anzeige', 'ABS-Lampe': 'Anzeige', 'Warnleuchte': 'Anzeige',
  'OBD:7': 'Diagnose', 'OBD:15': 'Diagnose', 'J102': 'Relais', 'Relais:3': 'Relais',
  'Relais:12': 'Relais', 'Relais:79': 'Relais', 'G44': 'Sensor', 'G45': 'Sensor',
  'G46': 'Sensor', 'G47': 'Sensor', 'G100': 'Sensor', 'G101': 'Sensor'
};
function externTyp(id, label) {
  if (EXTERN_TYP[id]) return EXTERN_TYP[id];
  if (/^Si\.|^S\d/.test(id)) return 'Sicherung';
  if (/^Relais|^J\d/.test(id)) return 'Relais';
  if (/^G\d/.test(id)) return 'Sensor';
  if (/^N\d|^V/.test(id)) return 'Aktor';
  if (/^Kl\./.test(id)) return 'Versorgung';
  if (/Masse/i.test(label || '')) return 'Masse';
  if (/OBD|Diagnose|K-Line/i.test((label || '') + id)) return 'Diagnose';
  return 'Extern';
}
function kantenWarnung(e) {
  var s = (e.signal || '') + ' ' + (e.quelle || '');
  if (/KONFLIKT/i.test(s)) return 'KONFLIKT';
  if (/unbest/i.test(s)) return 'unbestätigt';
  if (/ANNAHME/i.test(s)) return 'Annahme';
  return '';
}
function pfadAnalyse(g, id) {
  var n = nodeById(g, id);
  if (!n) return { fehler: 'Knoten unbekannt: ' + id };
  var up = bfsUp(g, id), down = bfsDown(g, id);
  var adj = buildAdj(g);
  var ext = [];
  var seen = {};
  (adj.inp[id] || []).concat(adj.out[id] || []).forEach(function (e) {
    [e.von, e.nach].forEach(function (x) {
      if (x === id || seen[x]) return;
      var xn = nodeById(g, x);
      if (xn && xn.tab === 'extern') { seen[x] = 1; ext.push({ id: x, typ: externTyp(x, xn.label), label: xn.label }); }
    });
  });
  return { knoten: n, herkunft: up, verlauf: down, zweige: zweige(g, id), extern: ext, intern: TACHO_INTERN[id] || '' };
}
/* SG-Pin -> Graph-Knoten matchen (tolerant, Quelle bleibt sg-daten) */
function pad2(s) { s = String(s); return s.length < 2 ? '0' + s : s; }
function sgPinZuKnoten(sgId, pin) {
  var p = String(pin), c = [];
  if (sgId === 26) c = ['T28/' + pad2(p)];
  else if (sgId === 27) {
    var m = p.match(/^([A-Za-z]+\d*)\/(\d+)(.*)$/);
    if (m && (m[1] === 'U1' || m[1] === 'U2') && m[2].length < 2) c = [m[1] + '/' + pad2(m[2]) + m[3]];
    else c = [p];
  }
  else if (sgId === 8) c = ['ECU:' + p, 'ECU:' + pad2(p)];
  else if (sgId === 9) c = ['MK02:' + p];
  else if (sgId === 10) { var n10 = (p.match(/\d+/) || [''])[0]; c = ['MK02:' + n10, 'MK04:' + n10]; }
  else if (sgId === 11) { var n11 = (p.match(/\d+/) || [''])[0]; c = ['MK04:' + n11]; }
  else if (sgId === 12) { var n12 = (p.match(/\d+/) || [''])[0]; c = ['MK20:' + n12]; }
  for (var i = 0; i < c.length; i++) if (nodeById(GRAPH, c[i])) return c[i];
  return '';
}
/* FAKTOR-Rechner (Formel aus signalpfad.html) */
function faktorRechner(umfang, zaehne, k) {
  if (!(umfang > 0 && zaehne > 0 && k > 0)) return { fehler: 'Bitte gueltige Werte eingeben.' };
  var f = (k * 4) / (zaehne * 1000 / umfang);
  var hz = (100 / 3.6) / umfang * zaehne * f;
  return { faktor: f, hz: hz };
}
/* SG-Statistik */
function sgStatistik() {
  var per = {};
  SG_DATEN.pinouts.forEach(function (p) { per[p.steuergeraet_id] = (per[p.steuergeraet_id] || 0) + 1; });
  return { sg: SG_DATEN.sg.length, pins: SG_DATEN.pinouts.length, proSg: per, knoten: GRAPH.nodes.length, kanten: GRAPH.edges.length };
}

/* ---------- Fahrzeug-Assistent (DOM-frei, testbar) ---------- */
var FAHRZEUG_KEY = 'vw-fz-v1';
var FAHRZEUG_GRUPPEN = [
  { id: 'motor', titel: 'Motor / Motorelektronik', typ: 'single', optionen: [
    { id: 'm29', label: 'VR6 AAA/ABV – Motronic M2.9 (Empfehlung)', sg: [8] },
    { id: 'm27', label: 'VR6 AAA – Motronic M2.7 (Verteiler)', sg: [7] },
    { id: 'digifant1', label: 'Digifant I (G60/G40)', sg: [1] },
    { id: 'digifant2', label: 'Digifant II (PB/PF/RV/1P/2H)', sg: [2] },
    { id: 'digifant3', label: 'Digifant 3.x (2E/ADY/AGG/ABF/ABA)', sg: [3] },
    { id: 'monoj', label: 'Mono-Jetronic (RP früh, 1F)', sg: [4] },
    { id: 'monom', label: 'Mono-Motronic (RP spät, AAM, ABS/ADZ/ANN/ANP/ACC)', sg: [5] },
    { id: 'ke', label: 'KE-Motronic (9A)', sg: [6] }
  ] },
  { id: 'abs', titel: 'ABS', typ: 'single', optionen: [
    { id: 'mk02eds', label: 'Teves Mk02 mit EDS (Empfehlung)', sg: [10] },
    { id: 'mk02', label: 'Teves Mk02 ohne EDS', sg: [9] },
    { id: 'mk04', label: 'Teves Mk04', sg: [11] },
    { id: 'mk20', label: 'Teves Mk20', sg: [12] },
    { id: 'kein', label: 'Kein ABS / Custom', sg: [] }
  ] },
  { id: 'getriebe', titel: 'Getriebe', typ: 'single', optionen: [
    { id: 'manuell', label: 'Schaltgetriebe (Empfehlung)', sg: [] },
    { id: 'a01m', label: 'Automatik 01M', sg: [14] },
    { id: 'a096', label: 'Automatik 096', sg: [13] }
  ] },
  { id: 'extras', titel: 'Ausstattung (Mehrfachauswahl)', typ: 'multi', optionen: [
    { id: 'klima', label: 'Climatronic', sg: [25] },
    { id: 'gra2', label: 'Tempomat GRA Golf 2', sg: [22] },
    { id: 'gra3', label: 'Tempomat GRA Golf 3', sg: [23] },
    { id: 'gra4', label: 'Tempomat GRA Golf 4', sg: [24] },
    { id: 'komfort3', label: 'Komfort/ZV Golf 3', sg: [20] },
    { id: 'ksg4', label: 'Komfortsteuergerät Golf 4', sg: [21] },
    { id: 'wfs1', label: 'Wegfahrsperre Gen 1', sg: [15] },
    { id: 'wfs2', label: 'Wegfahrsperre Gen 2', sg: [16] },
    { id: 'wfs3', label: 'Wegfahrsperre Gen 3', sg: [17] },
    { id: 'airbag3', label: 'Airbag Golf 3', sg: [18] },
    { id: 'airbag4', label: 'Airbag Golf 4', sg: [19] }
  ] }
];
var FAHRZEUG_DEFAULT = { motor: 'm29', abs: 'mk02eds', getriebe: 'manuell', extras: [] };
var FAHRZEUG_IMMER = [26, 27]; /* Tacho T28 + ZE2 */
function fahrzeugZuSg(cfg) {
  var out = FAHRZEUG_IMMER.slice(), seen = {};
  out.forEach(function (id) { seen[id] = 1; });
  FAHRZEUG_GRUPPEN.forEach(function (g) {
    var v = cfg ? cfg[g.id] : undefined;
    if (v === undefined) v = FAHRZEUG_DEFAULT[g.id];
    var ids = [];
    if (g.typ === 'single') {
      g.optionen.forEach(function (o) { if (o.id === v) ids = o.sg; });
    } else {
      (v || []).forEach(function (vid) {
        g.optionen.forEach(function (o) { if (o.id === vid) ids = ids.concat(o.sg); });
      });
    }
    ids.forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(id); } });
  });
  out.sort(function (a, b) { return a - b; });
  return out;
}
/* Verarbeiten: Auswahl -> fertiges Ergebnis-Modell */
function baueErgebnis(selIds) {
  var selSet = {};
  (selIds || []).forEach(function (id) { selSet[id] = 1; });
  var sgs = SG_DATEN.sg.filter(function (s) { return selSet[s.id]; });
  var pins = SG_DATEN.pinouts.filter(function (p) { return selSet[p.steuergeraet_id]; });
  var pruef = [];
  function hatKnoten(id) { return !!nodeById(GRAPH, id); }
  var vssKette = ['G1/11', 'U1/11', 'T28/27', 'T28/07', 'U2/02', 'ECU:65'];
  var fehlt = vssKette.filter(function (k) { return !hatKnoten(k); });
  pruef.push({ id: 'vss', titel: 'VSS-Signalkette', ok: fehlt.length === 0,
    text: fehlt.length ? 'Fehlt im Graph: ' + fehlt.join(', ') : 'G1/11 → U1/11 → T28/27 → T28/07 → U2/02 → ECU:65 vollständig' });
  var dzm = ['ECU:22', 'G1/12', 'U1/06', 'T28/10'].filter(function (k) { return !hatKnoten(k); });
  pruef.push({ id: 'dzm', titel: 'Drehzahlsignal', ok: dzm.length === 0,
    text: dzm.length ? 'Fehlt im Graph: ' + dzm.join(', ') : 'ECU:22 → G1/12 → U1/06 → T28/10 vollständig' });
  var mfa = ['ECU:51', 'T28/26'].filter(function (k) { return !hatKnoten(k); });
  pruef.push({ id: 'mfa', titel: 'MFA-Verbrauchssignal', ok: mfa.length === 0,
    text: mfa.length ? 'Fehlt im Graph: ' + mfa.join(', ') : 'ECU:51 → T28/26 vollständig' });
  return { anzahlSg: sgs.length, anzahlPins: pins.length, sgs: sgs, pins: pins, pruefungen: pruef };
}

/* Stecker-Metadaten + Bereiche + Kabelfarben (v3-Ordnung) */
var ZE2_CONN = [{"stecker":"A1","farbe":"Gelb","pole":8,"beschreibung":"Scheinwerferkabelbaum links"},{"stecker":"A2","farbe":"Gelb","pole":8,"beschreibung":"Scheinwerferkabelbaum rechts"},{"stecker":"B","farbe":"Grün","pole":6,"beschreibung":"Scheinwerferwaschanlage"},{"stecker":"C","farbe":"Gelb","pole":8,"beschreibung":"Motorraum / Wischer"},{"stecker":"D","farbe":"Grün","pole":12,"beschreibung":"Diverse Ausrüstung (A/C, ABS, Sitzheizung)"},{"stecker":"E","farbe":"Grün","pole":5,"beschreibung":"Kombiinstrument / Bremslicht"},{"stecker":"F","farbe":"Weiß","pole":10,"beschreibung":"Motorraum rechts (Anlasser, Lichtmaschine)"},{"stecker":"G1","farbe":"Weiß","pole":12,"beschreibung":"Motorraum rechts – Motor-Management"},{"stecker":"G2","farbe":"Weiß","pole":12,"beschreibung":"Motorraum rechts – Sensoren"},{"stecker":"H1","farbe":"Rot","pole":10,"beschreibung":"Lenksäule / Zündschloss"},{"stecker":"H2","farbe":"Rot","pole":8,"beschreibung":"Lenksäule / Blinker"},{"stecker":"J","farbe":"Rot","pole":10,"beschreibung":"Lenksäule / Lichtschalter"},{"stecker":"K","farbe":"Schwarz","pole":12,"beschreibung":"Heckkabelbaum"},{"stecker":"L","farbe":"Schwarz","pole":8,"beschreibung":"Heck / Handbremse"},{"stecker":"M","farbe":"Schwarz","pole":6,"beschreibung":"Heck / Kraftstofftank"},{"stecker":"N","farbe":"Grün","pole":6,"beschreibung":"Klimaanlage"},{"stecker":"P","farbe":"Blau","pole":10,"beschreibung":"Armaturenbrett / Heckscheibe"},{"stecker":"Q","farbe":"Blau","pole":6,"beschreibung":"Armaturenbrett / Gebläse"},{"stecker":"R","farbe":"Blau","pole":10,"beschreibung":"Armaturenbrett / Lichtschalter"},{"stecker":"S","farbe":"Weiß","pole":5,"beschreibung":"Motorraum / Wischermotor"},{"stecker":"T","farbe":"Grün","pole":2,"beschreibung":"Einzelstromkreise (fahrzeugspezifisch)"},{"stecker":"U1","farbe":"Blau","pole":14,"beschreibung":"Kombiinstrument Kabelbaum 1"},{"stecker":"U2","farbe":"Blau","pole":14,"beschreibung":"Kombiinstrument Kabelbaum 2"},{"stecker":"V","farbe":"Grün","pole":4,"beschreibung":"MFA-Schalter (Wischerhebel)"},{"stecker":"W","farbe":"Grün","pole":6,"beschreibung":"Sonderausstattung (Tempomat, Radio) / ABS-Anschlüsse"},{"stecker":"X","farbe":"Grün","pole":8,"beschreibung":"Warnleuchten"},{"stecker":"Y","farbe":"Rot","pole":4,"beschreibung":"Dauerplus-Verteiler"},{"stecker":"Z1","farbe":"Rot","pole":1,"beschreibung":"Kraftstoffpumpenrelais-Ausgang / Einspritzdüsen"},{"stecker":"Z2","farbe":"Braun","pole":1,"beschreibung":"Hauptmasse (Batterie-Minus)"},{"stecker":"30","farbe":"Rot","pole":1,"beschreibung":"Dauerplus-Einzelstecker"},{"stecker":"30B","farbe":"Rot","pole":1,"beschreibung":"Kraftstoffpumpenrelais Pin 30"}];
var BEREICH_GROUPS = [{label:"Scheinwerfer",ids:["A1","A2","B"]},{label:"Motorraum",ids:["C","F","G1","G2","N","S"]},{label:"Lenksäule",ids:["H1","H2","J"]},{label:"Karosserie / Heck",ids:["K","L","M"]},{label:"Armaturenbrett",ids:["D","E","P","Q","R"]},{label:"Instrumente",ids:["U1","U2","V","W","X"]}];
var FARBEN = {Braun:{bg:"#5c3317",fg:"#f5d0a9"},Rot:{bg:"#7f1d1d",fg:"#fca5a5"},Schwarz:{bg:"#1c1c1c",fg:"#d4d4d4"},Gelb:{bg:"#713f12",fg:"#fef08a"},Grün:{bg:"#14532d",fg:"#86efac"},Blau:{bg:"#1e3a5f",fg:"#93c5fd"},Weiß:{bg:"#3f3f46",fg:"#f4f4f5"},Grau:{bg:"#3f3f46",fg:"#a1a1aa"},Violett:{bg:"#4c1d95",fg:"#c4b5fd"},Orange:{bg:"#7c2d12",fg:"#fdba74"}};
function farbeStyle(f){ var n=String(f||"").split("/")[0].trim(); for (var k in FARBEN) if(n.toLowerCase().indexOf(k.toLowerCase())===0||k.toLowerCase().indexOf(n.toLowerCase())===0) return FARBEN[k]; return {bg:"#27272a",fg:"#a1a1aa"}; }
function connMeta(c){ for (var i=0;i<ZE2_CONN.length;i++) if(ZE2_CONN[i].stecker===c) return ZE2_CONN[i]; return null; }
/* Hinweis ohne Herkunftsangaben */
function hinweisSauber(h){ return String(h||"").replace(/[[^]]*]/g,"").replace(/Q:s*S+/g,"").replace(/s{2,}/g," ").trim(); }

if (typeof module !== 'undefined') {
  module.exports = { SG_DATEN: SG_DATEN, GRAPH: GRAPH, bfsUp: bfsUp, bfsDown: bfsDown, zweige: zweige, pfadAnalyse: pfadAnalyse, sgPinZuKnoten: sgPinZuKnoten, faktorRechner: faktorRechner, sgStatistik: sgStatistik, kantenWarnung: kantenWarnung, FIRMWARE_INO: FIRMWARE_INO, FAHRZEUG_KEY: FAHRZEUG_KEY, FAHRZEUG_GRUPPEN: FAHRZEUG_GRUPPEN, FAHRZEUG_DEFAULT: FAHRZEUG_DEFAULT, FAHRZEUG_IMMER: FAHRZEUG_IMMER, fahrzeugZuSg: fahrzeugZuSg, baueErgebnis: baueErgebnis, ZE2_CONN: ZE2_CONN, BEREICH_GROUPS: BEREICH_GROUPS, FARBEN: FARBEN, farbeStyle: farbeStyle, connMeta: connMeta, hinweisSauber: hinweisSauber };
}

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

if (typeof module !== 'undefined') {
  module.exports = { SG_DATEN: SG_DATEN, GRAPH: GRAPH, bfsUp: bfsUp, bfsDown: bfsDown, zweige: zweige, pfadAnalyse: pfadAnalyse, sgPinZuKnoten: sgPinZuKnoten, faktorRechner: faktorRechner, sgStatistik: sgStatistik, kantenWarnung: kantenWarnung, FIRMWARE_INO: FIRMWARE_INO };
}

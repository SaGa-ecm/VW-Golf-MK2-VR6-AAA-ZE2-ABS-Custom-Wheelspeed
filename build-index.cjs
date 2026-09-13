// Baut index.html (neu, standalone) aus app-template.js + ui-template.js + Daten. Einmalig, danach loeschen.
const fs = require('fs');
const crypto = require('crypto');
const base = 'C:/Users/Admin/Documents/VW-Golf-MK2-VR6-AAA-ZE2-ABS-Custom-Wheelspeed/';

const sgRaw = fs.readFileSync(base + 'sg-daten.js', 'utf8');
const sgJson = sgRaw.replace(/^const SG_DATEN\s*=\s*/, '').replace(/;\s*$/, '').trim();
JSON.parse(sgJson); // validieren
const G = require(base + 'graph-kanten.js');
const graphJson = JSON.stringify(G);

const ino = fs.readFileSync('C:/Users/Admin/AppData/Local/hermes/tmp-vw-priv/firmware/v1.0/tacho.ino', 'utf8');
const sha = crypto.createHash('sha256').update(ino, 'utf8').digest('hex');

let vssSrc = fs.readFileSync(base + 'vss-opts.txt', 'utf8');
const vss = eval(vssSrc); // lokales Extrakt, [{id gala/arduino,...}]
if (vss.length !== 2 || vss[0].id !== 'gala' || vss[1].id !== 'arduino') throw new Error('VSS-Extrakt unerwartet');
vss[1].firmware = ino; // byte-identisch aus Original
const si = eval(fs.readFileSync(base + 'si-extract.txt', 'utf8'));
const rel = eval(fs.readFileSync(base + 'relais-extract.txt', 'utf8'));
if (si.length !== 22 || rel.length !== 24) throw new Error('Si/Relais unerwartet: ' + si.length + '/' + rel.length);

let app = fs.readFileSync(base + 'app-template.js', 'utf8');
app = app.split('__SG_JSON__').join(sgJson)
  .split('__GRAPH_JSON__').join(graphJson)
  .split('__FW_JSON__').join(JSON.stringify(ino))
  .split('__FW_SHA__').join(sha)
  .split('__VSS_JSON__').join(JSON.stringify(vss))
  .split('__SI_JSON__').join(JSON.stringify(si))
  .split('__RELAIS_JSON__').join(JSON.stringify(rel));
const ui = fs.readFileSync(base + 'ui-template.js', 'utf8');

const css = '*{box-sizing:border-box}body{margin:0;background:#0D0D0D;color:#E8E8E8;font-family:system-ui,sans-serif;font-size:14px;line-height:1.5}'
+ 'a{color:#E8A020}.wrap{max-width:1100px;margin:0 auto;padding:16px 14px 60px}'
+ 'header{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}header h1{font-size:18px;margin:0;color:#E8A020}'
+ '.tabs{display:flex;gap:2px;border-bottom:1px solid #222;margin:12px 0;overflow-x:auto}'
+ '.tab-btn{background:none;border:none;cursor:pointer;padding:9px 12px;font-size:12px;font-weight:600;white-space:nowrap;color:#555;border-bottom:2px solid transparent}'
+ '.tab-btn.active{color:#E8A020;border-bottom-color:#E8A020}.tab-btn:not(.active):hover{color:#999}'
+ '.badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.04em;padding:2px 8px;border-radius:3px;margin:2px 4px 2px 0}'
+ '.b-pins{background:rgba(20,83,45,.4);color:#86efac;border:1px solid rgba(20,83,45,.8)}'
+ '.b-stamm{background:#2a2a2e;color:#a1a1aa;border:1px solid #3a3a40}'
+ '.b-unbest{background:rgba(220,60,60,.15);color:#ff7b7b;border:1px solid rgba(220,60,60,.5)}'
+ '.b-annahme{background:rgba(232,160,32,.12);color:#E8A020;border:1px solid rgba(232,160,32,.5)}'
+ '.b-ext{background:rgba(59,90,246,.15);color:#9db4ff;border:1px solid rgba(59,90,246,.5)}'
+ '.warn-unbest{background:rgba(220,60,60,.15);color:#ff7b7b;border:1px solid rgba(220,60,60,.5)}'
+ '.warn-annahme{background:rgba(232,160,32,.12);color:#E8A020;border:1px solid rgba(232,160,32,.5)}'
+ '.searchrow{position:relative;margin-bottom:10px}.searchrow input{background:#141414;border:1px solid #2a2a2a;color:#E8E8E8;font-size:14px;padding:8px 10px 8px 32px;border-radius:3px;width:100%}'
+ 'input[type=text],input[type=number],input[type=search]{background:#141414;border:1px solid #2a2a2a;color:#E8E8E8;font-size:14px;padding:8px 10px;border-radius:3px;width:100%}'
+ 'input:focus{outline:none;border-color:rgba(232,160,32,.6)}.searchrow .icon{position:absolute;left:10px;top:9px;color:#444}'
+ '.kats{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}'
+ '.kat-btn{background:#161616;border:1px solid #2a2a2a;color:#999;font-size:12px;font-weight:600;padding:5px 12px;border-radius:3px;cursor:pointer}'
+ '.kat-btn small{color:#555;font-weight:400}.kat-btn.active{background:#E8A020;color:#0D0D0D;border-color:#E8A020}.kat-btn.active small{color:#0D0D0D}'
+ '.cols{display:flex;gap:14px;margin-top:12px}@media(max-width:760px){.cols{flex-direction:column}}'
+ '.list{flex:0 0 340px;max-width:100%}.sg-btn{display:block;width:100%;text-align:left;background:#141414;border:1px solid #222;color:#ddd;border-radius:4px;padding:8px 10px;margin-bottom:6px;cursor:pointer;font-size:13px}'
+ '.sg-btn:hover{border-color:#444}.sg-btn.active{border-color:#E8A020;background:#181410}.sg-btn .tn{display:block;font-size:11px;color:#777;font-family:ui-monospace,monospace}'
+ '.detail{flex:1;min-width:0;background:#111;border:1px solid #222;border-radius:5px;padding:16px}.detail h2{margin:0 0 4px;font-size:16px;color:#E8A020}'
+ '.card{background:#111;border:1px solid #222;border-radius:5px;padding:14px;margin:12px 0}.card h2{margin:0 0 8px;font-size:15px;color:#E8A020}.card h3{font-size:13px;color:#E8A020;margin:14px 0 6px}'
+ '.kv{display:grid;grid-template-columns:130px 1fr;gap:4px 10px;font-size:13px;margin:10px 0}.kv dt{color:#777}.kv dd{margin:0;font-family:ui-monospace,monospace;font-size:12px}'
+ 'table.pins{width:100%;border-collapse:collapse;font-size:12px;margin-top:8px}table.pins th{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#555;text-align:left;padding:5px 7px;border-bottom:1px solid #2a2a2a}'
+ 'table.pins td{padding:5px 7px;border-bottom:1px solid #1a1a1a;font-family:ui-monospace,monospace;vertical-align:top}'
+ '.mono{font-family:ui-monospace,monospace;font-size:12px;background:#0f0f0f;border:1px solid #222;border-radius:4px;padding:8px 10px;margin-top:6px}'
+ '.kbd{font-family:ui-monospace,monospace;font-size:11px;background:#1c1c1c;border:1px solid #333;border-radius:3px;padding:1px 6px;color:#999}'
+ '.opts{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}'
+ '.opt{background:#161616;border:1px solid #2a2a2a;color:#ccc;font-size:12px;font-weight:600;padding:8px 14px;border-radius:3px;cursor:pointer}'
+ '.opt.active{background:#E8A020;color:#0D0D0D;border-color:#E8A020}'
+ '.chip{display:inline-block;background:#1a1a1a;border:1px solid #2c2c2c;color:#ddd;font-size:12px;padding:4px 10px;border-radius:12px;margin:2px 4px 2px 0}'
+ '.done-chk span.txt{color:#E8A020}'
+ '.result-head{border-color:#E8A020}'
+ '.side-cols{display:flex;gap:14px;margin-top:12px}@media(max-width:760px){.side-cols{flex-direction:column}}'
+ '.sidebar{flex:0 0 170px;max-width:100%}'
+ '.sidebar-btn{display:flex;align-items:center;gap:6px;width:100%;background:none;border:none;cursor:pointer;padding:5px 8px;border-radius:3px;font-size:12px;color:#888;text-align:left;font-family:ui-monospace,monospace}'
+ '.sidebar-btn small{color:#555;margin-left:auto}'
+ '.sidebar-btn:hover{background:#181818;color:#bbb}'
+ '.sidebar-btn.active{background:rgba(232,160,32,.10);color:#E8A020}.sidebar-btn.active small{color:#E8A020}'
+ '.conn-header{display:flex;align-items:center;gap:10px;padding:7px 12px;cursor:pointer;background:none;border:none;border-bottom:1px solid #1a1a1a;width:100%;text-align:left;color:#ddd;font-size:13px}'
+ '.conn-header:hover{background:#181818}'
+ '.conn-badge{display:inline-block;min-width:34px;text-align:center;font-size:11px;font-weight:700;padding:2px 8px;border-radius:3px;font-family:ui-monospace,monospace}'
+ '.conn-header strong{font-size:13px}'
+ '.conn-count{margin-left:auto;color:#555;font-family:ui-monospace,monospace;font-size:12px}'
+ '.chev{color:#555;font-size:12px;margin-left:8px}'
+ '.kbadge{display:inline-block;font-size:11px;font-weight:600;padding:1px 7px;border-radius:3px;margin:1px 3px 1px 0;font-family:ui-monospace,monospace}'
+ '.copy-btn{background:none;border:none;color:#555;cursor:pointer;font-size:13px;opacity:.4;padding:2px 6px}'
+ 'tr.copy-row:hover{background:#161616}tr.copy-row:hover .copy-btn{opacity:1;color:#E8A020}'
+ 'tr.warn-bar{background:rgba(245,158,11,.05)}tr.dim-row{opacity:.5}'
+ '.side-grp{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#E8A020;margin:10px 0 2px;font-weight:700}'
+ '.side-main{flex:1;min-width:0}'
+ '.side-kurz{font-size:11px;color:#888;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'
+ '.sidebar-btn.active .side-kurz{color:rgba(232,160,32,.8)}'
+ '.tab-btn.disabled{opacity:.35;cursor:default}'
+ '.mut{color:#888}.small{font-size:12px}.warn{color:#f59e0b;font-size:12px}'
+ '.src{font-size:10px;color:#555;margin-top:3px}.hint{background:#141414;border:1px solid #2a2a2a;border-radius:4px;padding:8px 12px;font-size:12px;color:#999;margin-top:12px}'
+ '.crumbs{display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin:14px 0;padding:12px;background:#0f0f0f;border:1px solid #222;border-radius:5px}'
+ '.crumb{background:#1a1a1a;border:1px solid #2c2c2c;color:#ddd;font-family:ui-monospace,monospace;font-size:12px;font-weight:600;padding:6px 10px;border-radius:3px;cursor:pointer}'
+ '.crumb:hover,.crumb.sel{border-color:#E8A020;color:#E8A020}.nl{background:#1a1a1a;border:1px solid #2c2c2c;color:#E8A020;font-family:ui-monospace,monospace;font-size:12px;font-weight:600;padding:2px 8px;border-radius:3px;cursor:pointer}'
+ '.nl:hover{border-color:#E8A020}.arrow{color:#444;font-size:12px}'
+ 'label{display:block;font-size:12px;color:#999;margin:10px 0 4px}button.calc,a.calc{background:#E8A020;color:#0D0D0D;border:none;font-weight:700;font-size:14px;padding:9px 18px;border-radius:3px;cursor:pointer;margin-top:12px;text-decoration:none;display:inline-block}'
+ '.result{background:#0f0f0f;border:1px solid #2a2a2a;border-radius:4px;padding:10px 12px;margin-top:12px;font-family:ui-monospace,monospace;font-size:14px}'
+ '.chk{display:flex;gap:10px;align-items:flex-start;padding:9px 4px;border-bottom:1px solid #1a1a1a;cursor:pointer}.chk input{margin-top:4px;accent-color:#E8A020}'
+ '.chk.done span.txt{color:#555;text-decoration:line-through}.prog{height:8px;background:#1c1c1c;border-radius:4px;overflow:hidden;margin:8px 0}.prog>div{height:100%;background:#E8A020;width:0%}'
+ '.step{padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px}'
+ 'pre#fwPre{background:#0a0a0a;border:1px solid #222;border-radius:5px;padding:12px;font-size:11px;line-height:1.45;overflow:auto;max-height:480px;white-space:pre}'
+ '.tab-btn.disabled{opacity:.35;cursor:default}'
+ '.opts{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}'
+ '.opt{background:#161616;border:1px solid #2a2a2a;color:#ccc;font-size:12px;font-weight:600;padding:8px 14px;border-radius:3px;cursor:pointer}'
+ '.opt.active{background:#E8A020;color:#0D0D0D;border-color:#E8A020}'
+ '.chip{display:inline-block;background:#1a1a1a;border:1px solid #2c2c2c;color:#ddd;font-size:12px;padding:4px 10px;border-radius:12px;margin:2px 4px 2px 0}'
+ '.done-chk span.txt{color:#E8A020}'
+ '.result-head{border-color:#E8A020}'
+ '.empty{color:#555;padding:20px;text-align:center}footer{margin-top:24px;color:#555;font-size:12px}';

const html = '<!DOCTYPE html>\n<html lang="de">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'<title>VW Golf 2 GTI – Zentrale Pinout-Referenz (ZE2 / T28 / ECU / ABS / VSS)</title>\n<style>' + css + '</style>\n</head>\n<body>\n<div class="wrap">\n' +
'<header><h1>VW Golf 2 GTI – Zentrale Pinout-Referenz</h1></header>\n' +
'<nav class="tabs" id="tabs" role="tablist"></nav>\n' +
'<div class="searchrow"><span class="icon">/</span><input id="q" type="search" placeholder="Globale Suche: System, Pin, Stecker, Farbe …  ( / = Fokus, Esc = zurück )"></div>\n' +
'<div id="main"></div>\n' +
'<footer><span id="stat"></span> · Alle Angaben ohne Gewähr – vor Verdrahtung gegenmessen. Tasten: <span class="kbd">1–4</span> Schritte · <span class="kbd">/</span> Suche · <span class="kbd">Esc</span> zurück.</footer>\n' +
'</div>\n<script>\n' + app + '\n</script>\n<script>\n' + ui + '\n</script>\n</body>\n</html>\n';

fs.writeFileSync(base + 'index.html', html);
console.log('index.html geschrieben:', html.length, 'Bytes');
console.log('SG:', JSON.parse(sgJson).sg.length, 'Pins:', JSON.parse(sgJson).pinouts.length);
console.log('Knoten:', G.nodes.length, 'Kanten:', G.edges.length);
console.log('FW-SHA:', sha);

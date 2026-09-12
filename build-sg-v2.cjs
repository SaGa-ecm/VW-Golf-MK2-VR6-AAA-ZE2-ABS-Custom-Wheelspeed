// Build sg-daten.js v2: Research-JSONs aus docs/*.md mergen. Einmalig, danach loeschen.
const fs = require('fs');
const base = 'C:/Users/Admin/AppData/Local/hermes/tmp-vw-analyse/';
const srcFiles = ['docs/pins-motor-sg.md', 'docs/pins-abs-getriebe.md', 'docs/pins-komfort-wfs.md'];

const raw = fs.readFileSync(base + 'sg-daten.js', 'utf8');
const S = JSON.parse(raw.replace(/^const SG_DATEN\s*=\s*/, '').replace(/;\s*$/, ''));
const sgIds = new Set(S.sg.map(s => s.id));
const have = new Set(S.pinouts.map(p => p.steuergeraet_id + '|' + p.pin));
let maxId = Math.max(...S.pinouts.map(p => p.id));

const normKonf = { 'mittel': 'MITTEL', 'niedrig': 'NIEDRIG', 'niedrig-mittel': 'NIEDRIG' };
let added = 0; const perSg = {}; const skipped = [];
for (const f of srcFiles) {
  const t = fs.readFileSync(base + f, 'utf8');
  const re = /\{\s*"sg_id"[\s\S]*?\}/g;
  let m;
  while ((m = re.exec(t))) {
    const o = JSON.parse(m[0]);
    // Schema pruefen
    for (const k of ['sg_id', 'pin', 'funktion', 'kabelfarbe', 'kategorie', 'hinweis', 'konfidenz', 'quelle']) {
      if (!(k in o)) throw new Error('Schema: Key fehlt: ' + k + ' in ' + f + ' ' + m[0].slice(0, 100));
    }
    if (!sgIds.has(o.sg_id)) throw new Error('sg_id unbekannt: ' + o.sg_id + ' in ' + f);
    if (String(o.pin).trim() === '' || String(o.funktion).trim() === '') throw new Error('pin/funktion leer in ' + f);
    const key = o.sg_id + '|' + o.pin;
    if (have.has(key)) { skipped.push(key + ' (' + f + ')'); continue; }
    have.add(key);
    maxId++;
    S.pinouts.push({
      id: maxId,
      steuergeraet_id: o.sg_id,
      pin: String(o.pin),
      funktion: o.funktion,
      kabelfarbe: o.kabelfarbe == null ? '' : o.kabelfarbe,
      kategorie: o.kategorie,
      hinweis: o.hinweis,
      konfidenz: normKonf[o.konfidenz] || o.konfidenz,
      quelle: o.quelle + ' [Research ' + f + ', 12.09.2026]'
    });
    added++;
    perSg[o.sg_id] = (perSg[o.sg_id] || 0) + 1;
  }
}
// sg7: 55-polig korrigieren (Research sg7 Pin 1: "M2.7 55-pol bis 1995; DB-Angabe 68-pol anzweifeln")
const sg7 = S.sg.find(s => s.id === 7);
sg7.stecker = '55-polig (M2.7, korrigiert 12.09.2026 — DB-Angabe 68-pol falsch)';
sg7.notizen = (sg7.notizen || '') + ' [v2: 55-pol bestaetigt, Doppel-WOBber entry/1773]';
// Pin19-Konflikt verstaerken (id 149, SG 9)
const p19 = S.pinouts.find(p => p.id === 149);
if (!p19) throw new Error('Pin19 id149 fehlt!');
p19.hinweis += ' [v2 UMSTRITTEN bestaetigt: index.html m19 = KEIN VSS-Ausgang am Mk02 vs. DB id149 = VSS->W/1; s. docs/graph-notizen.md Konflikt 1]';
S.stand = '2026-09-12 (v2: +Research-Merge)';
S.quelle = 'vw-wissen2.db + docs/pins-motor-sg.md + docs/pins-abs-getriebe.md + docs/pins-komfort-wfs.md (12.09.2026)';

fs.writeFileSync(base + 'sg-daten.js', 'const SG_DATEN = ' + JSON.stringify(S) + ';\n');
console.log('hinzugefuegt:', added);
console.log('pro SG:', JSON.stringify(perSg));
console.log('uebersprungen (Kollision):', skipped.length, JSON.stringify(skipped));
console.log('pins gesamt:', S.pinouts.length, 'SG:', S.sg.length);

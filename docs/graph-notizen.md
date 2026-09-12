# Graph-Notizen — Querverweis-Kantenliste (ZE2/Tacho/ECU/ABS)

- Stand: 2026-09-12 · Branch: `fix/vss-doku-menue-xdf` · **nicht committen**
- Artefakt: `graph-kanten.js` (`const GRAPH = { nodes, edges }`), gebaut mit `build-graph.js`
- Quellen: `index.html`-Arrays **f** (ZE2-Stecker, 216 Pins), **d** (T28, 28 Pins),
  **p** (ECU M2.9, 68 Pins), **m** (ABS Mk02, 35 Pins), **m4** (Mk04/T55, 55 Pins),
  **m20** (Mk20/T25, 25 Pins) + `vw-wissen2.db → pinouts.hinweis/funktion`
  (DB endet bei id 337 = U1/10; U1/11+, U2/*, W/X/Y etc. nur aus `index.html`).
- Methode: Pfeile `→` / `->` in `funktion`/`hinweis`/`kabel` + `d.ze2`-Strukturfeld
  (jede T28→ZE2-Zuordnung = 1 Kante) + Kettenauflösung (`A → B → C` = 2 Kanten) +
  Sensor-Adern aus `funktion` (m/m4/m20, sonst fehlten G44–G47 komplett) +
  2 textuelle Diagnose-Ziele ohne Pfeilzeichen (ECU:21→OBD:15, ECU:43→OBD:7).
- Verifikation: `node --check graph-kanten.js` OK; alle 134 Kanten-Endpunkte haben
  einen Knoten (0 fehlende Endpunkte).

## 1. Zahlen

- Knoten gesamt: **467** — ze2: 216, tacho: 28, ecu: 68, abs-mk02: 35,
  abs-mk04: 55, abs-mk20: 25, extern: **40**
- Kanten gesamt: **134** (eindeutig, nach von→nach entdoppelt; Mehrfachquellen mit `+`)
- Quellennennungen: f: 54, d: 32 (davon 28 ze2-strukturell), m4: 30, m20: 17,
  m: 15, db: 13, p: 12, p-Relaiskette: 2
- Normalisierung: `U1/3→U1/03`, `U2/2→U2/02`, `T28/27` bleibt, `W/1`/`X/8`/`K/5`
  bleiben einstellig, `ECU Pin 65→ECU:65`, `ABS-SG Pin 10→MK02:10`,
  `Si. 16→Si.16`, `X/08→X/8`, `W/04→W/4`.

## 2. EXTERN-Typen (40, Endpunkte ohne eigenen Pin-Datensatz)

| Typ | Knoten |
|-----|--------|
| Sensor (6) | G44, G45, G46, G47, G100, G101 |
| Aktor/Ventilblock (10) | N55:1, N55:2, N55:3, N55:4, N55:5, N55:7, N55:8, N55:9, N55:11, N55:15 |
| Relais (6) | Relais:3, Relais:12, Relais:79, Relais:79/86, Relais:D3+D7, J102 |
| Sicherung (5) | Si.16, Si.21, S123, S124, S54 |
| Versorgung (3) | Kl.15, Kl.31, Kl.X |
| Diagnose (2) | OBD:7 (K-Line/T16/7), OBD:15 (L-Line) |
| Anzeige (3) | Kombi (MIL), ABS-Lampe, Warnleuchte (Öldruck) |
| Komfort (2) | Radio (GALA), Tempomat (GRA) |
| Schalter (1) | Bremspedalschalter (F) |
| Sonstiges (1) | Automatikgetriebe (→ T28/28) |
| ZE-Lücke (1) | F/2 (Ziel von G1/1, kein Pin-Datensatz in f) |

## 3. WICHTIG: U1/03-Korrektur (Aufgabe vs. Quellen)

Die Aufgabe nennt `U1/03 = Kühlmitteltemperatur (Gelb/Rot → T28/23)`.
**Die Quellen sagen anderes** — belegt in f, d UND DB (id 73, `ZE2:U2/09`):

- `U2/09` = Kühlmitteltemperatursensor, Kabel **Gelb/Rot**, `→ T28/23` (f:U2/09)
- `T28/23` = Kühlmitteltemperatur, Gelb/Rot, `ze2 = U2/09`, `→ G2/03` (d:T28/23)
- `G2/03` = Kühlmitteltemperatursensor, Gelb/Rot (f; DB id 230 ohne Pfeil)
- `ECU:14` = Kühlmitteltemperatur, Blau, `→ G2/03 → T28/23` (p + db:47)
- `U1/03` = **Öldruckschalter 1,8 bar**, Kabel **Gelb**, `→ T28/08`
  (f:U1/03; DB id 330; Gegenstück d:T28/08 `ze2 = U1/03`)

Die **Kühlmittel-Kette ist im Graphen vollständig enthalten**:

```text
ECU:14 --(Blau, p:ECU:14)--> G2/03 --(Gelb/Rot, d:T28/23-hinweis)--> T28/23
T28/23 <--(Gelb/Rot, d:T28/23 + f:U2/09)--> U2/09
```

Es wurde bewusst **keine** erfundene Kante U1/03→T28/23 angelegt.

## 4. Beispielpfad U1/03 (Öldruck 1,8 bar) — vorwärts / rückwärts

Vorwärts (Geber → Anzeige):

```text
Öldruckschalter 1,8 bar (Motor) → U1/03 (Gelb, f:U1/03) → T28/08 → Öldruckkontrolle
```

Rückwärts (ab Tacho):

```text
T28/08 ← U1/03 (Gelb, KI-Kabelbaum)   [d:T28/08 + f:U1/03]
T28/08 ← G2/10 (Gelb, Motorraum)      [f:G2/10]  ← ZWEIG: 2 Quellen, 1 Ziel
T28/09 ← U1/05 / G2/11 (0,3-bar-Schwesterpfad, gleiche Struktur)
T28/09 → Warnleuchte (<0,3 bar, d:T28/09)
```

Weitere Zweige im Graphen:

- VSS: `W/1 → U1/11 → T28/27 (EINGANG) → [Tacho-intern] → T28/07 (AUSGANG) → U2/02 → ECU:65`,
  Abzweige `G1/11 → Radio`, `G1/11/U2/02/T28/07 → Tempomat`, `G1/11 → T28/27` (DB-Wortlaut)
- DZM VR6: `ECU:22 → G1/12 → U1/06 → T28/10` (Wandler 6→4 Zyl. nötig)
- MFA-Verbrauch: `ECU:51 → T28/26` (Einzelstecker, Violett/Weiß)
- Blinker re: `T28/24 ← H2/08` und `← U2/06` (ab 1990, Doppelquelle wie T28/08)
- Relaiskette: `ECU:9 → Relais:3 → ECU:23 → G1/04`; `ECU:38 → G1/04`
- ABS Mk02: `W/3 → MK02:10` (Kl.X), `W/4 → MK02:12` (Bremse), `MK02:16 → W/2` (Warnlampe)

## 5. Offene Konflikte (am Fahrzeug verifizieren)

1. **Mk02 Pin 19 VSS**: DB (id 149) `MK02:19 → W/1 → U1/11 → T28/27` MIT Konflikthinweis
   (motor-talk/clubgti: Mk02 hat KEIN VSS) — `index.html`-m19 sagt explizit
   „KEIN VSS-Ausgang am Mk02“. Kante mit `[KONFLIKT]` markiert (db:149).
2. **Mk02 Pin 13 Diagnose**: `index.html` `→ X/08 (NICHT W/2, KEINE K-Line)`,
   DB (id 143) `→ W/2 → OBD`. Beide Kanten enthalten, DB-Variante markiert.
3. **VSS-Frequenz**: `index.html` ~107 Hz @100 km/h (k=960, ANNAHME) vs. DB id 57
   ~525 Hz @100 km/h. Offene Annahme, per GPS gegenmessen.
4. **G1/11-Wortlaut**: `index.html` `→ ECU Pin 65 / Radio-GALA / Tempomat (von W/1)`,
   DB (id 226) `→ T28/27 / ECU Pin 65`. Union im Graphen (4 Kanten).

## 6. Verwendung

```js
const GRAPH = require("./graph-kanten.js"); // { nodes:[{id,label,tab}], edges:[{von,nach,signal,quelle}] }
// tabs: ze2 | tacho | ecu | abs-mk02 | abs-mk04 | abs-mk20 | extern
// quelle: f:U1/03 | d:T28/08 | p:ECU:22 | m:MK02:10 | m4:MK04:32 | m20:MK20:13 | db:149 (+-verkettet)
```

Prüfung: `node --check graph-kanten.js` OK; alle 134 Kanten-Endpunkte haben
einen Knoten. Der Graph wurde per Skript aus `index.html` + DB aufgebaut
(Methode s. o.); das Build-Skript wurde nach dem Bau entfernt, die
`graph-kanten.js` ist eigenständig verwendbar.

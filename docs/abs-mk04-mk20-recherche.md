# ABS-Recherche: Teves Mk04 (T55, Golf 3) + Teves Mk20 (T25)

- Stand: 2026-09-12 · Branch: `fix/vss-doku-menue-xdf` · **nicht committen**
- Gegenstand: Radsensor-Adern G44–G47 (welcher SG-Pin je Rad), K-Line, Warnlampe,
  Klemme-X/30-Versorgung, Bremspedalschalter — sowie Frage: **VSS-/GALA-Ausgang am SG?**
- Methode: offizielle VW-Reparaturleitfaden-Inhalte (workshop-manuals.com = ELSA-Texte;
  charm.li = US-OEM-Serviceinfo Golf III/Jetta III 1994, Diagram 17/01–03 + Electrical Test),
  plus Umbau-/Forenpraxis. **Keine Pin-Nummer erfunden** — was nicht belegbar ist, steht
  unter „Unbelegt / offen“.
- Konfidenz: **HOCH** = offizieller VW-Leitfaden · **MITTEL** = Forenpraxis/mehrfach
  bestätigt oder US→EU-Übertrag · **NIEDRIG** = Einzel hinweis / unsicher.

## 1. Teves Mk20 (J104 Kompakteinheit, 25-pol T25) — Golf 3 spät / Passat B4

Primärquelle (HOCH): VW-Reparaturleitfaden Golf Mk3, „Electrical check of the ABS and
ABS/EDL ITT Mark 20 GI — Multi-pin connector with contact assignment“
(https://workshop-manuals.com/volkswagen/golf-mk3/running_gear_self-diagnosis_for_abs/self_diagnosis_v.a.g_inspection_service/electrical_check_of_the_abs_and_abs/_edl_itt_mark_20_gi/multi-pin_connector_with_contact_assignment/).
Wortlaut dort: *„All contacts not listed are currently not assigned and must never be
connected!“*

| Pin | Funktion | Kabel | Quelle | Konfidenz |
|-----|----------|-------|--------|-----------|
| T25/1 | G44 hinten rechts, Ader 1 | unbestätigt (EU) | workshop-manuals.com (s. o.) | HOCH |
| T25/2 | G46 hinten links, Ader 1 | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/3 | G45 vorn rechts, Ader 1 | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/4 | G47 vorn links, Ader 1 | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/8 | Masse Kl. 31 (SG-Masse 1) | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/9 | Batterie+ (Kl. 30) via S124 | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/10 | G46 hinten links, Ader 2 | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/11 | G47 vorn links, Ader 2 | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/12 | Bremslichtschalter F | sw/rt → W4 (B4-Kabelbaum: rt/sw ab Schalter); EU: unbestätigt | workshop-manuals.com + https://the-corrado.net/topic/71162-teves-20-abs-system-parts-list/ (nachverfolgter Kabelbaum, mit SLP abgeglichen) | HOCH (Funktion) / MITTEL (Farbe) |
| T25/13 | K-Leitung → 16-pol Pin 7 | gr/ws (verlängern bis Diagnoseverteiler Mittelkonsole) | workshop-manuals.com + the-corrado.net + https://gummel.net/bofh-ng/de/corrado/abs-mark20-einbau-in-corrado | HOCH |
| T25/15 | Codierbrücke → Pin 21 (Golf-3-Variante) | Brücke 15–21 | workshop-manuals.com + gummel.net | HOCH |
| T25/16 | ABS-Warnlampe (Ansteuerung) | gr/ws → W2 (Corrado-Thread); B4: gn/ws Ri. Lampe (Index) | workshop-manuals.com + the-corrado.net | HOCH (Funktion) / MITTEL (Farbe: gr/ws vs. gn/ws = Variante/Ablesung) |
| T25/17 | G44 hinten rechts, Ader 2 | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/18 | G45 vorn rechts, Ader 2 | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/21 | Codierbrücke → Pin 15 | Brücke 21–15 | workshop-manuals.com + gummel.net | HOCH |
| T25/23 | Versorgung Kl. X (Entlastung) | sw/ge → D7 (via TV18; D3-Abzweig laut Umbau-Thread) | workshop-manuals.com + the-corrado.net + gummel.net („schwarz/gelb an D7“) | HOCH |
| T25/24 | Masse Kl. 31 (SG-Masse 2) | unbestätigt (EU) | workshop-manuals.com | HOCH |
| T25/25 | Batterie+ (Kl. 30) via S123 | unbestätigt (EU) | workshop-manuals.com | HOCH |

**Mk20 unbelegt (offiziell „never be connected“): 5, 6, 7, 14, 19, 20, 22.**
Eigendiagnose-Stecker dazu (workshop-manuals, HOCH): T16/4 = Masse (31),
T16/16 = Plus (30) via S21, T16/7 = K-Leitung (via TV14 zum J104;
Quelltext sagt „contact 0“ — offensichtlicher Tippfehler für 13).

Mk20-Praxisnotizen (MITTEL, je Einzel-/Doppelquelle):
- 4-Draht-Schnittstelle zum Sicherungskasten genügt: 12 (sw/rt→W4), 13 (gr/ws→Diagnose),
  16 (gr/ws→W2), 23 (sw/ge→D7) — the-corrado.net, physisch nachverfolgt + SLP-geprüft.
- K-Line alternativ an weißen Stecker unterm Schaltsack (ex-Mk02-Anschluss); Vorsicht:
  altes Mk02-bl/ge kann auf L-Line liegen → tauschen, sonst kein SG-Zugriff. Neu: 16-pol
  OBD (1H0 972 695) — gummel.net.
- Warnlampe Mk20 = reines Logiksignal, invertiert ggü. Golf 2 → Inverter/Relais bzw.
  Golf-3-Leuchte nötig; EBV-Pin an G3-Leuchte existiert separat —
  https://www.wolfsburg-edition.info/wbb5/thread/87195-umbau-abs-mark20/ (S. 71, Codierbrücke;
  Diagnose nur gr/ws) und https://www.wolfsburg-edition.info/wbb5/thread/136427-abs-problem-verbindung-mark20-mit-golf-2-abs-leuchte/ .
- **Mk20 hat KEIN CAN** (erst Mk20i Golf 4) — wolfsburg-edition.info.
- Passat-B4-Variante: Codierbrücke **6–22** statt 15–21 (Golf) — gummel.net (Einzelbericht,
  MITTEL). Für Golf 3 bleiben 6/22 offiziell unbelegt.

## 2. Teves Mk04 (J104 separat, 55-pol T55) — Golf 3 / Passat 35i Facelift / Corrado spät

Primärquelle (HOCH, Funktion): US-OEM-Serviceinfo (Mitchell/Alldata via charm.li),
Golf III 1994: „Description and Operation Teves 04 With ABS Only / With ABS/EDL“
(J104 55-pol; ABS- und ABS/EDL-Belegung identisch bis auf EDL-Zusatzpins) +
Stromlaufplan Diagram 17/01 (Track 1–14), 17/02 (15–28), 17/03 (29–42) +
Electrical Test Steps 1–2 (VAG 1598 = J104-Klemmennummern; Step 1: Kl. 30 an 35+1,
10,0–14,5 V; Step 2: Kl. 15 an 53+1). Kabelfarben = US-Stand, EU-Abweichung möglich
(daher Farbe MITTEL). Beispiel-URLs:
https://charm.li/Volkswagen/1994/Golf%20III%20%281H1%29%20L4-2.0L%20%28ABA%29/Repair%20and%20Diagnosis/Brakes%20and%20Traction%20Control/Antilock%20Brakes%20%2F%20Traction%20Control%20Systems/Description%20and%20Operation/Teves%2004%20With%20ABS%20Only/
(…/Diagrams/Electrical%20Diagrams/Diagram%2017%2F02… etc.).

| Pin | Funktion | Kabel (US-Plan; EU prüfen) | Quelle | Konfidenz |
|-----|----------|-----------------------------|--------|-----------|
| T55/1 | Masse Kl. 31 | br 2,5 → Masse 39 (unterm Rücksitz li.) | Diagram 17/03 + Test Step 1 | HOCH |
| T55/2 | Auslassventil vorn links N102 (→ N55/T15/4) | sw/bl 1,0 | Diagram 17/02 | HOCH / MITTEL |
| T55/3 | Kl. 30 via ABS-Relais J102 (J3-Schiene) | ro/sw 0,5 | Diagram 17/01 | HOCH / MITTEL |
| T55/7 | EDL-Relais J263 (Umfeld) | ro/bl 0,5 → Verteiler 11 | Diagram 17/03 | MITTEL (Funktion) / NIEDRIG (Ziel 11 unaufgelöst) |
| T55/13 | Druckschalter F137 (→ N55/T15/13) | gn/ge 0,5 | Diagram 17/02 | HOCH / MITTEL |
| T55/15 | Pumpenrelais J185 (Ansteuerung 4/86) | ro/ge 0,5 | Diagram 17/03 | HOCH / MITTEL |
| T55/16 | Bremspedalpositionsgeber G100, Ader 1 (Pin 1) | ws/bl 0,5 | Diagram 17/03 | HOCH / MITTEL |
| T55/18 | Auslassventil hinten rechts N135 (→ N55/T15/8) | br/ro 1,0 | Diagram 17/02 | HOCH / MITTEL |
| T55/19 | Masse Kl. 31 | br 2,5 → Masse 39 | Diagram 17/03 | HOCH |
| T55/20 | Einlassventil vorn links N101 (→ N55/T15/5) | bl 0,5 | Diagram 17/02 | HOCH / MITTEL |
| T55/21 | Auslassventil vorn rechts N100 (→ N55/T15/7) | gn 1,0 | Diagram 17/02 | HOCH / MITTEL |
| T55/26 | Druckschalter F137, Gegenader (→ N55/T15/12) | br/ws 0,5 | Diagram 17/02 | HOCH / MITTEL |
| T55/27 | G44 hinten rechts, Ader 1 | sw | Diagram 17/02 | HOCH / MITTEL |
| T55/28 | G46 hinten links, Ader 1 | sw | Diagram 17/02 | HOCH / MITTEL |
| T55/29 | G45 vorn rechts, Ader 1 | sw | Diagram 17/02 | HOCH / MITTEL |
| T55/30 | G47 vorn links, Ader 1 | sw | Diagram 17/02 | HOCH / MITTEL |
| T55/31 | Pumpengeber G101, Ader 1 | li 0,5 | Diagram 17/03 | HOCH / MITTEL |
| T55/32 | Bremslichtschalter F (← W/4) | sw/ro 0,5 | Diagram 17/03 | HOCH / MITTEL |
| T55/33 | Kl. 30 via J102 (J3-Schiene) | ro/ge 0,5 | Diagram 17/01 | HOCH / MITTEL |
| T55/34 | J102-Ansteuerung/Überwachung (J3-Schiene) | ro/sw 0,5 | Diagram 17/01 | MITTEL (Richtung masseseitig nicht aus Plan lesbar) |
| T55/35 | Batterie+ Kl. 30 (via S54 30A, J1) | ro 1,0 | Test Step 1 + Diagram 17/03 | HOCH |
| T55/36 | Auslassventil hinten links N136 (→ N55/T15/1) | ws 1,0 | Diagram 17/02 | HOCH / MITTEL |
| T55/37 | Differenzsperrventil 1 N125, nur EDL (→ N55/T15/11) | ge/ro 1,0 | Diagram 17/02 | HOCH / MITTEL |
| T55/38 | Einlassventil vorn rechts N99 (→ N55/T15/2) | ge 0,5 | Diagram 17/02 | HOCH / MITTEL |
| T55/40 | Differenzsperrventil 2 N126, nur EDL (→ N55/T15/15) | ge/sw 1,0 | Diagram 17/02 | HOCH / MITTEL |
| T55/41 | G100, Ader 2 (Pin 2) | ws/ro 0,5 | Diagram 17/03 | HOCH / MITTEL |
| T55/42 | K-Leitung → T44 → T2 (bis 07/93) / T16/7 (ab 08/93); Zweig → Motronic J220/T68/43 | gr/ws 0,5 | Diagram 17/03 | HOCH |
| T55/45 | G44 hinten rechts, Ader 2 | sw | Diagram 17/02 | HOCH / MITTEL |
| T55/46 | G46 hinten links, Ader 2 | sw | Diagram 17/02 | HOCH / MITTEL |
| T55/47 | G45 vorn rechts, Ader 2 | sw | Diagram 17/02 | HOCH / MITTEL |
| T55/48 | G47 vorn links, Ader 2 | sw | Diagram 17/02 | HOCH / MITTEL |
| T55/49 | G101, Ader 2 | sw 0,5 | Diagram 17/03 | HOCH / MITTEL |
| T55/52 | ABS-Warnlampe K47 (→ J4 → W/2) | gr/sw 0,5 | Diagram 17/01 | HOCH |
| T55/53 | Kl. 15 (via T1-Bereich; EU: T1-Stecker; US-Plan: T1bb/J5-Umfeld) | (US-Ausschnitt unvollständig) | Test Step 2 + Diagram 17/01 | HOCH (Funktion) |
| T55/54 | Einlassventil hinten links N134 (→ N55/T15/3) | gr 0,5 | Diagram 17/02 | HOCH / MITTEL |
| T55/55 | Einlassventil hinten rechts N133 (→ N55/T15/9) | ge/gn 0,5 | Diagram 17/02 | HOCH / MITTEL |

**Mk04 unbelegt (in keinem Track/Schritt am J104): 4, 5, 6, 8, 9, 10, 11, 12, 14, 17,
22, 23, 24, 25, 39, 43, 44, 50, 51.** Hinweis: T15/12 am *Ventilblock* (→ T55/26)
nicht mit T55/12 verwechseln. T15/6 + T15/10 (ventilblockseitig) ohne T55-Gegenstück
im Plan-Ausschnitt.

Mk04-Praxisnotizen:
- STG-Lage: bis 01/93 Beifahrerfußraum, ab 01/93 unterm Rücksitz rechts; Diagnose bis
  07/93 2-pol (Heizungsblende), ab 08/93 16-pol (Aschenbecher) — charm.li Description
  (HOCH). Login 40168 / Kanäle 001–003 nur Forumsangabe (NIEDRIG, nicht verifiziert).
- K47-Logik: Lampe ~2 s Selbsttest nach Zündung ein, bleibt bei Fehler an (HOCH, charm.li).
  Lampeneinheit Golf 3 (1992, Mk04): 6-pol (1-ABS, 2-15, 3-C, 4-31, 5-Airbag, 6-15G),
  Transistor schaltet Lampe wenn Steuerleitung → Masse (MITTEL, Einzelbericht:
  https://www.motor-talk.de/forum/abs-problem-stromlaufplan-t2843076.html).
  Warnlampe ggü. Golf 2 invertiert → Transistor-Inverter/Relais nötig (MITTEL,
  wolfsburg-edition.info + motor-talk.de).
- 1H0 907 379 A = mit F137, 1H0 907 379 E = ohne F137-Funktion (Index-Angabe,
  NIEDRIG — US-Plan markiert F137 als „Jetta GLX only“; EU-Zuordnung separat prüfen).
- V64-Pumpe: Laststrom via J185 aus S53 (30 A); Ventile via S54 (30 A); Prüfvoraussetzung
  zusätzlich S4, S20 (HOCH, Electrical Test Instructions).
- Vordere Radsensoren mit Entstör-C17 gegen Masse 28 (US-Plan-Detail, INFO).

## 3. VSS-/GALA-Ausgang am SG? → Nein (Hypothese bestätigt)

- **Mk20:** Offizielle T25-Belegung enthält keinen Speed-Pin (HOCH). Umbau-Praxis:
  Toledo-/Golf-3-Kabelbäume haben teils gar keinen Speed-Anschluss; „Geschwindigkeitssignal
  vom ABS wird nicht benötigt“ (Eddi, zitiert in https://vwcorrado.de/forum/thread/151180-mark20-umbau-mit-originalen-abs-sensoren/
  und https://vwcorrado.de/forum/thread/139895-mark-20-abs-umbau-verkabelung/);
  Signal „ausgepinnt, nicht verwendbar“, Speed kommt ggf. per nachgerüstetem Tacho-Geber
  (https://www.doppel-wobber.de/community/index.php?thread/76164-mark-20-abs-verkabelung-im-golf-2/).
- **Präzisierung bl/ws-Draht:** Am ABS-Kabelbaum-Stecker zur ZE (Stecker W, Pin 1) liegt
  ein blau/weißes Geschwindigkeitskabel — das ist das **vom Tacho kommende** GALA-Signal
  zur Verteilerleiste (u. a. Radio-GALA) und hat „NICHTS mit dem ABS/EDL zu tun“
  (https://vwcorrado.de/forum/thread/139895-mark-20-abs-umbau-verkabelung/, MITTEL-HOCH).
  Gleiches Bild: the-corrado.net (W1 bl/ws = VSS-Einspeisung sicherungskastenseitig).
- **Mk04:** In Diagram 17/01–03 (Tracks 1–42) existiert kein Speed-/VSS-Draht am J104
  (HOCH). Tacho-VSS (T28/27) kommt daher wie bisher vom Getriebegeber/GALA-Hallgeber
  bzw. Arduino-Wandler — konsistent zu index.html („kein VSS-Ausgang am SG“).
- **Gegenhypothese verworfen:** Doppel-WOBber-Post „Pin 25 → D7/D3“ (Mk20) widerspricht
  der offiziellen Belegung (T25/25 = Batterie+ via S123); Poster arbeitete nach eigener
  Aussage mit schlechter Planqualität und stellte Rückfragen → Fehlablesung (NIEDRIG).
  Ebenso „T25/12 = GRA“: offiziell Bremslichtschalter; GRA hängt am selben Signal —
  Label irreführend (NIEDRIG).

## 4. Abgleich mit index.html

- **Mk02 (Pin 4–7/22–25):** extern nicht nachrecherchiert (außerhalb Scope). Interner
  Widerspruch in index.html: m-Array = Pin 22 Hauptventil / Pin 23 Kl. X / Pin 24–25
  „Kandidat“, g-Array = Pin 22/23/24/25 Sensor-Rückleitungen (G44/G47/G46/G45).
  → **Offen: Bentley Nr. 33–35 prüfen**, bis dahin keine der beiden Varianten als belegt
  verwenden. (a2resource.com nur CE2-A2-Fokus, keine ABS-SG-Belegung — NIEDRIG-Nutzen.)
- **Mk04 (Pin 27–30/45–48): bestätigt** — G44=27/45, G46=28/46, G45=29/47, G47=30/48
  (HOCH, Diagram 17/02). Ebenso bestätigt: K-Line 42, K47 52, F 32, G100 16/41,
  G101 31/49, Kl. 30 35 (+3/33 via J102), Kl. 15 53, GND 1/19, F137 13/26, alle
  Ventilpins 2/18/20/21/36/38/54/55 (+EDL 37/40), Unbelegt-Liste (4,5,6,8,9,10,11,
  14,17,22,23,24,25,39,43,44,50,51) sowie 12 (T15/12-Verwechslungshinweis korrekt).
- **Mk20 (Pin 1–4/10–11/17–18): bestätigt** — 1:1 mit offizieller T25-Belegung
  (HOCH), inkl. K-Line 13, Lampe 16, F 12, Kl. X 23, S123/S124 25/9, GND 8/24,
  Brücke 15–21, unbelegt 5/6/7/14/19/20/22.
- **Ergänzungs-/Korrekturkandidaten für index.html** (nicht editiert, nur notiert):
  1. Mk04-Kabelfarben (US-Stand, EU prüfen): Sensoren sw; N99 ge, N100 gn, N101 bl,
     N102 sw/bl, N133 ge/gn, N134 gr, N135 br/ro, N136 ws, N125 ge/ro, N126 ge/sw,
     F137 gn/ge + br/ws, G100 ws/bl + ws/ro, G101 li + sw, F sw/ro, K-Line gr/ws,
     K47 gr/sw, GND br, Kl. 30 ro.
  2. Mk04 Pin 52-Hinweis „X/08 (Gelb/Rot)“: X/08 ge/rt gehört zum Mk02-Blinkcode
     (Pin 13); US-Plan Mk04: Lampenversorgung X/2. Vermischung prüfen (NIEDRIG).
  3. Mk20 Pin 16-Farbe: gr/ws (nachverfolgt) vs. gn/ws (B4) — Variante vermerken.
  4. Mk20-Hinweis Passat-Brücke 6–22 als Fußnote (Golf: unbelegt).
  5. Mk04 hat **keinen Kl.-X-Pin** am SG (nur Kl. 15/53); sw/ge-X-Diskussion gehört zu Mk20.

## 5. Quellen (abgerufen 2026-09-12)

- https://workshop-manuals.com/volkswagen/golf-mk3/running_gear_self-diagnosis_for_abs/self_diagnosis_v.a.g_inspection_service/electrical_check_of_the_abs_and_abs/_edl_itt_mark_20_gi/multi-pin_connector_with_contact_assignment/ (Mk20-T25-Belegung, HOCH)
- https://charm.li/Volkswagen/1994/ → Golf III (1H1) L4-2.0L (ABA) → Repair and Diagnosis → Brakes and Traction Control → Antilock… (Teves-04-Description, Electrical Test Instructions, Test Steps, Diagram 17/01–03; HOCH)
- https://the-corrado.net/topic/71162-teves-20-abs-system-parts-list/ (Mk20-4-Draht-Interface, MITTEL-HOCH)
- https://gummel.net/bofh-ng/de/corrado/abs-mark20-einbau-in-corrado (Mk20-Umbau: D7, K-Line, Brücken, Code 03604; MITTEL)
- https://vwcorrado.de/forum/thread/139895-mark-20-abs-umbau-verkabelung/ (kein Speed-Anschluss; bl/ws = Tacho-GALA, nichts mit ABS zu tun; MITTEL-HOCH)
- https://www.doppel-wobber.de/community/index.php?thread/76164-mark-20-abs-verkabelung-im-golf-2/ (Speed ausgepinnt; Pin-25/GRA-Fehlablesung als Negativbeleg; NIEDRIG für Pins, MITTEL für VSS-Negativ)
- https://www.wolfsburg-edition.info/wbb5/thread/87195-umbau-abs-mark20/ (kein CAN, Codierbrücke, Diagnose gr/ws; MITTEL)
- https://www.wolfsburg-edition.info/wbb5/thread/136427-abs-problem-verbindung-mark20-mit-golf-2-abs-leuchte/ (Lampen-Logik/Logiksignal; MITTEL)
- https://www.motor-talk.de/forum/abs-problem-stromlaufplan-t2843076.html (Mk04-Lampeneinheit 6-pol/Transistor; MITTEL)
- https://www.motor-talk.de/forum/abs-problem-teves-04-t3914117.html (1H0 907 379 E, Relais 179/79, S30A-Praxis; NIEDRIG-MITTEL)
- https://www.doppel-wobber.de/community/index.php?thread/26010-belegung-abs-kabelbaum/ (Golf-3-ABS-Nachrüstung: grau=Diagnose, blau=Speed-Verteiler, ge/sw=15, sw/ge=X→D3; systemunspezifisch, NIEDRIG)
- https://www.scribd.com/document/63611907/Abs-Desfasurat-Golf-3 (nur Vorschau: Teves-04/20-Übersicht, 18 S.; kein Pin-Beleg — NICHT verwendet)
- https://share.qclt.com/…/03.pdf (Golf/Bora-1999-Stromlaufplan, Mk4-System mit CAN — **nicht übertragbar**, nur Abgrenzung)

## 6. Offen / bewusst unbelegt gelassen

- Mk02-Rückleitungen 22–25 (Bentley Nr. 33–35 nötig).
- EU-Kabelfarben Mk04/Mk20 am SG-Stecker (US-Farben oben als Arbeitshypothese).
- Mk04 J263-Ansteuerpfad ab T55/7 (Junction „11“) und Kästen 9/10/36 (US-Plan-Abkürzungen).
- Mk04 379-A- vs. 379-E-Unterschied (F137) für EU-Fahrzeuge.
- Login 40168 / Entlüftungskanäle (nur Forumsangabe).

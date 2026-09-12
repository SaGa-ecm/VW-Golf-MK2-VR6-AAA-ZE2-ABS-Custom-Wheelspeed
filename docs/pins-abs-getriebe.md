# Pin-Recherche: ABS Mk02 mit EDS (SG 10) · Automatik 096 (SG 13) · 01M (SG 14) · Mk04/Mk20-Übernahme (SG 11/12)

- Stand: 2026-09-12 · Branch: `fix/vss-doku-menue-xdf` · **nicht committen**
- Methode: OEM-Serviceinfo (charm.li = Mitchell/Alldata-US-Leitfäden, Textseiten + Stromlaufplan-Bilder per Vision transkribiert), Forums-Belege. **Kein Pin erfunden** — Unbelegtes steht unter „Offen".
- Konfidenz: **HOCH** = OEM-Leitfaden · **MITTEL** = Forums-Praxis/Übertrag oder US→EU · **NIEDRIG** = Einzelhinweis/unsicher.
- Kabelfarben aus US-Plänen gelten nur als Arbeitshypothese für EU-Fahrzeuge. Fehlende EU-Farben = `UNBELEGT`.
- SG-IDs: 10 = Mk02-EDS, 13 = 096, 14 = 01M, 11 = Mk04, 12 = Mk20.

## 1. ABS Teves Mk02 MIT EDS, 55-polig T55 (SG 10) — Delta zu Mk02 ohne EDS (35-pol)

Basis ohne EDS: DB SG 9 (35 Pins, Audit-Dumps) + index.html („kein VSS-Ausgang"). EDS-Variante: 55-polig T55, Teilenummern 535 907 379 F / 357 907 379 (DB; **357 907 379** bestätigt durch charm.li Corrado-93-W/EDL-OBD-Seite, HOCH).
Belege EDS-Hardware: 55-pol-STG + EDS-Ventilblock mit **5-fach-Stecker (T5/T5a)** unterhalb BFS-Behälter (vwcorrado.de-Thread 137154, MITTEL-HOCH); US-Diagramm „Anti-Lock Brakes (ABS) 1992, 94 Corrado AAA": **T55 am J104**, **T7 (7-fach) + T5/T5a (5-fach)** an N55, N125 Track 15, N126 Track 16 (HOCH).
Elektrik: Prüfbox VAG 1598 + **Adapter VAG 1598/10** (55-pol), Sicherungen S16/S21/S53/S54, 59 Prüfschritte (charm.li EDL-Test-Description, HOCH). STG-Ort Corrado: A-Säule links unten; Diagnose unter Schalthebelverkleidung; bis 07/91 Blinkcode, ab 08/91 schnelle Daten (vwcorrado.de, MITTEL).
Ventil-Benennung Mk02 (aus Blinkcode-Liste, vwcorrado.de): N99 EV VR, N101 EV VL, N103 EV hinten, N100 AV VR, N102 AV VL, N104 AV hinten, N105 Hauptventil, **N125/N126 Differenzsperrventile (nur EDS)**.

| Pin | Funktion | Farbe (US) | Quelle | Konfidenz |
|-----|----------|------------|--------|-----------|
| T55/1 | Masse Kl. 31 | br 2,5 → 39 | charm.li Corrado-93 Track 1-14 | HOCH / MITTEL |
| T55/2 | Auslassventil VL N102 (→ T7/2) | sw/bl 1,5 | Track 1-14 | HOCH / MITTEL |
| T55/3 | → Innenverbindung 5 (Funktion offen) | ro/ge 0,5 | Track 15-28 | NIEDRIG |
| T55/8 | Bremslicht-Monitor (→ J5 → Schlussleuchten K/4) | ws/bl 0,5 | Track 1-14 | HOCH / MITTEL |
| T55/13 | Druckschalter F137 (→ T5a/4) | gn/ro 1,0 | Track 15-28 | HOCH / MITTEL |
| T55/14 | Pumpenrelais J185 (→ 6/85) | ro/ge 1,0 | Track 15-28 + Zoom | HOCH / MITTEL |
| T55/15 | Masse Kl. 31 | br 2,5 → 39 | Track 1-14 | HOCH / MITTEL |
| T55/20 | Einlassventil VL N101 (→ T7/1) | bl 1,0 | Track 1-14 | HOCH / MITTEL |
| T55/21 | Auslassventil VR N100 (→ T7/5) | gn 1,5 | Track 1-14 | HOCH / MITTEL |
| T55/26 | Druckschalter F137 (→ T5a/3) | gn/sw 1,0 | Track 15-28 | HOCH / MITTEL |
| T55/28 | G46 hinten links, Ader 2 | UNBELEGT | Track 1-14 | HOCH |
| T55/29 | G45 vorn rechts, Ader 2 | UNBELEGT | Track 1-14 | HOCH |
| T55/30 | G47 vorn links, Ader 2 | UNBELEGT | Track 1-14 | HOCH |
| T55/32 | G44 hinten rechts, Ader 1 | ws/bl 1,0 (ab W/6) | Track 1-14 | HOCH / MITTEL |
| T55/33 | → Innenverbindung 14 (Funktion offen) | ro/ws | Track 15-28 | NIEDRIG |
| T55/34 | Bremslichtschalter F (Eingang, ab E/3) | ro/ws 0,5 | Track 1-14 | HOCH / MITTEL |
| T55/35 | ro 1,0 via T1-Einzelstecker (→ Box 33, Funktion offen) | ro 1,0 | Track 1-14 | NIEDRIG |
| T55/36 | Auslassventil hinten N104 (→ T7/4) | ws 1,5 | Track 1-14 | HOCH / MITTEL |
| T55/37 | **Differenzsperrventil 1 N125, nur EDS** (→ T5a/2) | ge/ge 1,0 | Track 15-28 | HOCH / MITTEL |
| T55/38 | Einlassventil VR N99 (→ T7/6) | gr/ro 1,5 | Track 1-14 | HOCH / MITTEL |
| T55/39 | Hauptventil N105 (→ T2a/1; Plus via T2a/2 ro/ws 1,5 → 22) | br 1,5 | Track 1-14 | HOCH / MITTEL |
| T55/40 | **Differenzsperrventil 2 N126, nur EDS** (→ T5a/5) | ge/ws 1,0 | Track 15-28 | HOCH / MITTEL |
| T55/45 | G44 hinten rechts, Ader 2 | UNBELEGT | Track 1-14 | HOCH |
| T55/46 | G46 hinten links, Ader 1 | UNBELEGT | Track 1-14 | HOCH |
| T55/47 | G45 vorn rechts, Ader 1 | UNBELEGT | Track 1-14 | HOCH |
| T55/48 | G47 vorn links, Ader 1 | UNBELEGT | Track 1-14 | HOCH |
| T55/50 | Hochdruckschalter F109 (→ T5/4) | UNBELEGT | Track 15-28 | HOCH (Funktion) |
| T55/51 | Druckwarnschalter II F116 (→ T5/5) | ro/bl 0,5 | Track 15-28 | HOCH / MITTEL |
| T55/52 | Diagnose → J4 → W/2 | ro/sw 0,5 | Track 15-28 | HOCH / MITTEL |
| T55/53 | sw/ge 1,0 → Box 34 (Steuerpfad, nicht aufgelöst) | sw/ge 1,0 | Track 1-14 | NIEDRIG |
| T55/54 | Einlassventil hinten N103 (→ T7/3) | gr 1,0 | Track 1-14 | HOCH / MITTEL |

EDS-Delta (neu ggü. 35-pol): N125/37, N126/40 (T5a-5-fach), F137 13/26, F109 50, F116 51 (T5-5-fach), T55-Sensorpaare statt gemeinsamer Masse (Pin 1/DB-SG9 entfällt), Diagnose 52 statt 13, Kl. X/30/Ventil-Plus über J102-Schiene (Boxen 1/2/22/23).
**Offen (bewusst kein Eintrag):** K47-Lampentreiber-Pin (Lampe → T8d/8 belegt, SG-Pin nicht aufgelöst); Kl.-30-Haupt-Pin (S54→J102 8/87 belegt); T55/31 + T55/42 (nicht bestätigt — „Box 31" ist Innenverbindung, kein Pin); 4. Top-Pin → Box 17 (Nummer unlesbar); VSS (0,35-vi-Draht → Kombi T28/17 existiert, Ursprung am J104 unbelegt — Widerspruch DB-SG9-Pin-19 vs. index.html bleibt offen, am Fahrzeug prüfen).

## 2. Automatik 096, J217 096 927 731 (SG 13) — 38-polig

OEM-Beleg (HOCH): charm.li Corrado 93, „Transmission Control Module (J217) Harness Connector Terminals" (38-pol) + Testing Requirements (VAG 1598/9-Adapter, Sicherungen 14+21). Farben: US-Diagramme 04/xx nicht ausgewertet → UNBELEGT.

| Pin | Funktion | Farbe | Quelle | Konfidenz |
|-----|----------|-------|--------|-----------|
| 1 | Masse Kl. 31 | UNBELEGT | charm.li Corrado-93 TCM-Pin-ID | HOCH |
| 2 | Magnetventil 4 N91 | UNBELEGT | dto. | HOCH |
| 3 | Magnetventil 3 N90 | UNBELEGT | dto. | HOCH |
| 4 | unbelegt | – | dto. | HOCH |
| 5 | P/N-Signal (Wählhebel) | UNBELEGT | dto. | HOCH |
| 6 | K-Leitung Diagnose | UNBELEGT | dto. | HOCH |
| 7 | unbelegt | – | dto. | HOCH |
| 8 | Kickdown Klima | UNBELEGT | dto. | HOCH |
| 9 | Drosselklappenpoti G69 | UNBELEGT | dto. | HOCH |
| 10 | Drosselklappenpoti G69 | UNBELEGT | dto. | HOCH |
| 11 | unbelegt | – | dto. | HOCH |
| 12 | Lampe Getriebeprogramm E122 | UNBELEGT | dto. | HOCH |
| 13 | G68-Abschirmung (Drehzahl) | UNBELEGT | dto. | HOCH |
| 14 | L-Leitung Diagnose | UNBELEGT | dto. | HOCH |
| 15 | Multifunktionsschalter F125 (Wählhebel) | UNBELEGT | dto. | HOCH |
| 16 | Multifunktionsschalter F125 (Wählhebel) | UNBELEGT | dto. | HOCH |
| 17 | Kickdownschalter F8 | UNBELEGT | dto. | HOCH |
| 18 | Ventil-Plus (Versorgung) | UNBELEGT | dto. | HOCH |
| 19 | Kl. 15 (Versorgung) | UNBELEGT | dto. | HOCH |
| 20 | Wählhebelsperre N110 | UNBELEGT | dto. | HOCH |
| 21 | Magnetventil 7 N94 | UNBELEGT | dto. | HOCH |
| 22 | Magnetventil 1 N88 | UNBELEGT | dto. | HOCH |
| 23 | Magnetventil 2 N89 | UNBELEGT | dto. | HOCH |
| 24 | Magnetventil 5 N92 | UNBELEGT | dto. | HOCH |
| 25 | Magnetventil 6 N93 | UNBELEGT | dto. | HOCH |
| 26 | Bremslichtschalter F | UNBELEGT | dto. | HOCH |
| 27 | Motordrehzahl (Benziner) | UNBELEGT | dto. | HOCH |
| 28 | Zündzeitpunkt-Referenz | UNBELEGT | dto. | HOCH |
| 29 | G69-Masse | UNBELEGT | dto. | HOCH |
| 30 | ATF-Temperatur | UNBELEGT | dto. | HOCH |
| 31 | unbelegt / Wählhebelanzeige | UNBELEGT | dto. | MITTEL |
| 32 | Geber Fahrgeschwindigkeit G68 (Drehzahl) | UNBELEGT | dto. | HOCH |
| 33 | Geber Fahrgeschwindigkeit G68 (Drehzahl) | UNBELEGT | dto. | HOCH |
| 34 | Multifunktionsschalter F125 (Wählhebel) | UNBELEGT | dto. | HOCH |
| 35 | Multifunktionsschalter F125 (Wählhebel) | UNBELEGT | dto. | HOCH |
| 36 | Programmschalter E122 | UNBELEGT | dto. | HOCH |
| 37 | Leerlaufschalter | UNBELEGT | dto. | HOCH |
| 38 | GRA | UNBELEGT | dto. | HOCH |

Kern-Pins: Versorgung 1/18/19 · Wählhebel 5/15/16/20/34/35 · Drehzahl 13/27/32/33 (G68+G38-Pendant: G38 sitzt beim 096 im ATF-Kreis, separater T2-Stecker am Getriebe, nicht TCM-direkt — T4-Wiki, MITTEL) · Diagnose 6/14 (K+L!).
STG-Ort (Orientierung, aus Golf-94-01M-Doku, MITTEL): bis 12/92 vor Beifahrersitz unterm Teppich, ab 01/93 unterm Rücksitz.

## 3. Automatik 01M, J217 01M 927 733 GJ (SG 14)

**Früh-01M = 38-polig wie 096** (HOCH): charm.li Golf III 94 ABA, „TERMINAL ASSIGNMENT - 38-PIN TCM", VAG 1598/9, Sicherungen S14+S21. Abweichungen zum 096: Pin 12 = Wählhebelanzeige-oder-n.b., Pin 14 = n.b. (**keine L-Leitung**), Pin 31 = n.b., Pin 36 = E122-oder-E-Schalter, Pin 27 = TD-Drehzahl, Pin 28 = Zündzeitpunkt-Einfluss; Rest inkl. Kern-Pins (1/18/19, 5/15/16/34/35, 6, 20, 26, 32/33, 21-25) identisch → JSON übernimmt 38-pol-Satz mit 01M-Abweichungen im Hinweis.
**Spät-01M (GJ-Index spricht dafür, ab MJ 95) = 68-polig T68** (MITTEL-Transfer): SSP 172 „J217 68-polig" + charm.li-01P-Connector-View (OEM, HOCH für 01P) + T4-Wiki-Pinliste. Kern-Pins 68-pol (am GJ-Fahrzeug verifizieren!): 1 = Kl. 31 · 45 (+68 bis 12/95) = Kl. 30 · 23 = Kl. 15 · 24 = K-Line · 18/40/62/63 = F125 · 11 = P/N · 29 = N110 · 20/65 = G68 (+43 Schirm) · 21/66 = G38 (+44 Schirm) · 19/64 = G28 (+42 Schirm) · 9/54 = N90/N89 · 10/47 = N94/N91 · 55/56/58 = N88/N92/N93 · 22 = N93-Versorgung · 67 = Ventil-Plus · 57 = Wählhebelanzeige · 15 = Bremse · 16 = Kickdown · 5/28/50 = G69 · 6 = G93 · 60/61 = GRA · 13 = MSG-Ausgang · 41 = Lastsignal. Farben UNBELEGT. Runder Ventil-Leitungssatz = getriebeseitiger T12e/Leiterfolie mit G93 (AG4-Doku New Beetle, MITTEL).

## 4. Mk04 (SG 11) / Mk20 (SG 12) — Übernahme aus abs-mk04-mk20-recherche.md

EU-Kabelfarben unbestätigt → `UNBELEGT` (US-Farbe im Hinweis). Einzige belegte EU-Farben: Mk20 Pin 13 gr/ws + Pin 23 sw/ge (HOCH, Umbau-quellen). Mk20 offiziell unbelegt: 5,6,7,14,19,20,22 (+Codier-Variante 6-22 nur Passat B4). Mk04 unbelegt: 4,5,6,8,9,10,11,12,14,17,22,23,24,25,39,43,44,50,51. VSS/GALA-Ausgang: **keiner** an beiden SG (HOCH, siehe Quell-Doku Kap. 3).

## 5. JSON-Array (SG 10/13/14/11/12)

```json
[
{"sg_id":10,"pin":"T55/1","funktion":"Masse Kl. 31","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"US-Plan: br 2,5 an Masse 39; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/2","funktion":"Auslassventil vorn links N102 (T7/2)","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: sw/bl 1,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/3","funktion":"Innenverbindung 5 (Funktion offen)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"US-Plan: ro/ge 0,5; Ziel Box 5 nicht aufgelöst","konfidenz":"NIEDRIG","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28"},
{"sg_id":10,"pin":"T55/8","funktion":"Bremslicht-Monitor (J5, Schlussleuchten)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"US-Plan: ws/bl 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/13","funktion":"Druckschalter F137 (T5a/4)","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: gn/ro 1,0; nur EDS-Umfeld; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28"},
{"sg_id":10,"pin":"T55/14","funktion":"Pumpenrelais J185 Ansteuerung (6/85)","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"US-Plan: ro/ge 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28"},
{"sg_id":10,"pin":"T55/15","funktion":"Masse Kl. 31","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"US-Plan: br 2,5 an Masse 39; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/20","funktion":"Einlassventil vorn links N101 (T7/1)","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: bl 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/21","funktion":"Auslassventil vorn rechts N100 (T7/5)","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: gn 1,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/26","funktion":"Druckschalter F137 Gegenader (T5a/3)","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: gn/sw 1,0; nur EDS-Umfeld; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28"},
{"sg_id":10,"pin":"T55/28","funktion":"Radsensor hinten links G46 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Paar mit T55/46; US-Farbe im Ausschnitt nicht lesbar","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/29","funktion":"Radsensor vorn rechts G45 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Paar mit T55/47","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/30","funktion":"Radsensor vorn links G47 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Paar mit T55/48","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/32","funktion":"Radsensor hinten rechts G44 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: ws/bl 1,0 ab W/6; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/33","funktion":"Innenverbindung 14 (Funktion offen)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"US-Plan: ro/ws; Ziel Box 14 nicht aufgelöst","konfidenz":"NIEDRIG","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28"},
{"sg_id":10,"pin":"T55/34","funktion":"Bremslichtschalter F Eingang","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"US-Plan: ro/ws 0,5 ab E/3; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/35","funktion":"Unbekannt (ro 1,0 via T1-Einzelstecker, Box 33)","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"Funktion nicht aufgelöst, nicht als Kl. 30 verwenden","konfidenz":"NIEDRIG","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/36","funktion":"Auslassventil hinten N104 (T7/4)","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: ws 1,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/37","funktion":"Differenzsperrventil 1 N125, nur EDS (T5a/2)","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: ge/ge 1,0; EDS-Delta; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28"},
{"sg_id":10,"pin":"T55/38","funktion":"Einlassventil vorn rechts N99 (T7/6)","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: gr/ro 1,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/39","funktion":"Hauptventil N105 (T2a/1; Plus T2a/2)","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: br 1,5, Plus ro/ws 1,5 an Box 22; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/40","funktion":"Differenzsperrventil 2 N126, nur EDS (T5a/5)","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: ge/ws 1,0; EDS-Delta; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28"},
{"sg_id":10,"pin":"T55/45","funktion":"Radsensor hinten rechts G44 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Paar mit T55/32","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/46","funktion":"Radsensor hinten links G46 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Paar mit T55/28","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/47","funktion":"Radsensor vorn rechts G45 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Paar mit T55/29","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/48","funktion":"Radsensor vorn links G47 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Paar mit T55/30","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/50","funktion":"Hochdruckschalter F109 (T5/4)","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Farbe im Ausschnitt nicht lesbar; nur EDS-Umfeld","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28"},
{"sg_id":10,"pin":"T55/51","funktion":"Druckwarnschalter II F116 (T5/5)","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: ro/bl 0,5; nur EDS-Umfeld; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28"},
{"sg_id":10,"pin":"T55/52","funktion":"Diagnose (J4, W/2)","kabelfarbe":"UNBELEGT","kategorie":"Diagnose","hinweis":"US-Plan: ro/sw 0,5; Blinkcode bis 07/91, schnelle Daten ab 08/91; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 15-28 + vwcorrado.de-Thread 137154"},
{"sg_id":10,"pin":"T55/53","funktion":"Steuerpfad Box 34 (nicht aufgelöst)","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"US-Plan: sw/ge 1,0; nicht als Kl. 15 verwenden","konfidenz":"NIEDRIG","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":10,"pin":"T55/54","funktion":"Einlassventil hinten N103 (T7/3)","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: gr 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Corrado 93 ABS w/EDL Track 1-14"},
{"sg_id":13,"pin":"1","funktion":"Masse Kl. 31","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"38-pol J217; VAG 1598/9; S14+S21","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID + Test-Requirements"},
{"sg_id":13,"pin":"2","funktion":"Magnetventil 4 N91","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"3","funktion":"Magnetventil 3 N90","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"4","funktion":"unbelegt","kabelfarbe":"–","kategorie":"–","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"5","funktion":"P/N-Signal Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"6","funktion":"K-Leitung Diagnose","kabelfarbe":"UNBELEGT","kategorie":"Diagnose","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"7","funktion":"unbelegt","kabelfarbe":"–","kategorie":"–","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"8","funktion":"Kickdown Klimakompressor","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"9","funktion":"Drosselklappenpoti G69","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"10","funktion":"Drosselklappenpoti G69","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"11","funktion":"unbelegt","kabelfarbe":"–","kategorie":"–","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"12","funktion":"Lampe Getriebeprogramm E122","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"13","funktion":"G68-Abschirmung","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl-Geberkreis","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"14","funktion":"L-Leitung Diagnose","kabelfarbe":"UNBELEGT","kategorie":"Diagnose","hinweis":"Nur 096, Früh-01M hat hier n.b.","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"15","funktion":"Multifunktionsschalter F125 Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"16","funktion":"Multifunktionsschalter F125 Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"17","funktion":"Kickdownschalter F8","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"18","funktion":"Ventil-Plus Versorgung","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"19","funktion":"Kl. 15 Versorgung","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"20","funktion":"Wählhebelsperre N110","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"21","funktion":"Magnetventil 7 N94","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"22","funktion":"Magnetventil 1 N88","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"23","funktion":"Magnetventil 2 N89","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"24","funktion":"Magnetventil 5 N92","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"25","funktion":"Magnetventil 6 N93","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"26","funktion":"Bremslichtschalter F","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"27","funktion":"Motordrehzahl Benziner","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"28","funktion":"Zündzeitpunkt-Referenz","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"29","funktion":"G69-Masse","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"30","funktion":"ATF-Temperatur","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"31","funktion":"unbelegt / Wählhebelanzeige","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Ausstattungsabhängig","konfidenz":"MITTEL","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"32","funktion":"Geber Fahrgeschwindigkeit G68","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"33","funktion":"Geber Fahrgeschwindigkeit G68","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"34","funktion":"Multifunktionsschalter F125 Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"35","funktion":"Multifunktionsschalter F125 Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"36","funktion":"Programmschalter E122","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"37","funktion":"Leerlaufschalter","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":13,"pin":"38","funktion":"GRA","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Corrado 93 096 TCM-Pin-ID"},
{"sg_id":14,"pin":"1","funktion":"Masse Kl. 31","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"Früh-01M 38-pol wie 096; VAG 1598/9; S14+S21","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID (38-pol)"},
{"sg_id":14,"pin":"2","funktion":"Magnetventil 4 N91","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"3","funktion":"Magnetventil 3 N90","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"4","funktion":"unbelegt","kabelfarbe":"–","kategorie":"–","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"5","funktion":"P/N-Signal Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"6","funktion":"K-Leitung Diagnose","kabelfarbe":"UNBELEGT","kategorie":"Diagnose","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"7","funktion":"unbelegt","kabelfarbe":"–","kategorie":"–","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"8","funktion":"Kickdown Klimakompressor","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"9","funktion":"Drosselklappenpoti G69 (via MSG ab 01/93 6-Zyl)","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"10","funktion":"Drosselklappenpoti G69 Versorgung","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"11","funktion":"unbelegt","kabelfarbe":"–","kategorie":"–","hinweis":"","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"12","funktion":"Wählhebelanzeige oder unbelegt","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Abweichung zu 096 (dort E122-Lampe)","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"13","funktion":"G68-Abschirmung","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl-Geberkreis","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"14","funktion":"unbelegt (keine L-Leitung)","kabelfarbe":"–","kategorie":"–","hinweis":"Abweichung zu 096 (dort L-Leitung)","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"15","funktion":"Multifunktionsschalter F125 Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"16","funktion":"Multifunktionsschalter F125 Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"17","funktion":"Kickdownschalter F8","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"18","funktion":"Ventil-Plus B+ Versorgung","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"19","funktion":"Kl. 15 B+ Versorgung","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"20","funktion":"Wählhebelsperre N110","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"21","funktion":"Magnetventil 7 N94","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"22","funktion":"Magnetventil 1 N88","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"23","funktion":"Magnetventil 2 N89","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"24","funktion":"Magnetventil 5 N92","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"25","funktion":"Magnetventil 6 N93","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"26","funktion":"Bremslichtschalter F","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"27","funktion":"Motordrehzahl TD-Signal","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl; Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"28","funktion":"Zündzeitpunkt-Einfluss MSG","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"29","funktion":"G69-Masse","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"30","funktion":"ATF-Temperatur G93","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"31","funktion":"unbelegt","kabelfarbe":"–","kategorie":"–","hinweis":"Abweichung zu 096 (dort n.b./Anzeige)","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"32","funktion":"Geber Fahrgeschwindigkeit G68","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl; Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"33","funktion":"Geber Fahrgeschwindigkeit G68","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl; Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"34","funktion":"Multifunktionsschalter F125 Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"35","funktion":"Multifunktionsschalter F125 Wählhebel","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"36","funktion":"Programmschalter E122 / E-Schalter","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"37","funktion":"Leerlaufschalter","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"38","funktion":"GRA","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Früh-01M 38-pol","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA TCM-Pin-ID"},
{"sg_id":14,"pin":"T68/1","funktion":"Masse Kl. 31 (Spät-01M 68-pol, Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"GJ-Index spricht für 68-pol; 01P-Transfer, am Fahrzeug verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View + SSP 172 (J217 68-polig) + T4-Wiki"},
{"sg_id":14,"pin":"T68/6","funktion":"K-Leitung Diagnose (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Diagnose","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View + T4-Wiki"},
{"sg_id":14,"pin":"T68/9","funktion":"Magnetventil 3 N90 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/11","funktion":"P/N-Signal (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/15","funktion":"Bremslichtschalter F (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/16","funktion":"Kickdown F8 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/18","funktion":"Multifunktionsschalter F125 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Wählhebel; 01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/19","funktion":"Motordrehzahl G28-Eingang (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl; 01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/20","funktion":"Geber Fahrgeschwindigkeit G68 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl; 01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/21","funktion":"Geber Getriebedrehzahl G38 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"Drehzahl; 01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/23","funktion":"Kl. 15 Versorgung (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/24","funktion":"K-Leitung Diagnose (Spät-Hauptpin)","kabelfarbe":"UNBELEGT","kategorie":"Diagnose","hinweis":"01P: K-wire; 01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View + T4-Wiki"},
{"sg_id":14,"pin":"T68/29","funktion":"Wählhebelsperre N110 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/40","funktion":"Multifunktionsschalter F125 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Wählhebel; 01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/45","funktion":"Kl. 30 Versorgung (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/54","funktion":"Magnetventil 2 N89 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/55","funktion":"Magnetventil 1 N88 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/57","funktion":"Wählhebelanzeige (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/62","funktion":"Multifunktionsschalter F125 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Wählhebel; 01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":14,"pin":"T68/63","funktion":"Multifunktionsschalter F125 (Spät-Referenz)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Wählhebel; 01P-Transfer, verifizieren","konfidenz":"MITTEL","quelle":"charm.li 01P-Connector-View"},
{"sg_id":11,"pin":"T55/1","funktion":"Masse Kl. 31","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"US-Plan: br 2,5 Masse 39; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/03 + Test Step 1 (via abs-mk04-mk20-recherche.md)"},
{"sg_id":11,"pin":"T55/2","funktion":"Auslassventil vorn links N102","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: sw/bl 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/3","funktion":"Kl. 30 via ABS-Relais J102","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"US-Plan: ro/sw 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/01"},
{"sg_id":11,"pin":"T55/7","funktion":"EDL-Relais J263 Umfeld","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"US-Plan: ro/bl 0,5; Ziel 11 unaufgelöst","konfidenz":"MITTEL","quelle":"charm.li Golf III 94 ABA Diagram 17/03"},
{"sg_id":11,"pin":"T55/13","funktion":"Druckschalter F137","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: gn/ge 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/15","funktion":"Pumpenrelais J185 Ansteuerung","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"US-Plan: ro/ge 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/03"},
{"sg_id":11,"pin":"T55/16","funktion":"Bremspedalpositionsgeber G100 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: ws/bl 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/03"},
{"sg_id":11,"pin":"T55/18","funktion":"Auslassventil hinten rechts N135","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: br/ro 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/19","funktion":"Masse Kl. 31","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"US-Plan: br 2,5 Masse 39; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/03"},
{"sg_id":11,"pin":"T55/20","funktion":"Einlassventil vorn links N101","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: bl 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/21","funktion":"Auslassventil vorn rechts N100","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: gn 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/26","funktion":"Druckschalter F137 Gegenader","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: br/ws 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/27","funktion":"Radsensor hinten rechts G44 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: sw; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/28","funktion":"Radsensor hinten links G46 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: sw; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/29","funktion":"Radsensor vorn rechts G45 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: sw; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/30","funktion":"Radsensor vorn links G47 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: sw; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/31","funktion":"Pumpengeber G101 Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: li 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/03"},
{"sg_id":11,"pin":"T55/32","funktion":"Bremslichtschalter F","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"US-Plan: sw/ro 0,5 ab W/4; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/03"},
{"sg_id":11,"pin":"T55/33","funktion":"Kl. 30 via J102","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"US-Plan: ro/ge 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/01"},
{"sg_id":11,"pin":"T55/34","funktion":"J102-Ansteuerung/Überwachung","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"US-Plan: ro/sw 0,5; Richtung offen","konfidenz":"MITTEL","quelle":"charm.li Golf III 94 ABA Diagram 17/01"},
{"sg_id":11,"pin":"T55/35","funktion":"Batterie+ Kl. 30 via S54","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"US-Plan: ro 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Test Step 1 + Diagram 17/03"},
{"sg_id":11,"pin":"T55/36","funktion":"Auslassventil hinten links N136","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: ws 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/37","funktion":"Differenzsperrventil 1 N125 nur EDL","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: ge/ro 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/38","funktion":"Einlassventil vorn rechts N99","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: ge 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/40","funktion":"Differenzsperrventil 2 N126 nur EDL","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: ge/sw 1,0; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/41","funktion":"G100 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: ws/ro 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/03"},
{"sg_id":11,"pin":"T55/42","funktion":"K-Leitung Diagnose","kabelfarbe":"UNBELEGT","kategorie":"Diagnose","hinweis":"US-Plan: gr/ws 0,5; Zweig MSG; EU-Farbe prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/03"},
{"sg_id":11,"pin":"T55/45","funktion":"G44 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: sw; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/46","funktion":"G46 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: sw; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/47","funktion":"G45 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: sw; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/48","funktion":"G47 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: sw; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/49","funktion":"G101 Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"US-Plan: sw 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/03"},
{"sg_id":11,"pin":"T55/52","funktion":"ABS-Warnlampe K47","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"US-Plan: gr/sw 0,5 via J4 W/2; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/01"},
{"sg_id":11,"pin":"T55/53","funktion":"Kl. 15","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"Funktion HOCH (Test Step 2), Farbe US-Ausschnitt unvollständig","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Test Step 2 + Diagram 17/01"},
{"sg_id":11,"pin":"T55/54","funktion":"Einlassventil hinten links N134","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: gr 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":11,"pin":"T55/55","funktion":"Einlassventil hinten rechts N133","kabelfarbe":"UNBELEGT","kategorie":"Ventile","hinweis":"US-Plan: ge/gn 0,5; EU prüfen","konfidenz":"HOCH","quelle":"charm.li Golf III 94 ABA Diagram 17/02"},
{"sg_id":12,"pin":"T25/1","funktion":"G44 hinten rechts Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung (via abs-mk04-mk20-recherche.md)"},
{"sg_id":12,"pin":"T25/2","funktion":"G46 hinten links Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/3","funktion":"G45 vorn rechts Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/4","funktion":"G47 vorn links Ader 1","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/8","funktion":"Masse Kl. 31 (1)","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/9","funktion":"Batterie+ Kl. 30 via S124","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/10","funktion":"G46 hinten links Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/11","funktion":"G47 vorn links Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/12","funktion":"Bremslichtschalter F","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"B4: rt/sw ab Schalter; Funktion HOCH, Farbe MITTEL","konfidenz":"HOCH","quelle":"workshop-manuals.com + the-corrado.net"},
{"sg_id":12,"pin":"T25/13","funktion":"K-Leitung Diagnose (T16/7)","kabelfarbe":"gr/ws","kategorie":"Diagnose","hinweis":"EU-Umbau-belegt; bis Diagnoseverteiler verlängern","konfidenz":"HOCH","quelle":"workshop-manuals.com + the-corrado.net + gummel.net"},
{"sg_id":12,"pin":"T25/15","funktion":"Codierbrücke nach Pin 21 (Golf)","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Brücke 15-21; Passat B4: 6-22 statt 15-21","konfidenz":"HOCH","quelle":"workshop-manuals.com + gummel.net"},
{"sg_id":12,"pin":"T25/16","funktion":"ABS-Warnlampe Ansteuerung","kabelfarbe":"UNBELEGT","kategorie":"Ausgänge","hinweis":"Corrado: gr/ws W2; B4: gn/ws; invertierte Logik ggü. Golf 2","konfidenz":"HOCH","quelle":"workshop-manuals.com + the-corrado.net"},
{"sg_id":12,"pin":"T25/17","funktion":"G44 hinten rechts Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/18","funktion":"G45 vorn rechts Ader 2","kabelfarbe":"UNBELEGT","kategorie":"Sensoren","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/21","funktion":"Codierbrücke nach Pin 15","kabelfarbe":"UNBELEGT","kategorie":"Eingänge","hinweis":"Brücke 21-15","konfidenz":"HOCH","quelle":"workshop-manuals.com + gummel.net"},
{"sg_id":12,"pin":"T25/23","funktion":"Versorgung Kl. X Entlastung","kabelfarbe":"sw/ge","kategorie":"Versorgung","hinweis":"An D7 via TV18; EU-Umbau-belegt","konfidenz":"HOCH","quelle":"workshop-manuals.com + the-corrado.net + gummel.net"},
{"sg_id":12,"pin":"T25/24","funktion":"Masse Kl. 31 (2)","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"EU-Farbe unbestätigt","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"},
{"sg_id":12,"pin":"T25/25","funktion":"Batterie+ Kl. 30 via S123","kabelfarbe":"UNBELEGT","kategorie":"Versorgung","hinweis":"EU-Farbe unbestätigt; nicht mit Speed/GRA verwechseln","konfidenz":"HOCH","quelle":"workshop-manuals.com Mk20-T25-Belegung"}
]
```

## 6. Abdeckung + Güte

- **SG 10 (Mk02-EDS):** 31 Pin-Einträge (26 HOCH, 2 MITTEL-Umfeld, 3 NIEDRIG/offen-funktional) aus US-OEM-Diagramm (Funktion HOCH, Farben MITTEL). Offen: K47-Treiber, Kl.-30-Haupt, T55/31+42, Box-17-Pin, VSS-Widerspruch (DB-SG9-Pin-19 vs. index.html). Güte: Funktionen gut, Farben + Rest am EU-Fahrzeug verifizieren.
- **SG 13 (096):** 38/38 Pins vollständig, HOCH (OEM-Pin-ID). Nur Farben UNBELEGT. G38 hängt am Getriebe-Zwischenstecker (MITTEL).
- **SG 14 (01M):** Früh-01M 38-pol vollständig HOCH (Golf-94-ABA-Doku); Spät-01M (GJ) 20 Kern-Pins als 68-pol-Referenz MITTEL (01P-Transfer) — **unbedingt am Fahrzeug gegenprüfen**, 38- vs. 68-pol am Stecker entscheiden.
- **SG 11/12:** Vollübernahme aus Vorarbeit (36 + 18 Einträge), EU-Farben → UNBELEGT (Ausnahme Mk20-13/23), kein VSS (HOCH).
- Quellenliste: siehe Quell-Doku `docs/abs-mk04-mk20-recherche.md` Kap. 5 plus: charm.li Corrado 93 (ABS w/EDL Tracks/EDL-Test-Description/096-TCM-Pin-ID), charm.li Golf III 94 ABA (38-pol-TCM-Pin-ID, Test-Requirements), charm.li Eurovan 97 (01P-Connector-View), SSP 172 (J217 68-pol MJ95), vwcorrado.de-Thread 137154, vwbuswiki.de/T4-Wiki (01P-Referenz, G38-Stecker), yumpu Golf/Vento-SLP 111 (J217/F125/N88-N94/G38/G68-Umfeld, unvollständig eingesehen).

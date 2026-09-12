# Pins Komfort / WFS / Airbag / GRA / Climatronic (G2–G4)

Stand: 2026-09-12 · Branch: `fix/vss-doku-menue-xdf` · **nicht committen**
DB: `vw-wissen2.db`, sg_ids 15–25. Grundsatz: **keine Pins erfunden** — was nicht quellenbelegt ist, steht als **UNBELEGT**.

Quellenkürzel: `[NAT]` nat-corporation.com VAG-Immobox-Pinout · `[T4D]` vwbuswiki.de Wegfahrsicherung (T4Forums Doku) ·
`[DS]` community.dieselschrauber.org KST-T23-Thread (User robidobi007) · `[CTG]` cartechnology.co.uk Airbag-Thread ·
`[CP]` CarProg VAG-Airbag-Manual (Snippet via Suche) · `[TDI]` forums.tdiclub.com (User oilhammer, Bentley-SLP) ·
`[MT]` motor-talk.de ZV-Pumpen-Thread (User Wester) · `[PKW]` pkw-forum.de ZV-Thread (nur Steckerbestätigung) ·
`[ST]` stange.name GRA-G3-Nachrüstanleitung · `[DB]` vw-wissen2.db (Stammdaten).

Konfidenz: hoch = SLP/ETKA-verifizierbar · mittel = detaillierte Foren-/Werkstattquelle, plausibel, generationenkonsistent ·
niedrig = Einzelhinweis, unbestätigt.

---

## 15 · WFS Gen 1 (1H0 953 257 B, ID33, bis FIN W-040000)

Stecker: mehrpoliger Gerätestecker (Zählung 1–6 belegt Nr. 1,2,3,4,6) + **separater 2-pol Lesespulenstecker** am Zündschloss (Lesespule 1H0 953 254 B/F/E `[T4D]`). Login: für Schlüssel- **und** MSG-Anlernung nötig `[T4D]`.

| Pin | Funktion | Farbe | Kat. | Konf. | Quelle |
|-----|----------|-------|------|-------|--------|
| 1 | +12 V Klemme 15 | – | Versorgung | mittel | [NAT] |
| 2 | K-Leitung (Diagnose) | – | Diagnose | mittel | [NAT] |
| 3 | W-Leitung (zum MSG) | – | Signal-Ausgang | mittel | [NAT] |
| 4 | Masse Klemme 31 | – | Masse | mittel | [NAT] |
| 5 | UNBELEGT (in Quelle nicht geführt) | – | unbelegt | – | [NAT] |
| 6 | Masse Klemme 31 (2. Masse) | – | Masse | mittel | [NAT] |
| Spule (2-pol) | Transpondersignal Lesespule | – | Signal-Eingang | mittel | [T4D]/[DB] |

## 16 · WFS Gen 2 (6H0 953 257, ID42, FIN W-040001–Y-060000)

Stecker: mehrpolig (Zählung bis mind. 8) + separater 2-pol Lesespulenstecker (6H0 953 254 `[T4D]`). Login: nur Schlüsselanlernung `[T4D]`.

| Pin | Funktion | Farbe | Kat. | Konf. | Quelle |
|-----|----------|-------|------|-------|--------|
| 1 | +12 V Klemme 30 (Dauerplus) | – | Versorgung | mittel | [NAT] |
| 2 | +12 V Klemme 15 | – | Versorgung | mittel | [NAT] |
| 3 | UNBELEGT | – | unbelegt | – | [NAT] |
| 4 | Masse Klemme 31 | – | Masse | mittel | [NAT] |
| 5 | Masse Klemme 31 (2. Masse) | – | Masse | mittel | [NAT] |
| 6 | UNBELEGT | – | unbelegt | – | [NAT] |
| 7 | W-Leitung (zum MSG) | – | Signal-Ausgang | mittel | [NAT] |
| 8 | K-Leitung (Diagnose) | – | Diagnose | mittel | [NAT] |
| Spule (2-pol) | Transpondersignal Lesespule | – | Signal-Eingang | mittel | [T4D]/[DB] |

## 17 · WFS Gen 3 (6X0 953 257, ID44, ab FIN Y-060001)

Stecker: mehrpolig (Zählung bis mind. 10; Pins 1,2 = CAN) + separater 2-pol Lesespulenstecker (6X0 953 254 `[T4D]`).
Login: Schlüssel- **und** MSG-Anlernung; Transponder nur einmal bindbar `[T4D]`.

| Pin | Funktion | Farbe | Kat. | Konf. | Quelle |
|-----|----------|-------|------|-------|--------|
| 1 | CAN-Low | – | Diagnose | mittel | [NAT] |
| 2 | CAN-High | – | Diagnose | mittel | [NAT] |
| 3 | +12 V Klemme 15 | – | Versorgung | mittel | [NAT] |
| 4–6 | UNBELEGT (in Quelle nicht geführt) | – | unbelegt | – | [NAT] |
| 7 | W-Leitung (zum MSG) | – | Signal-Ausgang | mittel | [NAT] |
| 8 | K-Leitung (Diagnose) | – | Diagnose | mittel | [NAT] |
| 9 | Masse Klemme 31 | – | Masse | mittel | [NAT] |
| 10 | +12 V Klemme 30 (Dauerplus) | – | Versorgung | mittel | [NAT] |
| Spule (2-pol) | Transpondersignal Lesespule | – | Signal-Eingang | mittel | [T4D]/[DB] |

Hinweis WFS allg.: Kabelfarben der WFS-Gerätestecker in keiner freien Quelle gefunden → alle `kabelfarbe: null`. Bench-Verkabelung nur mit den oben genannten Kern-Pins (30/15/31/K; W nur fahrzeugseitig) möglich.

## 18 · Airbag Golf 3 (6N0 909 603 / 1H0-909-605-Familie, Adresse 15)

Stecker: **gelber Mehrfachstecker**, STG Mitteltunnel `[DB]`. Diagnose: K-Leitung, Adresse 15, Warnlampe K75 `[DB]`.
**Pin-Nummern: UNBELEGT** — kein frei zugänglicher SLP/Pinout für 6N0 909 603 gefunden (Reparaturseiten beschreiben nur Fehlerbild Crash-Daten; Foren nur Kauf-/Reset-Anfragen).
Unverifizierter Anhaltspunkt (NICHT übernehmen): generische VAG-Bench-Belegung `[CP]`/`[CTG]` (Pin 5 +12 V / Pin 6 GND / Pin 9 K / Pin 30 Lampe) ist für 6N0 **nicht** verifiziert.

## 19 · Airbag Golf 4 (1J0 909 609 / 1J0 909 603 AC, Adresse 15)

Stecker: gelb; frühe Variante **50-pol** (nur K-Leitung, kein CAN), späte Variante 75-pol mit CAN auf Pin 74/75 `[TDI]`.
Kern-Pins (früh, 50-pol):

| Pin | Funktion | Farbe | Kat. | Konf. | Quelle |
|-----|----------|-------|------|-------|--------|
| 5 | +12 V Versorgung | – | Versorgung | niedrig–mittel | [CTG]/[CP] |
| 6 | Masse GND | – | Masse | niedrig–mittel | [CTG]/[CP] |
| 9 | K-Leitung (→ OBD Pin 7) | gr/ws fahrzeugseitig | Diagnose | mittel | [CTG]/[CP]/[TDI] |
| 30 | Airbag-Warnlampe | – | Signal-Ausgang | niedrig | [CTG]/[CP] |
| 74/75 | CAN-High/Low — **nur späte 75-pol Variante** | – | Diagnose | niedrig | [TDI] |

Rest: UNBELEGT (Zünder-/Sensor-Pins ohne SLP nicht angebbar; **niemals** an Zünderpins messen/prüfen).

## 20 · ZV-Pumpe Golf 3 (1H0 962 257 F/G, VDO/Hella, Kofferraum rechts)

Stecker: **12-polig, 11 Pins bestückt** (Bestätigung `[PKW]`); Belegung „PASSAT ab 93 und GOLF“ `[MT]`.
Signale plusgesteuert; Pin 8 je nach Modell unbelegt.

| Pin | Funktion | Farbe | Kat. | Konf. | Quelle |
|-----|----------|-------|------|-------|--------|
| 1 | Kl. 30 (Dauerplus Stellelemente rechts + STG) | ro/ws | Versorgung | mittel | [MT] |
| 2 | Masseversorgung Stellelemente (Pin 1 STG-seitig) | ge | Masse | mittel | [MT] |
| 3 | Kl. 31 Masse STG | br | Masse | mittel | [MT] |
| 4 | Stellelement vorn links | sw/ro | Signal-Ausgang | mittel | [MT] |
| 5 | Stellelement vorn rechts | sw/ro | Signal-Ausgang | mittel | [MT] |
| 6 | Dauerplus Stellelemente links | ro/ge | Versorgung | mittel | [MT] |
| 7 | ZV-ZU-Signal, plusgesteuert | gr | Signal-Eingang | mittel | [MT] |
| 8 | Kl. 31 Masse — teilweise UNBELEGT | br | Masse/unbelegt | mittel | [MT] |
| 9 | Stellelement hinten links | sw/ge | Signal-Ausgang | mittel | [MT] |
| 10 | ZV-AUF-Signal, plusgesteuert | gn | Signal-Eingang | mittel | [MT] |
| 11 | Stellelement hinten rechts | sw/ge | Signal-Ausgang | mittel | [MT] |
| 12 | Kl. 15 Zündungsplus (ZE Sicherung 16) | sw/ws | Versorgung | mittel | [MT] |

## 21 · KSG Golf 4 (1J0 959 799 Q/J/N/AH, Fahrerfußraum)

Stecker: **T23 (23-pol)** + **T15 (15-pol FFB)** + Antenne `[DB]`. T23-Belegung Variante „neu `99“ (Golf/Bora-relevant; MJ01/02-Umstellung beachten) `[DS]`:

| Pin (T23) | Funktion | Farbe | Kat. | Konf. | Quelle |
|-----------|----------|-------|------|-------|--------|
| 1 | Heckscheibenheizung | sw/br | Signal-Ausgang | mittel | [DS] |
| 2 | Heckklappe „AUF“ | br/sw | Signal-Ein/Ausgang | mittel | [DS] |
| 3 | „86 S“ (Sicherung 37, Schlüssel steckt) | ge/ro | Signal-Eingang | mittel | [DS] |
| 4 | Kontaktschalter Schließzylinder Heckklappe | br/gn | Signal-Eingang | mittel | [DS] |
| 5 | UNBELEGT („nicht gefunden/fehlt“) | – | unbelegt | – | [DS] |
| 6 | CAN-Low | or/br | Diagnose | mittel | [DS] |
| 7 | entf. (Schiebedach-Option) | – | unbelegt | – | [DS] |
| 8 | Türkontakt Fahrertür „AUF“ | br/ge | Signal-Eingang | mittel | [DS] |
| 9 | CAN-High | or/gn | Diagnose | mittel | [DS] |
| 10 | entf. (Schiebedach-Option) | – | unbelegt | – | [DS] |
| 11 | K-Leitung | gr/ws | Diagnose | mittel | [DS] |
| 12 | „58b“ Beleuchtung/Dimmer | gr/bl | Signal-Eingang | mittel | [DS] |
| 13 | Relais Heckklappenentriegelung | br/li | Signal-Ausgang | mittel | [DS] |
| 14 | GALA (Geschwindigkeitssignal) | bl/ws | Signal-Eingang | mittel | [DS] |
| 15 | Heckklappe „AUF“ | br/sw | Signal-Ein/Ausgang | mittel | [DS] |
| 16 | Innenleuchte „−“ | bl/gr | Signal-Ausgang | mittel | [DS] |
| 17 | Crash-Signal | li/ws | Signal-Eingang | mittel | [DS] |
| 18 | Innenleuchte „+“ | ro/bl | Versorgung | mittel | [DS] |
| 19 | entf. (nur Golf/Variant-Option) | – | unbelegt | – | [DS] |
| 20 | entf. (nur Golf/Variant-Option) | – | unbelegt | – | [DS] |
| 21 | Taster Heckklappengriff | gr/br | Signal-Eingang | mittel | [DS] |
| 22 | Kl. 30 (Sicherung 14) | ro/sw | Versorgung | mittel | [DS] |
| 23 | Kl. 31 Masse | br | Masse | mittel | [DS] |

**T15 (FFB): UNBELEGT** — keine freie Quelle gefunden. Hinweis: `1J0` (bis MJ01) vs. `1C0` (ab MJ02) sind **nicht** kompatibel (CAN-Anbindung) `[DB]`.

## 22 · GRA Golf 2 Unterdruck (443 907 305 / 443 907 305 A)

STG Fahrerfußraum/Zusatzrelaisträger; Pumpe 811 907 325, Stellelement 811 907 326 `[DB]`.
Stecker 8+1-pol / 8+2+1-pol `[DB]`. **Pin-Nummern: UNBELEGT** — kein Pinout/SLP frei auffindbar.
Funktional vorhanden (ohne Pin-Nr.): Kl. 15, Kl. 31, Geschwindigkeitssignal (GALA/Hall), Brems-/Kupplungsschalter (Abschaltung),
Bedieneinheit E45 (SET/RESUME/AUS), Unterdruckpumpe + Entlüftungsventile, Gaszug-Stellelement.

## 23 · GRA Golf 3 (1H0 907 305)

STG Fahrerfußraum; Pumpe 701 907 325 A, Stellelement 1H0 907 327, Ventile 811 907 343 B (2× Schalter/1× Automat),
Hebel 1H0 953 513 D, Leitungssatz 1H1 971 425 (Schalter) / 1H1 971 425 A (Automatik) `[ST]`.
**Pin-Nummern des STG-Steckers: UNBELEGT** — `[ST]` beschreibt nur Bauteile/Einbau, kein Pinout; SLP nur in kostenpflichtigen
Reparaturleitfäden (originalanleitungen.de). Funktional wie G2 plus fahrzeugspezifischer Kabelbaum.

## 24 · GRA Golf 4 E-Gas (Hebel 1H0 953 513 01C)

**Kein separates Steuergerät** — Funktion liegt im Motor-STG; Hebel an Lenksäule, Freischaltung per VCDS `[DB]`.
Keine STG-Pins angebbar (entfällt konstruktiv). Hebel-Pins: UNBELEGT.

## 25 · Climatronic Golf 3 (STG 1H0 907 044, Bedienteil 1H0 820 045)

Einbau Mittelkonsole `[DB]`. **Stecker + Pins: UNBELEGT** — kein G3-spezifischer SLP frei auffindbar
(T4-Thread betrifft 7D0-Variante, nicht übertragbar; G4-Scribd-SLPs betreffen 1J-Plattform).
Funktional zu erwarten (ohne Pin-Nr.): Kl. 30/15/31, K-Leitung, Außentemp-/Innenraumtemp-Geber, Gebläse-/Stellmotoren,
Kompressor-Anforderung, Geschwindigkeitssignal. Güte STG-Eintrag laut DB niedrig — Altteil prüfen.

---

## JSON (nur quellenbelegte Pins; unbelegte Pins explizit markiert)

```json
[
  {"sg_id":15,"pin":"1","funktion":"+12V Klemme 15","kabelfarbe":null,"kategorie":"Versorgung","hinweis":"WFS Gen1 1H0 953 257","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":15,"pin":"2","funktion":"K-Leitung Diagnose","kabelfarbe":null,"kategorie":"Diagnose","hinweis":"WFS Gen1","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":15,"pin":"3","funktion":"W-Leitung zum MSG","kabelfarbe":null,"kategorie":"Signal-Ausgang","hinweis":"WFS Gen1","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":15,"pin":"4","funktion":"Masse Klemme 31","kabelfarbe":null,"kategorie":"Masse","hinweis":"WFS Gen1","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":15,"pin":"5","funktion":"UNBELEGT","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"in Quelle nicht geführt","konfidenz":"-","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":15,"pin":"6","funktion":"Masse Klemme 31 (2. Masse)","kabelfarbe":null,"kategorie":"Masse","hinweis":"WFS Gen1","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":15,"pin":"-","funktion":"Transpondersignal Lesespule 1H0 953 254 (separater 2-pol Stecker)","kabelfarbe":null,"kategorie":"Signal-Eingang","hinweis":"keine Pin-Nummern quellenbelegt","konfidenz":"mittel","quelle":"vwbuswiki.de Wegfahrsicherung / DB-Stammdaten"},
  {"sg_id":16,"pin":"1","funktion":"+12V Klemme 30","kabelfarbe":null,"kategorie":"Versorgung","hinweis":"WFS Gen2 6H0 953 257","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":16,"pin":"2","funktion":"+12V Klemme 15","kabelfarbe":null,"kategorie":"Versorgung","hinweis":"WFS Gen2","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":16,"pin":"3","funktion":"UNBELEGT","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"in Quelle nicht geführt","konfidenz":"-","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":16,"pin":"4","funktion":"Masse Klemme 31","kabelfarbe":null,"kategorie":"Masse","hinweis":"WFS Gen2","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":16,"pin":"5","funktion":"Masse Klemme 31 (2. Masse)","kabelfarbe":null,"kategorie":"Masse","hinweis":"WFS Gen2","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":16,"pin":"6","funktion":"UNBELEGT","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"in Quelle nicht geführt","konfidenz":"-","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":16,"pin":"7","funktion":"W-Leitung zum MSG","kabelfarbe":null,"kategorie":"Signal-Ausgang","hinweis":"WFS Gen2","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":16,"pin":"8","funktion":"K-Leitung Diagnose","kabelfarbe":null,"kategorie":"Diagnose","hinweis":"WFS Gen2","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":16,"pin":"-","funktion":"Transpondersignal Lesespule 6H0 953 254 (separater 2-pol Stecker)","kabelfarbe":null,"kategorie":"Signal-Eingang","hinweis":"keine Pin-Nummern quellenbelegt","konfidenz":"mittel","quelle":"vwbuswiki.de Wegfahrsicherung / DB-Stammdaten"},
  {"sg_id":17,"pin":"1","funktion":"CAN-Low","kabelfarbe":null,"kategorie":"Diagnose","hinweis":"WFS Gen3 6X0 953 257","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"2","funktion":"CAN-High","kabelfarbe":null,"kategorie":"Diagnose","hinweis":"WFS Gen3","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"3","funktion":"+12V Klemme 15","kabelfarbe":null,"kategorie":"Versorgung","hinweis":"WFS Gen3","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"4","funktion":"UNBELEGT","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"in Quelle nicht geführt","konfidenz":"-","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"5","funktion":"UNBELEGT","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"in Quelle nicht geführt","konfidenz":"-","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"6","funktion":"UNBELEGT","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"in Quelle nicht geführt","konfidenz":"-","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"7","funktion":"W-Leitung zum MSG","kabelfarbe":null,"kategorie":"Signal-Ausgang","hinweis":"WFS Gen3","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"8","funktion":"K-Leitung Diagnose","kabelfarbe":null,"kategorie":"Diagnose","hinweis":"WFS Gen3","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"9","funktion":"Masse Klemme 31","kabelfarbe":null,"kategorie":"Masse","hinweis":"WFS Gen3","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"10","funktion":"+12V Klemme 30","kabelfarbe":null,"kategorie":"Versorgung","hinweis":"WFS Gen3","konfidenz":"mittel","quelle":"nat-corporation.com VAG-Immobox-Pinout"},
  {"sg_id":17,"pin":"-","funktion":"Transpondersignal Lesespule 6X0 953 254 (separater 2-pol Stecker)","kabelfarbe":null,"kategorie":"Signal-Eingang","hinweis":"keine Pin-Nummern quellenbelegt","konfidenz":"mittel","quelle":"vwbuswiki.de Wegfahrsicherung / DB-Stammdaten"},
  {"sg_id":19,"pin":"5","funktion":"+12V Versorgung","kabelfarbe":null,"kategorie":"Versorgung","hinweis":"Airbag G4 1J0 909 609, frühe 50-pol Variante","konfidenz":"niedrig-mittel","quelle":"cartechnology.co.uk / CarProg VAG-Airbag-Manual"},
  {"sg_id":19,"pin":"6","funktion":"Masse GND","kabelfarbe":null,"kategorie":"Masse","hinweis":"Airbag G4, frühe 50-pol Variante","konfidenz":"niedrig-mittel","quelle":"cartechnology.co.uk / CarProg VAG-Airbag-Manual"},
  {"sg_id":19,"pin":"9","funktion":"K-Leitung (fahrzeugseitig zu OBD Pin 7)","kabelfarbe":"gr/ws (fahrzeugseitig)","kategorie":"Diagnose","hinweis":"durch Bentley-SLP via TDIClub bestätigt","konfidenz":"mittel","quelle":"cartechnology.co.uk / TDIClub (oilhammer, Bentley)"},
  {"sg_id":19,"pin":"30","funktion":"Airbag-Warnlampe","kabelfarbe":null,"kategorie":"Signal-Ausgang","hinweis":"Airbag G4, frühe Variante","konfidenz":"niedrig","quelle":"cartechnology.co.uk / CarProg VAG-Airbag-Manual"},
  {"sg_id":19,"pin":"74","funktion":"CAN-High (NUR späte 75-pol Variante)","kabelfarbe":null,"kategorie":"Diagnose","hinweis":"99.5er 50-pol STG hat KEIN CAN","konfidenz":"niedrig","quelle":"TDIClub (oilhammer, Bentley)"},
  {"sg_id":19,"pin":"75","funktion":"CAN-Low (NUR späte 75-pol Variante)","kabelfarbe":null,"kategorie":"Diagnose","hinweis":"99.5er 50-pol STG hat KEIN CAN","konfidenz":"niedrig","quelle":"TDIClub (oilhammer, Bentley)"},
  {"sg_id":20,"pin":"1","funktion":"Kl.30 Dauerplus Stellelemente rechts + STG","kabelfarbe":"ro/ws","kategorie":"Versorgung","hinweis":"ZV-Pumpe Golf 3, 12-pol Stecker","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"2","funktion":"Masseversorgung Stellelemente","kabelfarbe":"ge","kategorie":"Masse","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"3","funktion":"Kl.31 Masse STG","kabelfarbe":"br","kategorie":"Masse","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"4","funktion":"Stellelement vorn links","kabelfarbe":"sw/ro","kategorie":"Signal-Ausgang","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"5","funktion":"Stellelement vorn rechts","kabelfarbe":"sw/ro","kategorie":"Signal-Ausgang","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"6","funktion":"Dauerplus Stellelemente links","kabelfarbe":"ro/ge","kategorie":"Versorgung","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"7","funktion":"ZV-ZU-Signal plusgesteuert","kabelfarbe":"gr","kategorie":"Signal-Eingang","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"8","funktion":"Kl.31 Masse, teilweise UNBELEGT je Modell","kabelfarbe":"br","kategorie":"Masse/unbelegt","hinweis":"modellabhängig unbelegt","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"9","funktion":"Stellelement hinten links","kabelfarbe":"sw/ge","kategorie":"Signal-Ausgang","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"10","funktion":"ZV-AUF-Signal plusgesteuert","kabelfarbe":"gn","kategorie":"Signal-Eingang","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"11","funktion":"Stellelement hinten rechts","kabelfarbe":"sw/ge","kategorie":"Signal-Ausgang","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":20,"pin":"12","funktion":"Kl.15 Zündungsplus (ZE Sicherung 16)","kabelfarbe":"sw/ws","kategorie":"Versorgung","hinweis":"ZV-Pumpe Golf 3","konfidenz":"mittel","quelle":"motor-talk.de (Wester)"},
  {"sg_id":21,"pin":"T23/1","funktion":"Heckscheibenheizung","kabelfarbe":"sw/br","kategorie":"Signal-Ausgang","hinweis":"KSG 1J0 959 799, Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/2","funktion":"Heckklappe AUF","kabelfarbe":"br/sw","kategorie":"Signal-Ein/Ausgang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/3","funktion":"86S Schlüssel-steckt (Sicherung 37)","kabelfarbe":"ge/ro","kategorie":"Signal-Eingang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/4","funktion":"Kontaktschalter Schließzylinder Heckklappe","kabelfarbe":"br/gn","kategorie":"Signal-Eingang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/5","funktion":"UNBELEGT","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"nicht gefunden/fehlt","konfidenz":"-","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/6","funktion":"CAN-Low","kabelfarbe":"or/br","kategorie":"Diagnose","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/7","funktion":"UNBELEGT (Schiebedach-Option)","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"entf.","konfidenz":"-","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/8","funktion":"Türkontakt Fahrertür AUF","kabelfarbe":"br/ge","kategorie":"Signal-Eingang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/9","funktion":"CAN-High","kabelfarbe":"or/gn","kategorie":"Diagnose","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/10","funktion":"UNBELEGT (Schiebedach-Option)","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"entf.","konfidenz":"-","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/11","funktion":"K-Leitung","kabelfarbe":"gr/ws","kategorie":"Diagnose","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/12","funktion":"58b Beleuchtung/Dimmer","kabelfarbe":"gr/bl","kategorie":"Signal-Eingang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/13","funktion":"Relais Heckklappenentriegelung","kabelfarbe":"br/li","kategorie":"Signal-Ausgang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/14","funktion":"GALA Geschwindigkeitssignal","kabelfarbe":"bl/ws","kategorie":"Signal-Eingang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/15","funktion":"Heckklappe AUF","kabelfarbe":"br/sw","kategorie":"Signal-Ein/Ausgang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/16","funktion":"Innenleuchte -","kabelfarbe":"bl/gr","kategorie":"Signal-Ausgang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/17","funktion":"Crash-Signal","kabelfarbe":"li/ws","kategorie":"Signal-Eingang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/18","funktion":"Innenleuchte +","kabelfarbe":"ro/bl","kategorie":"Versorgung","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/19","funktion":"UNBELEGT (Golf/Variant-Option)","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"entf.","konfidenz":"-","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/20","funktion":"UNBELEGT (Golf/Variant-Option)","kabelfarbe":null,"kategorie":"unbelegt","hinweis":"entf.","konfidenz":"-","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/21","funktion":"Taster Heckklappengriff","kabelfarbe":"gr/br","kategorie":"Signal-Eingang","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/22","funktion":"Kl.30 (Sicherung 14)","kabelfarbe":"ro/sw","kategorie":"Versorgung","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"},
  {"sg_id":21,"pin":"T23/23","funktion":"Kl.31 Masse","kabelfarbe":"br","kategorie":"Masse","hinweis":"KSG Variante neu 99","konfidenz":"mittel","quelle":"dieselschrauber.org (robidobi007)"}
]
```

Keine JSON-Zeilen für sg_id 18 (Airbag G3), 22/23/24 (GRA), 25 (Climatronic), T15 (KSG-FFB): keine Pin-Nummern quellenbelegt.

---

## Abdeckung + Güte (ehrlich)

| sg_id | System | Stecker | Kern-Pins belegt | Güte |
|-------|--------|---------|------------------|------|
| 15 | WFS Gen 1 | bekannt (mehrpolig + 2-pol Spule) | 5 + Spule (funktional) | mittel — Schlüsseldienst-Pinout, generationenkonsistent mit [T4D]; Farben fehlen |
| 16 | WFS Gen 2 | bekannt (mehrpolig + 2-pol Spule) | 6 + Spule (funktional) | mittel, wie oben |
| 17 | WFS Gen 3 | bekannt (mehrpolig + 2-pol Spule) | 7 + Spule (funktional) | mittel, wie oben |
| 18 | Airbag G3 | nur „gelb“ bekannt | **0 — UNBELEGT** | keine freie Quelle; SLP/elsa nötig |
| 19 | Airbag G4 | 50-pol früh / 75-pol spät | 4 Kern (5/6/9/30) | niedrig–mittel — Foren + Bench-Manual, K-Leitung Pin 9 doppelt bestätigt |
| 20 | ZV-Pumpe G3 | 12-pol/11 bestückt | **12/12** | mittel — 1 detaillierte Forenquelle, Steckerform zweitbestätigt |
| 21 | KSG G4 | T23 bekannt, T15 unbekannt | **T23 voll (18 belegt/5 unbelegt)** | mittel — 1 Quelle mit 3 MJ-Varianten; MJ01/02-Bruch dokumentiert |
| 22 | GRA G2 | Polzahl bekannt | **0 — UNBELEGT** | nur Bauteil-/Funktionsebene |
| 23 | GRA G3 | unbekannt | **0 — UNBELEGT** (Bauteilliste [ST]) | nur Bauteil-/Funktionsebene |
| 24 | GRA G4 | entfällt (im MSG) | n/a | konstruktiv geklärt |
| 25 | Climatronic G3 | unbekannt | **0 — UNBELEGT** | keine freie Quelle; SLP/elsa nötig |

Lücken zum Schließen (SLP/elsa, Werkstatt-Handbuch oder Altteil-Durchmessung nötig): Airbag G3-Pinout, KSG-T15 (FFB),
GRA-G2/G3-STG-Pinouts, Climatronic-G3-Stecker, WFS-Kabelfarben. Sicherheit: Airbag-Zünderkreise nur nach Herstellervorgabe behandeln.

# Pinbelegungen Motor-Steuergeräte (Web-Recherche)

Stand: 12.09.2026 · Branch: `fix/vss-doku-menue-xdf` · NICHT committen
Regel: Keine Pins erfunden. Unbelegt = unbelegt mit Vermerk. Konfidenz pro Pin: HOCH / MITTEL / NIEDRIG.

## SG-Abdeckung + Güte (Kurzfassung)

| sg_id | Steuergerät | Stecker | Abdeckung | Güte |
|---|---|---|---|---|
| 2 | Digifant II (PB/PF/RV/2H) 037906022x | 25-pol | 25/25 Pins | HOCH (a2resource + DW + corradodriver kreuzgeprüft) |
| 3 | Digifant 3.x (2E/ADY/AGG/ABF) 037906024x | 45-pol (3.0) / 68-pol (3.2) | 45-pol: 45/45; 68-pol (ABF 3.2): LÜCKE | 45-pol HOCH (workshop-manuals + DW); 68-pol NIEDRIG/fehlt |
| 4 | Mono-Jetronic (RP früh, 1F) | mehrpolig | LÜCKE (keine offene Pin-Tabelle gefunden) | — |
| 5 | Mono-Motronic (AAM/ABS/ADZ…) 1H0907311x | 35-pol bis ~94 / 45-pol ab 94 | 17/35 Pins (35-pol), 45-pol: LÜCKE | MITTEL (Tester-Handbuch + workshop-manuals) |
| 6 | KE-Motronic 9A 8A0907404C | 35-pol (CIS-Familie) | 35/35 als Proxy | MITTEL (US-16V-Motronic-Tabelle, nicht 9A-verifiziert) |
| 7 | Motronic M2.7 AAA 021906258B | **55-pol** (nicht 68-pol!) | 55/55 Pins | MITTEL-HOCH (doppel-wobber); DB-Angabe „68-polig“ anzweifeln |

> **Wichtig sg_id 7:** Doppel-WOBber führt „Steuergerät Golf 3 VR6 (55-polig; bis 1995)“ = M2.7 mit Verteiler
> (Hitzdraht-LMM inkl. Abbrenn-Pin 25 = M2.7-Signatur). 68-polig ist erst M2.9 (ab ~95).
> Die DB-Angabe „68-polig“ bei sg_id 7 ist sehr wahrscheinlich falsch → prüfen/korrigieren.
> **Wichtig sg_id 3:** 037906024 deckt zwei Stecker ab: Digifant 3.0 (2E, 45-pol) und Digifant 3.2 (ABF, 68-pol).
> Für 68-pol ABF wurde in offenen Quellen keine Pin-Tabelle gefunden (nur XDF-Threads ohne Pins).

---

## 1) sg_id 2 – Digifant II 25-pol (037906022x, PB/PF/RV/1P/2H)

Quellen:
- Q1 (HOCH): A2Resource „Digifant II Pinout“, http://www.a2resource.com/electrical/management/digifant2.html
  (US/CE1/CE2-Farben, 25-pol Engine Controller + 7-pol Ignition Controller)
- Q2 (MITTEL-HOCH): Doppel-WOBber Lexikon „DigiFant (VW Golf 2)“,
  https://www.doppel-wobber.de/lexicon/index.php?entry/2084-digifant-vw-golf-2/ (Funktionstabelle ohne Farben)
- Q3 (MITTEL-HOCH, nur G60-Variante): Corradodriver,
  http://corradodriver.de/HTML/Pinbelegung/Digifant/ (G60 25-pol mit Kabelfarben + ZE-Stecker)
- Q4 (NIEDRIG, Kontext): vwvortex-Thread (25-Pin-Connector Beschreibung),
  https://vwvortex.com/threads/i-put-a-1990-1-8l-8v-into-a-1958-volvo-but-cant-figure-out-what-wires-to-give-power-to-start-it.8029522

Kabelfarben = CE2 (EU-Fahrzeuge). CE1/US-Abweichungen im Hinweis.

| Pin | Funktion | Kabelfarbe (CE2) | Quelle | Konfidenz |
|---|---|---|---|---|
| 1 | Klemme 50 (Startersignal) | rot/grün | Q1+Q2 | HOCH |
| 2 | Lambdasonde Signal | grün | Q1+Q2 | HOCH |
| 3 | Kraftstoffpumpenrelais (Ansteuerung) | rot/gelb | Q1+Q2 | HOCH |
| 4 | Klopfsensor | gelb | Q1+Q2 | HOCH |
| 5 | Klopfsensor | schwarz | Q1+Q2 | HOCH |
| 6 | Sensormasse (LMM, Kühlmittel, Hall) | braun/weiß | Q1+Q2 | HOCH |
| 7 | Klopfsensor Schirm/Masse | Geflecht | Q1+Q2 | HOCH |
| 8 | Hallgeber Versorgung (Verteiler Pin 3) | rot/schwarz | Q1+Q2 | HOCH |
| 9 | Ansauglufttemperaturgeber | blau/weiß | Q1+Q2 | HOCH |
| 10 | Kühlmitteltemperaturgeber | braun/grün | Q1+Q2 | HOCH |
| 11 | Leerlauf-/Volllastschalter | rot/blau | Q1+Q2 | HOCH |
| 12 | Einspritzventile (Ansteuerung) | braun/gelb (CE1: rot) | Q1+Q2 | HOCH |
| 13 | Masse (Batterie) | braun | Q1+Q2 | HOCH |
| 14 | Spannungsversorgung (STG-Relais, Kl.15) | schwarz/gelb | Q1+Q2 | HOCH |
| 15 | unbelegt | — | Q1+Q2 | HOCH |
| 16 | Klimaanlage (Kompressorsignal) | grün | Q1+Q2 | HOCH |
| 17 | LMM-Poti Versorgung | blau/schwarz | Q1+Q2 | HOCH |
| 18 | Hallgeber Drehzahlsignal (Verteiler Pin 2) | grün/weiß | Q1+Q2 | HOCH |
| 19 | Masse (Zylinderkopf) | braun/schwarz | Q1+Q2 | HOCH |
| 20 | Diagnose/Fehlerlampe (weiß/rot) – KONFLIKT: Q2 sagt „nicht belegt“ | weiß/rot | Q1 vs Q2 | MITTEL |
| 21 | LMM-Poti Signal | blau/rot | Q1+Q2 | HOCH |
| 22 | Leerlaufstabilisierungsventil | gelb (CE1: weiß) | Q1+Q2 | HOCH |
| 23 | Leerlaufstabilisierungsventil | weiß (CE1: gelb) | Q1+Q2 | HOCH |
| 24 | unbelegt | — | Q1+Q2 | HOCH |
| 25 | Zündsteuergerät (Endstufe) | grün | Q1+Q2 | HOCH |

G60-Hinweis (Q3): Pin 5 = CO-Poti (statt Klopfsensor 2), Pin 12 = Einspritzventil-Masse,
Pin 15 = Volllastschalter, Pin 17 = frei, Pin 20 = Fehlerauslese (nicht rausgeführt),
Pin 24 = Drehzahlsignal Kombi. G60 nach 037906022B/CP/DP etc. = eigene Variante (sg_id 1-Nähe).

---

## 2) sg_id 3 – Digifant 3.x (037906024x)

### 2a) Digifant 3.0 (2E/ADY 8V, 45-pol) – abgedeckt

Quellen:
- Q1 (HOCH): workshop-manuals „Wiring and component check with test box V.A.G 1598/18“,
  Golf Mk3 Digifant (2 valve),
  https://workshop-manuals.biz/volkswagen/golf-mk3/power_unit/digifant_injection_and_ignition_system_(2_valve)/self_diagnosis_v.a.g_inspection_service/electrical_check/wiring_and_component_check_with_test_box_v.a.g_1598/18/
  (Manual: „The contact numbers of the plugs and the socket numbers in the test box are identical“ → Dosen-Nr. = Stecker-Pin)
- Q2 (MITTEL-HOCH): Doppel-WOBber Lexikon „DigiFant (VW Golf 3)“,
  https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/ (45-pol Funktionstabelle)

| Pin | Funktion | Kabelfarbe | Quelle | Konfidenz |
|---|---|---|---|---|
| 1 | Masse | — | Q1+Q2 | HOCH |
| 2 | Einspritzventile N30–N33 | — | Q1+Q2 | HOCH |
| 3 | unbelegt | — | Q2 | MITTEL |
| 4 | Klemme 30 (Dauerplus) | — | Q2 | MITTEL |
| 5 | Servolenkungssignal | — | Q2 | MITTEL |
| 6 | Kaltstartventil N17 | — | Q1+Q2 | HOCH |
| 7 | Zündtrafo/-endstufe N152 | — | Q1+Q2 | HOCH |
| 8 | Hauptrelais (STG-Relais) | — | Q2 | MITTEL |
| 9 | Klopfsensor G61 (Schirm, steckerseitig Kontakt 3) | — | Q1 | HOCH |
| 10 | MFA-Verbrauchssignal | — | Q2 | MITTEL |
| 11 | Geschwindigkeitssignal | — | Q2 | MITTEL |
| 12 | Kühlmitteltemperaturgeber G62 (12+35) | — | Q1+Q2 | HOCH |
| 13 | Klimaanlage | — | Q2 | MITTEL |
| 14 | Luftmengenmesser G19 Versorgung (14+16) | — | Q1+Q2 | HOCH |
| 15 | Automatikgetriebe | — | Q2 | MITTEL |
| 16 | Luftmengenmesser G19 Signal (16+35) | — | Q1+Q2 | HOCH |
| 17 | Lambdasonde G39 (Heiz-/Massepfad, Kontakt 4) | — | Q1+Q2 | HOCH |
| 18 | Leerlaufschalter | — | Q2 | MITTEL |
| 19 | Drehzahlsignal | — | Q2 | MITTEL |
| 20 | Lambdasondenheizung | — | Q2 (Q1: 1+17=∞ stützt Heizkreis) | MITTEL |
| 21 | Lambdasonden-Schirm | — | Q2 | MITTEL |
| 22 | unbelegt | — | Q2 | MITTEL |
| 23 | Spannungsversorgung (Fahrzeuge ab 11.91) | — | Q1 | HOCH |
| 24 | unbelegt | — | Q2 | MITTEL |
| 25 | unbelegt | — | Q2 | MITTEL |
| 26 | unbelegt | — | Q2 | MITTEL |
| 27 | unbelegt | — | Q2 | MITTEL |
| 28 | unbelegt | — | Q2 | MITTEL |
| 29 | unbelegt | — | Q2 | MITTEL |
| 30 | Leerlaufstabilisierungsventil N71 | — | Q1+Q2 | HOCH |
| 31 | Kraftstoffpumpenrelais J17 | — | Q1+Q2 | HOCH |
| 32 | Klemme 50 (Starter) | — | Q1+Q2 | HOCH |
| 33 | Tankentlüftung N80 | — | Q1+Q2 | HOCH |
| 34 | Klopfsensor G61 (Kontakt 2) | — | Q1+Q2 | HOCH |
| 35 | Sensor-Masse (G62/G42/G19/G69/G40) | — | Q1+Q2 | HOCH |
| 36 | Klopfsensor G61 Signal (Kontakt 1) | — | Q1+Q2 | HOCH |
| 37 | Ansauglufttemperaturgeber G42 (35+37) | — | Q1+Q2 | HOCH |
| 38 | Klemme 15 | — | Q1+Q2 | HOCH |
| 39 | Klimaanlage | — | Q1+Q2 | HOCH |
| 40 | Drosselklappenpoti G69 (Kontakt 2) | — | Q1+Q2 | HOCH |
| 41 | Drosselklappenpoti G69 (Kontakt 1) | — | Q1+Q2 | HOCH |
| 42 | Lambdasonde Masse (Kontakt 3) | — | Q1+Q2 | HOCH |
| 43 | Diagnose (K-Leitung, Diagnosestecker) | — | Q1+Q2 | HOCH |
| 44 | Hallgeber G40 (Kontakt 2) | — | Q1+Q2 | HOCH |
| 45 | Hallgeber G40 (Kontakt 3) | — | Q1+Q2 | HOCH |

### 2b) Digifant 3.2 (ABF 16V, 68-pol) – LÜCKE

Keine offene Pin-Tabelle gefunden. Indizien: TunerPro-Thread (nur XDF, keine Pins),
https://forum.tunerpro.net/viewtopic.php?t=7183 ;
workshop-manuals Digifant-3.2-Fehlertabelle (kein Pinout),
https://workshop-manuals.com/volkswagen/golf-mk3/power_unit/digifant_injection_and_ignition_system_(4-valve)/self_diagnosis_v.a.g_inspection_service/self_diagnosis/fault_table_digifant_3.2/ .
Bentley-Verlag (Bentley Publishers Golf/Jetta III Service Manual) enthält Stromlaufpläne,
nicht frei online. → Lücke, NIEDRIG, keine JSON-Zeilen.

---

## 3) sg_id 4 – Mono-Jetronic (RP früh, 1F) – LÜCKE

Keine offene Pin-Tabelle gefunden. System: Zentraleinspritzung + separates TSZ-h-Zünd-STG.
Ansatzpunkte (keine Pins): SSP-Beschreibung, Stromlaufpläne RP/Mono-Jetronic
https://vwmanual.ru/en/passat/b4/electrics/schemes/shemy-elektrooborudovaniya-avtomobiley-s-dvigatelem-rp ,
Motor-Talk/DW-Forenthreads (Notlauf). → keine JSON-Zeilen.

---

## 4) sg_id 5 – Mono-Motronic 1H0907311x (35-pol bis ~94 / 45-pol ab 94)

Quellen:
- Q1 (MITTEL): Autodiagnos „Mono-Motronic 35“ Bedienungsanleitung (Tester-Handbuch, Pin-Referenzen),
  https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html
  (#-Nummern = ECU-Pins, via Break-out-Box; unvollständig, nur geprüfte Pins)
- Q2 (MITTEL-HOCH): workshop-manuals, Mono-Motronic „Checking control unit voltage supply“
  (Prüfdosen 1+21 Speicherversorgung, 1+23 STG-Versorgung),
  https://workshop-manuals.com/volkswagen/golf-mk3/power_unit/mono_motronic_injection_and_ignition_system/mixture_preparation_system_electronic_inj.gas/mono-motronic_injection_and_ignition_system/checking_control_unit_voltage_supply/
- Q3 (MITTEL): workshop-manuals, Mono-Motronic „Checking injector“
  (Einspritzventil N30/N181, 4-pol Stecker Kontakt 3 → Prüfdose 7; Widerstand 1,2–1,6 Ω),
  https://workshop-manuals.com/volkswagen/golf-mk3/power_unit/mono_motronic_injection_and_ignition_system/mixture_preparation_system_electronic_inj.gas/mono-motronic_injection_and_ignition_system/checking_injector/
- Q4 (Hintergrund): VW SSP 164 „Änderungen an der Mono-Motronic“ (ab 7/94: 45-pol Stecker,
  Bauteile G39/G40/G62/G61/G42/F60/G127/G69/N80/N181/V60/N152/N157),
  https://www.nininet.de/selbststudienprogramme/VW-SSP-164-Aenderungen-Mono-Motronic.php
- Q5 (Hintergrund): Doppel-WOBber „SPI“ (nur Systembeschreibung, kein Pinout),
  https://www.doppel-wobber.de/lexicon/index.php?entry/1891-mono/

| Pin | Funktion | Kabelfarbe | Quelle | Konfidenz |
|---|---|---|---|---|
| 1 | Masse | — | Q1+Q2 | MITTEL |
| 2 | Dauerplus (BATT) | — | Q1 | MITTEL |
| 6 | Spannungsausgang (Sensorversorgung) | — | Q1 | NIEDRIG |
| 7 | Einspritzventil-Ansteuerung (N30/N181) | — | Q3 (Dose 7 = Pin 7 analog 1598/18) | MITTEL |
| 8 | Masse | — | Q1 | NIEDRIG |
| 11 | Masse | — | Q1 | NIEDRIG |
| 12 | Relais-Ansteuerung | — | Q1 | NIEDRIG |
| 17 | Tankentlüftung N80 | — | Q1 | MITTEL |
| 18 | Masse | — | Q1 | NIEDRIG |
| 19 | BATT/Dauerplus | — | Q1 | NIEDRIG |
| 21 | Masse (Schaltgetriebe) / KONFLIKT: Q2 misst 1+21 Speicherversorgung | — | Q1 vs Q2 | NIEDRIG |
| 23 | STG-Spannungsversorgung (Zündung an) | — | Q2 | MITTEL |
| 24 | DK-Poti Versorgung | — | Q1 | MITTEL |
| 25 | DK-Poti Signal | — | Q1 | NIEDRIG |
| 27 | Ansauglufttemperatur | — | Q1 | MITTEL |
| 28 | Lambdasonde Signal | — | Q1 | MITTEL |
| 34 | Leerlaufregelung (2. Kanal) | — | Q1 | MITTEL |
| 35 | Einspritzventil | — | Q1 | MITTEL |

Restliche Pins 3–5, 9, 10, 13–16, 20, 22, 26, 29–33: LÜCKE (Volltabelle nur hinter Scribd-Paywall:
„Mono-Motronic 45-int“, https://www.scribd.com/document/485905831/mono-motronic-45-int – nicht verifizierbar).
45-pol Variante ab 94: LÜCKE (nur SSP-164-Bestätigung des 45-pol Steckers).

---

## 5) sg_id 6 – KE-Motronic 9A (8A0907404C, 35-pol CIS-Familie)

Quellen:
- Q1 (MITTEL, Proxy): A2Resource „Motronic Pinout“ (US 2.0-16V CIS-Motronic 35-pol, Motorenfamilie PL –
  Vorgänger/verwandt der 9A-KE-Motronic; Funktionen DPR/Klopfsensoren/Kaltstart/LMM-Poti baugleich),
  http://www.a2resource.com/electrical/management/motronic.html
  Farben: 1990 GLI / 1991+ GLI (diese Spalte unten).
- Q2 (NIEDRIG-MITTEL, Hintergrund ohne Pins): KE-Motronic-9A-Stromlaufplan Komponentenliste (Passat B4),
  https://www.vwmanual.ru/en/passat/b4/power-16/ke-motronic/shema-soedineniy-ksud-ke-motronic-dvigatelya-9a
- Q3 (NIEDRIG, Kontext): Corrado-Forum „Corrado 9A ECU Pin outs needed!“
  (bestätigt nur, dass offene 9A-Tabellen rar sind),
  https://the-corrado.net/topic/85073-corrado-9a-ecu-pin-outs-needed/
- Q4 (Bilder, nicht extrahierbar): Corradodriver 9A-Schaltpläne,
  http://corradodriver.de/HTML/Schaltplaene/Motronic9A/

⚠ Alle Zeilen = Proxy aus US-Motronic, NICHT 9A-verifiziert → max. MITTEL, 9A-Abgleich am Fahrzeug nötig.

| Pin | Funktion | Kabelfarbe | Quelle | Konfidenz |
|---|---|---|---|---|
| 1 | Diagnose K-Leitung | grau/weiß | Q1 | MITTEL |
| 2 | Geschwindigkeitssignal | blau/weiß | Q1 | MITTEL |
| 3 | Kühlmitteltemperatur | violett/schwarz | Q1 | MITTEL |
| 4 | Differenzdrucksteller + | weiß/rot | Q1 | MITTEL |
| 5 | Differenzdrucksteller − | braun/blau | Q1 | MITTEL |
| 6 | Klopfsensor 2 Schirm | weiß | Q1 | MITTEL |
| 7 | Lambdasonde | schwarz | Q1 | MITTEL |
| 8 | Klopfsensoren Signal (S1 blau / S2 gelb) | blau/gelb | Q1 | MITTEL |
| 9 | AGR-Temperatur (nur Kat-Versionen) | blau/gelb | Q1 | MITTEL |
| 10 | unbelegt | — | Q1 | MITTEL |
| 11 | Drehzahlsignal (Zündendstufe) | grün | Q1 | MITTEL |
| 12 | Kraftstoffpumpenrelais | rot/gelb | Q1 | MITTEL |
| 13 | Fehlerlampe | gelb/schwarz | Q1 | MITTEL |
| 14 | Klemme 15 (Start/Run) | schwarz | Q1 | MITTEL |
| 15 | AKF-Magnetventil 1 | grün/gelb | Q1 | MITTEL |
| 16 | Kaltstartventil | schwarz/rot | Q1 | MITTEL |
| 17 | Leerlaufstabilisierungsventil | weiß | Q1 | MITTEL |
| 18 | Masse (Zylinderkopf) | braun/gelb | Q1 | MITTEL |
| 19 | Dauerplus (Batterie) | rot | Q1 | MITTEL |
| 20 | Masse (nur Passat-Variante belegt) | braun/schwarz | Q1 | NIEDRIG |
| 21 | Hallgeber + (Verteiler Pin 3) | rot/schwarz | Q1 | MITTEL |
| 22 | Diagnose L-Leitung | gelb | Q1 | MITTEL |
| 23 | LMM-Poti | grau/grün | Q1 | MITTEL |
| 24 | Klopfsensor 1 Schirm | grau/grün* (GTI grau / GLI grün) | Q1 | MITTEL |
| 25 | Drehzahlsignal Kombi (nur Passat) | grün/blau | Q1 | NIEDRIG |
| 26 | LMM-Poti | grau/rot | Q1 | MITTEL |
| 27 | Zündzeitpunktgeber | grün | Q1 | MITTEL |
| 28 | Volllastschalter | schwarz/blau o. grau | Q1 | MITTEL |
| 29 | Zündzeitpunktgeber | rot | Q1 | MITTEL |
| 30 | Hallgeber Signal (Verteiler Pin 2) | grün/weiß | Q1 | MITTEL |
| 31 | Automatik-STG (nur Passat) | gelb/rot | Q1 | NIEDRIG |
| 32 | Leerlaufschalter | grau o. schwarz/blau | Q1 | MITTEL |
| 33 | Klimaanlage | grün | Q1 | MITTEL |
| 34 | Masse (A2) / Klemme 50 (Automatik-Passat) | weiß/grün | Q1 | NIEDRIG |
| 35 | Masse (Zylinderkopf) | braun | Q1 | MITTEL |

---

## 6) sg_id 7 – Motronic M2.7 AAA-Verteiler (021906258B, 55-pol)

Quellen:
- Q1 (MITTEL-HOCH): Doppel-WOBber Lexikon „Motronic VR6 M 2.7 (VW Golf 3)“,
  „Steuergerät Golf 3 VR6 (55-polig; bis 1995)“ (Verteiler-Zündung, Hitzdraht-LMM mit Abbrennen = M2.7),
  https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/
- Q2 (Abgrenzung, nicht M2.7): A2Resource „VR6 & ABA Motronic OBD1 Pinout“ (M2.9 68-pol),
  http://www.a2resource.com/electrical/management/motronicvr6aba.html
- Q3 (Fragment): Doppel-WOBber „Motronic“ (M 2.9 68-pol, fast leer – „noch nicht vollständig“),
  https://www.doppel-wobber.de/lexicon/index.php?entry/2112-motronic/

| Pin | Funktion | Kabelfarbe | Quelle | Konfidenz |
|---|---|---|---|---|
| 1 | Zündspule | — | Q1 | MITTEL |
| 2 | Diagnose | — | Q1 | MITTEL |
| 3 | Kraftstoffpumpenrelais | — | Q1 | MITTEL |
| 4 | LSV öffnen | — | Q1 | MITTEL |
| 5 | AKF-Magnetventil | — | Q1 | MITTEL |
| 6 | Drehzahlmesser | — | Q1 | MITTEL |
| 7 | Hitzdraht-LMM | — | Q1 | MITTEL |
| 8 | Hallgeber | — | Q1 | MITTEL |
| 9 | Geschwindigkeitssignal | — | Q1 | MITTEL |
| 10 | Lambda-Masse | — | Q1 | MITTEL |
| 11 | Klopfsensor 1 | — | Q1 | MITTEL |
| 12 | Hallgeber + | — | Q1 | MITTEL |
| 13 | Diagnoseleitung | — | Q1 | MITTEL |
| 14 | STG-Masse | — | Q1 | MITTEL |
| 15 | Einspritzventil Zyl. 2 | — | Q1 | MITTEL |
| 16 | Einspritzventil Zyl. 5 | — | Q1 | MITTEL |
| 17 | Einspritzventil Zyl. 1 | — | Q1 | MITTEL |
| 18 | Klemme 30 | — | Q1 | MITTEL |
| 19 | Masse | — | Q1 | MITTEL |
| 20 | unbelegt | — | Q1 | MITTEL |
| 21 | unbelegt | — | Q1 | MITTEL |
| 22 | LSV schließen | — | Q1 | MITTEL |
| 23 | unbelegt | — | Q1 | MITTEL |
| 24 | Masse | — | Q1 | MITTEL |
| 25 | Hitzdraht-LMM abbrennen | — | Q1 | MITTEL |
| 26 | LMM-Masse | — | Q1 | MITTEL |
| 27 | Klemme 15 | — | Q1 | MITTEL |
| 28 | Lambdasonde | — | Q1 | MITTEL |
| 29 | Klopfsensor 2 | — | Q1 | MITTEL |
| 30 | Sensor-Masse | — | Q1 | MITTEL |
| 31 | Verbrauchssignal | — | Q1 | MITTEL |
| 32 | unbelegt | — | Q1 | MITTEL |
| 33 | Einspritzventil Zyl. 4 | — | Q1 | MITTEL |
| 34 | Einspritzventil Zyl. 6 | — | Q1 | MITTEL |
| 35 | Einspritzventil Zyl. 3 | — | Q1 | MITTEL |
| 36 | STG-Relais Pin 5 | — | Q1 | MITTEL |
| 37 | STG-Relais Pin 6 | — | Q1 | MITTEL |
| 38 | unbelegt | — | Q1 | MITTEL |
| 39 | Codierstecker | — | Q1 | MITTEL |
| 40 | Klimakompressorsignal | — | Q1 | MITTEL |
| 41 | Klimaanlagensignal | — | Q1 | MITTEL |
| 42 | unbelegt | — | Q1 | MITTEL |
| 43 | unbelegt | — | Q1 | MITTEL |
| 44 | unbelegt | — | Q1 | MITTEL |
| 45 | Kühlmitteltemperatur | — | Q1 | MITTEL |
| 46 | unbelegt | — | Q1 | MITTEL |
| 47 | unbelegt | — | Q1 | MITTEL |
| 48 | Motordrehzahlgeber Pin 2 | — | Q1 | MITTEL |
| 49 | Motordrehzahlgeber Pin 1 | — | Q1 | MITTEL |
| 50 | unbelegt | — | Q1 | MITTEL |
| 51 | unbelegt | — | Q1 | MITTEL |
| 52 | unbelegt | — | Q1 | MITTEL |
| 53 | Drosselklappenpoti | — | Q1 | MITTEL |
| 54 | Codierstecker | — | Q1 | MITTEL |
| 55 | Diagnoseleitung | — | Q1 | MITTEL |

---

## JSON zur maschinellen Übernahme

```json
[
{"sg_id":2,"pin":"1","funktion":"Klemme 50 (Startersignal)","kabelfarbe":"rot/grün","kategorie":"Eingang Signal","hinweis":"CE2; US schwarz/rot, CE1 rot","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"2","funktion":"Lambdasonde Signal","kabelfarbe":"grün","kategorie":"Eingang Sensor","hinweis":"","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"3","funktion":"Kraftstoffpumpenrelais (Ansteuerung)","kabelfarbe":"rot/gelb","kategorie":"Ausgang Aktor","hinweis":"CE2; US braun/grün, CE1 rot/gelb","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"4","funktion":"Klopfsensor","kabelfarbe":"gelb","kategorie":"Eingang Sensor","hinweis":"CE2; US violett/weiß","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"5","funktion":"Klopfsensor","kabelfarbe":"schwarz","kategorie":"Eingang Sensor","hinweis":"CE2; US schwarz/rot. G60: CO-Poti","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"6","funktion":"Sensormasse (LMM, Kühlmittel, Hall)","kabelfarbe":"braun/weiß","kategorie":"Masse","hinweis":"US grau/gelb","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"7","funktion":"Klopfsensor Schirm/Masse","kabelfarbe":"Geflecht","kategorie":"Masse","hinweis":"","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"8","funktion":"Hallgeber Versorgung (Verteiler Pin 3)","kabelfarbe":"rot/schwarz","kategorie":"Versorgung","hinweis":"US braun/schwarz","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"9","funktion":"Ansauglufttemperaturgeber","kabelfarbe":"blau/weiß","kategorie":"Eingang Sensor","hinweis":"US rot/weiß","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"10","funktion":"Kühlmitteltemperaturgeber","kabelfarbe":"braun/grün","kategorie":"Eingang Sensor","hinweis":"US blau/gelb","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"11","funktion":"Leerlauf-/Volllastschalter","kabelfarbe":"rot/blau","kategorie":"Eingang Signal","hinweis":"US blau/weiß; G60: Leerlaufschalter","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"12","funktion":"Einspritzventile (Ansteuerung)","kabelfarbe":"braun/gelb","kategorie":"Ausgang Aktor","hinweis":"CE1 rot; G60: Einspritzventil-Masse","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"13","funktion":"Masse (Batterie)","kabelfarbe":"braun","kategorie":"Masse","hinweis":"","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"14","funktion":"Spannungsversorgung (STG-Relais, Kl.15)","kabelfarbe":"schwarz/gelb","kategorie":"Versorgung","hinweis":"US grün/weiß","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"15","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"Q1+Q2 einig; G60: Volllastschalter (Variante!)","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"16","funktion":"Klimaanlage (Kompressorsignal)","kabelfarbe":"grün","kategorie":"Eingang Signal","hinweis":"US braun/blau","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"17","funktion":"LMM-Poti Versorgung","kabelfarbe":"blau/schwarz","kategorie":"Versorgung","hinweis":"US grau/grün; G60: frei","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"18","funktion":"Hallgeber Drehzahlsignal (Verteiler Pin 2)","kabelfarbe":"grün/weiß","kategorie":"Eingang Signal","hinweis":"","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"19","funktion":"Masse (Zylinderkopf)","kabelfarbe":"braun/schwarz","kategorie":"Masse","hinweis":"US braun","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"20","funktion":"Diagnose/Fehlerlampe","kabelfarbe":"weiß/rot","kategorie":"Diagnose","hinweis":"KONFLIKT: Doppel-WOBber sagt unbelegt; G60: Fehlerauslese nicht rausgeführt","konfidenz":"MITTEL","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html vs Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"21","funktion":"LMM-Poti Signal","kabelfarbe":"blau/rot","kategorie":"Eingang Sensor","hinweis":"US weiß/gelb","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"22","funktion":"Leerlaufstabilisierungsventil","kabelfarbe":"gelb","kategorie":"Ausgang Aktor","hinweis":"CE1 weiß; G60: LSV Pin 3 weiß","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"23","funktion":"Leerlaufstabilisierungsventil","kabelfarbe":"weiß","kategorie":"Ausgang Aktor","hinweis":"CE1 gelb","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"24","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"Q1+Q2 einig; G60: Drehzahlsignal Kombi (Variante!)","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":2,"pin":"25","funktion":"Zündsteuergerät (Endstufe)","kabelfarbe":"grün","kategorie":"Ausgang Aktor","hinweis":"US grün/blau; G60: Zündspule Pin 1","konfidenz":"HOCH","quelle":"A2Resource Digifant II Pinout, http://www.a2resource.com/electrical/management/digifant2.html + Doppel-WOBber entry/2084"},
{"sg_id":3,"pin":"1","funktion":"Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"Digifant 3.0 45-pol; WM Prüfdose 1 = Masse","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"2","funktion":"Einspritzventile N30-N33","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"WM: Dose 1+2 Batteriespannung","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"3","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"4","funktion":"Klemme 30 (Dauerplus)","kabelfarbe":"","kategorie":"Versorgung","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"5","funktion":"Servolenkungssignal","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"6","funktion":"Kaltstartventil N17","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"WM: Dose 6+1; nur Fzg. bis 07.93","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"7","funktion":"Zündtrafo/-endstufe N152","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"WM: Dose 1+7","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"8","funktion":"Hauptrelais (STG-Relais)","kabelfarbe":"","kategorie":"Versorgung","hinweis":"WM Schritt 1: Dose 1+8 Versorgung J169; nur DW als Funktion","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085 + workshop-manuals Digifant 2V Testbox"},
{"sg_id":3,"pin":"9","funktion":"Klopfsensor G61 Schirm","kabelfarbe":"","kategorie":"Masse","hinweis":"WM Schritt 15: 9 = G61 Kontakt 3","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18"},
{"sg_id":3,"pin":"10","funktion":"MFA-Verbrauchssignal","kabelfarbe":"","kategorie":"Ausgang Signal","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"11","funktion":"Geschwindigkeitssignal","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"12","funktion":"Kühlmitteltemperaturgeber G62","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"WM: 12+35 Kennlinie","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"13","funktion":"Klimaanlage","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"14","funktion":"Luftmengenmesser G19 Versorgung","kabelfarbe":"","kategorie":"Versorgung","hinweis":"WM: 14+16 Poti","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"15","funktion":"Automatikgetriebe","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"16","funktion":"Luftmengenmesser G19 Signal","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"WM: 16+35","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"17","funktion":"Lambdasonde G39 (Heiz-/Massepfad)","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"WM: 17 = G39 Kontakt 4; 1+17 = unendlich","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"18","funktion":"Leerlaufschalter","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"19","funktion":"Drehzahlsignal","kabelfarbe":"","kategorie":"Ausgang Signal","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"20","funktion":"Lambdasondenheizung","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"nur DW; WM Heizkreis-Messung stützt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085 + workshop-manuals Digifant 2V Testbox"},
{"sg_id":3,"pin":"21","funktion":"Lambdasonden-Schirm","kabelfarbe":"","kategorie":"Masse","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"22","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"23","funktion":"Spannungsversorgung (ab 11.91)","kabelfarbe":"","kategorie":"Versorgung","hinweis":"WM Schritt 1: Dose 1+23","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18"},
{"sg_id":3,"pin":"24","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"25","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"26","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"27","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"28","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"29","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"nur DW","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/2085, https://www.doppel-wobber.de/lexicon/index.php?entry/2085-digifant-vw-golf-3/"},
{"sg_id":3,"pin":"30","funktion":"Leerlaufstabilisierungsventil N71","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"WM: Dose 30+1","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"31","funktion":"Kraftstoffpumpenrelais J17","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"WM: Brücke 31+1 Pumpe läuft","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"32","funktion":"Klemme 50 (Starter)","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"WM: Dose 32+1 mind. 8 V beim Starten","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"33","funktion":"Tankentlüftung N80","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"WM: Dose 33+1","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"34","funktion":"Klopfsensor G61 (Kontakt 2)","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"WM Schritt 15","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"35","funktion":"Sensor-Masse (G62/G42/G19/G69/G40)","kabelfarbe":"","kategorie":"Masse","hinweis":"WM: Referenz für 12/37/16/41/40/44/45","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"36","funktion":"Klopfsensor G61 Signal (Kontakt 1)","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"WM Schritt 15","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"37","funktion":"Ansauglufttemperaturgeber G42","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"WM: 35+37 Kennlinie","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"38","funktion":"Klemme 15","kabelfarbe":"","kategorie":"Versorgung","hinweis":"WM: Dose 1+38 Zündung an","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"39","funktion":"Klimaanlage","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"WM: Dose 1+39","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"40","funktion":"Drosselklappenpoti G69 (Kontakt 2)","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"WM Schritt 13","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"41","funktion":"Drosselklappenpoti G69 (Kontakt 1)","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"WM Schritt 13","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"42","funktion":"Lambdasonde Masse (Kontakt 3)","kabelfarbe":"","kategorie":"Masse","hinweis":"WM Schritt 16, nur Kat-Fzg.","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"43","funktion":"Diagnose (K-Leitung)","kabelfarbe":"","kategorie":"Diagnose","hinweis":"WM: Dose 43 = Diagnosestecker (weiß Pin 2 / ab 08.93 Pin 7)","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"44","funktion":"Hallgeber G40 (Kontakt 2)","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"WM Schritt 14","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":3,"pin":"45","funktion":"Hallgeber G40 (Kontakt 3)","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"WM Schritt 14","konfidenz":"HOCH","quelle":"workshop-manuals Digifant 2V Testbox VAG1598/18 + Doppel-WOBber entry/2085"},
{"sg_id":5,"pin":"1","funktion":"Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"Tester #1 MASSE; WM 1+21/1+23 Bezug","konfidenz":"MITTEL","quelle":"Manualslib Autodiagnos Mono-Motronic 35 + workshop-manuals Mono-Motronic Spannungsversorgung"},
{"sg_id":5,"pin":"2","funktion":"Dauerplus (BATT)","kabelfarbe":"","kategorie":"Versorgung","hinweis":"Tester #2 BATT","konfidenz":"MITTEL","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"6","funktion":"Spannungsausgang (Sensorversorgung)","kabelfarbe":"","kategorie":"Versorgung","hinweis":"Tester #6 SPANN, Details unklar","konfidenz":"NIEDRIG","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"7","funktion":"Einspritzventil-Ansteuerung (N30/N181)","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"WM: 4-pol Stecker Kontakt 3 -> Prüfdose 7; 1,2-1,6 Ohm","konfidenz":"MITTEL","quelle":"workshop-manuals Mono-Motronic Checking injector"},
{"sg_id":5,"pin":"8","funktion":"Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"Tester #8 MASSE","konfidenz":"NIEDRIG","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"11","funktion":"Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"Tester #11 MASSE","konfidenz":"NIEDRIG","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"12","funktion":"Relais-Ansteuerung","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"Tester #12 RELAIS","konfidenz":"NIEDRIG","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"17","funktion":"Tankentlüftung N80","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"Tester #17 TANK","konfidenz":"MITTEL","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"18","funktion":"Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"Tester #18 MASSE","konfidenz":"NIEDRIG","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"19","funktion":"BATT/Dauerplus","kabelfarbe":"","kategorie":"Versorgung","hinweis":"Tester #19 BATT XX, Details unklar","konfidenz":"NIEDRIG","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"21","funktion":"Masse (Schaltgetriebe)","kabelfarbe":"","kategorie":"Masse","hinweis":"KONFLIKT: WM misst 1+21 Speicherversorgung; Tester: Masse wenn Schaltgetriebe","konfidenz":"NIEDRIG","quelle":"Manualslib Autodiagnos Mono-Motronic 35 vs workshop-manuals Mono-Motronic Spannungsversorgung"},
{"sg_id":5,"pin":"23","funktion":"STG-Spannungsversorgung (Zündung an)","kabelfarbe":"","kategorie":"Versorgung","hinweis":"WM: Dose 1+23 mind. 11 V","konfidenz":"MITTEL","quelle":"workshop-manuals Mono-Motronic Checking control unit voltage supply"},
{"sg_id":5,"pin":"24","funktion":"DK-Poti Versorgung","kabelfarbe":"","kategorie":"Versorgung","hinweis":"Tester #24 SPANN","konfidenz":"MITTEL","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"25","funktion":"DK-Poti Signal","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"Tester #25 POTI","konfidenz":"NIEDRIG","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"27","funktion":"Ansauglufttemperatur","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"Tester #27 LUFT","konfidenz":"MITTEL","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"28","funktion":"Lambdasonde Signal","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"Tester Pin 28","konfidenz":"MITTEL","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"34","funktion":"Leerlaufregelung (2. Kanal)","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"Tester #34 LFR","konfidenz":"MITTEL","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":5,"pin":"35","funktion":"Einspritzventil","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"Tester #35 EINSP","konfidenz":"MITTEL","quelle":"Manualslib Autodiagnos Mono-Motronic 35, https://www.manualslib.de/manual/1141653/Autodiagnos-Mono-Motronic-35.html"},
{"sg_id":6,"pin":"1","funktion":"Diagnose K-Leitung","kabelfarbe":"grau/weiß","kategorie":"Diagnose","hinweis":"Proxy US-16V-Motronic, nicht 9A-verifiziert","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"2","funktion":"Geschwindigkeitssignal","kabelfarbe":"blau/weiß","kategorie":"Eingang Signal","hinweis":"Proxy US-16V-Motronic, nicht 9A-verifiziert","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"3","funktion":"Kühlmitteltemperatur","kabelfarbe":"violett/schwarz","kategorie":"Eingang Sensor","hinweis":"Proxy; 1990 violett/schwarz vs schwarz/violett","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"4","funktion":"Differenzdrucksteller +","kabelfarbe":"weiß/rot","kategorie":"Ausgang Aktor","hinweis":"Proxy; 1990 rot/weiß","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"5","funktion":"Differenzdrucksteller -","kabelfarbe":"braun/blau","kategorie":"Ausgang Aktor","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"6","funktion":"Klopfsensor 2 Schirm","kabelfarbe":"weiß","kategorie":"Masse","hinweis":"Proxy; 1990 grün, Passat grau","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"7","funktion":"Lambdasonde","kabelfarbe":"schwarz","kategorie":"Eingang Sensor","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"8","funktion":"Klopfsensoren Signal","kabelfarbe":"blau/gelb","kategorie":"Eingang Sensor","hinweis":"Proxy; S1/S2 farbvertauscht je Baujahr","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"9","funktion":"AGR-Temperatur","kabelfarbe":"blau/gelb","kategorie":"Eingang Sensor","hinweis":"Proxy; nur Kat-Versionen, Passat violett","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"10","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"11","funktion":"Drehzahlsignal (Zündendstufe)","kabelfarbe":"grün","kategorie":"Eingang Signal","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"12","funktion":"Kraftstoffpumpenrelais","kabelfarbe":"rot/gelb","kategorie":"Ausgang Aktor","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"13","funktion":"Fehlerlampe","kabelfarbe":"gelb/schwarz","kategorie":"Diagnose","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"14","funktion":"Klemme 15 (Start/Run)","kabelfarbe":"schwarz","kategorie":"Versorgung","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"15","funktion":"AKF-Magnetventil 1","kabelfarbe":"grün/gelb","kategorie":"Ausgang Aktor","hinweis":"Proxy; 1990 gelb/grün","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"16","funktion":"Kaltstartventil","kabelfarbe":"schwarz/rot","kategorie":"Ausgang Aktor","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"17","funktion":"Leerlaufstabilisierungsventil","kabelfarbe":"weiß","kategorie":"Ausgang Aktor","hinweis":"Proxy; 1990 braun/gelb","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"18","funktion":"Masse (Zylinderkopf)","kabelfarbe":"braun/gelb","kategorie":"Masse","hinweis":"Proxy; auch AKF-Absperrventil-Masse","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"19","funktion":"Dauerplus (Batterie)","kabelfarbe":"rot","kategorie":"Versorgung","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"20","funktion":"Masse","kabelfarbe":"braun/schwarz","kategorie":"Masse","hinweis":"Proxy; nur Passat-Variante belegt","konfidenz":"NIEDRIG","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"21","funktion":"Hallgeber + (Verteiler Pin 3)","kabelfarbe":"rot/schwarz","kategorie":"Versorgung","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"22","funktion":"Diagnose L-Leitung","kabelfarbe":"gelb","kategorie":"Diagnose","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"23","funktion":"LMM-Poti","kabelfarbe":"grau/grün","kategorie":"Eingang Sensor","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"24","funktion":"Klopfsensor 1 Schirm","kabelfarbe":"grau","kategorie":"Masse","hinweis":"Proxy; je Version grau/grün/weiß","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"25","funktion":"Drehzahlsignal Kombi","kabelfarbe":"grün/blau","kategorie":"Ausgang Signal","hinweis":"Proxy; nur Passat","konfidenz":"NIEDRIG","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"26","funktion":"LMM-Poti","kabelfarbe":"grau/rot","kategorie":"Eingang Sensor","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"27","funktion":"Zündzeitpunktgeber","kabelfarbe":"grün","kategorie":"Eingang Sensor","hinweis":"Proxy; je Version braun/blau-schwarz","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"28","funktion":"Volllastschalter","kabelfarbe":"weiß/rot","kategorie":"Eingang Signal","hinweis":"Proxy; A2-Versionen abweichend","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"29","funktion":"Zündzeitpunktgeber","kabelfarbe":"rot","kategorie":"Eingang Sensor","hinweis":"Proxy; 1990 weiß","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"30","funktion":"Hallgeber Signal (Verteiler Pin 2)","kabelfarbe":"grün/weiß","kategorie":"Eingang Signal","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"31","funktion":"Automatik-STG","kabelfarbe":"gelb/rot","kategorie":"Eingang Signal","hinweis":"Proxy; nur Passat","konfidenz":"NIEDRIG","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"32","funktion":"Leerlaufschalter","kabelfarbe":"gelb/violett","kategorie":"Eingang Signal","hinweis":"Proxy; A2-Versionen abweichend","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"33","funktion":"Klimaanlage","kabelfarbe":"schwarz/grün","kategorie":"Eingang Signal","hinweis":"Proxy; A2 grün","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"34","funktion":"Masse / Klemme 50 (Automatik-Passat)","kabelfarbe":"weiß/grün","kategorie":"Masse","hinweis":"Proxy; Doppelbelegung je Version","konfidenz":"NIEDRIG","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":6,"pin":"35","funktion":"Masse (Zylinderkopf)","kabelfarbe":"braun","kategorie":"Masse","hinweis":"Proxy","konfidenz":"MITTEL","quelle":"A2Resource Motronic Pinout, http://www.a2resource.com/electrical/management/motronic.html"},
{"sg_id":7,"pin":"1","funktion":"Zündspule","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol bis 1995; DB-Angabe 68-pol anzweifeln","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"2","funktion":"Diagnose","kabelfarbe":"","kategorie":"Diagnose","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"3","funktion":"Kraftstoffpumpenrelais","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"4","funktion":"LSV öffnen","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"5","funktion":"AKF-Magnetventil","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"6","funktion":"Drehzahlmesser","kabelfarbe":"","kategorie":"Ausgang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"7","funktion":"Hitzdraht-LMM","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"8","funktion":"Hallgeber","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"9","funktion":"Geschwindigkeitssignal","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"10","funktion":"Lambda-Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"11","funktion":"Klopfsensor 1","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"12","funktion":"Hallgeber +","kabelfarbe":"","kategorie":"Versorgung","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"13","funktion":"Diagnoseleitung","kabelfarbe":"","kategorie":"Diagnose","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"14","funktion":"STG-Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"15","funktion":"Einspritzventil Zyl. 2","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"16","funktion":"Einspritzventil Zyl. 5","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"17","funktion":"Einspritzventil Zyl. 1","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"18","funktion":"Klemme 30","kabelfarbe":"","kategorie":"Versorgung","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"19","funktion":"Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"20","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"21","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"22","funktion":"LSV schließen","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"23","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"24","funktion":"Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"25","funktion":"Hitzdraht-LMM abbrennen","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7-Signatur (Burn-off)","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"26","funktion":"LMM-Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"27","funktion":"Klemme 15","kabelfarbe":"","kategorie":"Versorgung","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"28","funktion":"Lambdasonde","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"29","funktion":"Klopfsensor 2","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"30","funktion":"Sensor-Masse","kabelfarbe":"","kategorie":"Masse","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"31","funktion":"Verbrauchssignal","kabelfarbe":"","kategorie":"Ausgang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"32","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"33","funktion":"Einspritzventil Zyl. 4","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"34","funktion":"Einspritzventil Zyl. 6","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"35","funktion":"Einspritzventil Zyl. 3","kabelfarbe":"","kategorie":"Ausgang Aktor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"36","funktion":"STG-Relais Pin 5","kabelfarbe":"","kategorie":"Versorgung","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"37","funktion":"STG-Relais Pin 6","kabelfarbe":"","kategorie":"Versorgung","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"38","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"39","funktion":"Codierstecker","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"40","funktion":"Klimakompressorsignal","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"41","funktion":"Klimaanlagensignal","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"42","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"43","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"44","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"45","funktion":"Kühlmitteltemperatur","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"46","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"47","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"48","funktion":"Motordrehzahlgeber Pin 2","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"49","funktion":"Motordrehzahlgeber Pin 1","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"50","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"51","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"52","funktion":"unbelegt","kabelfarbe":"","kategorie":"unbelegt","hinweis":"M2.7 55-pol, DW: nicht belegt","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"53","funktion":"Drosselklappenpoti","kabelfarbe":"","kategorie":"Eingang Sensor","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"54","funktion":"Codierstecker","kabelfarbe":"","kategorie":"Eingang Signal","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"},
{"sg_id":7,"pin":"55","funktion":"Diagnoseleitung","kabelfarbe":"","kategorie":"Diagnose","hinweis":"M2.7 55-pol","konfidenz":"MITTEL","quelle":"Doppel-WOBber entry/1773, https://www.doppel-wobber.de/lexicon/index.php?entry/1773-motronic-vr6-m-2-7-vw-golf-3/"}
]
```

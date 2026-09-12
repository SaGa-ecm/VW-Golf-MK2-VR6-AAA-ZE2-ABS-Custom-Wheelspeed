# VW Golf MK2 VR6 AAA – ZE2 / ABS / Custom Wheelspeed

Interaktive Pinout-Referenz für Golf 2 GTI (19E) mit AAA-VR6-Umbau (Motronic 2.9.1), ZE2-Zentralelektrik und ABS Mk02/Mk04/Mk20.

**Live-Seite (GitHub Pages):** https://saga-ecm.github.io/VW-Golf-MK2-VR6-AAA-ZE2-ABS-Custom-Wheelspeed/

## Dateien

| Datei | Beschreibung |
|---|---|
| `index.html` | **Zentrale App (neu)** – Alles-Auswahl: Systeme→Steuergeräte→Pins, Stecker-Ansichten, Klick-Pfadverfolgung (HERKUNFT/VERLAUF/Zweige), Suche, VSS-Lösungen, FAKTOR-Rechner, Checkliste, Failsafe, Firmware v1.0 – live auf GitHub Pages |
| `sg-daten.js` | Datensatz: 27 Steuergeräte, 755 Pins (DB + Research-Merge, mit Quellen + Konfidenz) |
| `graph-kanten.js` | Verbindungsgraph: 467 Knoten, 135 Kanten (Herkunft/Verlauf/Zweige) |
| `steuergeraete.html` | System-/Steuergeräte-Auswahlmenü (kompakte Zweitansicht) |
| `signalpfad.html` | VSS-Signalpfad-Tracer (Checkliste, FAKTOR-Rechner) |
| `test-verify.cjs` | Regressionstest (13 Checks, `node test-verify.cjs`) – Bau-Toolchain: `build-index.cjs`, `build-sg-v2.cjs`, `app-template.js`, `ui-template.js` |
| `docs/analyse-bericht.html` | Repo-Analyse, VSS-Kette, Maßnahmenplan |
| `docs/abs-mk04-mk20-recherche.md` | Mk04/Mk20-Pinrecherche mit Quellen + Konfidenz |
| `docs/pins-motor-sg.md`, `docs/pins-abs-getriebe.md`, `docs/pins-komfort-wfs.md` | Research mit JSON-Arrays (Quelle für `sg-daten.js`) |
| `docs/graph-notizen.md` | Graph-Doku: EXTERN-Typen, Pfade, 4 Konflikte |
| `index-v3-archiv.html` | Vorversion v3.1 (Archiv, unverändert) |
| `golf2-gti-pinout-referenz-v3.html` | Versionierte Kopie v3 |
| `VW Golf 2 GTI – Pinout-Referenz (ZE2 _ Tacho T28 _ ECU AAA).html` | Vorversion v2 (Archiv) |
| `v0.1.html` | XDF-Editor (mit P0-Sicherheitsfixes) |
| `v0.1.final.html` | DEFEKT-Stub (Hinweisseite, kein Editor – `v0.1.html` nutzen) |
| `golf2_gti_ze2_tacho_pinout.pdf` | PDF-Export (Stand 04.09., veraltet – Neu-Export offen) |
| `mermaid.mermaid` | VSS-Signalfluss (Geber→…→ECU Pin 65) |
| `mindmap.txt`, `mindmapv01.txt` | XDF-Editor-Notizen (Archiv) |

## Inhalt (neue Zentral-App)

- Alles-Auswahl: 9 Systeme → 27 Steuergeräte → 755 Pins (mit Quellen + Konfidenz)
- Klick-Pfadverfolgung: jeder Pin/Knoten zeigt HERKUNFT, VERLAUF, Zweige (135 Kanten)
- Stecker-Ansichten: ZE2 A1–Z2/30/30B, Sicherungen 1–22, Relaisplätze 1–24, Tacho T28, ECU AAA 68-pol, ABS Mk02/Mk04/Mk20
- VSS-Lösungen, FAKTOR-Rechner, Checkliste, Failsafe, Firmware v1.0 (byte-identisch)

- ZE2-Stecker A1–Z2, 30/30B (alle Pins, Kabelfarben, Funktionen)
- Sicherungen 1–22 + Relaisplätze 1–24
- Tacho T28/01–T28/28 (VDO, k=960, VR6-DZM- und VSS-Hinweise)
- ECU AAA 68-pol (Motronic M2.9.1, AGR-Entfall dokumentiert)
- ABS Mk02 (35-pol, korrigiert) + Mk04 (T55) + Mk20 (T25)
- Radsensoren G44–G47 (VR-Typ, Zahnzahlen VA 45 / HA 43)
- VSS-Lösungen: Option A GALA-Hallgeber 321 907 345 B · Option B Arduino Nano V3 (2-Kanal v1.0, Poti-Kalibrierung, Optokoppler, inkl. Firmware)

## Quellen

a2resource.com · clubgti.com · phol-labs.com · wolfsburg-edition.info · motor-talk.de · vwcorrado.de · DStageGarage/ABS2SPEED · fiz-o-matic.net · Bentley/Workshop-Manuals · CHARM · Stand v3. Alle Angaben ohne Gewähr.

## Wissensdatenbank (privates Repo)

Die Recherche-Datenbank (SQLite + SQL-Dump) liegt aus Datenschutz-/Größengründen im privaten Repo und ist nicht Teil dieses öffentlichen Repos.

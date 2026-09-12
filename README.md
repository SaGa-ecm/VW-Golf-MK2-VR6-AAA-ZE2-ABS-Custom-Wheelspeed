# VW Golf MK2 VR6 AAA – ZE2 / ABS / Custom Wheelspeed

Interaktive Pinout-Referenz für Golf 2 GTI (19E) mit AAA-VR6-Umbau (Motronic 2.9.1), ZE2-Zentralelektrik und ABS Mk02/Mk04/Mk20.

**Live-Seite (GitHub Pages):** https://saga-ecm.github.io/VW-Golf-MK2-VR6-AAA-ZE2-ABS-Custom-Wheelspeed/

## Dateien

| Datei | Beschreibung |
|---|---|
| `index.html` | Aktuelle Version (v3) – live auf GitHub Pages |
| `golf2-gti-pinout-referenz-v3.html` | Versionierte Kopie v3 (Mk02 korrigiert, Mk04/Mk20 ergänzt) |
| `VW Golf 2 GTI – Pinout-Referenz (ZE2 _ Tacho T28 _ ECU AAA).html` | Vorversion v2 (Archiv) |
| `v0.1.html` | Erstversion (Archiv, mit P0-Sicherheitsfixes) |
| `v0.1.final.html` | DEFEKT-Stub (Hinweisseite, kein Editor – `v0.1.html` nutzen) |
| `signalpfad.html` | VSS-Signalpfad-Tracer (Quelle→Stecker→Bauteil→Verteilung, Checkliste, FAKTOR-Rechner) |
| `docs/abs-mk04-mk20-recherche.md` | Mk04/Mk20-Pinrecherche mit Quellen + Konfidenz |
| `golf2_gti_ze2_tacho_pinout.pdf` | PDF-Export |
| `mermaid.mermaid`, `mindmap.txt`, `mindmapv01.txt` | Diagramme/Notizen |

## Inhalt v3

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

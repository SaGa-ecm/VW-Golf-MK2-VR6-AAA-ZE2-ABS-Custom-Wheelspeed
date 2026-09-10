BEGIN TRANSACTION;
CREATE TABLE fahrzeuge (
  id          INTEGER PRIMARY KEY,
  modell      TEXT NOT NULL,          -- z.B. 'Golf 2', 'Jetta 2 (19E)', 'Caddy 14D', 'Corrado', 'Golf 3'
  typ         TEXT,                   -- z.B. '19E', '1G1', '1H1', '53I'
  baujahre    TEXT,                   -- z.B. '1983–1992'
  notizen     TEXT
);
INSERT INTO "fahrzeuge" VALUES(1,'Golf 2','19E / 1G1','08/1983–12/1992','ZE1 bis 07/89, ZE2 ab 08/89; Tacho mechanisch');
INSERT INTO "fahrzeuge" VALUES(2,'Jetta 2','19E / 1G2','1983–1992','Stufenheck-Bruder des Golf 2');
INSERT INTO "fahrzeuge" VALUES(3,'Caddy 14D Pickup','14D','1982–1992','Golf-I-Basis, TAS Sarajevo bis 1992');
INSERT INTO "fahrzeuge" VALUES(4,'Corrado','53I','10/1988–06/1995','G60/VR6/16V; EDS ab Facelift 08/91 (VR6 Serie)');
INSERT INTO "fahrzeuge" VALUES(5,'Passat B3 (35i)','312/315','1988–1993','Quer eingebaut; Syncro/G60 verfügbar');
INSERT INTO "fahrzeuge" VALUES(6,'Passat B4 (35i Facelift)','3A','10/1993–05/1997','Facelift; TDI-Einstieg');
INSERT INTO "fahrzeuge" VALUES(7,'Golf 3 / Vento','1H','11/1991–1997','ZE2-Generation; OBD ab ca. 1995/96');
INSERT INTO "fahrzeuge" VALUES(8,'Golf 4','1J','1997–2003','Elektroniktacho, CAN, Immo im Kombi');
CREATE TABLE getriebe (
  kennbuchstabe TEXT PRIMARY KEY,
  bauart        TEXT,                 -- '020' | '02A' | '096' | '01M' | ...
  gaenge        INTEGER,
  tachoantrieb  TEXT,                 -- 'Welle' | 'elektronisch' | 'beides'
  fahrzeuge     TEXT,
  notizen       TEXT
);
INSERT INTO "getriebe" VALUES('2Y','020',5,'Welle','Golf 2 (02/86–10/91, Achse 3,667)','');
INSERT INTO "getriebe" VALUES('4S','020',5,'Welle','Golf 2 (3,941)','');
INSERT INTO "getriebe" VALUES('4T','020',5,'Welle','Golf 2/3 (08/83–10/91)','');
INSERT INTO "getriebe" VALUES('4Z','020',5,'Welle','Golf 2 (4,467)','');
INSERT INTO "getriebe" VALUES('9A','020',5,'Welle','Golf 2 (08/84–09/87) GTI','');
INSERT INTO "getriebe" VALUES('ACD','020',5,'Welle','Golf 2 (=9A-Übersetzung)','');
INSERT INTO "getriebe" VALUES('ATH','020',5,'Welle','Golf 2/3 (wie 4T)','');
INSERT INTO "getriebe" VALUES('AUG','020',5,'Welle','Golf 2 GTI 16V-nah','');
INSERT INTO "getriebe" VALUES('AWY','02A',5,'Welle','Golf 2 (08/89–10/91)','');
INSERT INTO "getriebe" VALUES('AYC','02A',5,'Welle','Golf 2 G60','');
INSERT INTO "getriebe" VALUES('AYN','02A',5,'Welle','Golf 2 G60','');
INSERT INTO "getriebe" VALUES('CBA','02A',5,'Welle','Golf 2 VR6-nah','');
INSERT INTO "getriebe" VALUES('CBC','02A',5,'Welle','Golf 2 VR6-nah','');
INSERT INTO "getriebe" VALUES('CCM','02A',5,'Welle/Geber','Golf 3 VR6 (01/92–05/96)','');
INSERT INTO "getriebe" VALUES('CDA','02A',5,'Welle/Geber','Golf 3 ABF 16V','');
INSERT INTO "getriebe" VALUES('ASD','02A',5,'Welle/Geber','Golf 3 TDI','');
INSERT INTO "getriebe" VALUES('CTN','02A',5,'Welle/Geber','Golf 3 TDI lang','');
INSERT INTO "getriebe" VALUES('DFQ','020',5,'Welle/Geber','Golf-3-Cabrio Restlauf ab 08/97','');
INSERT INTO "getriebe" VALUES('TJ-Reihe','010',3,'Welle','Golf 2 Automatik 1,8l','TJA–TJF');
INSERT INTO "getriebe" VALUES('TL-Reihe','010',3,'Welle','Golf 2 Automatik 1,6l/Diesel','');
INSERT INTO "getriebe" VALUES('AOG','096',4,'elektronisch (G68)','Golf 3 Automatik bis 12/94','096-Familie: CBZ/CCA/CFA/CFC/CFD/CFF/CFH/CFK/CHF/CHG');
INSERT INTO "getriebe" VALUES('CKX','01M',4,'elektronisch (G68)','Golf 3 Automatik ab 01/95','01M-Familie: CKZ/CLB/CLK/CNK/CNP/CRR/CSK/DAB');
CREATE TABLE motoren (
  kennbuchstabe TEXT PRIMARY KEY,     -- z.B. 'AAA', 'KR', 'PG', 'RP'
  hubraum_l     REAL,
  leistung_ps   INTEGER,
  system        TEXT,                 -- z.B. 'Digifant II', 'Motronic M2.9.1', 'K-Jetronic', 'G60'
  kraftstoff    TEXT DEFAULT 'Benzin',
  fahrzeuge     TEXT,                 -- Freitext-Zuordnung
  baujahre      TEXT,
  notizen       TEXT
);
INSERT INTO "motoren" VALUES('GN',1.043,45,'Vergaser Pierburg','Benzin','Golf 2 / Jetta 2','1983–1985','');
INSERT INTO "motoren" VALUES('HZ',1.043,50,'Vergaser','Benzin','Golf 2 / Jetta 2','1985–1991','');
INSERT INTO "motoren" VALUES('HK',1.272,55,'Vergaser 2E3','Benzin','Golf 2 / Jetta 2','1983–1985','');
INSERT INTO "motoren" VALUES('MH',1.272,54,'Vergaser 2E3','Benzin','Golf 2 / Jetta 2','1985–1988','');
INSERT INTO "motoren" VALUES('2G',1.272,55,'Vergaser 2E3','Benzin','Golf 2 / Jetta 2','1989–1992','');
INSERT INTO "motoren" VALUES('NZ',1.272,55,'VW Digijet, G-Kat','Benzin','Golf 2 / Jetta 2','1985/87–1992','');
INSERT INTO "motoren" VALUES('EZ',1.595,75,'Vergaser 2E2','Benzin','Golf 2 / Jetta 2 (ABN baugleich) / Passat B3','1983–1992',' | auch Passat B3 (1988–1993)');
INSERT INTO "motoren" VALUES('RF',1.595,72,'Vergaser 2E2, U-Kat','Benzin','Golf 2 / Jetta 2 / Passat B3','1986–1991',' | auch Passat B3 (1988–1989)');
INSERT INTO "motoren" VALUES('PN',1.595,70,'Vergaser 2EE Ecotronic, G-Kat','Benzin','Golf 2 / Jetta 2','1985–1992','');
INSERT INTO "motoren" VALUES('GU',1.781,90,'Vergaser 2E2','Benzin','Golf 2 / Jetta 2','1983–1991','');
INSERT INTO "motoren" VALUES('RH',1.781,84,'Vergaser 2E2, U-Kat','Benzin','Golf 2 / Jetta 2','1986–1990','');
INSERT INTO "motoren" VALUES('GX',1.781,90,'Bosch K-Jetronic','Benzin','Golf 2 / Jetta 2','1983/84–1988','');
INSERT INTO "motoren" VALUES('HT',1.781,100,'K-Jetronic (USA GLI)','Benzin','Golf 2 / Jetta 2','1985','');
INSERT INTO "motoren" VALUES('EV',1.781,112,'K-Jetronic (GTI, ohne Kat)','Benzin','Golf 2 / Jetta 2','1984–1987','');
INSERT INTO "motoren" VALUES('RG',1.781,107,'K-Jetronic, U-Kat','Benzin','Golf 2 / Jetta 2','1986–1987','');
INSERT INTO "motoren" VALUES('RD',1.781,107,'Bosch KE-Jetronic, G-Kat','Benzin','Golf 2 / Jetta 2','1985–1988','');
INSERT INTO "motoren" VALUES('RP',1.781,90,'Mono-Jetronic, ab ~1990 Mono-Motronic, G-Kat','Benzin','Golf 2 / Jetta 2 / Passat B3','1986–1991','Umschaltjahr mittel | auch Passat B3 (1988–1991)');
INSERT INTO "motoren" VALUES('PB',1.781,112,'Digifant II','Benzin','Golf 2 / Jetta 2 / Corrado','1987–1991',' | auch Corrado (–)');
INSERT INTO "motoren" VALUES('PF',1.781,107,'Digifant II, G-Kat','Benzin','Golf 2 / Jetta 2 / Corrado','1987–1991',' | auch Corrado (–)');
INSERT INTO "motoren" VALUES('RV',1.781,100,'Digifant II (USA)','Benzin','Golf 2 USA','1986–1991','Konfidenz mittel');
INSERT INTO "motoren" VALUES('1P',1.781,98,'Digifant II, G-Kat (Syncro)','Benzin','Golf 2 / Jetta 2','1988–1991','');
INSERT INTO "motoren" VALUES('2H',1.781,98,'Digifant II, G-Kat (Cabrio)','Benzin','Golf Cabrio','1989–1993','');
INSERT INTO "motoren" VALUES('KR',1.781,139,'K-Jetronic (GTI 16V)','Benzin','Golf 2 / Jetta 2 / Corrado / Passat B3','1986–1991',' | auch Corrado (1989–1992) | auch Passat B3 (1988–1993)');
INSERT INTO "motoren" VALUES('PL',1.781,129,'KE-Jetronic, G-Kat (GTI 16V)','Benzin','Golf 2 / Jetta 2','1986–1991','');
INSERT INTO "motoren" VALUES('PG',1.781,160,'Digifant I + G-Lader (G60)','Benzin','Golf 2 / Jetta 2 / Corrado / Passat B3','1988–1991',' | auch Corrado (1988–1993) | auch Passat B3 (1989–1993)');
INSERT INTO "motoren" VALUES('1H',1.763,160,'Digifant I + G-Lader (Rallye, 5000 Stk.)','Benzin','Golf Rallye','1988–1989','');
INSERT INTO "motoren" VALUES('3G',1.781,210,'Digifant I + G-Lader (Limited, 71 Stk.)','Benzin','Golf Limited','1989','');
INSERT INTO "motoren" VALUES('9A',1.984,136,'Bosch KE-Motronic (16V, v.a. USA)','Benzin','Golf 2 / Jetta 2','1989–1992','');
INSERT INTO "motoren" VALUES('JP',1.588,54,'Saugdiesel (ME/CR baugleich)','Diesel','Golf 2 / Jetta 2','1983–1992','');
INSERT INTO "motoren" VALUES('JR',1.588,70,'Turbodiesel (MF baugleich)','Diesel','Golf 2 / Jetta 2','1983–1991','');
INSERT INTO "motoren" VALUES('1V',1.588,60,'Turbodiesel, Oxi-Kat','Diesel','Golf 2 / Jetta 2','1989–1992','');
INSERT INTO "motoren" VALUES('RA',1.588,80,'Turbodiesel + LLK (SB baugleich)','Diesel','Golf 2 / Jetta 2','1989–1991','');
INSERT INTO "motoren" VALUES('JB',1.457,70,'Fallstromvergaser','Benzin','Caddy 14D','1982–1991','');
INSERT INTO "motoren" VALUES('EW',1.595,75,'Fallstromvergaser (EM = CH/S)','Benzin','Caddy 14D','1982–1992','MKB-Zuordnung mittel');
INSERT INTO "motoren" VALUES('JH',1.781,95,'K-Jetronic','Benzin','Caddy 14D','1985–1992','');
INSERT INTO "motoren" VALUES('JK',1.588,54,'Diesel Verteiler-ESP','Diesel','Caddy 14D','1982–1991','');
INSERT INTO "motoren" VALUES('2E',1.984,115,'Digifant','Benzin','Corrado / Passat B3 / Passat B4 / Golf 3','1989–1997','');
INSERT INTO "motoren" VALUES('ADY',1.984,115,'Digifant','Benzin','Corrado / Passat B4 / Golf 3','1993–1997','');
INSERT INTO "motoren" VALUES('AAA',2.792,174,'VR6 Motronic (M2.9 ab 93)','Benzin','Corrado / Passat B3/B4 / Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('ABV',2.861,190,'VR6 Motronic','Benzin','Corrado / Golf 3','1991–1997','B4-Syncro nur 184 PS');
INSERT INTO "motoren" VALUES('1Y',1.896,68,'Diesel','Diesel','Passat B3 / Golf 3','1989–1997','');
INSERT INTO "motoren" VALUES('AAZ',1.896,75,'Turbodiesel','Diesel','Passat B3 / Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('1Z',1.896,90,'TDI','Diesel','Passat B4 / Golf 3','1993–1997','');
INSERT INTO "motoren" VALUES('AHU',1.896,90,'TDI','Diesel','Passat B4 / Golf 3','1993–1997','');
INSERT INTO "motoren" VALUES('AFN',1.896,110,'TDI VTG','Diesel','Passat B4 / Golf 3','1993–1997','');
INSERT INTO "motoren" VALUES('AEY',1.896,64,'Diesel/SDI','Diesel','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('AVG',1.896,110,'TDI VTG','Diesel','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('1F',1.595,75,'Mono-Jetronic','Benzin','Passat B3','1988–1990','');
INSERT INTO "motoren" VALUES('AAM',1.781,75,'Mono-Motronic / SPI','Benzin','Passat B3/B4 / Golf 3','1990–1997','');
INSERT INTO "motoren" VALUES('ABS',1.781,90,'Mono-Motronic / SPI','Benzin','Passat B3/B4 / Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('AEK',1.595,101,'MPI (Simos)','Benzin','Passat B4 / Golf 3','1994–1997','');
INSERT INTO "motoren" VALUES('AFT',1.595,101,'MPI (Simos)','Benzin','Passat B4 / Golf 3','1994–1997','');
INSERT INTO "motoren" VALUES('ANN',1.781,75,'SPI Mono-Motronic','Benzin','Passat B4 / Golf 3','1993–1997','');
INSERT INTO "motoren" VALUES('ADZ',1.781,90,'SPI Mono-Motronic','Benzin','Passat B4 / Golf 3','1993–1997','');
INSERT INTO "motoren" VALUES('ANP',1.781,90,'SPI Mono-Motronic','Benzin','Passat B4 / Golf 3','1993–1997','');
INSERT INTO "motoren" VALUES('AGG',1.984,115,'MPI Digifant','Benzin','Passat B4 / Golf 3','1993–1997','');
INSERT INTO "motoren" VALUES('ABF',1.984,150,'16V Digifant 3.2','Benzin','Passat B4 / Golf 3','1993–1997','mittel-hoch');
INSERT INTO "motoren" VALUES('ABD',1.39,60,'SPI Mono-Motronic','Benzin','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('AEX',1.391,60,'SPI Mono-Motronic','Benzin','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('APQ',1.391,60,'SPI Mono-Motronic','Benzin','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('ABU',1.598,75,'SPI Mono-Motronic','Benzin','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('AEA',1.598,75,'SPI Mono-Motronic','Benzin','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('AEE',1.598,75,'SPI Mono-Motronic','Benzin','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('AKS',1.595,101,'MPI','Benzin','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('ACC',1.781,90,'SPI Mono-Motronic','Benzin','Golf 3','1991–1997','');
INSERT INTO "motoren" VALUES('ABA',1.984,115,'MPI Digifant (USA)','Benzin','Golf 3','1991–1997','');
CREATE TABLE pinouts (
  id              INTEGER PRIMARY KEY,
  steuergeraet_id INTEGER NOT NULL REFERENCES steuergeraete(id),
  pin             TEXT NOT NULL,
  funktion        TEXT,
  kabelfarbe      TEXT,
  kategorie       TEXT,
  hinweis         TEXT,
  konfidenz       TEXT DEFAULT 'unsicher',  -- sicher | wahrscheinlich | unsicher
  quelle          TEXT
);
INSERT INTO "pinouts" VALUES(1,1,'1','Zündungsplus (Zentralelektrik)','rot/grün','Versorgung','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(2,1,'2','Lambda','lila','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(3,1,'3','Kraftstoffpumpenrelais','gelb/blau','Ausgänge','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(4,1,'4','Klopfsensor','weiß','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(5,1,'5','CO-Poti','','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(6,1,'6','Masse','','Versorgung','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(7,1,'7','Klopfsensor','schwarz(gelb)','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(8,1,'8','Hallgeber','rot/schwarz','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(9,1,'9','CO-Poti','','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(10,1,'10','Temp-/Leerlauf-/Volllastschalter','','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(11,1,'11','Temp-/Leerlauf-/Volllastschalter','','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(12,1,'12','Masse','','Versorgung','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(13,1,'13','Masse','','Versorgung','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(14,1,'14','Leerlaufstabilisierungsventil','','Aktoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(15,1,'15','Temp-/Leerlauf-/Volllastschalter','','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(16,1,'16','Drehzahlanhebung Klima','','Eingänge','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(17,1,'17','frei','','–','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(18,1,'18','Drehzahlsignal Hallgeber','grün/weiß','Sensoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(19,1,'19','Masse','','Versorgung','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(20,1,'20','Fehlerauslese (Diagnose)','','Diagnose','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(21,1,'21','5-pol-Stecker hinter ZE','gelb/rot','Sonst','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(22,1,'22','Leerlaufstabilisierungsventil','','Aktoren','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(23,1,'23','Digifant-Relais (nur STG B)','','Versorgung','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(24,1,'24','Drehzahlmesser-Signal','grün/gelb','Ausgänge','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(25,1,'25','Zündspule','grün','Zündung','','sicher','golf1g60.at');
INSERT INTO "pinouts" VALUES(26,8,'5','Motorkontrollleuchte','gelb/schwarz','Diagnose','','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(27,8,'6','Benzinpumpenrelais','gelb/blau','Ausgänge','','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(28,8,'21','Diagnose L-Line','gelb','Diagnose','2x2-Diagnose','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(29,8,'22','Drehzahlmesser-Ausgang','grün/schwarz','Ausgänge','an T28/10 via Wandler','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(30,8,'23','Relais-Plus (Kl.30 via Motronic-Relais)','rot/blau','Versorgung','','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(31,8,'43','Diagnose K-Line','grau/weiß','Diagnose','2x2-Diagnose','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(32,8,'51','Verbrauchssignal MFA (MPG)','violett/weiß','Ausgänge','an T28/26','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(33,8,'54','Dauerplus Batterie','','Versorgung','','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(34,8,'65','Geschwindigkeitssignal VSS','blau/weiß','Eingänge','von T28/07, ca. 107 Hz','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(35,8,'67','Drehzahlgeber Masse (Kurbelwelle)','rot','Sensoren','G28','sicher','xjamiex.com');
INSERT INTO "pinouts" VALUES(36,8,'68','Drehzahlgeber Signal (Kurbelwelle)','grün','Sensoren','G28','sicher','xjamiex.com');
CREATE TABLE quellen (
  id          INTEGER PRIMARY KEY,
  titel       TEXT NOT NULL,
  url         TEXT,
  beschreibung TEXT
);
INSERT INTO "quellen" VALUES(1,'Wikipedia VW Golf II (Technik)','https://de.wikipedia.org/wiki/VW_Golf_II','Motor-/Techniktabellen, hoch');
INSERT INTO "quellen" VALUES(2,'Wikipedia VW Golf Mk3 (EN)','https://en.wikipedia.org/wiki/Volkswagen_Golf_Mk3','Motorentabellen Golf 3');
INSERT INTO "quellen" VALUES(3,'Wikipedia VW Corrado','https://de.wikipedia.org/wiki/VW_Corrado','Motoren, EDS ab 08/91');
INSERT INTO "quellen" VALUES(4,'Wikipedia VW Passat B3/B4 (EN)','https://en.wikipedia.org/wiki/Volkswagen_Passat_(B3)','B3/B4-Motoren');
INSERT INTO "quellen" VALUES(5,'samworld.de MKB-Listen','https://samworld.de','JB/JH/JK/EW/EM u.a.');
INSERT INTO "quellen" VALUES(6,'golf1g60.at','https://golf1g60.at','G60-TN, Digifant-I-Pinout');
INSERT INTO "quellen" VALUES(7,'gummel.net','https://gummel.net','Digifant-Technik (68HC11, MAP)');
INSERT INTO "quellen" VALUES(8,'xjamiex.com Motronic-Pinout','https://xjamiex.com','M2.9-TN + 68-pol-Pinout');
INSERT INTO "quellen" VALUES(9,'doppel-wobber.de Lexikon','https://www.doppel-wobber.de/lexicon/','ZE, Relais, Getriebe, GRA');
INSERT INTO "quellen" VALUES(10,'golf1wiki Relais','https://golf1wiki.de/Relais_(VW)_und_ihre_Funktionen','Relaisnummern + TN');
INSERT INTO "quellen" VALUES(11,'mekgeiwer VAG-Relais','https://mekgeiwer.bplaced.net/VAG_Relais.html','Relais-TN-Vergleich');
INSERT INTO "quellen" VALUES(12,'eva2 SU02 Kap. 3.4','https://eva2.compu85.net/eva2/SU02/ch3.4.html','Mk-II-Messwerte, Sensorpaare');
INSERT INTO "quellen" VALUES(13,'vwcorrado.de ABS-Thread','https://vwcorrado.de/forum/thread/137154-abs-teves-02-sowie-abs-eds-teves-02-fehlercodes/','Blinkcodes, Lampenlogik');
INSERT INTO "quellen" VALUES(14,'a2-freun.de Teves Mark 20','https://wiki.a2-freun.de/wiki/index.php?title=Teves_Mark_20','Mk20-Systembeschreibung');
INSERT INTO "quellen" VALUES(15,'dieselschrauber.org ABS','https://community.dieselschrauber.org/viewtopic.php?t=527','Mk20-Codes, Login 40168');
INSERT INTO "quellen" VALUES(16,'VCDS-Wiki Wegfahrsperre','https://wiki-online.vcds.de/de/Allgemein/Wegfahrsperre','WFS-Gen 1–3, Immo');
INSERT INTO "quellen" VALUES(17,'T4-Wiki Geber G22','https://www.t4-wiki.de/wiki/Geber_G22_(Geschwindigkeit)','G22-Prinzip');
INSERT INTO "quellen" VALUES(18,'SSP 87 (Digifant II)','C:/Users/Admin/AppData/Local/Temp/SSP_87.pdf','Scan vorhanden, OCR nötig');
CREATE TABLE relais_sicherungen (
  id        INTEGER PRIMARY KEY,
  typ       TEXT NOT NULL,            -- 'Relais' | 'Sicherung'
  nummer    TEXT NOT NULL,            -- Relaisnummer ('79') oder Si-Nr ('S21')
  funktion  TEXT,
  system    TEXT,                     -- 'ZE1' | 'ZE2' | '三分之一'
  ampere    INTEGER,
  notizen   TEXT
);
INSERT INTO "relais_sicherungen" VALUES(1,'Relais','13','Klimaanlage','ZE2',NULL,'171 959 141 A; Quellen widersprüchlich, niedrig-mittel');
INSERT INTO "relais_sicherungen" VALUES(2,'Relais','17','X-Kontakt/K-Pumpe 40A','ZE',NULL,'171 937 503 A, ersetzt durch 18. mittel-hoch');
INSERT INTO "relais_sicherungen" VALUES(3,'Relais','18','X-Kontakt-Entlastung 40A','ZE',NULL,'191 937 503, ersetzt durch 100. hoch');
INSERT INTO "relais_sicherungen" VALUES(4,'Relais','19','Wisch-Wasch-Intervall vorn','ZE',NULL,'191 955 531 / 321 955 531 A. hoch');
INSERT INTO "relais_sicherungen" VALUES(5,'Relais','21','Blinkrelais','ZE',NULL,'111 953 227 D / 191 953 227 A. hoch');
INSERT INTO "relais_sicherungen" VALUES(6,'Relais','22','Blinkrelais mit AHK','ZE',NULL,'431 953 231 A. hoch');
INSERT INTO "relais_sicherungen" VALUES(7,'Relais','30','Digifant-/MSG-Versorgung','ZE',NULL,'165 906 381. hoch');
INSERT INTO "relais_sicherungen" VALUES(8,'Relais','31','Lüfternachlauf','ZE',NULL,'191 955 532 A. mittel');
INSERT INTO "relais_sicherungen" VALUES(9,'Relais','32','Digifant-Einspritzung 30A','ZE',NULL,'357 906 381. hoch');
INSERT INTO "relais_sicherungen" VALUES(10,'Relais','42','Kühlmittelmangelanzeige','ZE',NULL,'191 919 376. hoch');
INSERT INTO "relais_sicherungen" VALUES(11,'Relais','53','Arbeitsstrom NSW/Doppelhorn 40A','ZE',NULL,'141 951 253 B, ersetzt durch 373. hoch');
INSERT INTO "relais_sicherungen" VALUES(12,'Relais','61','Schubabschaltung','ZE',NULL,'811 919 096 F. mittel');
INSERT INTO "relais_sicherungen" VALUES(13,'Relais','67','K-Pumpe/Arbeitskontakt','ZE',NULL,'857 951 253, ersetzt durch 167. mittel-hoch');
INSERT INTO "relais_sicherungen" VALUES(14,'Relais','72','Heckwischer','ZE',NULL,'191 955 529. hoch');
INSERT INTO "relais_sicherungen" VALUES(15,'Relais','78','ABS-Hydraulikpumpe 35A','ZE',NULL,'191 927 843, ersetzt durch 178. mittel-hoch');
INSERT INTO "relais_sicherungen" VALUES(16,'Relais','79','ABS-Steuergerät','ZE',NULL,'191 927 841. mittel-hoch');
INSERT INTO "relais_sicherungen" VALUES(17,'Relais','80','Saugrohrvorwärmung/K-Pumpe 40A','ZE',NULL,'191 906 383, ersetzt durch 167. hoch');
INSERT INTO "relais_sicherungen" VALUES(18,'Relais','99','Programmierbares Wisch-Intervall','ZE',NULL,'357 955 531 (Siemens). hoch');
INSERT INTO "relais_sicherungen" VALUES(19,'Relais','109','MSG-Versorgung J317 (TDI)','Golf 4',NULL,'1J0 906 381 A. hoch');
INSERT INTO "relais_sicherungen" VALUES(20,'Relais','167','K-Pumpenrelais (Nachfolger 67/80)','ZE',NULL,'mittel');
INSERT INTO "relais_sicherungen" VALUES(21,'Relais','373','Arbeitsstrom (Nachfolger 53)','ZE',NULL,'hoch');
INSERT INTO "relais_sicherungen" VALUES(22,'Relais','100','X-Kontakt (Nachfolger 18)','ZE',NULL,'hoch');
INSERT INTO "relais_sicherungen" VALUES(23,'Sicherung','S16','Brems/ABS/MFA 15A','ZE2',15,'hoch');
INSERT INTO "relais_sicherungen" VALUES(24,'Sicherung','S18','K-Pumpe/Lambda 20A','ZE2',20,'hoch');
INSERT INTO "relais_sicherungen" VALUES(25,'Sicherung','S19','Klima/Lüfter 30A','ZE2',30,'hoch');
INSERT INTO "relais_sicherungen" VALUES(26,'Sicherung','S21','Innenleuchte/ZV/Uhr 15A','ZE2',15,'hoch');
INSERT INTO "relais_sicherungen" VALUES(27,'Sicherung','S22','Zig./Radio 10A','ZE2',10,'hoch');
CREATE TABLE stecker (
  id          INTEGER PRIMARY KEY,
  bezeichnung TEXT NOT NULL,          -- z.B. 'T28', 'U1', 'G1/11', 'T55', 'T25', 'X1'
  pole        INTEGER,
  system      TEXT,                   -- z.B. 'ZE2', 'Kombiinstrument', 'ABS Mk04'
  verwendung  TEXT,
  notizen     TEXT
);
INSERT INTO "stecker" VALUES(1,'T28',28,'Kombiinstrument','Analog-KI neue ZE (14+14)','1x 28-polig ab MJ90');
INSERT INTO "stecker" VALUES(2,'KI alt weiß/schwarz',14,'Kombiinstrument','Analog-KI alte ZE','je ~14-polig, Rundkontakte');
INSERT INTO "stecker" VALUES(3,'U1',14,'ZE2','Kombiinstrument Kabelbaum 1','blau');
INSERT INTO "stecker" VALUES(4,'U2',14,'ZE2','Kombiinstrument Kabelbaum 2','blau');
INSERT INTO "stecker" VALUES(5,'W/1',1,'ZE2','VSS-Signal','weiß/gelb vom Getriebegeber');
INSERT INTO "stecker" VALUES(6,'W/2',1,'ZE2','ABS-Warnleuchte','grau/schwarz vom ABS-SG Pin 16');
INSERT INTO "stecker" VALUES(7,'X/8',1,'ZE2','ABS-Diagnose/Warnlampe','gelb/rot');
INSERT INTO "stecker" VALUES(8,'G1/11',1,'ZE2','VSS-Verteilung','blau/weiß an ECU65/Radio');
INSERT INTO "stecker" VALUES(9,'X1 (ABS Mk02)',35,'ABS Mk02','STG-Stecker ohne EDS','');
INSERT INTO "stecker" VALUES(10,'ABS Mk02 EDS',55,'ABS Mk02','STG-Stecker mit EDS','');
INSERT INTO "stecker" VALUES(11,'T55 (ABS Mk04)',55,'ABS Mk04','STG J104 separat','');
INSERT INTO "stecker" VALUES(12,'T25 (ABS Mk20)',25,'ABS Mk20','Kompakteinheit J104','');
INSERT INTO "stecker" VALUES(13,'MSG 68-polig',68,'Motor','Motronic M2.x / Digifant 3.x','');
INSERT INTO "stecker" VALUES(14,'MSG 25-polig',25,'Motor','Digifant I/II','38-polig nur letzte G60');
INSERT INTO "stecker" VALUES(15,'Mono-Motronic 35/45-polig',45,'Motor','35-pol bis 94, 45-pol ab 94','');
INSERT INTO "stecker" VALUES(16,'2x2-Diagnose',4,'Diagnose','schwarz + weiß, K+L','VAG 1551');
INSERT INTO "stecker" VALUES(17,'OBD2 16-polig',16,'Diagnose','ab ca. 1995/96','');
CREATE TABLE steuergeraete (
  id            INTEGER PRIMARY KEY,
  name          TEXT NOT NULL,        -- z.B. 'Motronic M2.9.1 AAA', 'ABS Teves Mk02'
  kategorie     TEXT NOT NULL,        -- Motor | ABS | Getriebe | Klima | Airbag | Komfort | WFS | Kombi | Sonst
  teilenummern  TEXT,                 -- mehrere, durch ';' getrennt
  bosch_nummern TEXT,
  stecker       TEXT,                 -- z.B. '68-polig', 'T55', 'T25', '35-polig X1'
  einbauort     TEXT,
  fahrzeuge     TEXT,
  diagnose      TEXT,                 -- z.B. 'Blinkcode', 'K-Line', 'Login 40168'
  notizen       TEXT
);
INSERT INTO "steuergeraete" VALUES(1,'Digifant I (G60/G40)','Motor','037 906 022 B; CP/DP; CM/DM; DQ/EG; EH','Bosch 0 261 200 280; 0 261 200 346/347; 0 261 200 552','25-polig (EU); späte G60 38-polig','Motorraum','Golf 2 PG/1H/3G; Corrado PG','Blinkcode/Fehlerauslese Pin 20','8-Bit 68HC11, Klopf selektiv, MAP intern. hoch');
INSERT INTO "steuergeraete" VALUES(2,'Digifant II (PB/PF/RV/1P/2H)','Motor','037 906 022 +Suffix M/BB/BC/N/DB/FH/CS','Bosch 0 261 200 29x','25-polig','Motorraum','Golf 2; Corrado Export','Diagnosefähig','Detail-Pins unverifiziert (SSP 87 OCR nötig). mittel');
INSERT INTO "steuergeraete" VALUES(3,'Digifant 3.x (2E/ADY/AGG/ABF/ABA)','Motor','037 906 024 +Suffix B/D/AG/S','Siemens 5WP4 xxx','68-polig angenommen','Motorraum','Golf 3; Passat B4; Corrado 2E/ADY','2x2 (K/L), adaptiv, DK-Grundeinstellung','Steckertyp Verifizierung empfohlen. mittel');
INSERT INTO "steuergeraete" VALUES(4,'Mono-Jetronic (RP früh, 1F)','Motor','','','mehrpolig','Motorraum','Golf 2; Passat B3','OBD-I-Blinkcodes 4-stellig','Nur Einspritzung, Zündung separat (TSZ-h). hoch');
INSERT INTO "steuergeraete" VALUES(5,'Mono-Motronic (RP spät, AAM, ABS/ADZ/ANN/ANP/ACC)','Motor','1H0 907 311 +Suffix B/F/K/L','Bosch 0 261 200 7xx / 0 261 203 xxx','35-polig bis ~94, 45-polig ab 94','Motorraum','Golf 3; Passat B3/B4','erweiterte OBD, schnelle Datenübertragung','Ab-94: VSS + Klopfsensor. hoch');
INSERT INTO "steuergeraete" VALUES(6,'KE-Motronic (9A)','Motor','8A0 907 404 C; 8A0 907 404 CC','Bosch 0 261 200 858; 0 261 200 859','unverifiziert','Motorraum','Golf 2 9A; Corrado 9A; Passat B3 9A','','TN mittel, Rest niedrig');
INSERT INTO "steuergeraete" VALUES(7,'Motronic M2.7 (AAA Verteiler)','Motor','021 906 258 B; 258 CC; 258 BF (Auto)','Bosch 0 261 200 493/494; 0 261 203 038/039','68-polig','Motorraum','AAA 91–93','2x2 K/L','mittel');
INSERT INTO "steuergeraete" VALUES(8,'Motronic M2.9/M2.9.1 (AAA/ABV)','Motor','021 906 258 AG/AF (M2.9); 258 CP (M2.91)','Bosch 0 261 203 108/109; 0 261 203 564/565','68-polig','Motorraum','AAA/ABV ab 93; Corrado; Passat','2x2 K/L (Pin 43/21)','ABV spät evtl. M3.8.1 (niedrig). mittel–hoch');
INSERT INTO "steuergeraete" VALUES(9,'ABS Teves Mk02 ohne EDS','ABS','191 907 379; 535 907 379; 535 907 379 A/B','ATE z.B. 10.0935-0094.4','35-polig X1','Kofferraum Beifahrerseite','Golf 2; Corrado; Passat B3','Blinkcode bis 07/91, schnelle Daten ab 08/91','Integriert (BKV+HBZ+Pumpe+Speicher). hoch');
INSERT INTO "steuergeraete" VALUES(10,'ABS Teves Mk02 mit EDS','ABS','535 907 379 F; 357 907 379','ATE','55-polig','Kofferraum Beifahrerseite','Golf 2; Corrado; Passat B3','wie Mk02','EDS-Ventile N125/N126. hoch');
INSERT INTO "steuergeraete" VALUES(11,'ABS Teves Mk04 (Mark 04)','ABS','1H0 907 379 E (u.a. 1H0-Nummern)','ATE','55-polig T55, separates STG','Fußraum/Rücksitz','Golf 3; Passat 35i Facelift','K-Line, KEIN Login (nur Mk20)','Nicht-integriert. hoch');
INSERT INTO "steuergeraete" VALUES(12,'ABS Teves Mk20 (20 GI)','ABS','1H0 907 379 D (ABS); 1H0 907 379 E (ABS/EDL); 3A0 907 379 (o.Index); 3A0 907 379 C (ABS/EDL); 3A0 907 379 A/E','ATE 10.0941-0313.4 (B); 10.0941-0321.4/-0345.4 (E)','25-polig T25, Kompakteinheit','Am Hydraulikblock, Motorraum links','Golf 3; Passat B4; Corrado VR6 spät','Adresse 03, K-Line, Login 40168','VCDS: ABS/EDS ITTAE 20 GI, Cod. z.B. 03704. hoch');
INSERT INTO "steuergeraete" VALUES(13,'Automatik 096','Getriebe','096 927 731 (Hella/Digimat 5DG 007 411-.. BL)','Hella','mehrpolig + runder Ventil-Leitungssatz','Kofferraum links (verifizieren)','Golf 3 bis 12/94','2x2/OBD','F125, Sport/Economy-Schalter. mittel–hoch');
INSERT INTO "steuergeraete" VALUES(14,'Automatik 01M','Getriebe','01M 927 733 GJ','','mehrpolig + runder Ventilsatz','Kofferraum links (verifizieren)','Golf 3 ab 01/95','OBD','Elektronisch-hydraulisch, WÜK. mittel–hoch');
INSERT INTO "steuergeraete" VALUES(15,'WFS Gen 1','WFS','1H0 953 257 B (Ersatz BX); Lesespule 1H0 953 254 B/F/E','Siemens 5WK4 590; 5WK4 671','mehrpolig + 2-pol Spule','Lenksäule/ZE-Bereich','Golf 3/Corrado/B4 bis FIN W-040000','Login nötig','ID33 Festcode. mittel–hoch');
INSERT INTO "steuergeraete" VALUES(16,'WFS Gen 2','WFS','6H0 953 257; Lesespule 6H0 953 254','','mehrpolig + 2-pol Spule','Lenksäule','FIN W-040001–Y-060000','Login nur Schlüssel','ID42. mittel');
INSERT INTO "steuergeraete" VALUES(17,'WFS Gen 3','WFS','6X0 953 257; Lesespule 6X0 953 254','','mehrpolig + 2-pol Spule','Lenksäule','ab FIN Y-060001','Login','ID44 einmal bindbar. mittel');
INSERT INTO "steuergeraete" VALUES(18,'Airbag Golf 3','Airbag','6N0 909 603 (5WK4 137); 1H0-909-605-Familie','','gelber Mehrfachstecker','Mitteltunnel unter Konsole','Golf 3','OBD Adresse 15','Gleichteil Polo. mittel');
INSERT INTO "steuergeraete" VALUES(19,'Airbag Golf 4','Airbag','1J0 909 609; 1J0 909 603 AC','','gelb','Mitteltunnel vorn','Golf 4','OBD Adresse 15','mittel–hoch');
INSERT INTO "steuergeraete" VALUES(20,'Komfort/ZV Golf 3 (Pumpe)','Komfort','1H0 962 257 F/G (Hella/VDO)','','pneumatisch + elektrisch','Kofferraum rechts','Golf 3','–','TN am Altteil prüfen. mittel');
INSERT INTO "steuergeraete" VALUES(21,'KSG Golf 4','Komfort','1J0 959 799 Q/J/N/AH (bis MJ01); 1C0 959 799 /B (ab MJ02)','','23-pol + 15-pol (FFB) + Antenne','Fahrerfußraum links','Golf 4','Codierung','MJ01/02 inkompatibel (CAN). mittel–hoch');
INSERT INTO "steuergeraete" VALUES(22,'GRA Golf 2 (Unterdruck)','Komfort','443 907 305 (5GA 004 397-00); 443 907 305 A (-01..-10)','','8+1-pol / 8+2+1-pol','Zusatzrelaisträger/Fahrerfußraum','Golf 2; Corrado','–','Pumpe 811 907 325; Stellelement 811 907 326. mittel–hoch');
INSERT INTO "steuergeraete" VALUES(23,'GRA Golf 3','Komfort','1H0 907 305','','','Fahrerfußraum','Golf 3','–','Pumpe 701 907 325 A. mittel');
INSERT INTO "steuergeraete" VALUES(24,'GRA Golf 4 (E-Gas)','Komfort','Hebel 1J0 953 513 01C (kein STG, im MSG)','','','Lenksäule','Golf 4','VCDS-Freischaltung','mittel–hoch');
INSERT INTO "steuergeraete" VALUES(25,'Climatronic Golf 3','Klima','1H0 907 044 (STG); 1H0 820 045 (Bedienteil)','','','Mittelkonsole','Golf 3','–','Niedrig, am Altteil prüfen.');
CREATE TABLE teile (
  teilenummer TEXT PRIMARY KEY,       -- z.B. '321 907 345 B'
  benennung   TEXT NOT NULL,
  system      TEXT,
  fahrzeuge   TEXT,
  notizen     TEXT
);
INSERT INTO "teile" VALUES('321 907 345 B','GALA-Hallgeber Tacho','Kombi/GRA','Golf 2/3','Ab Werk bei MFA/GRA/GALA, nachrüstbar. hoch');
INSERT INTO "teile" VALUES('321 907 344','Geber induktiv (Zubehör)','Kombi','Golf 2','mittel-hoch');
INSERT INTO "teile" VALUES('1H0 919 149 B','Wegstreckengeber G22-Getriebe','Getriebe','Golf 3','mittel');
INSERT INTO "teile" VALUES('191 919 052 A','Digifiz 8000/min (16V)','Kombi','Golf 2 KR/PL','hoch');
INSERT INTO "teile" VALUES('191 919 052 B','Digifiz 7000/min (Digifant)','Kombi','Golf 2 PB/PF','hoch');
INSERT INTO "teile" VALUES('191 953 519','Wischerhebel ohne MFA','MFA','Golf 2 bis 08/87–07/89','hoch');
INSERT INTO "teile" VALUES('535 953 519 A','Wischerhebel mit MFA','MFA','Golf 2 ab 08/89; Corrado','hoch');
INSERT INTO "teile" VALUES('357 919 379 A','Außentemperaturgeber MFA','MFA','Golf 3','mittel–hoch');
INSERT INTO "teile" VALUES('1H0 919 563','Öltemperaturgeber MFA','MFA','Golf 3','mittel–hoch');
INSERT INTO "teile" VALUES('191 698 304 A','ABS-Druckspeicher (Akku)','ABS Mk02','Golf 2/Corrado/B3','210 bar. mittel–hoch');
INSERT INTO "teile" VALUES('191 927 821','ABS-Druckschalter (Mk02-Hinweis)','ABS Mk02','Golf 2','aus Pinout-Referenz');
INSERT INTO "teile" VALUES('357 614 150','ABS-Rotor (Impulsring)','ABS','Golf 2/3, Corrado, B3/B4','Classic Parts. hoch');
INSERT INTO "teile" VALUES('357 937 039','Sicherungskasten neue ZE','ZE2','Golf 2 ab 90','mittel');
INSERT INTO "teile" VALUES('191 937 505','Sicherungsdose','ZE','Golf 2/Bus T4','mittel');
INSERT INTO "teile" VALUES('811 907 325','GRA-Pumpe','GRA','Golf 2/Corrado','Hella 003 572. mittel–hoch');
INSERT INTO "teile" VALUES('811 907 326','GRA-Stellelement','GRA','Golf 2','bzw. 1H0 907 327. mittel–hoch');
INSERT INTO "teile" VALUES('535 953 513 A','GRA-Lenkstockschalter','GRA','Golf 2','mittel–hoch');
INSERT INTO "teile" VALUES('1J0 953 513 01C','GRA-Hebel E-Gas','GRA','Golf 4','mittel–hoch');
INSERT INTO "teile" VALUES('1H0 962 257 F','ZV-Pumpe','Komfort','Golf 3','am Altteil prüfen. mittel');
CREATE INDEX idx_pinouts_sg   ON pinouts(steuergeraet_id);
CREATE INDEX idx_sg_kat        ON steuergeraete(kategorie);
CREATE INDEX idx_motoren_sys   ON motoren(system);
COMMIT;

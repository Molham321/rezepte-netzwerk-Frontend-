# RezepteNetzwerk

**Angular Web-Anwendung für Web Engineering 2, entwickelt von Anna-Lisa Merkel und Molham Al-khodari.**

## Was ist das Rezepte-Netzwerk?

Im Rezepte-Netzwerk können Nutzer Kochrezepte anderer Leute zum Nachkochen finden oder nach der Registrierung eigene Rezepte hochladen. Mit Hilfe eines Kontos können sie außerdem auf verschiedene Weise mit den Rezepten interagieren, sie beispielsweise auf einer Merkliste speichern, Kommentare verfassen oder einem Rezept einen Stern vergeben. Zum leichteren Auffinden sind Rezepte außerdem in verschiedene Kategorien unterteilt und es sind einzelne Such- und Filterfunktionen vorhanden.


## Seitenstruktur

### Startseite

Die Startseite gibt einen Überblick über die jeweils drei neusten und belibtesten Rezepte. Zusätzlich wird bei jedem Laden der Seite ein zufälliges Rezept vorgeschlagen. Weiter unten befinden sich verschiedene Kategorien, mit denen die hochgeladenen Rezepte gefiltert werden können.

### Rezept-Kategorien

Abhängig von der gewählten Kategorie, sind hier alle Rezepte der Kategorie in Form von Rezept-Karten aufgelistet. Im oberen Seitenbereich sind außerdem zwei Buttons zum Sortieren der Rezepte vorhanden, welche die Rezepte nach der Bewertung oder dem Alphabet ordnen. Über den Klick auf ein Rezept gelangt man zur Detailansicht des Rezeptes.

### Detailansicht

Hier sind alle wichtigen Informationen zum gewählten Rezept aufgelistet. Es gibt eine Tabelle mit Zutaten, deren jeweilige Menge durch Änderung der Portionsmenge angepasst werden kann. Die einzelnen Arbeitsschritte sind untereinander aufgelistet. Außerdem können Besitzer des Rezeptes dieses über Buttons bearbeiten oder löschen, andere angemeldete Nutzer können es merken oder einen Stern vergeben. Eine Druckfunktion gibt es auch. Am unteren Seitenrand befindet sich außerdem ein ausklappbarer Kommentarbereich, in dem angemeldete Nutzer Kommentare verfassen und wieder löschen können.

### Ergebnisse des Suchformulars

Über ein Suchformular im Header der Seite, können Rezepte anhand beliebiger Eingaben gefunden werden. Durchsucht werden hier die Namen, die Beschreibungen und die Zutatenlisten der Rezepte und alle passenden Ergebnisse werden auf einer separaten Listenansicht angezegt.

### Rezept hochladen

Auf dieser Seite befindet sich ein Formular, mit dem angemeldete Nutzer ein neues Rezept hochladen können. Dafür gibt es eine Reihe von Eingabe- und Auswahlfelder für die wichtigsten Daten. Zum Hinzufügen eines Bildes müssen Nutzer die Bildadresse eines Bildes (das sie beispielsweise zuvor in einem separaten Uploadservice hochgeladen haben) kopieren und in das dazugehörige Eingabefeld kopieren. Eine Bildvorschau wird daraufhin angezeigt. Die Eingabefelder für Zutaten und Arbeitschritte können über einen "+" Button dynamisch hinzugefügt und bei Bedarf wieder entfernt werden. Außerdem können zu einem Rezept maximal drei vorgegebene Kategorien vergeben werden.

### Profilseite

Hier können angemeldete Nutzer ihre Daten einsehen sowie den Nutzernamen oder das Passwort bei Bedarf ändern. Darunter befinden sich zwei Tabs, die jeweils alle hochgeladenen und alle gemerkten Rezepte des Nutzers auflisten.

### Login / Registrierung

Bereits angemeldete Nutzer können sich über das Login-Formular einloggen und neue Nutzer über das Registrierungsformular auf der Seite anmelden.

### Admin-Ansicht

Diese Seite steht nur dem einzelnen Admin-Nutzer zur Verfügung. Dort im Header, wo sich normalerweise die Links zur Profilseite und zum Hochladen eines Rezeptes befinden, findet der Admin einen Link zu dieser Übersicht. Hier sind in einer Tabelle alle im Rezepte-Netzwerk angemeldeten Nutzer aufgelistet und anhand ihrer Email-Adresse alphabetisch sortiert. Auch alle hochgeladenen Rezepte eines Nutzers sind jeweils unter ihm aufgelistet. Mit Hilfe dieser Übersicht kann der Admin so schnell alle Nutzer und Rezepte finden, die er sucht. Außerdem hat der Admin die Berechtigung, alle Rezepte und Kommentare zu löschen, wenn sie beispeilsweise unangemessene Inhalte enthalten.

## Installationsanleitung

Vorraussetzungen für das Projekt sind das Vorhandensein von NodeJS und Angular CLI.

### 1. Öffnen des Projektes

Nachdem das RezepteNetzwerk von GitLab heruntergeladen wurde, kann es Visual Studio Code geöffnet werden. Zunächst sollte dort in einem Terminal der Befehl `npm install` ausgeführt werden, um alle notwendigen Abhängigkeiten zu installieren.

### 2. Öffnen und Starten des Backend-Servers

Das zum Projekt gehörende Backend ist [hier](https://git.ai.fh-erfurt.de/rezepte-netzwerk/rezepte-netzwerk-backend) in einem separaten GitLab Projekt zu finden. Nachdem dieses anhand der dort vorhandenen Installationsanleitung erfolgreich gestartet wurde, geht es mit dem Starten des Frontends weiter.

### 3. Starten des Projektes

Schließlich kann auch dieses Projekt mit dem Befehl `ng serve` gestartet werden. Anschließend kann in einem Browser die Adresse `http://localhost:4200` aufgerufen werden, wo sich das Rezepte-Netzwerk befindet.

### 4. Testnutzer

Grundsätzlich kann die Webseite zwar ohne Anmeldung erkundet werden, für verschiedene Funktionen ist eine Anmeldung jedoch notwendig. Dazu kann ein neues Profil über das Registrierungsformular erstellt werden oder einer der bereits vorhandenen Testnutzer angemeldet werden. Einen Administrator mit dem Namen "Admin" gibt es auch.

| Name          | E-Mail                     | Passwort  |
| ------------- | -------------------------  | --------- |
| Admin  | admin@test.com     | Test321.  |
| User  | user@test.com     | Test321.  |
| neuer Tester | neuerTester@gmail.com | Test321.  |
| Spaghettifan | spaghetti@gmail.com | Test321. |

## Responsive Styling

Bei der Entwicklung des Rezepte-Netzwerks wurde darauf geachtet, dass die Seite auch auf verschiedenen Bildschirmgrößen verwendet werden kann. So können Nutzer sich die Rezepte problemlos auf beispielsweise ihrem Handy oder Tablet ansehen, während sie in der Küche kochen. Auf folgenden Geräten / Bildschirmgrößen wurde die Seite dafür neben dem normalen PC getestet:

| Gerät          | Modell                     | Größe  |
| ------------- | -------------------------  | --------- |
| Tablet  | iPad iPadOS     | 810 x 1018  |
| Handy  | iPhone 12/13 Pro Max iOS     | 428 x 926  |

## Verwendete Tools
- Angular mit Angular Materials (Framework und Komponenten-Bibliothek)
- Visual Studio Code (Entwicklungsumgebung)
- NodeJS (Backend-Server)
- Express.js (Backend-Server)
- MongoDB mit Mongoose (Datenbank)
- GitLab (Versionsverwaltung)
- ClickUp (Sprintdurchführung)
- Figma (Erstellung von Mockups)
- Discord (Kommunikation)

## Sprintplanung und -durchführung mit ClickUp

Die Sprintplanung dieses Projektes wurde mit ClickUp durchgeführt. Hier wurde zu jedem Sprint ein Ordner angelegt, in dem sich jeweils ein Board befindet, auf dem Aufgaben angelegt wurden. Außerdem wurden Aufgabenbeschreibungen, Schätzungen der vorraussichtlichen Bearbeitungszeit und die letztendliche Zeiterfassung pro Aufgabe notiert.

### !!! Hinweis zur Zeiterfassung
Etwa ab dem Sprint vom 23.01. bis 06.02. wurde auf ClickUp mit diesem Projekt ein Nutzungslimit der kostenlosen Version erreicht. Das voreingestellte Feld "Zeiterfassung" sowie Custom-Felder konnten nicht mehr verwendet werden. Aus diesem Grund wurde die Zeiterfassung der übrigen Tickets in der Beschreibung des jeweiligen Aufgabe notiert und ist somit erst beim Klick auf das Ticket sichtbar. Bei allen vorherigen Aufgaben lässt sich die Zeiterfassung jedoch weiterhin dem dafür vorgesehenen Feld "Zeiterfassung" oder dem Custom-Feld "tatsächliche Bearbeitungszeit" entnehmen.

## Präsentationen

- [Auftaktpräsentation](documentation/RezepteNetzwerk_Auftaktpräsentation.pdf)
- [Abschlusspräsentation](documentation/RezepteNetzwerk_Abschlusspräsentation.pdf)
- [Sprintpräsentation 1](documentation/Sprint_1.pdf)
- [Sprintpräsentation 2](documentation/Sprint_2.pdf)
- [Sprintpräsentation 3](documentation/Sprint_3.pdf)
- [Sprintpräsentation 4](documentation/Sprint_4.pdf)
- [Sprintpräsentation 5](documentation/Sprint_5.pdf)
- [Mockups](documentation/Mockups)


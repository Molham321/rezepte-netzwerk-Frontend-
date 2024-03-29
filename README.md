# RezepteNetzwerk

**Angular Web-Anwendung für Web Engineering 2, entwickelt von Anna-Lisa Merkel und Molham Al-khodari.**

## Was ist das Rezepte-Netzwerk?

Im Rezepte-Netzwerk können Nutzer Kochrezepte anderer Leute zum Nachkochen finden oder nach der Registrierung eigene Rezepte hochladen. Mit Hilfe eines Kontos können sie außerdem auf verschiedene Weise mit den Rezepten interagieren, sie beispielsweise auf einer Merkliste speichern, Kommentare verfassen oder einem Rezept einen Stern vergeben. Zum leichteren Auffinden sind Rezepte außerdem in verschiedene Kategorien unterteilt und es sind einzelne Such- und Filterfunktionen vorhanden.


## Seitenstruktur

### 1. Startseite

Die Startseite gibt einen Überblick über die jeweils drei neusten und belibtesten Rezepte. Zusätzlich wird bei jedem Laden der Seite ein zufälliges Rezept vorgeschlagen. Weiter unten befinden sich verschiedene Kategorien, mit denen die hochgeladenen Rezepte gefiltert werden können.

### 2. Rezept-Kategorien

Abhängig von der gewählten Kategorie, sind hier alle Rezepte der Kategorie in Form von Rezept-Karten aufgelistet. Im oberen Seitenbereich sind außerdem zwei Buttons zum Sortieren der Rezepte vorhanden, welche die Rezepte nach der Bewertung oder dem Alphabet ordnen. Über den Klick auf ein Rezept gelangt man zur Detailansicht des Rezeptes.

### 3. Detailansicht

Hier sind alle wichtigen Informationen zum gewählten Rezept aufgelistet. Es gibt eine Tabelle mit Zutaten, deren jeweilige Menge durch Änderung der Portionsmenge angepasst werden kann. Die einzelnen Arbeitsschritte sind untereinander aufgelistet. Außerdem können Besitzer des Rezeptes dieses über Buttons bearbeiten oder Löschen, andere angemeldete Nutzer können es Merken oder einen Stern vergeben. Eine Druckfunktion gibt es auch. Am unteren Seitenrand befindet sich außerdem ein ausklappbarer Kommentarbereich, in dem angemeldete Nutzer Kommentare verfassen und wieder löschen können.

### 4. Ergebnisse des Suchformulars

Über ein Suchformular im Header der Seite, können Rezepte anhand beliebiger Eingaben gefunden werden. Durchsucht werden hier die Namen, die Beschreibungen und die Zutatenlisten der Rezepte und alle passenden Ergebnisse werden auf einer separaten Listenansicht angezegt.

### 5. Rezept hochladen

Auf dieser Seite befindet sich ein Formular, mit dem angemeldete Nutzer ein neues Rezept hochladen können. Dafür gibt es eine Reihe von Eingabe- und Auswahlfelder für die wichtigsten Daten. Zum Hinzufügen eines Bildes müssen Nutzer die Bildadresse eines Bildes (das sie beispielsweise zuvor in einem separaten Uploadservice hochgeladen haben) kopieren und in das dazugehörige Eingabefeld kopieren. Eine Bildvorschau wird daraufhin angezeigt. Die Eingabefelder für Zutaten und Arbeitschritte können über einen "+" Button dynamisch hinzugefügt und bei Bedarf wieder entfernt werden. Außerdem können zu einem Rezept maximal drei vorgegebene Kategorien vergeben werden.

### 6. Profilseite

Hier können angemeldete Nutzer ihre Daten einsehen sowie den Nutzernamen oder das Passwort bei Bedarf ändern. Darunter befinden sich zwei Tabs, die jeweils alle hochgeladenen und alle gemerkten Rezepte des Nutzers auflisten.

### 7. Login / Registrierung

Bereits angemeldete Nutzer können sich über das Login-Formular einloggen und neue Nutzer über das Registrierungsformular auf der Seite anmelden.

### 8. Admin-Ansicht

Diese Seite steht nur dem einzelnen Admin-Nutzer zur Verfügung. Dort im Header, wo sich normalerweise die Links zur Profilseite und zum Hochladen eines Rezeptes befinden, findet der Admin einen Link zu dieser Übersicht. Hier sind in einer Tabelle alle im Rezepte-Netzwerk angemeldeten Nutzer aufgelistet und anhand ihrer Email-Adresse alphabetisch sortiert. Auch alle hochgeladenen Rezepte eines Nutzers sind jeweils unter ihm aufgelistet. Mit Hilfe dieser Übersicht kann der Admin so schnell alle Nutzer und Rezepte finden, die er sucht. Außerdem hat der Admin die Berechtigung, alle Rezepte und Kommentare zu löschen, wenn sie beispeilsweise unangemessene Inhalte enthalten.

## Installationsanleitung

## Verwendete Tools

## Präsentationen

- [Auftaktpräsentation](documentation/RezepteNetzwerk_Auftaktpräsentation.pdf)
- [Abschlusspräsentation](documentation/RezepteNetzwerk_Abschlusspräsentation.pdf)
- [Sprintpräsentation 1](documentation/Sprint_1.pdf)
- [Sprintpräsentation 2](documentation/Sprint_2.pdf)
- [Sprintpräsentation 3](documentation/Sprint_3.pdf)
- [Sprintpräsentation 4](documentation/Sprint_4.pdf)
- [Sprintpräsentation 5](documentation/Sprint_5.pdf)


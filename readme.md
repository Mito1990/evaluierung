# 🚗 Evaluation API & Vehicle Management Frontend

Dieses Projekt ist ein kleines Evaluierungsprogramm, das eine **REST-API auf Basis von Spring Boot** mit einem **React-Frontend (TypeScript)** kombiniert.  
Es dient als Beispiel für eine leichtgewichtige, komponentenbasierte Architektur mit **automatisch generiertem API-Client aus OpenAPI-Spezifikationen**.

---

## 📚 Inhaltsverzeichnis

1. [Überblick](#überblick)
2. [Technologien](#technologien)
3. [Backend – Spring Boot](#backend--spring-boot)
4. [Frontend – React mit TypeScript](#frontend--react-mit-typescript)
5. [OpenAPI Codegenerierung](#openapi-codegenerierung)
6. [Projektstruktur](#projektstruktur)
7. [API Beispiel](#api-beispiel)
8. [Start des Projekts](#start-des-projekts)

---

## 🧠 Überblick

Die Anwendung verwaltet eine Liste von **Fahrzeugen (Vehicles)**.  
Das Backend stellt eine REST-Schnittstelle bereit, über die Fahrzeuge **abgerufen und gelöscht** werden können.  
Im Frontend werden die Daten in einer Tabelle angezeigt und können per Button entfernt werden.  
Nach dem Löschen aktualisiert sich die Benutzeroberfläche automatisch.

---

## 🧰 Technologien

### 🖥 Backend

- **Java 11**
- **Spring Boot 2.7.13**
- **Spring Web + HATEOAS**
- **H2 In-Memory-Datenbank**
- **Jackson** (JSON Serialisierung)
- **OpenAPI Generator Plugin (Gradle)**
- **Gradle** als Build-Tool

### 💡 Frontend
- **React 18 mit TypeScript**
- **Webpack & Webpack Dev Server**
- **PrimeReact** (UI-Komponenten)
- **SWR** (Data Fetching & Mutations)
- **Axios / Fetch API**
- **OpenAPI Generator (TypeScript Axios)**

## ⚙️ Backend – Spring Boot

Das Backend stellt eine einfache REST-API zur Verfügung, die HATEOAS-konforme JSON-Responses liefert.

**Beispiel-Endpunkte:**

| Methode  | Endpoint                | Beschreibung                                                      |
| -------- | ----------------------- | ------------------------------------------------------------------|
| `GET`    | `/api/v1/vehicles`      | Liste aller Fahrzeuge abrufen                                     |
| `GET`    | `/api/v1/vehicles/{id}` | Einzelnes Fahrzeug abrufen                                        |
| `DELETE` | `/api/v1/vehicles/{id}` | Fahrzeug löschen                                                  |
| `GET`    | `/api/v1/vehicles/init` | Fahrzeug daten wieder initialisiern zum testen des frontend logik |
### 🧩 OpenAPI Integration

Die Datei `openapi.yml` beschreibt die gesamte API-Struktur.
Beim Build-Prozess wird automatisch der Java- und TypeScript-Code aus dieser Spezifikation generiert.

Gradle nutzt dazu das Plugin:

```groovy
id 'org.openapi.generator' version '7.5.0'


⚙️ OpenAPI Codegenerierung
```

./gradlew build oder ./gradlew clean build


🚀 Start des Projekts

Backend starten

./gradlew bootRun

Läuft dann unter:
👉 http://localhost:8080

H2-Konsole (optional):
👉 http://localhost:8080/h2-console

Frontend starten

cd frontend
npm install
npm run start

Frontend erreichbar im dev unter:
👉 http://localhost:8023


npm run build

Frontend erreichbar in prod unter:
👉 http://localhost:8025

💻 Frontend – React mit TypeScript

Das Frontend nutzt Webpack als Bundler.
Im Development-Modus ist ein Proxy im Webpack Dev Server eingerichtet,
der CORS-Probleme beim Zugriff auf das Spring Boot Backend verhindert.

Beispiel webpack.dev.config.js (Ausschnitt)

    proxy: [
        {
        context: ['/api'],
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        },
    ],


Dadurch können API-Requests wie fetch('/api/v1/vehicles') direkt funktionieren,
ohne dass CORS im Backend aktiviert werden muss.



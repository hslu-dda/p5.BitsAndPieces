# Socket.io Sketch — Setup

Drei Browser-Fenster kommunizieren in Echtzeit über einen lokalen Server.  
Der Controller sendet Tasten, die Sketches empfangen sie.

## Voraussetzungen

**Node.js** muss installiert sein → [nodejs.org](https://nodejs.org) (LTS-Version)

Prüfen ob es installiert ist:

```bash
node --version
```

---

## Einmalig: Abhängigkeiten installieren

Terminal im Projektordner öffnen, dann:

```bash
npm install
```

Das erstellt einen `node_modules` Ordner — nicht anfassen.

---

## Starten

**1. Server starten** (Terminal offen lassen):

```bash
node server.js
```

→ `✅ Relay running on http://localhost:8080`

**2. Drei Tabs im Browser öffnen:**

| Tab        | URL                                     |
| ---------- | --------------------------------------- |
| Controller | `http://localhost:8080/controller.html` |
| Sketch A   | `http://localhost:8080/sketch_a.html`   |
| Sketch B   | `http://localhost:8080/sketch_b.html`   |

Im Controller-Tab eine Taste drücken → beide Sketches reagieren.

**Server stoppen:** `Ctrl + C` im Terminal.

---

## Dateistruktur

```
projekt/
├── server.js               ← Node-Server (nicht bearbeiten)
├── package.json
├── controller.html         ← sendet Tasten weiter
├── controller_sketch.js
├── sketch_a.html           ← Sketch A: Kreise
├── sketch_a.js
├── sketch_b.html           ← Sketch B: Farbe
└── sketch_b.js
```

---

## Deployment auf Render.com

Render hostet den Server kostenlos und setzt `RENDER_EXTERNAL_URL` automatisch — der CORS im `server.js` ist bereits dafür vorbereitet, es braucht keine Änderungen am Code.

**1. GitHub Repository erstellen**

Alle Projektdateien in ein neues GitHub Repo pushen. Den `node_modules` Ordner **nicht** hochladen — dafür eine `.gitignore` Datei erstellen:

```
node_modules
```

**2. Render Web Service erstellen**

- [render.com](https://render.com) → "New" → "Web Service"
- GitHub Repo verbinden
- Einstellungen:

| Feld          | Wert             |
| ------------- | ---------------- |
| Runtime       | `Node`           |
| Build Command | `npm install`    |
| Start Command | `node server.js` |

Deploy starten. Render zeigt danach eine URL wie `https://mein-sketch.onrender.com`.

**3. Sketches aufrufen**

| Tab        | URL                                                |
| ---------- | -------------------------------------------------- |
| Controller | `https://mein-sketch.onrender.com/controller.html` |
| Sketch A   | `https://mein-sketch.onrender.com/sketch_a.html`   |
| Sketch B   | `https://mein-sketch.onrender.com/sketch_b.html`   |

Die Sketches erkennen automatisch dass sie nicht auf localhost laufen und verbinden sich über `window.location.origin` — keine URL-Anpassungen nötig.

> **Hinweis:** Render schläft nach 15 Minuten Inaktivität ein (Free Plan). Erster Aufruf kann ~30 Sekunden dauern.

---

## Troubleshooting

**Statusanzeige bleibt rot** → Server läuft nicht. `node server.js` im Terminal ausführen.

**Port bereits belegt** → In `server.js` die Zahl `8080` auf `8081` ändern, in den drei HTML-Dateien ebenfalls.

**`node` nicht gefunden** → Node.js ist nicht installiert, siehe oben.

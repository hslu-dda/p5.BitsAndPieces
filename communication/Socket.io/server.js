const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const PORT = process.env.PORT || 8080;

// On Render, RENDER_EXTERNAL_URL is set automatically, e.g. "https://my-app.onrender.com"
// Locally it falls back to localhost.
const ALLOWED_ORIGIN = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

const app = express();
app.use(express.static(__dirname));

// Explicit root route so index.html is always served correctly,
// both locally and on Render.
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ALLOWED_ORIGIN,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`[+] connected  (total: ${io.engine.clientsCount})`);

  // Relay every event to all OTHER clients
  socket.onAny((event, value) => {
    socket.broadcast.emit(event, value);
  });

  socket.on("disconnect", () => {
    console.log(`[-] disconnected (total: ${io.engine.clientsCount})`);
  });
});

httpServer.listen(PORT, () => console.log(`✅  Relay running on ${ALLOWED_ORIGIN}`));

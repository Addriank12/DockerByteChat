const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require("socket.io");

const allowedOrigin = '*'; // Update this to match your client's origin

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

// Escucha la conexión del cliente
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar un evento personalizado
  socket.on('mensaje', (msg) => {
      console.log('mensaje:', msg);
      io.emit('mensaje', msg); // Enviar mensaje a todos los clientes
  });

  // Detectar la desconexión del cliente
  socket.on('disconnect', () => {
      console.log('Un usuario se ha desconectado');
  });
});

// Inicia el servidor
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
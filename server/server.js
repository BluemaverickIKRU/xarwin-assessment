const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const router = require('./routes/routes');
const cors = require('cors');
const { connectDb } = require('./database/databaseConnect');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares and services
app.use(cors());
app.use(express.json());
app.use(router);

// Connect to database
connectDb();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

io.on('connection', (socket) => {
  // Triggers when record is added
  socket.on('add-record', (data) => {
    socket.broadcast.emit('add-response', data);
  });

  // Triggers when record is updated
  socket.on('rec-updated', (data) => {
    socket.broadcast.emit('updated-rec', data);
  });

  // Triggers whem record is deleted
  socket.on('rec-deleted', (data) => {
    socket.broadcast.emit('deleted-rec', data);
  });
});

httpServer.listen(PORT, () => {
  console.log('Server is running at PORT :', PORT);
});

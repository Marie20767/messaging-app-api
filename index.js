/* eslint-disable camelcase */
// Require is essentially the same as import
// Imports
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const queries = require('./queries');
const { pool } = require('./database/database');

// Express is a node.js web server framework to make it easier to make API requests
const app = express();
const port = 3002;

// Create server with express
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://192.168.1.42:3000'],
    methods: ['GET', 'POST'],
  },
});

// Socket.io queries
const addNewMessage = (data) => {
  const { thread_id, sending_user_id, recipient_user_id, text, timestamp, read } = data;

  pool.query(
    'INSERT INTO messages (thread_id, sending_user_id, recipient_user_id, text, timestamp, read) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [thread_id, sending_user_id, recipient_user_id, text, timestamp, read],
    (addNewMessageError, results) => {
      if (addNewMessageError) {
        console.log(addNewMessageError);
      } else if (results.rows.length !== 0) {
        console.log('>>> Successfully added new message: ', results.rows[0]);
      } else {
        console.log('Error adding message');
      }
    },
  );
};

// Socket.io for instant message sharing
io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    socket.join(`chat-${data.sending_user_id}-${data.recipient_user_id}`);
  });

  socket.on('send_message', (data) => {
    socket.to(`chat-${data.recipient_user_id}-${data.sending_user_id}`).emit('receive_message', data);

    addNewMessage(data);
  });

  socket.on('join_add_friend_room', (data) => {
    socket.join(`add-friend-${data.current_user_id}`);
  });

  socket.on('add_friend', (data) => {
    socket.to(`add-friend-${data.new_friend_id}`).emit('received_add_new_friend', data);
  });
});

// App.use: for middleware
// Giving data back into a body object
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// To allow data sharing between different local hosts during development phase
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// REST API endpoints
const routePath = '/messageoh';

app.get(`${routePath}/users`, queries.getUsers);
app.get(`${routePath}/users/:id`, queries.getUserById);
app.get(`${routePath}/friends/:id`, queries.getFriends);
app.get(`${routePath}/messages/:id`, queries.getMessages);
app.post(`${routePath}/users`, queries.createUser);
app.post(`${routePath}/login`, queries.loginUser);
app.post(`${routePath}/add_friend`, queries.addNewFriend);
app.put(`${routePath}/users/:id`, queries.updateUser);
app.put(`${routePath}/update_message_read`, queries.updateReadMessages);
app.delete(`${routePath}/users/:id`, queries.deleteUser);

// Get the app to listen to start listening to any https requests on the port you specify
server.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

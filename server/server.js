const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

const server = express();

server.use(cors());
server.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/heyteam')
  .then(conn => {
    console.log('connected to mongo HeyTeam');
  })
  .catch(err => {
    console.log('error connect to mongo', err);
});

server.use('/', userRoutes, conversationRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

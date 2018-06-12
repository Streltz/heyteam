const express = require('express');
// const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const responseRoutes = require('./routes/responseRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

mongoose
  .connect('mongodb://localhost:27017/heyteam')
  .then(conn => {
    console.log('connected to mongo HeyTeam');
  })
  .catch(err => {
    console.log('error connect to mongo', err);
});

server.use('/', userRoutes, responseRoutes, conversationRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

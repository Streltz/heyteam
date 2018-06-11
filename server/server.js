const express = require('express');
// const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./user/userRoutes');

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

mongoose
  .connect('mongodb://"databasename":"password"@ds019756.mlab.com:19756/heyteam')
  .then(conn => {
    console.log('connected to mongo HeyTeam');
  })
  .catch(err => {
    console.log('error connect to mongo', err);
});

server.use('/api/user', userRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

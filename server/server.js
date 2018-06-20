const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const paymentAPI = require('./routes/payment');

const server = express();

server.use(cors({
  origin: 'https://whispering-journey-17247.herokuapp.com',
  credentials: true
}));

server.use(bodyParser.json());

const mLab = process.env.MLAB_URI || 'mongodb://localhost:27017/heyteam';

mongoose
  .connect(mLab)
  .then(conn => {
    console.log('connected to mongo HeyTeam');
  })
  .catch(err => {
    console.log('error connect to mongo', err);
});

server.use('/', userRoutes, conversationRoutes, paymentAPI);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

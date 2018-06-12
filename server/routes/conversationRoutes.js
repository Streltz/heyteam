const express = require('express');
const Response = require('../models/conversationModel.js');
const conversationRouter = express.Router();
const Conversation = require('../models/conversationModel');
const jwt =  require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res
      .status(422)
      .json({ error: 'User not authorized' });
  }
  jwt.verify(token, 'TOKEN_SECRET' , (authError, decoded) => {
    if (authError) {
      res
        .status(403)
        .json({ error: 'Token invalid, please login', message: authError });
      return;
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = conversationRouter;
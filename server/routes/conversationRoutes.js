const express = require('express');
const Response = require('../models/conversationModel.js');
const conversationRouter = express.Router();
const Conversation = require('../models/conversationModel');
const jwt =  require('jsonwebtoken');
// const { secret } = require('../config');

const secretEnv = process.env.SEC_KEY || 'secret';

const validateToken = (req, res, next) => {
  const token = req.headers.token;
  console.log('TOKEN', token);
  if (!token) {
    res
      .status(422)
      .json({ error: 'User not authorized' });
  }
  // TODO:
  // change token secret to enviroment variable
  jwt.verify(token, secretEnv , (authError, decoded) => {
    if (authError) {
      res
        .status(403)
        .json({ error: 'Token invalid, please login', message: authError });
      return;
    }
    // attach decoded user info to request object
    req.decoded = decoded;
    console.log(decoded);
    next();
  });
};

conversationRouter.get('/conversations', validateToken, function(req, res){
	const { userId } = req.decoded;
  console.log('userid', userId);
	Conversation.find({uid: userId})
  .then(conversations => {
		res.json(conversations);
	}).catch(err => {
		res.send(err);
	});
});

conversationRouter.get('/conversations/:id', validateToken, function(req, res){
	const id = req.params.id;
	Conversation.findById(id)
  .then(conversation => {
    //TODO:
    // need to construct / group conversation responses by slack_user
    // before sending it back to client
		res.json(conversation);
  })
  .catch(err => {
		res.send(err);
	});
});

conversationRouter.post('/conversation', validateToken, function(req, res){
    const { userId } = req.decoded;
    const { question, title, time, schedule_days, participants} = req.body;
    console.log('req.body: ', req.body);
    const conversation = new Conversation();
     conversation.uid = userId;
    conversation.title = title;
    conversation.time = time;
    conversation.schedule_days = schedule_days;
    conversation.question = question;
    conversation.participants = participants; 
    // console.log('CONVERSATIOND DATA', conversation);
    conversation.save().then(savedConversaton => {
      res.json(savedConversaton);
    })
    .catch(err => {
      res.send(err);
    });
});

conversationRouter.delete('/conversations/:id', validateToken, function(req, res){
  const _id = req.params.id;
  Note.findOneAndRemove({ _id })
  .then(removedConversation => {
    res.json(removedConversation);
  })
  .catch(err => {
    res.send(err);
  });
});

module.exports = conversationRouter;
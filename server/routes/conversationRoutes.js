const express = require('express');
const Response = require('../models/conversationModel.js');
const conversationRouter = express.Router();
const Conversation = require('../models/conversationModel');
const jwt =  require('jsonwebtoken');
// const { secret } = require('../config');

const secretEnv = process.env.SEC_KEY || 'secret';

const validateToken = (req, res, next) => {
  const token = req.headers.token;
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
    next();
  });
};

conversationRouter.get('/conversations', validateToken, function(req, res){
  const { userId } = req.decoded;
	Conversation.find({uid: userId})
  .populate('responses')
  .exec((err, conversations) => {
    if(err) console.log(err);
		res.json(conversations);
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

const convertTime = (time, ampm, zone)=>{
  let hour = null;
  let newTime = time.split(':')[0];
  if(ampm === 'AM'){
    hour = newTime;
  }else if(ampm === 'PM'){
    if(newTime === '12'){
      newTime = '0';
    }
    hour = Number(newTime) + 12;
  }
  return hour;
}

conversationRouter.post('/conversation', validateToken, function(req, res){
    const { userId } = req.decoded;
    const { question, title, time, ampm, timezone, schedule_days, participants} = req.body;
    const conversation = new Conversation();
     conversation.uid = userId;
    conversation.title = title;
    conversation.time = convertTime(time, ampm, timezone);
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

conversationRouter.put('/conversations/:id', validateToken, function(req, res){
  console.log('REQ BODY', req.body);
  const {id} = req.params;
  const { question, title, time, ampm, timezone, schedule_days, participants} = req.body;
  Conversation.findById(id)
  .then(conversation => {
    console.log('CONVO FROM DB', conversation);
    conversation.title = title;
    // conversation.time = convertTime(time, ampm, timezone);
    conversation.schedule_days = schedule_days;
    conversation.question = question;
    conversation.participants = participants; 
    console.log('CONVER ASSIGNED', conversation);
    conversation.save().then(updated=>{
      Conversation.findById(updated._id)
      .populate('responses')
  .exec((err, convo) => {
    console.log('FIND CONVO', convo);
      res.json(convo);
  });
      
    });
  })
  .catch(err => {
    res.send(err);
  });
});

conversationRouter.delete('/conversations/:id', validateToken, function(req, res){
  const _id = req.params.id;
  console.log('DELETE', _id);
  Conversation.findOneAndRemove({ _id })
  .then(removedConversation => {
    res.json(removedConversation);
  })
  .catch(err => {
    res.send(err);
  });
});

module.exports = conversationRouter;
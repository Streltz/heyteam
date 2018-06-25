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
	console.log('USER ID GET CONVO', req.decoded);
  const { userId } = req.decoded;
  console.log('DECODED', req.decoded);
	Conversation.find({uid: userId})
  .populate('responses')
  .exec((err, conversations) => {
    if(err) console.log(err);
    console.log('CONVOS FROM DB', conversations);
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
    hour = Number(timeArray[0]) + 12;
  }
  return hour;
}

conversationRouter.post('/conversation', validateToken, function(req, res){
    console.log('REQBODY', req.body);
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
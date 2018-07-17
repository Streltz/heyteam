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

const convertTime = (time, ampm, zone, days)=>{
  let localHour = null;
  let newTime = time.split(':')[0];
  if(ampm === 'AM'){
    localHour = newTime;
  }else if(ampm === 'PM'){
    if(newTime === '12'){
      newTime = '0';
    }
    localHour = Number(newTime) + 12;
  }
  const timeData = [
    {timezone: 'PST', difference: 7}, 
    {timezone: 'MST', difference: 6}, 
    {timezone: 'CST', difference: 5}, 
    {timezone: 'EST', difference: 4}
    ]
  timeData.forEach(time=>{
    if(zone === time.timezone){
      if(localHour > 24 - time.difference){
        localHour = (localHour + time.difference) - 24;
        days.forEach((day, i)=>{
          days[i]++;
        });
      }else{
        localHour = Number(localHour) + time.difference;
      }
    }
  });
  return {time: localHour, days};
}

const scheduleTime = (time, ampm, zone, schedule_days) => {
  let arr = [];
  for (x of schedule_days) {
      switch (x) {
        case 0:
          arr.push('Sun')
          break;
        case 1:
          arr.push('Mon')
          break;
        case 2:
          arr.push('Tue')
          break;
        case 3:
          arr.push('Wed')
          break;
        case 4:
          arr.push('Thurs')
          break;
        case 5:
          arr.push('Fri')
          break;
        case 6:
          arr.push('Sat')
          break;
      }
  }
  const days = arr.join(' ');
  return (days + ' ' + time + ' ' + ampm + ' ' + zone)
}

conversationRouter.post('/conversation', validateToken, function(req, res){
    const { userId } = req.decoded;
    const { question, title, time, ampm, timezone, schedule_days, participants} = req.body;
    const conversation = new Conversation();
    const timeSync = convertTime(time, ampm, timezone, schedule_days);
    console.log('TimeSync: ', timeSync);
    conversation.uid = userId;
    conversation.title = title;
    conversation.time = timeSync.time;
    conversation.timeZone = timezone;
    conversation.schedule_days = timeSync.days;
    conversation.created_on = scheduleTime(time, ampm, timezone, schedule_days);
    conversation.question = question;
    conversation.participants = participants; 
    conversation.save().then(savedConversaton => {
      res.json(savedConversaton);
    })
    .catch(err => {
      console.log('convo post err: ', err);
      // res.send(err);
    });
});

conversationRouter.put('/conversations/:id', validateToken, function(req, res){
  if(req.body.type === 'resetNewMessage'){
    Conversation.findById(req.body.id)
  .then(conversation => {
    conversation.newMessages = 0;
    conversation.save().then(updated=>{
      Conversation.findById(updated._id)
      .populate('responses')
  .exec((err, convo) => {
      res.json(convo);
  });
      
    });
  })
  .catch(err => {
    res.send(err);
  });

  }else{
  const {id} = req.params;
  const { question, title, time, ampm, timezone, schedule_days, participants} = req.body;
  Conversation.findById(id)
  .then(conversation => {
    conversation.title = title;
    // conversation.time = convertTime(time, ampm, timezone);
    conversation.schedule_days = schedule_days;
    conversation.question = question;
    conversation.participants = participants; 
    conversation.save().then(updated=>{
      Conversation.findById(updated._id)
      .populate('responses')
  .exec((err, convo)=>{
      res.json(convo);
  });
      
    });
  })
  .catch(err => {
    res.send(err);
  });
}
});

conversationRouter.delete('/conversations/:id', validateToken, function(req, res){
  const _id = req.params.id;
  Conversation.findOneAndRemove({ _id })
  .then(removedConversation => {
    res.json(removedConversation);
  })
  .catch(err => {
    res.send(err);
  });
});

module.exports = conversationRouter;
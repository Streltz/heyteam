const express = require('express');
const Response = require('../models/conversationModel.js');
const conversationRouter = express.Router();
const Conversation = require('../models/conversationModel');
const Question = require('../models/questionModel');
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
  const questionArray = [];
  questions.forEach(question => {
      questionArray.push({text: question});
  });

  Question.insertMany(questionArray).then(savedQuestions => {
    const { questions, title, time, schedule} = req.body;
    const conversation = new Conversation();
    conversation.uid = req.decoded.userId;
    conversation.title = title;
    converstaion.time = time;
    conversation.schedule = schedule;
    conversation.questions = savedQuestions;

    conversation.save().then(savedConversaton => {
      // TODO:
      // set a timer or a scheduler to send out the questions to slack users
      // set a listener to listen to responses from slack user
      // save responses to db
      res.json(savedConversaton);
    })
    .catch(err => {
      res.send(err);
    });
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
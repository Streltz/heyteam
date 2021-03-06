const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { RTMClient, WebClient } = require('@slack/client');
const mailer = require('./mailer');

const Conversation = require('./models/conversationModel');
const Response = require('./models/responseModel');

const token = process.env.slackToken;

const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const billingRouter = require('./routes/payment');
const app = express();
const server = require('http').createServer(app);  
// const slackAPI = require('./slack_api');
var io = require('socket.io')(server);

const mLab = process.env.MLAB_URI || 'mongodb://localhost:27017/heyteam';


function getTime(){
  const time = new Date().toString().split(' ');
  const hour = time[4].split(':');
  const modTime = `${time[0]} ${time[1]} ${time[2]} - ${hour[0]}:${hour[1]}${hour[0] > 11 ? 'PM' : 'AM'}`;
return modTime;
}

console.log('process.env ', process.env.NODE_ENV);

if (!token) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// server.use(cors({
//   origin: 'https://whispering-journey-17247.herokuapp.com',
//   credentials: true
// }));
app.use(cors());

app.use(bodyParser.json());

// || 'mongodb://localhost:27017/heyteam'
//process.env.MLAB_URI
mongoose
  .connect(mLab)
  .then(conn => {
    console.log('connected to mongo HeyTeam');
  })
  .catch(err => {
    console.log('error connect to mongo', err);
});

app.use('/', userRoutes, conversationRoutes, billingRouter);

/////////////////////////////////////////////
const rtm = new RTMClient(token);
// Start the connection to the platform
rtm.start();


setInterval(() => {       
  Conversation.find({}).then(conversations => {
    // console.log('CONVO DB');
    conversations.forEach(conversation=>{
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      
      // console.log('TIME', hour, day);
      if(hour === conversation.time 
        && conversation.schedule_days.includes(day)
        && conversation.daySent !== day 
        && conversation.active === true){
        console.log('PASS IF STATEMENT');
        lastQuestion = conversation._id;
        //edit the daySent to day
        conversation.daySent = day;
        conversation.dateSent = getTime();
        conversation.save();
        conversation.participants.forEach(user=>{
          console.log()
          rtm.sendMessage(conversation.question, user.channelId).then(res=>{
            console.log('Sent and Res', res);
          });
        }); 
      }
    });
  }).catch(err => {
    console.log(err);
  });
}, 5000);
/////////////////////////////////////


let socketClients = [];
io.on('connection', function(client){
  console.log('connected to socket');
  console.log('client ID: ', client.id);
  console.log('new client connected');
  socketClients.push(client);
  client.emit('who connect');
  client.on('user connect', function(username){
    usersConnected.push(username);
    idConnected.push(client.id);
  });

  client.on('disconnect', function(){
    console.log('client disconnect', client.id);
  });
});

// Initialize an RTM API client
rtm.on('message', (event) => {
  console.log('*****SLACK REPLY****', event.text);
if(event.channel[0] === 'D' && event.channel[1] === 'B'){
  Conversation.find({}).then(conversations => {
    let userConvos =[];
    conversations.forEach(convo => {
      convo.participants.forEach(user => {
        if (user.id === event.user && convo.dateSent) {
          userConvos.push(convo);
        }
      });
    });

    const user = userConvos[0].participants.find(user => {
      return user.id === event.user;
    });

    const latestConvo = userConvos[userConvos.length - 1];
    console.log('latestConvo', latestConvo);

    Response.findOne({conversation: latestConvo._id, username: user.name}).then(res => {
      console.log('FIND ONE RES', res);
      if(res){
        res.texts.push({text: event.text, time: getTime()});
        res.save().then(resSaved=>{
          console.log('SAVED', resSaved);
          console.log('Lated Convo', latestConvo);
          latestConvo.newMessages += 1;
          latestConvo.save()
          .then(saved=>{
            console.log('SAVED RESPONSE');
            //TODO: find a way to save and populate all in one query intead of using another findById
            Conversation.findById(saved._id).populate('responses').populate('uid').exec((err, populated)=>{
              console.log('PPOULATED RESPONSE', populated);
              if(err) console.log(err);
              socketClients.forEach(client=>{
                client.emit('new response', {convo: populated, response: resSaved});
              });
            });
          });
        });
      }else{
        const newRes = new Response();
        newRes.username = user.name;
        newRes.user_image = user.profile.image_32;
        newRes.conversation = latestConvo._id;
        newRes.question = latestConvo.question;
        newRes.texts = [{text: event.text, time: getTime()}];
        newRes.date_submitted = new Date();
        newRes.save().then(resSaved => {
          console.log('SAVED RES', resSaved);
          latestConvo.responses.push(resSaved._id);
          latestConvo.newMessages += 1;
          console.log('CONVO AFTER PUSHED RES', latestConvo);
          latestConvo.save()
          .then(saved=>{
            //TODO: find a way to save and populate all in one query intead of using another findById
            Conversation.findById(saved._id).populate('responses').populate('uid').exec((err, populated)=>{
              if(err) console.log(err);
              socketClients.forEach(client=>{
                client.emit('new response', {convo: populated, response: resSaved});
              });
            });
          });
        });
      }
    })     
  });
}
});


const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
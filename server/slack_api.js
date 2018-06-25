const { RTMClient, WebClient } = require('@slack/client');
const mongoose = require('mongoose');
const Conversation = require('./models/conversationModel');
const Response = require('./models/responseModel');
console.log('SLACK API');
const token = 'xoxb-154966377728-379472016500-tmzYflE4ynkTMQikM8eP8BYg'

if (!token) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// Initialize an RTM API client
const rtm = new RTMClient(token);

// Start the connection to the platform
rtm.start();

setInterval(() => {        
    Conversation.find({})
        .then(conversations => {
            // console.log('CONVO DB', conversations);
            conversations.forEach(conversation=>{
               const now = new Date();
                const hour = now.getHours();
                const day = now.getDay();
                // console.log('TIME', hour, day);
                if(hour === conversation.time 
                    && conversation.schedule_days.includes(day) 
                    && !conversation.sent 
                    && conversation.daySent !== day 
                    && conversation.active === true){
                        console.log('PASS IF STATEMENT');
                        lastQuestion = conversation._id;
                        //edit the daySent to day
                        conversation.daySent = day;
                        conversation.dateSent = Date.now();
                        conversation.save();
                        conversation.participants.forEach(user=>{
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


rtm.on('message', (event) => {
    console.log('user: ',event.user);
    console.log('message: ',event.text);
    
    Conversation.find({})
    .then(conversations => {
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
        
            const newRes = new Response();
            newRes.username = user.name;
            newRes.user_image = user.profile.image_32;
            newRes.conversation = latestConvo._id;
            newRes.question = latestConvo.question;
            newRes.text = event.text;
            newRes.date_submitted = new Date();
            newRes.save().then(res => {
                latestConvo.responses.push(res._id)
                latestConvo.save();
            });
            });

});
    // Todo after lunch:
    //Find conversation by participants.findBy(user => user.id)


    // Conversation.participants.forEach(user => {
    //     if (user == event.channel) update_resp(event.text);
    // });
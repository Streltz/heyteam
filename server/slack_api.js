const { RTMClient, WebClient } = require('@slack/client');
const mongoose = require('mongoose');
const Conversation = require('./models/conversationModel');
console.log('SLACK API');
const token = 'xoxb-154966377728-379472016500-tmzYflE4ynkTMQikM8eP8BYg'

if (!token) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// Initialize an RTM API client
const rtm = new RTMClient(token);

// Start the connection to the platform
rtm.start();


setInterval(() => {  
    console.log('sending');         
    Conversation.find({})
        .then(conversations => {
            conversations.forEach(conversation=>{
               const now = new Date();
                const hour = now.getHours();
                const day = now.getDay();
                if(hour >= conversation.time && conversation.schedule_days.includes(day) && !conversation.sent){
                    conversation.participants.forEach(user=>{
                        rtm.sendMessage(conversation.question, user.channelId).then(res=>{
                            console.log('RES after sent', res);
                        });
                    });
                    
                } 
            });
           
        }).catch(err => {
            console.log(err);
        });
}, 1000);

const Send = (participants, question) => {

    const update_resp = (content) => {
        console.log(content, "inserted");
    }

    // loop users
    model.participants.forEach(user => {
        rtm.sendMessage(question, user)
            .then(res => {
                // console.log(res)
            })
    })

    // catch message
    rtm.on('message', (event) => {
        model.participants.forEach(user => {
            if (user == event.channel) update_resp(event.text);
        });
    });

}


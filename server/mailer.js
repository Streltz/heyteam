const nodemailer = require('nodemailer');
const Conversation = require('./models/conversationModel');


const botEmail = 'hey.bot360@gmail.com'

function groupEmail(array){
    const mail = {};
    array.forEach(convo => {
      if(!mail[convo.email]){
        mail[convo.email] = { conversations: [{question: convo.question, responses: []}]}
      }else{
        mail[convo.email].conversations.push({question: convo.question, responses: []});
      }
    });
    return mail;
}
// const sendTime = 18;

// setInterval(() => {
    const now = new Date();
    let emailList = [];
    Conversation.find({}).populate("uid").populate("responses").exec((err, conversations) => {
        if (err) {
            console.log('error: ', err)
        }
        conversations.forEach(convo => {
            console.log('convo: ', convo);
            const userObject = {
                email: convo.uid.email,
                question: convo.question,
                responses: []
            }
            convo.responses.forEach(res => {
                console.log('stringsplitjoin res: ' , res.date_submitted.toString().split('').slice(3, 15).join(''))
                console.log('stringsplitjoin now : ', now.toString().split('').slice(3, 15).join(''));
                if (res.date_submitted.toString().split('').slice(3, 15).join('') == now.toString().split('').slice(3, 15).join('')) {
                    userObject.responses.push(res);
                }
            })
            if (userObject.responses.length > 0) {
                emailList.push(userObject);
            }
        })
        const mailReady = groupEmail(emailList);
        const placeHolder = 'hello world'
        console.log('mailList: ', emailList);
        console.log('mailReady: ', mailReady);
        
        // for (key in mailReady) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: botEmail,
                  pass: '!heyteam!5'
                }
              })
            const mailOptions = {
                from: botEmail,
                to: 'teamsky916@gmail.com',
                subject: `Hey-Bot Digest`,
                text: placeHolder
              }
              transporter.sendMail(mailOptions, function(err, res) {
                if (err) {
                  console.error('there was an error: ', err);
                } else {
                  console.log('here is the res: ', res)
                }
            })
            
        // }
    })
// }, 10000)

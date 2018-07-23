const nodemailer = require('nodemailer');
const Conversation = require('./models/conversationModel');


const botEmail = 'hey.bot360@gmail.com'

const sendTime = 23;

setInterval(() => {
    const now = new Date();
    if (now.getHours() == sendTime) {

        let emailList = [];
        Conversation.find({}).populate("uid").populate("responses").exec((err, conversations) => {
            if (err) {
                console.log('error: ', err)
            }

            conversations.forEach(convo => {
                // check user's email preference
                if(convo.uid.sendEmail === 'On'){
                    const userObject = {
                        email: convo.uid.email,
                        question: convo.question,
                        responses: []
                    }
                    // build user email list
                    convo.responses.forEach(res => {
                        if (res.date_submitted.toString().split('').slice(3, 15).join('') == now.toString().split('').slice(3, 15).join('')) {
                            userObject.responses.push(res);
                        }
                    })
                    if (userObject.responses.length > 0) {
                        emailList.push(userObject);
                    }
                }
            })
            // restructure email list into structure of single email with many conversions
            const mailReady = groupEmail(emailList);
            // loop thorugh emailReady to send out email
            for (key in mailReady) {
                console.log('MAILREADY', mailReady[key]);
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: botEmail,
                    pass: '!heyteam!5'
                    }
                })

                // build html template for email
                let convos = ''
                mailReady[key].conversations.forEach(convo=>{
    
                    const question = `<div>${convo.question}</div>`
                    let resp = '';
                    convo.responses.forEach(res=>{
                        res.texts.forEach(obj=>{
                            resp += `
                            <div>${res.username}: ${obj.text} ${obj.time}</div>`;
                        });
                    });
                    convo = `
                    <div>
                        ${question}
                        ${resp}
                    </div>`
                    convos += convo;
                });

                const mailOptions = {
                    from: botEmail,
                    to: key,
                    subject: `Hey-Bot Daily Digest`,
                    html: convos
                }
                // send email
                transporter.sendMail(mailOptions, function(err, res) {
                    if (err) {
                    console.error('there was an error: ', err);
                    } else {
                    console.log('here is the res: ', res)
                    }
                })
                
            }
        })
    }
}, 3600000)

// function to group email list
function groupEmail(array){
    const mail = {};
    array.forEach(convo => {
      if(!mail[convo.email]){
        mail[convo.email] = { conversations: [{question: convo.question, responses: convo.responses}]}
      }else{
        mail[convo.email].conversations.push({question: convo.question, responses: convo.responses});
      }
    });
    return mail;
}

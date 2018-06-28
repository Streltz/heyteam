const nodemailer = require('nodemailer');
const Conversation = require('./models/conversationModel');


const botEmail = 'hey.bot360@gmail.com'

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
const sendTime = 18;

setInterval(() => {
    const now = new Date();
    if (now.getHours() == sendTime) {

        let emailList = [];
        Conversation.find({}).populate("uid").populate("responses").exec((err, conversations) => {
            if (err) {
                console.log('error: ', err)
            }
            conversations.forEach(convo => {
                // console.log('convo: ', convo);
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
            console.log('mailList: ', emailList);
            console.log('mailReady CONVO XXXXXXXXXXX: ', mailReady);
            
            for (key in mailReady) {
                console.log('MAILREADY', mailReady[key]);
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: botEmail,
                    pass: '!heyteam!5'
                    }
                })
                // <div wrapper>
                    // <div convo>
                    //     <div question>question</div>
                    //     <div response>response</div>
                    //     <div response>response</div>
                    // <div>
                // < wrapper>
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
                    to: botEmail,
                    subject: `Hey-Bot Daily Digest`,
                    html: convos
                }
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
}, 360000)

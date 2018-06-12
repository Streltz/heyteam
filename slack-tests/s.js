/**
 * Example for using the Slack RTM API.
 */

const { RTMClient, WebClient } = require('@slack/client');

// Get an API token by creating an app at <https://api.slack.com/apps?new_app=1>
// It's always a good idea to keep sensitive data like the token outside your source code. Prefer environment variables.
const token = 'xoxb-154966377728-379472016500-tmzYflE4ynkTMQikM8eP8BYg'

if (!token) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// Initialize an RTM API client
const rtm = new RTMClient(token);

// Start the connection to the platform
rtm.start();

// model
const model =
    {
        uid: "U8HHMPPFH",
        title: "Test",
        schedule_days: [0, 1, 6],
        time: 20.5,
        count: 0,
        question: "how are you",
        participants: ["DB5QNPEGM","DB792TV0X"],
        reponses: [
            {
                response_text: ["a"],
                date_submitted: ""
            }]
    };

// Log all incoming messages
// rtm.on('message', (event) => {
const insert = (content) =>
{
    console.log(content, "inserted");
}

model.participants.forEach(user => {
    rtm.sendMessage(model.question, user)
        .then(res => {
            // console.log(res)
        })
})

rtm.on('message', (event) => {
        model.participants.forEach(user => {
            if(user == event.channel) insert(event.text);
        });
    });

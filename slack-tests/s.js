/**
 * Example for using the Slack RTM API.
 */

const { RTMClient } = require('@slack/client');

// Get an API token by creating an app at <https://api.slack.com/apps?new_app=1>
// It's always a good idea to keep sensitive data like the token outside your source code. Prefer environment variables.
const token = 'xoxb-154966377728-379472016500-tmzYflE4ynkTMQikM8eP8BYg'

if (!token) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// Initialize an RTM API client
const rtm = new RTMClient(token);

// Start the connection to the platform
rtm.start();

// Log all incoming messages
rtm.on('message', (event) => {
    // Structure of `event`: <https://api.slack.com/events/message>
    // console.log(`Message from ${event.user}: ${event.text}`);
    //rtm.sendMessage("hi", event.channel);
    console.log(event);
})

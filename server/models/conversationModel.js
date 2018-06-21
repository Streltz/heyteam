const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ConversationSchema = new mongoose.Schema({
	 uid: {type: ObjectId, ref: 'User'},
	title: {type: String, required: true},
schedule_days: [{type: Number}],
	time: {type: mongoose.Schema.Types.Decimal128},
 	question: {type: String},
 	participants: [{type: mongoose.Schema.Types.Mixed}],
reponses: [{type: ObjectId, ref: 'Response'}],
	sent: {type: Boolean, default: false}
});

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

module.exports = ConversationModel;

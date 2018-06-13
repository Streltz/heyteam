const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ConversationSchema = new mongoose.Schema({
	uid: {type: ObjectId, ref: 'User'},
	title: {type: String, required: true},
	schedule_days: {type: [Number]},
	time: {type: mongoose.Schema.Types.Decimal128},
	questions: [{type: mongoose.Schema.Types.Mixed}],
	participant: {type: [String]},
	reponses: [{type: ObjectId, ref: 'Response'}]
});

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

module.exports = ConversationModel;

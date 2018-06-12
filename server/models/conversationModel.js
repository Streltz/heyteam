const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ConversationSchema = new mongoose.Schema({
	uid: {type: ObjectId, ref: 'User'},
	title: {type: String, required: true},
	schedule_days: {type: [Number]},
	time_info: {type: mongoose.Schema.Types.Decimal128},
	questions: [{type: ObjectId, ref: 'Question'}],
	participant: {type: [String],  required: true}
});

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

module.exports = ConversationModel;

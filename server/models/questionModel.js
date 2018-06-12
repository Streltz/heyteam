const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuestionSchema = new mongoose.Schema({
	user: {type: ObjectId, ref: 'User', required: true},
	responses: [{type: ObjectId, ref: 'Response'}],
	conversation: {type: ObjectId, ref: 'Conversation'},
	text: {type: String}
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuestionSchema = new mongoose.Schema({
	text: {type: String, required: true},
	conversation: {type: ObjectId, ref: 'Conversation'},
	sent: false,
	responded: false
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;
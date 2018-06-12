const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ResponseSchema = new mongoose.Schema({
	participant: {type: String, required: true},
	conversation: {type: ObjectId, ref: 'Conversation'},
	question: {type: ObjectId, ref: 'Conversation'},
	response_text:{type: String, required: true},
	date_submitted: {Type: Date},
});

const ResponseModel = mongoose.model('Response', ResponseSchema);

module.exports = ResponseModel;
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ResponseSchema = new mongoose.Schema({
	username: {type: String, required: true},
	conversation: {type: ObjectId, ref: 'Conversation'},
	question: {type: String},
	text: {type: String},
	// date_submitted: {Type: String},
});

const ResponseModel = mongoose.model('Response', ResponseSchema);

module.exports = ResponseModel;
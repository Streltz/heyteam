const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ResponseSchema = new mongoose.Schema({
	username: {type: String, required: true},
	user_image: {type: String},
	conversation: {type: ObjectId, ref: 'Conversation'},
	question: {type: String},
	texts: [{type: mongoose.Schema.Types.Mixed}],
	date_submitted: {type: mongoose.Schema.Types.Mixed}
});

const ResponseModel = mongoose.model('Response', ResponseSchema);

module.exports = ResponseModel;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ResponseSchema = new mongoose.Schema({
	username: {type: String, required: true},
	date_submitted: {Type: Date},
	response: [{type: ObjectId, ref: 'Answer'}]
});

const ResponseModel = mongoose.model('Response', ResponseSchema);

module.exports = ResponseModel;
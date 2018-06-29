const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	sendEmail: {type: String, default: 'On'}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
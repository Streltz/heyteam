const express = require('express');
const User = require('../models/userModel.js');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { secret } = require('../config');

const secretEnv = process.env.SEC_KEY || secret;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(422)
      .json({ error: 'User not authorized' });
  }
  jwt.verify(token, secretEnv, (authError, decoded) => {
    if (authError) {
      res
        .status(403)
        .json({ error: 'Token invalid, please login', message: authError });
      return;
    }
    req.decoded = decoded;
    next();
  });
};

userRouter.get('/', validateToken, function(req, res){
	User.find({}).then(users => {
		res.json(users);
	}).catch(err => {
		res.send(err);
	});
});


userRouter.post('/signup', function(req, res){
	const { name, email, password } = req.body;
	const user = new User();
	user.name = name;
	user.email = email;
	console.log(name, email, password);
	bcrypt.hash(password, 11, (err, hash) => {
		console.log(err);
		if (err) throw err;
		user.password = hash;
		console.log(user);
		user.save().then(savedUser => {
			res.json(savedUser);
		});
	});
});

userRouter.post('/login', function(req, res){
	const { email, password } = req.body;
	User.findOne({ email }).then(user => {
		if(!user){
			res.json({success: false, message: 'Wrong email or password'});
		}
		if(user){
			userObject = {
				username: user.name,
				email: user.email,
				userId: user._id
			}
			bcrypt.compare(password, user.password, function(err, valid) {
    			if(!valid){
    				res.json({success: false, message: 'Wrong email or password'});
    			}else{
    				const token = jwt.sign(userObject, secretEnv, { expiresIn: '1000h' });
        		   res.json({success: true, token: token, name: user.name });
        		}
			});
		}
	});
});

userRouter.post('/search-participant', function(req, res){
	const { search } = req.body;
	// TODO
	// use slack api to look up slack user by search term
	// send back response with a slack user
});

module.exports = userRouter;
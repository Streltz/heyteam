const express = require('express');
const User = require('../models/userModel.js');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { secret } = require('../config');
const stripe = require('../stripe');
const axios = require('axios');

const secretEnv = process.env.SEC_KEY || 'secret';

const slackURL = `https://slack.com/api/users.list?token=${process.env.slackToken}`;



const validateToken = (req, res, next) => {
  const token = req.headers.token;
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
	// console.log(name, email, password);
	bcrypt.hash(password, 11, (err, hash) => {
		console.log(err);
		if (err) throw err;
		user.password = hash;
		// console.log(user);
		user.save().then(savedUser => {
			// console.log('savedUser', savedUser);
			res.json({success: true, savedUser});
		}).catch(err => {
			if (err.code == 11000){
				res.send({error: 11000});
			}
		})
	});
});

userRouter.post('/preference', validateToken, function(req, res){
 	User.findById(req.decoded.userId).then(user=>{
 		user.sendEmail = req.body.pref;
 		user.save().then(saved=>{
 			res.json(saved);
 		});
 	});
});

userRouter.post('/login', function(req, res){
	const { email, password } = req.body;
	User.findOne({ email }).then(user => {
		if(!user){
			console.log('USER NOT FOUND');
			res.json({success: false, message: 'Invalid Email or Password'});
		}
		if(user){
			userObject = {
				username: user.name,
				email: user.email,
				userId: user._id
			}
			bcrypt.compare(password, user.password, function(err, valid) {
    			if(!valid){
    				console.log('LOGIN FAIL: WRONG EMAIL OR PASSWORD');
    				res.json({success: false, message: 'Invalid Email or Password'});
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

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({ error: stripeErr });
    } else {
        res.status(200).send({ success: stripeRes });
    }
}

// stripeRouter.get('/billing', (req, res) => {
//     res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
// });

userRouter.post('/billing', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
});

userRouter.get('/getusers', (req, res) => {
	axios.get(`${slackURL}`)
    .then(users => {
		console.log('users: ', users.data);
        res.send(users.data)
	})
	.catch(err => console.log('fetch error: ', err))
});



module.exports = userRouter;
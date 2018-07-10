const configureStripe = require('stripe');

//NOTE: chagne life and test token
const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_live_MY_SECRET_KEY'
    : 'sk_test_MY_SECRET_KEY';

const stripe = configureStripe('sk_test_TwTTlid3GeOG6YPydOjARw4I');

module.exports = stripe;
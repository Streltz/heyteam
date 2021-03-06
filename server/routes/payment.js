const express = require('express');
const stripe = require('../stripe');
const billingRouter = express.Router();

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({ error: stripeErr });
    } else {
        res.status(200).send({ success: stripeRes });
    }
}

// const paymentAPI = bill => {
    // billingRouter.get('/billing', (req, res) => {
    //     res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
    // });

    const amountFix = x => {
        return Math.round(100 * parseFloat(x.toString().replace(/[$,]/g, '')));
      }

    billingRouter.post('/billing', (req, res) => {
        console.log('amount: ', req.body.amount);
        stripe.charges.create({
            amount: amountFix(req.body.amount),
            currency: "usd",
            description: "An example charge",
            source: req.body.token
        }).then(status=>{
            console.log('after reacte status', status);
            res.json(status);
        });
    });

//     return bill;
// };

module.exports = billingRouter;
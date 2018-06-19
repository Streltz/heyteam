const stripe = require('../stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({ error: stripeErr });
    } else {
        res.status(200).send({ success: stripeRes });
    }
}

const paymentAPI = bill => {
    app.get('/billing', (req, res) => {
        res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
    });

    app.post('/billing', (req, res) => {
        stripe.charges.create(req.body, postStripCharge(res));
    });

    return bill;
};

module.exports = paymentAPI
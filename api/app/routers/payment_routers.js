module.exports = function(app, db) {
    app.post('/payment', (req, res) => {
        db.collection('payments').insertOne(req.body, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send({
                    "RequestId": result.insertedId,
                    "Amount":req.body['Amount']
                });
            }
        });
    });
};


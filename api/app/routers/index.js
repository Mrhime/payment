const paymentRouters = require('./payment_routers');
module.exports = function(app, db) {
    paymentRouters(app, db);
};
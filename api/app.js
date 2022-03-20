
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const db             = require('./config/db');
const app            = express();
const cors           = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}));
MongoClient.connect(db.url, (err, database) => {
    console.log('MongoClient_Connected')
    if (err) return console.log(err)
    const db = database.db('payments');
    require('./app/routers/payment_routers')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})


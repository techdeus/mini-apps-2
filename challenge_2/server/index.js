require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const Axios = require('axios');
const Redis = require('redis');
const Client = Redis.createClient();

Client.on('connect', () => {
    console.log('Redis client connected');
});

Client.on('error', () => {
    console.log(error);
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/getPrices', (req, res) => {
    const date = req.query.date;
    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${date[0]}&end=${date[1]}`;
    Client.get(`${date[0]}-${date[1]}`, (error, data) => {
        if (data) {
          res.status(200).set('Content-Type', 'application/json').send(data);  
        } else {
            Axios.get(url)
                .then((data) => {
                    let results = data.data.bpi;
                    res.status(200).send(results);
                    Client.set(`${date[0]}-${date[1]}`, JSON.stringify(results));
                })
                .catch(function (error){
                    console.log(error);
                });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

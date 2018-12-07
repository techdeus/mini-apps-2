require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const Axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/getPrices', (req, res) => {
    const date = req.query.date;
    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${date[0]}&end=${date[1]}`;
    Axios.get(url)
      .then((data) => {
        let results = data.data.bpi;
        res.status(200).send(results);
      })
      .catch(function (error){
          console.log(error);
      });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

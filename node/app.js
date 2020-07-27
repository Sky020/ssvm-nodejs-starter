const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const URL = 'https://www.google.com/search?q=pound+to+rand&rlz=1C1CHBF_en-GBGB822GB822&oq=pund+to+rand&aqs=chrome.1.69i57j0l5.4103j1j4&sourceid=chrome&ie=UTF-8';
const { get_max, get_min } = require('../pkg/ssvm_nodejs_starter_lib.js');
const data = require('./rand_time_data.json');

const app = express();

app.use(express.json());

app.route('/get_max').get((req, res) => {
  res.json(JSON.parse(get_max(JSON.stringify(data))));
});
app.route('/get_min').get((req, res) => {
  res.json(JSON.parse(get_min(JSON.stringify(data))));
})
// app.route('/update').get((req, res) => {
//     res.json(getRand());
// })
app.get('/', (req, res) => {
  res.send('<h1>Great British Pound to South African Rand API</h1><h2>Available Endpoints:</h2><ul><li>/get_max</li><li>/get_min</li><li>/update</li></ul>');
})

app.listen(3000, () => {
  console.log("App listening on port 3000...")
})


// Future impl.
// function getRand() {
//     axios(URL).then(html => {
//         const $ = cheerio.load(html.data);
//         const rand = $("td > input");
//         console.log(rand);
//         return rand;
//     })


// }
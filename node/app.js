const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const URL = 'https://www.google.com/search?q=pound+to+rand&rlz=1C1CHBF_en-GBGB822GB822&oq=pund+to+rand&aqs=chrome.1.69i57j0l5.4103j1j4&sourceid=chrome&ie=UTF-8';
const { get_max, get_min } = require('../pkg/rand_tracker.js');
const data = require('./rand_time_data.json');
const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36" };


const app = express();

app.use(express.json());

app.route('/get_max').get((req, res) => {
  res.json(JSON.parse(get_max(JSON.stringify(data))));
});
app.route('/get_min').get((req, res) => {
  res.json(JSON.parse(get_min(JSON.stringify(data))));
})
app.route('/update').get(async (req, res) => {
  const rand = await getRand();
  const date = new Date();
  res.json({ newValue: rand, date: `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}` });
})
app.get('/', (req, res) => {
  res.send('<h1>Great British Pound to South African Rand API</h1><h2>Available Endpoints:</h2><ul><li>/get_max</li><li>/get_min</li><li><a href="/update">/update</a></li></ul>');
})

app.listen(3000, () => {
  console.log("App listening on port 3000...")
})


// Future impl.
async function getRand() {
  return axios(URL, headers).then(html => {
    const $ = cheerio.load(html.data);
    const rand = $("div.BNeawe.iBp4i.AP7Wnd")[1].children[0].data.slice(0, 5);
    console.log(rand);
    return rand;
  })
}
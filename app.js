const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config()
// const Nexmo = require('nexmo');

const app = express();

// const nexmo = new Nexmo({
//   apiKey: '5230fb1d',
//   apiSecret: 'X9g7TqouvjkiRx7f',
// });

const williamNumber = '5521995640965'
const joaoNumber = '5521966624800'
const mylenaNumber = '5521997869268'

// nexmo.verify.request({
//   number: '5521995640965',
//   brand: 'Vonage',
//   code_length: '4'
// }, (err, result) => {
//   console.log(err ? err : result)
// });

// nexmo.verify.check({
//   request_id: '56f72f0087ea420a8a12d79f8431d08e',
//   code: '5739'
// }, (err, result) => {
//   console.log(err ? err : result)
// });

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods',  'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,   Content-Type, X-Codingpedia, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ apiStatus: "ok" });
});

require("./routes/numeroClonado.routes")(app);
require("./routes/mail.routes")(app);
require("./routes/contatosGmail.routes")(app);
require("./routes/vonageApi.routes")(app);
require("./routes/twilioApi.routes")(app);

const PORT = process.env.PORT || 8564
app.listen(PORT, () => {
    console.log('Start port ' + PORT)
    console.log('Servidor iniciado na porta ' + PORT)
});
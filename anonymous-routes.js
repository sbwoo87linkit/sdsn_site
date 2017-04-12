var express = require('express'),
    quoter  = require('./quoter')
    // multer  = require('multer')

var app = module.exports = express.Router();

// var upload = multer({ dest: './uploads' });
// app.use(multer({dest:'./uploads/'}).single('singleInputFileName'));

app.get('/api/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});

app.post('/photos', function (req, res) {
  console.log(req.body) // form fields
  console.log(req.files) // form files
  res.status(204).end()
})
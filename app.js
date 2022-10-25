const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async(req, res) => {
  let allTheBeers = await punkAPI.getBeers();
  console.log(allTheBeers[0]);
  res.render('beers', {allTheBeers});
});

app.get('/randombeer', async(req, res) => {
  let randomBeer = await punkAPI.getRandom();
  //console.log(allTheBeers[0]);
  res.render('randombeer', {randomBeer});
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

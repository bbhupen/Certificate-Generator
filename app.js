var createError = require('http-errors');
var express = require('express');
var path = require('path');
const PORT = 2000

var indexRouter = require('./routes/index');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'pug');
app.use('/', indexRouter);


app.listen(PORT , ()=>{
  console.log(`Listening on port ${PORT}`)
})



var createError = require('http-errors');
var express = require('express');
var path = require('path');
const PORT = 2000

var indexRouter = require('./routes/index');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.listen(PORT , ()=>{
  console.log(`Listening on port ${PORT}`)
})

module.exports = app;

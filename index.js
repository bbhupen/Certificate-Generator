var express = require('express')
var xlsx = require('xlsx')
var fs = require('fs')
var path = require('path')
var app = express()
var PORT = 3000


app.set('view engine', 'ejs');
app.use('/images', express.static('images'));
app.use('/scripts', express.static('scripts'))


app.get('/home', (req, res) => {
    res.sendFile(path.join((__dirname+'/views/index.html')))
})

app.listen(3000, function() {
    console.log("Listening to server on port " + PORT)
})
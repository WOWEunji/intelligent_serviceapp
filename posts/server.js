var express = require('express')
var bodyParser = require('body-parser')
var http = require('http').Server(app)
var io = require('socket.io')(http)

var app = express()

app.use(bodyParser.json())
app.use(require('./controller_posts'))
app.use(require('./static.js'))

app.listen(3000, function()
{
	console.log('server listening on', 3000)
})

io.on('connection', function(socket)
{
	console.log('connection complete')
})
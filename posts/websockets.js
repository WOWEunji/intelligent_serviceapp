var io = require('socket.io').listen(3000)

console.log("socket server run ~")

io.sockets.on('connection', function (socket)
{
	io.sockets.on('connection', function (socket)
	{
		socket.on('message', function (data)
		{
			io.sockets.emit('message', data)
		})
	})
})

module.exports = io
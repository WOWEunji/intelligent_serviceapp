var http = require('http')
var fs = require('fs')
var socketio = require('socket.io')
var mongoose = require('mongoose')
var id = 0

var server = http.createServer(function (request, response)
{
	fs.readFile('./webspeechdemo.html', function (error, data)
	{
		response.writeHead(200, {'Content_Type' : 'text/html'})
		response.end(data)
	})
}).listen(52232, function()
{
	console.log('server running at 52232');
})

mongoose.connect('mongodb://localhost:27017/data');
var db = mongoose.connection;

db.once('open', function callback()
{
	console.log("open : success")
})

var userSchema = mongoose.Schema(
{
	word : String,
	etc : String,
	url : String,
})

var lat = 37.5714000000;
var lon = 126.9658000000;
var appkey = "&appKey=4a0b49b3-d1e6-36b9-8d35-6b21fe6edb66"

var Chat = mongoose.model('Chat', userSchema);

var stringdata = new Array()
var io = socketio.listen(server)

io.sockets.on('connection', function (socket){
	id = socket.id;
	var name = null;
	console.log('connection')
	console.log(socket)
	socket.on('send_date', function (data)
	{

		stringdata.push(data)
		extract_weather(stringdata.pop())
		for(var i = 0; i<words.length; i++)
		{
			Chat.find({etc : words[i]}, function (err, docs)
			{
				for(var i = 0, size= docs.length; i<size; i++)
				{
					var url = docs[i].url;
					
					console.log(url);
					socket.emit('data', words[i]);
					socket.emit('responseurl', url);
				}
			})
		}

	})
	// socket.on('getname', function ()
	// {
	// 	socket.emit('data', )
	// 	socket.emit('response.url', url)
	// })
	// socket.on('rint', function (data)
	// {
	// 	console.log('Client Send Data :', data)
	// 	io.sockets.sockets[id].emit('smart', data)
	// })	
})

function extract_letter(s)
{
	var find = "날씨";
	var result = s.indexOf(find);
	if(result>0)
	{
		extract_weather(s);
	}
	console.log(result);	
}
var words;
function extract_weather(s)
{
	words = s.split(" ");
	for(var i = 0; i<words.length; i++)
	{
		console.log(words[i]);
	}
}

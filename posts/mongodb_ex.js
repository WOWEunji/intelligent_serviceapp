var mongoose = require('mongoose');

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

var data = new Chat({word: "날씨", etc : "자외선", url : "http://apis.skplanetx.com/weather/windex/uvindex?version=1"})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})

var data = new Chat({word: "날씨", etc : "자외선지수", url : "http://apis.skplanetx.com/weather/windex/uvindex?version=1"})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})

var data = new Chat({word: "날씨", etc : "빨래", url : "http://apis.skplanetx.com/weather/windex/laundry?version=1"})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})

var data = new Chat({word: "날씨", etc : "체감온도", url : "http://apis.skplanetx.com/weather/windex/wctindex?version=1"})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})

var data = new Chat({word: "날씨", etc : "체감", url : "http://apis.skplanetx.com/weather/windex/wctindex?version=1"})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})

var data = new Chat({word: "날씨", etc : "온도", url : "http://apis.skplanetx.com/weather/windex/wctindex?version=1"})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})

var gname = "세차";
var data = "서울";
var size;
Chat.find({etc : data}, function (err, docs)
{
	for(var i = 0, size= docs.length; i<size; i++)
	{
		var url = docs[i].url;
		url += "&lat"+lat+"&lon"+lon+appkey;
		console.log(url);
	}
})

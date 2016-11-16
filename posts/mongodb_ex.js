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

var data = new Chat({word: "대화", etc : "여자친구", url : "없습니다."})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})

var data = new Chat({word: "대화", etc : "안녕", url : "안녕하세요."})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})
var data = new Chat({word: "대화", etc : "안녕하세요", url : "안녕하세요."})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})
var data = new Chat({word: "대화", etc : "여자친구는", url : "없습니다."})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})

var data = new Chat({word: "대화", etc : "연애는", url : "없습니다."})

data.save(function(err)
{
	if(err)
		console.log('error ocurr =' + err)
})

var data = new Chat({word: "대화", etc : "연애", url : "없습니다."})

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

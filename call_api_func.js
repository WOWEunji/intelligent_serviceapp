function call()
{
	$.ajax
	({
		type : 'GET',
		url : "https://apis.skplanetx.com/tmap/js?version=1&format=javascript&appKey=f072cf7b-5d41-3531-a824-0c2f1be6379e",	
		success : function(data)
		{
			console.log(data)
		}
	})
}
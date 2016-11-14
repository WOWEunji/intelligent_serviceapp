var pos;

if(navigator.geolocation)
{
	navigator.geolocation.,getCurrentPosition(function (position)
	{
		pos = {
			lat : position.coords.latitude,
			lng : position.coords.longitude
		};
	})
	console.log(pos.lat);
	console.log(pos.lng);
}

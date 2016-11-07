
function myLoaction()
{
	if(navigator.geolocation)
	{
		return navigator.geolocation.getCurrentPosition(successHandler);
	}
	else
	{
		alert("no support geolocation");
		return 0;
	}
}
function successHandler(position)
{
	var location = {lat : 0, lng :0};
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	location.lat = latitude;
	location.lng = longitude;
	return location;
	console.log(location);
}
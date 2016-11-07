function load_map()
{
	var map = new Tmap.Map(
			{
				div : "map_div", width : '500px', height :'500px'
			});
			map.addControls([
		    new Tmap.Control.KeyboardDefaults(),
		    new Tmap.Control.MousePosition(),
		    new Tmap.Control.OverviewMap()
			]);
}
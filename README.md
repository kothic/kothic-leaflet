# kothic-leaflet
Leaflet plugin for rendering vector layer using kothic-node

**Warning:** kothic-node is a subject of active (but very slow) development and it's not intended for production use yet. 

== Usage

1. Compile kothic-leaflet to a single file

```
npm i
npm run browserify
```

2. Include dist/kothic.js to your html page
```
<script src="kothic.js"></script>
```

3. Use it as an usual Leaflet layer
```
	<script type="text/javascript">
  var tilesUrl = 'http://localhost:8080/basemap/{z}/{x}/{y}.json';

	var map = new L.Map('map', {
		center: new L.LatLng(54, 83),
		zoom: 16,
		fadeAnimation: false
	});

  new L.TileLayer.Kothic(tilesUrl, {
  	minZoom: 12,
		css: document.getElementById("mapcss").value
  }).addTo(map);
```

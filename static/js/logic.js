// Create map, giving it the topography to display on load.
var myMap = L.map("map", {
  center: [
    0, 0
  ],
  zoom: 2.5,
  layer: [street, topo]
});


// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);


// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

var quakes = new L.LayerGroup();

function chooseColor(depth) {
  if (depth >= 100) return "red";
  else if (depth >= 50) return "orange";
  else if (depth >= 10) return "yellow";
  else return "green";
}

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  L.geoJSON(data, {
    
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    
    style: function(feature, latlng) {
      return {
      // Add circles to the map.
      fillOpacity: 0.75,
      fillColor: chooseColor([feature.geometry.coordinates[2]]),
      // Adjust the radius.
      radius: feature.properties.mag * 2.1,
      }
    },
    
    onEachFeature: function(feature, layer) {
      
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
      <h3>${new Date(feature.properties.time)}</h3>
      <h3>Magnitude: ${feature.properties.mag}</h3>
      <h3>Depth: ${feature.geometry.coordinates[2]}</h3>
      <p>More Info <br>${feature.properties.url}</p>`)
    }

  }).addTo(myMap);

  // Set up the legend.
  var legend = L.control({
    position: "bottomright"
  });


  legend.onAdd = function() {
    var div = L
      .DomUtil
      .create("div", "info legend");
   
    var depth = [
    "Greater than or equal to 100km Depth", 
    "Greater than or equal to 50km Depth", 
    "Greater than or equal to 10km Depth", 
    "Less than 10km Depth"
    ];
    var colors = ["red", "orange", "yellow", "green"];


    for (var i = 0; i < depth.length; i++) {
      div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' +
        depth[i] + (depth[i + 1] ? "<br>": "");
    }
    return div;
  };

  // Adding Legend to the map
  legend.addTo(myMap);
  
});
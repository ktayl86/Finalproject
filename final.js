let stateMap = L.map('finalmap').setView([90.07570266723633, 29.957909116687652], 2)
let basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
L.tileLayer(basemapUrl).addTo(stateMap)
let grayBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(stateMap)
let streetsBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(stateMap)
let basemaps = {
  'Streets': streetsBasemap,
  'Gray canvas': grayBasemap
}
L.control.layers(basemaps).addTo(stateMap)
let point = L.layerGroup().addTo(stateMap)
let bikeShareStationsUrl = 'https://github.com/ktayl86/Finalproject/blob/master/data/Bike_Share_Stations.geojson'
jQuery.getJSON(bikeShareStationsUrl, function (data) {
  let pointStyle = function (feature) {
    let bikeracks = feature.properties.Number_of_Rack_Spaces // get the current number of bike rack spaces attribute
    let pointColor = '#00B9F7' // let the initial color be a darker blue
    if (bikeracks < 15) { pointColor = '#001DF7' } // if the number of bike rack spaces is higher than the average, color it a lighter blue
    return {
      color: pointColor, // use the color variable above for the value
      weight: 1,
      fillOpacity: 0.2
    }
  }
  let onEachFeature = function (feature, layer) {
    let name = feature.properties.Station_Name
    let bikeracks = feature.properties.Number_of_Rack_Spaces
    layer.bindPopup(name + 'Bike Station ' + bikeracks)
    point.addLayer(layer)
  }
  let geojsonOptions = {
    style: pointStyle,
    onEachFeature: onEachFeature
  }
  L.geoJSON(data, geojsonOptions).addTo(stateMap)
})

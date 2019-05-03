// let demoMap = L.Wrld.map('final', '56c1ebf0bd85d63a2da3150e9482f8bf')
let map = L.Wrld.map('finalmap', '56c1ebf0bd85d63a2da3150e9482f8bf', {
  center: [29.95, -90.07],
  zoom: 15
})
map.themes.setWeather(L.Wrld.themes.weather.Clear)
map.themes.setTime(L.Wrld.themes.time.Day)
let bikeShareStationUrl = 'https://github.com/ktayl86/Finalproject/blob/master/data/Bike_Share_Stations.geojson'
// jQuery.getJSON(bikeShareStationUrl, function (geojsonData) {
//   L.geoJSON(geojsonData).addTo(demoMap)
// })
jQuery.getJSON(bikeShareStationUrl, function (geojsonData) {
  L.geoJSON(geojsonData, {
    onEachFeature: createPopup
  }).addTo(map)
})
let createPopup = function (feature, layer) {
  layer.bindPopup(feature.properties.Station_Name)

  let bikeLanesUrl = 'https://github.com/ktayl86/Finalproject/blob/master/data/Bike_Lanes.geojson'
  // jQuery.getJSON(bikeLanesUrl, function (geojsonData) {
  //   L.geoJSON(geojsonData).addTo(demoMap)
  // })
  jQuery.getJSON(bikeLanesUrl, function (geojsonData) {
    L.geoJSON(geojsonData, {
      onEachFeature: createPopup
    }).addTo(map)
  })
  let createPopup = function (feature, layer) {
    layer.bindPopup(feature.properties.StreetName)
  }
}

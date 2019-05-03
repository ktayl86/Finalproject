function init () {
  // let demoMap = L.Wrld.map('final', 'AIzaSyCzuXTzHxqoPOVsEQGIRqPbZZ8__0Yyu9o')
  let map = L.Wrld.map('finalmap', 'AIzaSyCzuXTzHxqoPOVsEQGIRqPbZZ8__0Yyu9o', {
    center: [29.95, -90.07],
    zoom: 15
  })
  map.themes.setWeather(L.Wrld.themes.weather.Clear)
  map.themes.setTime(L.Wrld.themes.time.Day)
  let bikeShareStationUrl = 'https://github.com/ktayl86/Finalproject/blob/master/data/Bike_Share_Stations.geojson'
  // jQuery.getJSON(geojsonUrl, function (geojsonData) {
  //   L.geoJSON(geojsonData).addTo(demoMap)
  // })
  jQuery.getJSON(bikeShareStationUrl, function (geojsonData) {
    L.geoJSON(geojsonData, {
      onEachFeature: createPopup
    }).addTo(map)
  })
  let createPopup = function (feature, layer) {
    layer.bindPopup(feature.properties.Station_Name)
  }
  jQuery('#jackson-square').on('click', function () {
    map.setView([29.957, -90.063], 17, {
      headingDegrees: -45,
      animate: true,
      durationSeconds: 3
    })
  })
  jQuery('#lafayette-square').on('click', function () {
    map.setView([29.949, -90.07], 17, {
      headingDegrees: 0,
      animate: true,
      durationSeconds: 3
    })
  })
}
window.addEventListener('load', init)

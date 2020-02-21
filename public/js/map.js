function GetMap(location_lat, location_log) {
  // map id from div
  var map = new Microsoft.Maps.Map("#map", {
    center: new Microsoft.Maps.Location(location_lat, location_log),
    zoom: 17
  });

  function addPin(pin_lat, pin_log) {
    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(
      { latitude: pin_lat, longitude: pin_log },
      {
        title: document.querySelector("#city").textContent,
        subTitle: "Dream dist",
        text: "1"
      }
    );
    //Add the pushpin to the map
    map.entities.push(pin);
  }
  // run
  addPin(location_lat, location_log);
}

GetMap(lat, log);

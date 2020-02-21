// function displayUrl(e) {
//   e.target;
//   console.log(e.target.src);
//   console.log("test");
// }
// var imageUrl = document.querySelector("img");
// imageUrl.addEventListener("click", displayUrl);

let city = document.querySelector(city).textContent; // check
let monthArr = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];
let month = document.querySelector(month).textContent; //check
let temperature = document.querySelector(temp); // check

axios({
  method: "get",
  url: "https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php",
  headers: {
    "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
    "x-rapidapi-key": "9975aefe3cmshc785da6a166f45ep17daf0jsn5b970bd4ef8e"
  },
  params: { location: city }
}).then(location => {
  let lon = location.body.Results[0].lon;
  let lat = location.body.Results[0].lat;

  //map(lat,lon)

  const url = `https://api.meteostat.net/v1/stations/nearby?lat=${lat}&lon=${lon}&limit=5&key=oXO0gSip`;
  axios.get(url).then(station => {
    let stationId = station.data.data[0].id;
    const url = `https://api.meteostat.net/v1/climate/normals?station=${stationId}&key=oXO0gSip`;
    axios.get(url).then(result => {
      temperature.textContent =
        result.data.data.temperature[monthArr[Number(month)]];
    });
  });
});

function GetMap(lat, lon) {
  var url = `https://api.meteostat.net/v1/stations/nearby?lat=${lat}&lon=${lon}&limit=5&key=oXO0gSip`;

  axios.get(url).then(location => {
    // var placeData = location.data.resourceSets[0].resources[0];
    let lat = location.data.Results[0].lat;
    let lon = location.data.Results[0].lon;

    // map id from div
    var map = new Microsoft.Maps.Map("#map", {
      center: new Microsoft.Maps.Location(lat, lon),
      zoom: 15
    });

    function addPin(result) {
      //Create custom Pushpin
      var pin = new Microsoft.Maps.Pushpin(
        { latitude: result.lat, longitude: result.lon },
        {
          title: result.name,
          subTitle: "Bucket",
          text: "1"
        }
      );
      //Add the pushpin to the map
      map.entities.push(pin);
    }

    addPin(
      {
        // name: lat.concat(lon).name,
        coordinates: location.data.Results
      },
      map
    );
  });
}

var results = [
  {
    name: "Melbourne Cricket Grounds",
    location: { lat: -37.819967, long: 144.983449 }
  },
  { name: "Flagstaff Gardens", location: { lat: -37.81068, long: 144.954352 } },
  {
    name: "Emporium Melbourne",
    location: { lat: -37.812433, long: 144.963787 }
  },
  { name: "City Library", location: { lat: -37.817039, long: 144.965983 } },
  {
    name: "Southern Cross Station",
    location: { lat: -37.818281, long: 144.952776 }
  },
  {
    name: "Sea Life Melbourne Aquarium",
    location: { lat: -37.82064, long: 144.958325 }
  }
];

function GetMap(lat, lon) {
  // map id from div
  var map = new Microsoft.Maps.Map("#map", {
    center: new Microsoft.Maps.Location(lat, lon),
    zoom: 17
  });

  function addPin(result) {
    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(
      { latitude: result.location.lat, longitude: result.location.lon },
      {
        title: result.name,
        subTitle: "SEI",
        text: "1"
      }
    );
    //Add the pushpin to the map
    map.entities.push(pin);
  }
  // run
  results.forEach(addPin);
}

// this is find the center pin in the map
// var center = function(arr) {
//   var minX, maxX, minY, maxY;
//   for (var i = 0; i < arr.length; i++) {
//     minX =
//       arr[i].location.lat < minX || minX == null ? arr[i].location.lat : minX;
//     maxX =
//       arr[i].location.lat > maxX || maxX == null ? arr[i].location.lat : maxX;
//     minY =
//       arr[i].location.long < minY || minY == null ? arr[i].location.long : minY;
//     maxY =
//       arr[i].location.long > maxY || maxY == null ? arr[i].location.long : maxY;
//   }
//   return [(minX + maxX) / 2, (minY + maxY) / 2];
// };
// console.log(center(results))
// (2) [-37.815659999999994, 144.96811250000002]0: -37.8156599999999941: 144.96811250000002length: 2__proto__: Array(0)

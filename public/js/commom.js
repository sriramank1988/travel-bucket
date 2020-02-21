function GetMap() {
  var placeName = "melbourne, Australia";
  var apiKey =
    "AtwX-4hMJnw40uObdVSKBMT-XsdRWAQZdAWRvPuoIBa2Ebr1lT8J3NKehbYwQzcs";
  var url = `http://dev.virtualearth.net/REST/v1/Locations?query=${placeName}&key=${apiKey}`;

  axios.get(url).then(res => {
    var placeData = res.data.resourceSets[0].resources[0];
    // map id from div
    var map = new Microsoft.Maps.Map("#map", {
      center: new Microsoft.Maps.Location(
        placeData.point.coordinates[0],
        placeData.point.coordinates[1]
      ),
      zoom: 15
    });

    function addPin(result) {
      //Create custom Pushpin
      var pin = new Microsoft.Maps.Pushpin(
        { latitude: result.coordinates[0], longitude: result.coordinates[1] },
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
        name: placeData.name,
        coordinates: placeData.point.coordinates
      },
      map
    );
  });
}

// // var results = [
// //   {
// //     name: "Melbourne Cricket Grounds",
// //     location: { lat: -37.819967, long: 144.983449 }
// //   },
// //   { name: "Flagstaff Gardens", location: { lat: -37.81068, long: 144.954352 } },
// //   {
// //     name: "Emporium Melbourne",
// //     location: { lat: -37.812433, long: 144.963787 }
// //   },
// //   { name: "City Library", location: { lat: -37.817039, long: 144.965983 } },
// //   {
// //     name: "Southern Cross Station",
// //     location: { lat: -37.818281, long: 144.952776 }
// //   },
// //   {
// //     name: "Sea Life Melbourne Aquarium",
// //     location: { lat: -37.82064, long: 144.958325 }
// //   }
// // ];

// // this is find the center pin in the map
// // var center = function(arr) {
// //   var minX, maxX, minY, maxY;
// //   for (var i = 0; i < arr.length; i++) {
// //     minX =
// //       arr[i].location.lat < minX || minX == null ? arr[i].location.lat : minX;
// //     maxX =
// //       arr[i].location.lat > maxX || maxX == null ? arr[i].location.lat : maxX;
// //     minY =
// //       arr[i].location.long < minY || minY == null ? arr[i].location.long : minY;
// //     maxY =
// //       arr[i].location.long > maxY || maxY == null ? arr[i].location.long : maxY;
// //   }
// //   return [(minX + maxX) / 2, (minY + maxY) / 2];
// // };
// // console.log(center(results))
// // (2) [-37.815659999999994, 144.96811250000002]0: -37.8156599999999941: 144.96811250000002length: 2__proto__: Array(0)

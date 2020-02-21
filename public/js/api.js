let city = document.querySelector("#city").textContent  // check 
let monthArr = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
let month = document.querySelector("#month").textContent //check
document.querySelector("#month").textContent = monthArr[month]
let localTemp = document.querySelector("#temp")  // check
axios({
    method:'get',
    url:"https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php",
    headers: {
        "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
        "x-rapidapi-key": "9975aefe3cmshc785da6a166f45ep17daf0jsn5b970bd4ef8e"
    },
    params: {"location": city}
}).then(location =>{
    let lon = location.data.Results[0].lon
    let lat = location.data.Results[0].lat
    //map(lat,lon)
    const url = `https://api.meteostat.net/v1/stations/nearby?lat=${lat}&lon=${lon}&limit=5&key=oXO0gSip`
    axios.get(url).then (station => {
        let stations = station.data.data
        let numberOfRequest = 0
        console.log(stations)
        for(let i = 0; i < stations.length; i++){
            const url = `https://api.meteostat.net/v1/climate/normals?station=${stations[i].id}&key=oXO0gSip`
            axios.get(url).then (result => { 
                numberOfRequest++;
                if(result.data.data.length != 0){
                    console.log(url)
                    localTemp.textContent = result.data.data.temperature[monthArr[Number(month)]]
                }
                if(numberOfRequest == stations.length && localTemp.textContent == "Loading..."){
                    localTemp.textContent = "No data available" 
                }
            })          
    
        }
    })
    function GetMap(location_lat,location_log) {
        // map id from div
        var map = new Microsoft.Maps.Map("#map", {
          center: new Microsoft.Maps.Location(location_lat, location_log),
          zoom: 4
        });
        function addPin(pin_lat, pin_log) {
          //Create custom Pushpin
          var pin = new Microsoft.Maps.Pushpin(
            { latitude: pin_lat, longitude: pin_log },
            {
              title: document.querySelector("#city").textContent,
              subTitle: "Dream place",
              text: "1"
            }
          );
          //Add the pushpin to the map
          map.entities.push(pin);
        }
        // run
        addPin(location_lat, location_log);
      }
      GetMap(lat,lon);
})

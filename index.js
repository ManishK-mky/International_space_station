
const map = L.map('map').setView([0, 0], 1);
var marker = L.marker([0, 0]).addTo(map);

const attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer( tileUrl , { attribution } )
tiles.addTo(map)

const api_url='https://api.wheretheiss.at/v1/satellites/25544'

let firstTime = true

async function getISS(){

    const response = await fetch(api_url)   //fetching the information from the url 
    const data = await response.json()       //consvertint he fetched information into JSON format
    console.log(data)

    //how to take a particular data from the received json file--->issi ko dstructuring of data khte hai
    console.log(data.latitude)
    console.log(data.longitude)

    // L.marker([data.latitude, data.longitude]).addTo(map);

    marker.setLatLng([data.latitude , data.longitude])
    if(firstTime){
    map.setView([data.latitude,data.longitude], 2)
    firstTime = false
    }

    //how to display on the browser screen
    document.getElementById('lat').textContent=data.latitude.toFixed(2)//textcontent is used to convert json data to textform
    document.getElementById('lon').textContent=data.longitude.toFixed(2)

}

getISS()

setInterval(getISS, 1000)

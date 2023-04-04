const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentwhetheritemsEl = document.getElementById('current-whether-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const whetherforecastEl = document.getElementById('whether-forecast');
const currenttempEl = document.getElementById('current-temp');

const days =["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
const months = ['jan','feb','march','april','may','june','july','aug','sep','oct','nov','dec'];

const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74'
setInterval(() =>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat =hour >=   13 ? hour %12: hour
    const minutes = time.getMinutes(); 
    const ampm = hour >= 12 ? 'PM':'AM'
    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes +''+`<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ',' + date + '' + months[month]
    
},1000);

getWeatherData ()
function getWeatherData (){
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);
        let {latitude, longitude }= success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`).then(res=> res.json()).then(data  => {
            console.log(data)
            showweatherData(data);
        })
    })
}
getWeatherData();
function showweatherData (data){
    let {humidity,pressure,sunrise,sunset,wind_speed} = data.current;
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + ' N ' + data.lon+ ' E';
    currentwhetheritemsEl.innerHTML = 

    `<div class="weather-item">
        <div>humidity</div>
        <div>${humidity}</div>
    </div>
    <div class="weather-item">
        <div>pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>wind speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>sunrise</div>
        <div>${window.moment(sunrise).format('HH:mm a')}</div>
    <div class="weather-item">
        <div>sunset</div>
        <div>${window.moment(sunset).format('HH:mm a')}</div>
    </div>
    
    `;
    let otherDayForcast = ''
data.daily.forEach((day, idx)=>{
    if(idx == 0){
        currenttempEl.innerHTML =`
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <div class="temp">Night - ${day.temp.night}&#176; C</div>
            <div class="temp">Day - ${day.temp.day}&#176; C</div>
        </div>` 
    }else{
        otherDayForcast +=`
        <div class="weather-forecast-item">
        <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="temp">Night - ${day.temp.night}&#176; C</div>
        <div class="temp">Day - ${day.temp.day}&#176; C</div>
    </div>`
    }
})

whetherforecastEl.innerHTML = otherDayForcast;


}


// api key : 82005d27a116c2880c8f0fcb866998a0
//select elements
const iconElement=document.querySelector(".weather-icon")
const tempElement=document.querySelector(".temperature-value p")
const descElement=document.querySelector(".temperature-description p")
const locationElement=document.querySelector(".location p")
const notificationElement=document.querySelector(".notification")
//app data
const weather={};
weather.temperature={
  unit:"celsius"
}
const kelvin=273;
const key="82005d27a116c2880c8f0fcb866998a0";
if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(setPosition,showError)
}else{
  notificationElement.style.display="block";
  notificationElement.innerHTML="<p> browser Does not support geolocation</p>";}
  //set the user setposition
  function setPosition(position){
    let latitude=position.coords.latitude
    let longitude=position.coords.longitude
    getweather (latitude,longitude)
  }
  //show eeror;
  function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p>${error.message}</p>`
  }
  //get weather from api
function getweather(latitude,longitude){
  let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

  fetch(api)
  .then(function(response){
    let data=response.json();
    return data
  })
  .then(function(data){
    weather.temperature.value=Math.floor(data.main.temp-kelvin);
    weather.description=data.weather[0].description;
    weather.iconID=data.weather[0].icon;
    weather.city=data.name;
    weather.country=data.sys.country;
  })
  .then(function(){
    displayweather();
  })
}
//display getweather
function displayweather(){

  iconElement.innerHTML=`<img src="icons/${weather.iconID}.png"/>`
  tempElement.innerHTML=`${weather.temperature.value}<span>C</span>`
  descElement.innerHTML=weather.description;
  locationElement.innerHTML=`${weather.city},${weather.country}`
}
function selciustofaren(temp){
  return(temp*9/5)+32;
}
tempElement.addEventListener("click",function(){
  if (weather.temperature.value===undefined) return;
  if (weather.temperature.unit=="celsius"){
    let faren=selciustofaren(weather.temperature.value);
    faren=Math.floor(faren);
    tempElement.innerHTML=`${faren}<span>F</span>`;
    weather.temperature.unit="farenhit"
  }else{
      tempElement.innerHTML=`${weather.temperature.value}<span>C</span>`
      weather.temperature.unit="celsius"
  }

})

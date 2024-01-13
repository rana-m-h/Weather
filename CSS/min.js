

let button = document.getElementById('button')
let todayName =document.getElementById('today-data-day-name')
let number =document.getElementById('number')
let month =document.getElementById('month')
let todaylocation =document.getElementById('today-location')
let todaytemp =document.getElementById('today-temp')
let todayimg  =document.getElementById('today-img ')
let todayconditiontext =document.getElementById('today-condition-text')
let humidity =document.getElementById('humidity')
let wind =document.getElementById('wind')
let direction =document.getElementById('direction')
let search =document.getElementById('search')

let weathereData

let nextdayname = document.getElementsByClassName('next-day-name')
let nextimg = document.getElementsByClassName('next-img')
let nextmaxtemp = document.getElementsByClassName('next-max-temp ')
let nextmintemp = document.getElementsByClassName('next-min-temp')
let nexttext = document.getElementsByClassName('next-text')


async function getweathereData(cityName){


    let weatherResponse  = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a2f1c79a0d4a4ab4830212158240101&q=${cityName}&days=3&aqi=no&alerts=no`)
    let weathereData = await weatherResponse.json()
   
    return weathereData
}


function displayData(data){

    todaylocation.innerHTML = data.location.name
    todaytemp.innerHTML = data.current.temp_c
    todayconditiontext.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    direction.innerHTML = data.current.wind_dir
    todayimg.setAttribute("src",data.current.condition.icon)
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-us" ,{weekday:"long"})
    number.innerHTML = todayDate.getDate()
    month.innerHTML = todayDate.toLocaleDateString("en-us" ,{month:"long"})


}



function displayNextData(data){

let forData = data.forecast.forecastday
for(let  i = 0 ; i < 2 ; i++){
    nextmaxtemp[i].innerHTML = forData[i+1].day.maxtemp_c
    nextmintemp[i].innerHTML = forData[i+1].day.mintemp_c
    nexttext[i].innerHTML = forData[i+1].day.condition.text
    nextimg[i].setAttribute("src",forData[i+1].day.condition.icon)

let nextDate = new Date(forData[i+1].date) 
nextdayname[i].innerHTML = nextDate.toLocaleDateString("en-us" ,{weekday:"long"})

}
}



async function start(city = "cairo"){
    let weathereData = await getweathereData(city)
    displayData(weathereData)
    displayNextData(weathereData)
}
 
start()


button.addEventListener("click" ,function(){
    start(search.value)

})


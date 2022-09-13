// "https://api.openweathermap.org/data/2.5/weather?q=sehore&appid=577eefbf82079e26a1234ab0e3e7b70b"
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=577eefbf82079e26a1234ab0e3e7b70b


async function getData(){
    let query = document.querySelector("#query").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=577eefbf82079e26a1234ab0e3e7b70b`
    let res= await fetch(url)
    let data = await res.json()
    append(data)
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=577eefbf82079e26a1234ab0e3e7b70b`
    let res2 = await fetch(url2)
    let data2 = await res2.json()
    // console.log(data2.list)
    showForecast(data2.list)
    
}


function append(data){
    let url = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    let weather = document.querySelector("#weather");
    weather.innerHTML = null
    let img = document.createElement("img")
    img.src = `http://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@4x.png`
    let description = document.createElement("h2")
    description.innerText = data.weather[0].description
    let h2 = document.createElement('h2');
    h2.innerText = data.name 
    let temp = document.createElement('h3');
    temp.innerText = `Temp:- ${Math.floor(data.main.temp)}°C`
    let minTemp = document.createElement('h3');
    minTemp.innerText = `Min Temp: ${Math.floor(data.main.temp_min)-3}°C`
    let maxTemp = document.createElement('h3');
    maxTemp.innerText = `Max Temp:${Math.floor(data.main.temp_max)+3}°C`
    let sunImg = document.createElement('img');
    sunImg.setAttribute('class', 'sun')
    sunImg.src = 'https://www.pngplay.com/wp-content/uploads/13/Sunrise-PNG-Free-File-Download.png'
    let sunrise = document.createElement('span');
    let setImg = document.createElement('img');
    setImg.src = 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/78211/sunset-clipart-md.png'
    setImg.setAttribute("class",'sun')
    sunrise.innerText = `Sunrise: ${timeConverter(data.sys.sunrise)}am`
    let sunset = document.createElement('span');
    sunset.innerText = `Sunset: ${timeConverter(data.sys.sunset)}pm`
    let div1 = document.createElement('div');
    div1.append(sunImg,sunrise)
    let div2 = document.createElement('div');
    div2.append(setImg,sunset)
    let wind = document.createElement('p');
    wind.innerText = `Wind: ${(data.wind.speed*3.6).toFixed(2)}k/h (${data.wind.deg}°)`
    weather.append(img,description,h2,temp,minTemp,maxTemp,div1,div2,wind);
    let iframe = document.querySelector("#gmap_canvas")
    iframe.src = url;
}

function timeConverter(unixTime){
    let unixTimestamp = unixTime
    let date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    if(hours > 11){
        hours = hours -12;
    }
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let time = hours + ':' + minutes.substring(1) + ':' + seconds.substring(1);
    return time
}


function getLocation(){
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        const crd = pos.coords;
      
        // console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getWeatherOnLocation(crd.latitude,crd.longitude)
      }
}






async function getWeatherOnLocation(lat,lon){
    

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=577eefbf82079e26a1234ab0e3e7b70b`
    
    let res = await fetch(url)
    let data = await res.json();
    append(data)
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=577eefbf82079e26a1234ab0e3e7b70b`
    let res2 = await fetch(url2)
    let data2 = await res2.json()
    showForecast(data2.list)
    // console.log(data2.list)
}


function showForecast(data){
    let container = document.querySelector('#forecast')
    container.innerHTML = null
    let temp=null;
    data.forEach(function(el){
        let date = el.dt_txt
        date = date.split(" ")[0]
        if(date!=temp){
            console.log(date)
            temp = date
            let card = document.createElement("div")
            let img = document.createElement("img")
            img.src = `http://openweathermap.org/img/wn/${
                el.weather[0].icon
            }@4x.png`
            let tem = document.createElement("h3")
            tem.innerText = `${el.main.temp}°C`
            let des = document.createElement("h3")
            des.innerText = el.weather[0].description
            let dt = document.createElement("h3")
            dt.innerText = `Date: ${temp}`
            card.append(img,dt,tem,des)
            container.append(card)
        }

    })
}
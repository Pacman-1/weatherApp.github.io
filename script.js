window.addEventListener("load",()=>{
    let lon;
    let lat;

    let temperatureDescription=document.querySelector(".temperature-description")
    let temperatureDegree=document.querySelector(".temperature-degree")
    let locationTimezone=document.querySelector(".location-timezone")
    let temperatureSection=document.querySelector(".temperature")
    let temperatureSpan=document.querySelector(".temperature span")
   
    

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            lon=position.coords.longitude
            lat=position.coords.latitude

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=83231e795e2c5b74c17e1fa6c2405b86&units=imperial`
            
        fetch(api)
        .then(response=>{
            return response.json();
        })
        .then(data => {
            console.log(data)

            //Set DOM Elements From API

            temperatureDegree.textContent=data.main.temp;
            temperatureDescription.textContent=data.weather[0].description.toUpperCase();
            locationTimezone.textContent=data.name;
           
            
            var iconcode=data.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var image = document.querySelector("#wicon");
            image.src = iconurl
            
            // Formula for Celsius

            let celsius=(data.main.temp-32) * (5/9)

            // Change Temp to Celsius on click
            temperatureSection.addEventListener("click",() =>{
                if (temperatureSpan.textContent==="F"){
                    temperatureSpan.textContent="C"
                    temperatureDegree.textContent=Math.floor(celsius)
                }
                else {
                    temperatureSpan.textContent="F"
                    temperatureDegree.textContent=data.main.temp
                }
            })

            
        })
        })

    }
})
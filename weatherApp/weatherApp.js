searchBtn = document.getElementById('search-btn')
weatherDiv = document.getElementById("weather")
form = document.querySelector("form")
serach = document.querySelector("#search")
api_key = `20dcd61ebca0ed067e4f52a33e002273`

// const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

const getWeather = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;
    const response = await fetch(url);
    console.log(response)

    const data = await response.json()

    return showWeather(data)
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City not found </h2>`
    }
    console.log(data)
    weatherDiv.innerHTML = `
            <div class="img">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="image">
            </div>

            <div class="result">
                <h2>${data.main.temp} ℃</h2>
                <h3>${data.weather[0].main}</h3>
            </div>
    `
}

form.addEventListener("submit", (event) => {
    getWeather(serach.value)
    weatherDiv.style.display = "flex";
    event.preventDefault()
})
//----------------------  Const for API Key  -------------//

const apiKey='37dcc1f31f2266ab069c18897f6de96d';


// ------------Async/Await  with Fetch ------//

async function getWeather() {
    //-----------Templates Literals and const ------//
    const city = document.getElementById('cityInput').value;
    // const url = `https://api.openweathermap.org/api_keys=${city}&appid=${apiKey}&units=metric`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    try{
        //---------Await with Fetch ----//
        const response = await fetch(url);
        if (!response.ok) {
            //throw async/await context---//
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        //----Destructing JSON Response -------//
        const data = await response.json();
        displayWeather(data);
    }
    catch (error){
        console.error('Failed to fetch weather data:',error);
        alert('Failed to fetch weather data.')
    }
}


function displayWeather(data) {
    //Destructing 
    const{ main:{temp, humidity },weather, wind: {speed}, sys: { country },name } = data;
    const [{main:weatherMain, description, icon}] = weather;
    //const for DOM Manipulation------//

    const weatherDisplay = document.getElementById(`weatherDisplay`);
    if(data.cod !==200){
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    //----Template  Literals for HtmL Generation --------//
    const weatherHTML = `
    <h2> Weather in ${name}, ${country}</h2>
    <p> Temperature: ${temp} °C</p>
    <p> Weather: ${weatherMain} (${description})</p>
    <p> Humidity: ${humidity}%</p>
    <p> Wind: ${speed} m/s</p>
    <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
     `;
     weatherDisplay.innerHTML = weatherHTML;

}
import React, { useState } from "react";
import './Weather.css';
import clouds from '../../images/clouds.png';
import clear from '../../images/clear.png';
import drizzle from '../../images/drizzle.png';
import mist from '../../images/mist.png';
import rain from '../../images/rain.png';
import snow from '../../images/snow.png';
import windIcon from '../../images/wind.png';
import humidityIcon from '../../images/humidity.png';

const Weather = () => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const apiKey_2 = process.env.REACT_APP_APININJA_API_KEY;
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [feelsLike, setfeelsLike] = useState('');
    const [icon, setIcon] = useState('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState('');
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${apiKey}&units=metric`;
    const apiUrl_2 = `https://api.api-ninjas.com/v1/worldtime?city=tokyo`;



    async function checkTime(){
        const response = await fetch(apiUrl_2, {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey_2},
            contentType: 'application/json'
            });
        if(response.ok){
            let data = await response.json();
            // console.log(data);
            setTime(`${data.hour}:${data.minute} ${data.hour > 12 ? 'PM' : 'AM'}`);
            setDay(`${data.day_of_week}`);
        }
        else{

        }
    }

    async function checkWeather(){
        const response = await fetch(apiUrl);
        if(response.ok){
            let data = await response.json();
            setCity(data.name);
            setTemperature(Math.round(data.main.temp));
            setHumidity(data.main.humidity);
            setWind(Math.round(data.wind.speed * (3600 / 1000)));
            setfeelsLike(Math.round(data.main.feels_like));
            console.log(data);
            let weatherCondition =  data.weather[0].main;
            switch(weatherCondition){
                case 'Clouds':
                    setIcon(clouds);
                    break;
                case 'Clear':
                    setIcon(clear);
                    break;
                case 'Mist':
                    setIcon(mist);
                    break;
                case 'Drizzle':
                    setIcon(drizzle);
                    break;
                case 'Rain':
                    setIcon(rain);
                    break;
                case 'Snow':
                    setIcon(snow);
                    break;
                default:
                    setIcon(clouds);
            }
        }
        else{
            alert('Invalid city name');
        }
    }

    checkWeather();
    checkTime();

    return(
        <div className="weather">
                <div className="temp-city">
                    <span className="cityName">{city}</span>
                    <span className="cityName">{day}, {time}</span>
                    <span className="cityTemperature">{temperature}°C</span>
                    <span>Feels like {feelsLike}°C</span>
                </div>
                <img src={icon} alt="weather-icon" className="weatherIcon"></img>
                <div className="weather-data">
                    <div className="weather-data-row">
                        <img src={humidityIcon} alt="humidity-icon"></img>
                        <div className="weather-data-inner-column">
                            <span>{humidity}%</span>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="weather-data-row">
                        <img src={windIcon} alt="wind-icon"></img>
                        <div className="weather-data-inner-column">
                            <span>{wind}km/hr</span>
                            <span>Wind</span>
                        </div>
                    </div>
                </div>
        </div>
    )
};

export default Weather;

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
    const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [feelsLike, setfeelsLike] = useState('');
    const [icon, setIcon] = useState('');
    // const [time, setTime] = useState('');
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=${apikey}&units=metric`;
    
    async function checkWeather(city){
        const response = await fetch(apiUrl);
        if(response.ok){
            let data = await response.json();
            // const unixTimestamp = data.dt;
            // const date = new Date(unixTimestamp * 1000);
            // const hours = date.getHours();
            // const minutes = date.getMinutes();
            // const cityTime = `${hours}:${minutes}`;
            setCity(data.name);
            setTemperature(Math.round(data.main.temp));
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setfeelsLike(data.main.feels_like);
            // setTime(cityTime);
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

    return(
        <div className="weather">
                <div className="temp-city">
                    <span className="cityName">{city} | 11:00 PM</span>
                    <span className="cityTemperature">{temperature}°C</span>
                    <span>Feels like {Math.round(feelsLike)}°C</span>
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
                            <span>{Math.round(wind * (3600 / 1000))}km/hr</span>
                            <span>Wind</span>
                        </div>
                    </div>
                </div>
        </div>
    )
};
export default Weather;
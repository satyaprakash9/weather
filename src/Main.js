import { useEffect, useState } from "react";
import sunny from "./assets/sunny.png";
import cloudy from "./assets/cloudy.png";
import rain from "./assets/rain.png";
import rain_night from './assets/thunder-night.png';
import clouds from "./assets/clouds.png";
import wind from "./assets/wind.png";
import mist from "./assets/fog.png";
import night_mist from "./assets/night-mist.png";
import snow_night from "./assets/snow-night.png";
import snow from "./assets/snow.png";
import direction from "./assets/direction.png";
import axios from "axios";
import night from "./assets/night.png";
const Main = () => {
    let name, temperature, pressure, humidity, feels_like, speed, deg, clouds_all, main, description, timezone, visibility;
    const data1 = {
        name,
        temperature,
        pressure,
        humidity,
        error: false,
        feels_like,
        speed,
        main,
        description,
        deg,
        clouds_all,
        timezone,
        visibility
    }
    const [weather, setWeather] = useState(data1);
    const [image, setImage] = useState(null);
    const handleClick = async (e) => {
        e.preventDefault();
        const city = document.querySelector('.search').value;
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3b1e4a76956728e6c0489118490cf950&units=metric";
        try {
            const resp = await axios.get(url);
            const data = resp.data;
            setWeather({
                name: data.name,
                temperature: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                feels_like: data.main.feels_like,
                speed: data.wind.speed,
                deg: data.wind.deg,
                clouds_all: data.clouds.all,
                main: data.weather[0].main,
                description: data.weather[0].description,
                timezone: data.timezone,
                visibility: data.visibility,
                error: false
            });
        }
        catch {
            setWeather({ ...weather, error: true });
        }
    }
    useEffect(() => {
        const temp = weather.temperature;
        const main = weather.main;
        const timezone = weather.timezone;
        if(weather.timezone)
        {
            const date = new Date();
            const localTime = new Date(date.getTime() + timezone * 1000);
            const user_time = localTime.toISOString(); // localTime will not be correct ans so, we have convert it into ISO format
            const time = Number(user_time.slice(11, 13));
            console.log(user_time);
            if (time >= 18 || time <= 4) // night
            {
                if (main === "Rain") setImage(<img src={rain_night} alt="night rain" width={200} height={200} />);
                else if (main === "Snow") setImage(<img src={snow_night} alt="night snow" width={200} height={200} />);
                else if (main === "Mist") setImage(<img src={night_mist} alt="mist night" width={200} height={200} />);
                else setImage(<img src={night} alt="night" width={200} height={200}/>);

            }
            else // day
            {
                if (main === "Rain") setImage(<img src={rain} alt="day rain" width={200} height={200} />);
                else if (main === "Thunderstorm") setImage(<img src={rain_night} alt="day thunder" width={200} height={200} />);
                else if (main === "Snow") setImage(<img src={snow} alt="day snow" width={200} height={200} />);
                else if(main === "Mist") setImage(<img src={mist} alt="day mist" width={200} height={200} />);
                else {
                    if (temp > 30) setImage(<img src={sunny} alt="sunny" width={200} height={200} />);
                    else setImage(<img src={cloudy} alt="clouds" width={200} height={200} />);
                }
            }
        }
    }, [weather]);
    return (
      <div className="main">
        <div className="input-group">
          <input
            type="text"
            className="search form-control text-white"
            placeholder="Search"
          />
          <button className="input-group-text text-white" onClick={handleClick}>
            <span class="material-symbols-outlined fs-3">search</span>
          </button>
        </div>
        {weather.error ? (
          <p className="fw-2 header">No such city</p>
        ) : weather.name && (
          <div className="header p-5 w-100">
            <div className="d-flex justify-content-between w-75 city position-relative mx-auto">
              <div>
                <p className="fs-1 fw-semibold">{weather.name}</p>
                <p className="mt-3 position-absolute bottom-0 fs-1 fw-semibold">
                  {weather.temperature}
                  {weather.temperature && <sup>o</sup>}
                </p>
              </div>
              {image}
            </div>
            <div className="accordion w-75 mx-auto mt-4">
              <div className="accordion-item">
                <h2 className="accordion-header" >
                  <button
                    className="accordion-button"
                    style={{backgroundColor: 'rgb(32, 43, 59)', color: "aliceblue"}}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#weather"
                  >
                    More Info About Weather
                  </button>
                </h2>
                <div id="weather" className="accordion-collapse collapse">
                  <div className="info" style={{backgroundColor: 'rgb(32, 43, 59)'}}>
                      {weather.temperature && <p className="fs-5 accordion-body">temperature: {weather.temperature}<sup>o</sup></p>}
                      {weather.feels_like && <p className="fs-5 accordion-body">Feels like: {weather.feels_like}<sup>o</sup></p>}
                      {weather.pressure && <p className="fs-5 accordion-body">Pressure: {weather.pressure} hPa</p>}
                      {weather.humidity && <p className="fs-5 accordion-body">Humidity: {weather.humidity}%</p>}
                  </div>
                </div>
              </div>
            </div>
            
            
            <div className="accordion w-75 mx-auto mt-4">
              <div className="accordion-item">
                <h2 className="accordion-header" >
                  <button
                    className="accordion-button"
                    style={{backgroundColor: 'rgb(32, 43, 59)', color: "aliceblue"}}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#wind"
                  >
                    Wind Information
                  </button>
                </h2>
                <div id="wind" className="accordion-collapse collapse">
                  <div className="info" style={{backgroundColor: 'rgb(32, 43, 59)'}}>
                      {weather.speed && <p className="fs-5 accordion-body">speed: {weather.speed} m/s</p>}
                      {weather.deg && <p className="fs-5 accordion-body">direction: <img src={direction} alt="" className="img-fluid" style={{ rotate: String(weather.deg - 180) + "deg" }} height={25} width={25} /></p>}
                  </div>
                </div>
              </div>
            </div>
            
            
            <div className="accordion w-75 mx-auto mt-4">
              <div className="accordion-item">
                <h2 className="accordion-header" >
                  <button
                    className="accordion-button"
                    style={{backgroundColor: 'rgb(32, 43, 59)', color: "aliceblue"}}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#other"
                  >
                    Other Information
                  </button>
                </h2>
                <div id="other" className="accordion-collapse collapse">
                  <div className="info" style={{backgroundColor: 'rgb(32, 43, 59)'}}>
                      {weather.clouds_all && <p className="fs-5 accordion-body"><img src={clouds} alt="" className="img-fluid" height={25} width={25} /> Cloud Coverage: {weather.clouds_all}%</p>}
                      {weather.visibility && <p className="fs-5 accordion-body">Visibility: {weather.visibility/1000} km</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
export default Main;
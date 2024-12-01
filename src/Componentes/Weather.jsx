import React, { useState,useEffect } from 'react'
import './weather.css'
import searchicon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
function Weather() {
    let api_key = "e7a151baca422c9fda4fd7d671412812"

    const humidity=document.getElementsByClassName("humidity-percent");
    const wind =document.getElementsByClassName("wind-rate");
    const temperature=document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    const [wicon,setWicon]=useState(cloud_icon)

    const search=async ()=>{
        const city=document.getElementsByClassName("cityname");
        if(city[0].value===""){
            return 0;
        }
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${city[0].value}&units=Metric&appid=${api_key}`;
            const responce=await fetch(url);
            let data=await responce.json();
            humidity[0].innerHTML=`${data.main.humidity}%`;
            wind[0].innerHTML=`${Math.floor(data.wind.speed)}km/h`;
            temperature[0].innerHTML=`${Math.floor(data.main.temp)}°c`;
            location[0].innerHTML=`${data.name}`

            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setWicon(clear_icon);
            } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setWicon(cloud_icon);
            } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setWicon(drizzle_icon);
            } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
                setWicon(drizzle_icon);
            } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setWicon(rain_icon);
            } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                setWicon(rain_icon);
            } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                setWicon(snow_icon);
            } else {
                setWicon(clear_icon);
            }
        }
        catch(err){
            console.error("Error fetching weather data:", err);
            humidity[0].innerHTML=`Not Found`;
            wind[0].innerHTML=`Not Found`;
            temperature[0].innerHTML=`Not Found`;
            location[0].innerHTML=`Not Found`;
        }
    }

    return (
        <>
        <div className="container">
            <h3><marquee>WEATHER REPORT</marquee></h3>
    <div className="topbar">
        <input type="text" placeholder="search city" className='cityname' />
        <div className="searchicon">
            <img src={searchicon} onClick={()=>search()}/>
        </div>
    </div>
    <div className="weather-section">
        <div className="weatherimage">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-info">
            <div className="weather-temp">24°c</div>
            <div className="weather-location">London</div>
        </div>
    </div>
    <div className="data-container">
        <div className="element">
            <img src={humidity_icon} className="icon" />
            <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={wind_icon} className="icon" />
            <div className="data">
                <div className="wind-rate">18 km/h</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
    </div>
    <div className='copyright'>
            Copyright &copy; <b>VIJAY H3R3 &nbsp;&nbsp;{new Date().getFullYear()}</b>
    </div>
</div>

        </>

    )
}

export default Weather

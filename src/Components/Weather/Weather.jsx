import React, { useEffect, useRef, useState } from 'react';
import './Weather.module.css'
import search_icon from '../../assets/images/search.png';
import clear_icon from '../../assets/images/clear.png';
import cloud_icon from '../../assets/images/cloud.png';
import drizzle_icon from '../../assets/images/drizzle.png';
import humidity_icon from '../../assets/images/humidity.png';
import snow_icon from '../../assets/images/snow.png';
import wind_icon from '../../assets/images/wind.png';
import rain_icon from '../../assets/images/rain.png';
import toast, { Toaster } from 'react-hot-toast';



export default function Weather() {
    const inputRef = useRef();
    const [weatherData , setWeatherData] = useState(false);
    // data for weatherIcons
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }
 
    const search = async (city) => {
        if( city === ""){
            toast.error("Enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                toast.error(data.message);
                return;

            }
            console.log(data);
            // weatherIcons
            const icon = allIcons[data.weather[0].icon] || clear_icon ;
            setWeatherData({
                humidity: data.main.humidity,               
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location:data.name,
                icon: icon,
            });
        } catch (error) {
            setWeatherData(false);
            console.log("Error in Fetching data");
        }
    }
    useEffect(() => {
        search("London");
    }, [])
    return (
        <>
            <div className="weather mt-10 flex flex-col items-center bg-gradient-to-r from-[#2f4680] to-[#500ae4] place-self-center p-10 rounded-lg ">
                <div className="search-bar flex items-center gap-3">
                    <input ref={inputRef} 
                    type="text" 
                    placeholder='Search' 
                    className='h-[50px] border-0 outline-none rounded-2xl pl-6 text-[#626262] bg-[#ebfffc] text-2xl' />
                    <img src={search_icon} 
                    onClick={()=>search(inputRef.current.value)}
                    alt="serach_icon" 
                    className='width-[50px] p-4 rounded-full bg-[#ebfffc] cursor-pointer' />
                </div>
                {weatherData ? <>
                    <img src={weatherData.icon} alt=" sun image" className='w-[150px] mt-7 ' />
                <p className='text-white text-5xl leading-none'>{weatherData.temperature}°c</p>
                <p className='text-white text-4xl'>{weatherData.location}</p>
                <div className="weather_data flex justify-between  w-full mt-10 text-white">
                    <div className='flex items-start text-2xl gap-2 '>
                        <img src={humidity_icon} alt="humidity_icon" className='w-[26px] mt-2' />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span className='block text-lg'>Humidity</span>
                        </div>
                    </div>
                    <div className='flex items-start text-2xl gap-2'>
                        <img src={wind_icon} alt="wind_icon" className='w-[26px] mt-2' />
                        <div>
                            <p>{weatherData.windSpeed} km/h</p>
                            <span className='block text-lg '>Wind Speed</span>
                        </div>
                    </div>
                </div>
                </>
                :
                <></>}
              
            </div>
        </>
    )
}

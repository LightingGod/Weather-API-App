import React ,{useState} from "react";
import styles from "./NewCityData.module.css";
import ReactAnimatedWeather from 'react-animated-weather';

const defaults = {
    icon: 'CLEAR_DAY',
    color: 'white',
    size: 100,
    animate: true
};

const iconHandler = (data)=>{
    switch (data) {
        case "Haze":
            defaults.icon = "CLEAR_DAY" ;
            break;
        case "Clouds":
            defaults.icon = "CLOUDY" ;
            break;
        case "Rain":
            defaults.icon = "RAIN";
            break;
        case "Snow":
            defaults.icon = "SNOW";
            break;
        case "Dust":
            defaults.icon = "WIND";
            break;
        case "Drizzle":
            defaults.icon = "SLEET";
            break;
        case "Fog":
            defaults.icon = "FOG";
            break;
        case "Smoke":
            defaults.icon = "FOG";
            break;
        case "Tornado":
            defaults.icon = "WIND";
            break;
        default:
            defaults.icon = "CLEAR_DAY";
    };
}

const RightBlock = (props) => {
    const formSubmitHandler = (event) => {
        event.preventDefault();
        let val = document.getElementById('cityname').value;
        if(val!==''){
            props.formsubmit(val);
        }
    }
    iconHandler(props.data.weather);
    return (
        <div className={styles.RightBlock}>
            <div className={styles.weatherIcon}>
                <ReactAnimatedWeather
                    icon={defaults.icon}
                    color={defaults.color}
                    size={defaults.size}
                    animate={defaults.animate}
                />
            </div>
            <h1 className={styles.weatherType}>{props.data.weather}</h1>
            <hr></hr>
            <div className={styles.formblock}>
                <form onSubmit={formSubmitHandler}>
                    <input className={styles.myinput} type="text" id="cityname" placeholder="Search Any City"></input>
                    <button className={styles.mybutton} type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>

            <div>
                <div className={styles.locationBlock}>
                    <p className={styles.location}>{props.data.city},{props.data.country}</p>
                    <p><img src={`https://openweathermap.org/img/wn/${props.data.weatherIcon}.png`}></img></p>
                </div>
                <hr></hr>
                <div className={styles.smallblocks}>
                    <p>Temperature</p>
                    <p>{props.data.temperature}°C({props.data.weather})</p>
                </div>
                <hr></hr>
                <div className={styles.smallblocks}>
                    <p>Humidity</p>
                    <p>{props.data.Humidity}%</p>
                </div>
                <hr></hr>
                <div className={styles.smallblocks}>
                    <p>Visibility</p>
                    <p>{props.data.visibility} mi</p>
                </div>
                <hr></hr>
                <div className={styles.smallblocks}>
                    <p>Wind Speed</p>
                    <p>{props.data.windspeed} Km/h</p>
                </div>
            </div>
        </div>
    )
}

export default RightBlock;
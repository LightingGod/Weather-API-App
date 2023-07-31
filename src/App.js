import React, { useState,useEffect } from "react";
import styles from "./App.module.css";
import Img_1 from "./Images/Img-1.jpeg";
import LeftBlock from "./Components/TimeAndDate";
import RightBlock from "./Components/NewCityData";
import logo from "./Images/WeatherIcons.gif";
import FurtherDateBlock from "./Components/FutherDateBlock";

const tempdata1 = {
  city: '',
  country : '',
  temperature : 0
}
const tempdata2 = {
  city: '',
  country : '',
  temperature : 0,
  Humidity: 0,
  visibility: 0,
  windspeed: 0,
  lat: 0,
  long: 0,
  weather: '',
  weatherIcon: 0,
  furtherData: []
}

function App() {
  // Flag for seeing the first block where i get the access location pop-up
  const [flag, SetFlag] = useState(false);

  // For all other details that we get form api
  // Make 2 state one for left block and 2 for right block.
  const [currLocData,SetData] = useState(tempdata1);
  const [alldata,setAlldata] = useState(tempdata2);

  const Apiwork = async (data)=>{
    // For getting weather details of current day
    const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=${''}`);
    const newdata1 = await response1.json();

    // For getting weather details of future days.
    const response2 = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=`);
    const newdata2 = await response2.json();

    const temp1 = {
      city: newdata1.name,
      country: newdata1.sys.country,
      temperature: Math.round(newdata1.main.temp - 273.15)
    }


    const futuredata = [];
    for(let i=8;i<=24;i=i+8){
      var a = new Date(newdata2.list[i-1].dt * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();

      futuredata.push({
        day: date,
        mon: month,
        yr: year,
        temp: Math.round(newdata2.list[i-1].main.temp-273.15),
        weather: newdata2.list[i-1].weather[0].main,
        weatherIcon: newdata2.list[i-1].weather[0].icon
      })
    }


    const temp2 = {
      city: newdata1.name,
      country: newdata1.sys.country,
      temperature: Math.round(newdata1.main.temp - 273.15),
      Humidity: newdata1.main.humidity,
      visibility: newdata1.visibility,
      windspeed: newdata1.wind.speed,
      lat: data.coords.latitude,
      long: data.coords.longitude,
      weather: newdata1.weather[0].main,
      weatherIcon: newdata1.weather[0].icon,
      furtherData: futuredata,
    }


    SetData(temp1)
    setAlldata(temp2);
  }

  const formSubmission = async (cityName)=>{
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=`)
    const newdata = await response.json();

    const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${newdata[0].lat}&lon=${newdata[0].lon}&appid=`);
    const newdata1 = await response1.json();

    const response2 = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${newdata[0].lat}&lon=${newdata[0].lon}&appid=`);
    const newdata2 = await response2.json();

    const futuredata = [];
    for(let i=8;i<=24;i=i+8){
      var a = new Date(newdata2.list[i-1].dt * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();

      futuredata.push({
        day: date,
        mon: month,
        yr: year,
        temp: Math.round(newdata2.list[i-1].main.temp-273.15),
        weather: newdata2.list[i-1].weather[0].main,
        weatherIcon: newdata2.list[i-1].weather[0].icon
      })
    }

    const temp2 = {
      city: newdata1.name,
      country: newdata1.sys.country,
      temperature: Math.round(newdata1.main.temp - 273.15),
      Humidity: newdata1.main.humidity,
      visibility: newdata1.visibility,
      windspeed: newdata1.wind.speed,
      lat: newdata[0].lat,
      long: newdata[0].lon,
      weather: newdata1.weather[0].main,
      weatherIcon: newdata1.weather[0].icon,
      furtherData: futuredata
    }
    setAlldata(temp2);
  }

  // Getting Current Location
  const successCallback = (position) => {
    SetFlag(true);
    Apiwork(position);
  };
  
  const errorCallback = (error) => {
    SetFlag(true);
    const data = {
      coords : {
        latitude : 28.41124,
        longitude: 77.31316
      }
    }
    Apiwork(data);
  };

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  },[])

  return (
    <div className={styles.mycontainer}>
      {flag === true ? 
        <>
          <div className={styles.mainblock}>
            <LeftBlock data={currLocData}/>
            <RightBlock data={alldata} formsubmit = {formSubmission}/>
          </div> 
          <div className={styles.weatherblocks}>
            {alldata.furtherData.map((data)=>{
              return (
                <FurtherDateBlock key={data.day} alldata ={data}/>
              )
            })}
          </div>
        </>
        : 
        <div className={styles.secondblock}>
          <p className={styles.logoicon}><img src={logo}></img></p>
          <h3 className={styles.logoicon}  style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 className={styles.logoicon} style={{ color: "white", marginTop: "10px" }}>
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real time weather.
          </h3>
        </div>
      }
    </div>
  );
}

export default App;

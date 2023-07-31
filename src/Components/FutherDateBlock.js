import React from "react";
import styles from "./FurtherDateBlock.module.css";

const FurtherDateBlock = (props)=>{
    return(
        <div className={styles.myblock}>
            {/* <img src={`https://openweathermap.org/img/wn/${props.data.weatherIcon}.png`}></img> */}
            <p className={styles.temp}>{props.alldata.temp}°C</p>
            <div className={styles.weatherblock}>
                <p>{props.alldata.weather}</p>
                <img className={styles.blockimage} src={`https://openweathermap.org/img/wn/${props.alldata.weatherIcon}.png`}></img>
            </div>
            <p className={styles.mydate}>{props.alldata.day} {props.alldata.mon} {props.alldata.yr}</p>
        </div>
    )
}

export default FurtherDateBlock;
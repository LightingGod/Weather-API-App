import React , {useState,useEffect} from "react";
import styles from "./Time.module.css";

const TimeBlock = (props)=>{
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    const [time,SetTime] = useState('');
    
    const addZero = (i)=>{
        if (i < 10){ 
            i = "0" + i; 
        }
        return i;
    }
    
    const date = new Date();
    let day = date.getDate();
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();
    let weekday = weekdays[date.getDay()];

    useEffect(()=>{
        const myInterval = setInterval(()=>{   
            const date = new Date();     
            let h = addZero(date.getHours());
            let m = addZero(date.getMinutes());
            let s = addZero(date.getSeconds());
            let temp = h + ":" + m + ":" + s;
    
            SetTime(temp);
        },1000);

        return ()=>{
            clearInterval(myInterval);
        }
    },[time]);

    return (
        <div className={styles.TimeBlock}>
            <div className={styles.lastblock}>
                <h2 className={`${styles.textcolour}`}>{time}</h2>
                <h4 className={`${styles.textcolour}`}>{weekday},  {day}  {month}  {year}</h4>
            </div>
            <h1 className={`${styles.textcolour}`}>{props.temp}°C</h1>
        </div>
    )
}

export default TimeBlock;
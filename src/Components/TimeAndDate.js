import React from "react";
import TimeBlock from "./Time.js";
import styles from "./TimeAndDate.module.css";

const LeftBlock = (props) => {
    return (
        <div className={styles.LeftBlock}>
            <div>
                <h1 className={styles.cityname}>{props.data.city}</h1>
                <h1 className={styles.cityname}>{props.data.country}</h1>
            </div>
            <div>
                <TimeBlock temp = {props.data.temperature}/>
            </div>
        </div>
    )
}

export default LeftBlock;
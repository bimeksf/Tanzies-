/* eslint-disable react/prop-types */
import { useState , useEffect } from "react"


export default function Timer({isRunning,reset }) {   


    const [seconds, setSeconds] = useState(0);

    
    useEffect(() => {

        setSeconds(0);

        let interval; 
        if(isRunning)
            interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1)
    }, 1000)


    return () => clearInterval(interval)
    
    
    
}, [isRunning, reset]);


useEffect(() => {
    if (reset ) setSeconds(0);
}, [reset ]);



function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    }


return <p className="loader">Your time: {formatTime(seconds)}</p>

}
import React, { useEffect, useState } from 'react'

function useTimer(initial = 10) {
    const [timerid, settimerid] = useState(null)
    const [time, settime] = useState(initial)
    
    const starttimer = () => {
        const timerid = setInterval(()=>{
          settime(prev => prev-1)
        }, 1000)
        settimerid(timerid)
    }
    
    const stoptimer = ()=>{
        clearInterval(timerid);
    }

    const resettimer = ()=>{
        clearInterval(timerid);
        settime(initial)
    }

    return {time, timerid, starttimer, stoptimer, resettimer}
    
}

export default useTimer
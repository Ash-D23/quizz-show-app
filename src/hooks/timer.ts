import { useState } from 'react'

function useTimer(initial = 10) {
    const [timerid, settimerid] = useState<any>(null)
    const [time, settime] = useState(initial)
    
    const startTimer = () => {
        const timerid = setInterval(()=>{
          settime(prev => prev-1)
        }, 1000)
        settimerid(timerid)
    }
    
    const stopTimer = ()=>{
        clearInterval(timerid);
    }

    const resetTimer = ()=>{
        clearInterval(timerid);
        settime(initial)
    }

    return {time, timerid, startTimer, stopTimer, resetTimer}
    
}

export default useTimer
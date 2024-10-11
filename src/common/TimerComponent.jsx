import React, { useEffect, useState } from 'react'
import { formatDateAndTime } from '../apis/functions';

const TimerComponent = () => {

    const [curdatetime, setCurdatetime] = useState();

    useEffect(() => {
        setTimeout(() => setCurdatetime(Date.now()) , 1000) 
    }, [Date.now()])

    return (
        <div className='text-xs md:text-xl md:font-bold text-[#005072]'>{curdatetime && formatDateAndTime(curdatetime)}</div>
    )
}

export default TimerComponent
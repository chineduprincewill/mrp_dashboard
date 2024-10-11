import React, { useEffect, useState } from 'react'

const AgeBands = () => {

    const [agebands, setAgebands] = useState();

    const generateAgebands = () => {
        let bands = [];
        for(let i = 0; i <= 50; i += 5){
            if(i >= 50){
                bands.push(`${i}+`);
            }
            else{
                bands.push(`${i} - ${i+4}`);
            }
        }
        setAgebands(bands);
    }

    useEffect(() => {
        generateAgebands();
    }, [])

    return (
        <select
                className='border border-gray-400 p-2 text-sm'
        >   
            <option value="">Age band</option>
        {
            agebands && agebands.length > 0 && agebands.map((agb, index) => <option key={index} value={agb}>{agb}</option>)
        }
        </select>
    )
}

export default AgeBands
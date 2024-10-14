import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';

const Navlinks = () => {

    const locatn = useLocation();
    const { theme, locality, updateDashboardValues } = useContext(AppContext);

    const navlinks = [
        {
            id: 1,
            state: "Benue",
            test28: "5678",
            testtotal: "12456",
            pos28: "798",
            postotal: "3576",
        },
        {
            id: 2,
            state: "Plateau",
            test28: "2334",
            testtotal: "6798",
            pos28: "452",
            postotal: "1290",
        },
        {
            id: 3,
            state: "Ogun",
            test28: "4453",
            testtotal: "7098",
            pos28: "555",
            postotal: "2001",
        },
        {
            id: 4,
            state: "Ondo",
            test28: "4380",
            testtotal: "9087",
            pos28: "721",
            postotal: "3002",
        },
        {
            id: 5,
            state: "Oyo",
            test28: "4987",
            testtotal: "8444",
            pos28: "634",
            postotal: "2998",
        },
    ]

    return (
        <ul className={`w-full ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-transparent'}`}>
            {
                navlinks.map(nav => {
                    return (
                        <li 
                            key={nav.id} className={`px-3 py-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${nav.state === locality && 'bg-gray-200 dark:bg-gray-700'}`}
                            onClick={() => updateDashboardValues(nav.state, nav.testtotal, nav.postotal, nav.test28, nav.pos28)}
                        >
                            <div key={nav.id} className='grid'>
                                <span>{nav.state}</span>
                                <span className='font-extralight'>28-Day: {nav.test28} | <span className='text-[#7d9d25] font-bold'>{nav.pos28}</span></span>
                                <span className='text-sm font-extralight'>Total: {nav.testtotal} | <span className='text-[#7d9d25] font-bold'>{nav.postotal}</span></span>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Navlinks

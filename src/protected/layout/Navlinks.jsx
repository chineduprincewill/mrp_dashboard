import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { fetchStatesSummary } from '../../apis/dashboardActions';
import NotificationLoader from '../../common/NotificationLoader';

const Navlinks = () => {

    const locatn = useLocation();
    const { locality, updateDashboardValues, updateStateSelection } = useContext(AppContext);

    const [statesSummary, setStatesSummary] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(null);

    const updateDashboard = (val1, val2, val3, val4, val5) => {
        updateDashboardValues(val1, val2, val3, val4, val5);
        updateStateSelection(val1);
    }

    useEffect(() => {
        fetchStatesSummary({}, setStatesSummary, setError, setFetching);

        const intervalId = setInterval(() => {
            fetchStatesSummary({}, setStatesSummary, setError, setFetching);
        }, 60000); // 60 seconds
      
        return () => clearInterval(intervalId);
    }, [])


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
        <ul className={`w-full `}>
            {
                statesSummary !== null && statesSummary.map((nav, index) => {
                    return (
                        <li 
                            key={index} className={`px-3 py-1.5 md:py-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${nav.state === locality && 'bg-gray-200 dark:bg-gray-700'}`}
                            onClick={() => updateDashboard(nav.state, nav.total_entries, nav.confirmed, nav.last_28_days_count, nav.confirmed_last_28_days)}
                        >
                            <div className='grid'>
                                <span>{nav?.state}</span>
                                <span className='font-extralight'>28-Day: {nav?.last_28_days_count} | <span className='text-[#7d9d25] font-bold'>{nav?.confirmed_last_28_days}</span></span>
                                <span className='text-sm font-extralight'>Total: {nav?.total_entries} | <span className='text-[#7d9d25] font-bold'>{nav?.confirmed}</span></span>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Navlinks

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import BarChart from '../../charts/BarChart';
import AgeBands from '../../common/AgeBands';
import TimerComponent from '../../common/TimerComponent';
import GoogleMapComponent from '../../common/GoogleMapComponent';
import AreaChart from '../../charts/AreaChart';
import LineChart from '../../charts/LineChart';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { ImStatsBars } from 'react-icons/im';
import HeatMapComponent from '../../common/HeatMapComponent';

const Dashboard = () => {

    const { theme } = useContext(AppContext);
    const [chart, setChart] = useState('line');
    const [period, setPeriod] = useState('weekly');
    const [refreshpage, setRefreshpage] = useState();
    //const [googleMaps, setGoogleMaps] = useState(window.google);
    const [mapview, setMapview] = useState('testing');

    const labels = () => {
        let data = [];
        for(let i = 1; i <= 52; i++){
            data.push(i);
        }
        return data
    }

    const data = () => {
        let data = Array.from({
            length: 52
        }, () => Math.floor(Math.random() * 101));
        return data;
    }

    const generateTitle = () => {
        let msg = period === 'weekly' ? 'Weekly' : 'Last 28 days';
        return msg;
    }

    useEffect(() => {
        setTimeout(() => setRefreshpage(Date.now()), 10000 )
    }, [refreshpage])

    return (
        <div className='w-full m-0'>
            <div className='w-full flex justify-between bg-white h-16 items-center px-2'>
                <span className='uppercase text-[#005072] font-extralight text-2xl md:text-3xl'>apin situation room</span>
                <TimerComponent />
            </div>

            <div className='w-full grid my-4 space-y-4'>
                <div className='w-full grid md:flex md:flex-row-reverse space-y-4 md:space-y-0'>
                    <div className='w-full md:w-2/5 pl-2 md:pl-4 pr-2 space-y-2'>
                        <h1 className='border-b border-gray-300 text-gray-600 text-lg font-extralight'>Filter</h1>
                        <div className='w-full flex items-center space-x-4 pt-2 pb-4 border-b border-gray-300'>
                            <AgeBands />
                            <select
                                className='border border-gray-400 p-2 text-sm'
                            >
                                <option value=''>Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            <select
                                className='border border-gray-400 p-2 text-sm'
                            >
                                <option value=''>Modality</option>
                                <option value='Index'>Index</option>
                                <option value='PITC'>PITC</option>
                                <option value='AP3'>AP3</option>
                                <option value='Community'>Community</option>
                                <option value='Community Index'>Community Index</option>
                            </select>
                        </div>
                    </div>
                    <div className='w-full md:w-3/5 pl-2 md:pr-0.5 pr-2 space-y-4'>
                        <div className='flex items-center justify-between'>
                            <div className={`grid text-center p-2 w-[48.5%] ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                                <span className='text-xs'>Total Tests</span>
                                <span className='text-2xl md:text-4xl'>676,609,955</span>
                            </div>
                            <div className={`grid text-center p-2 w-[48.5%] ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                                <span className='text-xs'>Total Positives</span>
                                <span className='text-2xl md:text-4xl text-[#7d9d25]'>6,881,955</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className={`grid text-center p-2 w-[48.5%] ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                                <span className='text-xs'>28-Day Tests</span>
                                <span className='text-2xl'>4,035,254</span>
                            </div>
                            <div className={`grid text-center p-2 w-[48.5%] ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                                <span className='text-xs'>28-Day Positives</span>
                                <span className='text-2xl text-[#7d9d25]'>28,018</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full grid md:flex px-2 space-y-4 md:space-y-0'>
                    <div className={`w-full grid md:w-3/5`}>
                    {
                        mapview === 'testing' ?
                            <GoogleMapComponent />
                            :
                            <GoogleMapComponent />
                    }
                        <div className='w-full flex items-center space-x-8 justify-end my-4'>
                            <div 
                                className={`cursor-pointer text-sm ${mapview === 'testing' ? 'border-b-2 text-gray-700': 'text-gray-400'} border-[#54c5cf] py-1 cursor-pointer`}
                                onClick={() => setMapview('testing')}
                            >
                                Saturation/coverage for testing
                            </div>
                            <div 
                                className={`cursor-pointer whitespace-nowrap text-sm ${mapview === 'positive' ? 'border-b-2 text-gray-700' : 'text-gray-400'} border-[#54c5cf] py-1 cursor-pointer`}
                                onClick={() => setMapview('positive')}
                            >
                                Positives identification
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-2/5 px-3 border-t md:border-none border-gray-300'>
                        <div className={`${ theme === 'dark' ? 'bg-[#114862]' : 'bg-transparent'} mt-0 md:mt-[-10px] space-y-4`}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-6'>
                                    <div 
                                        className={`cursor-pointer text-gray-600 text-sm ${period === 'weekly' && 'border-b-2'} border-[#54c5cf] py-1`}
                                        onClick={() => setPeriod('weekly')}
                                    >
                                        Weekly
                                    </div>
                                    <div 
                                        className={`cursor-pointer whitespace-nowrap text-gray-600 text-sm ${period === '28days' && 'border-b-2'} border-[#54c5cf] py-1`}
                                        onClick={() => setPeriod('28days')}
                                    >
                                        Last 28 days
                                    </div>
                                </div>
                                <div className='w-full flex space-x-4 items-center justify-end'>
                                    <IoAnalyticsOutline 
                                        size={30} 
                                        className={`cursor-pointer ${chart === 'line' ? 'text-[#114862]' : 'text-[#54c5cf]'}`} 
                                        onClick={() => setChart('line')}
                                    />
                                    <ImStatsBars 
                                        size={20} 
                                        className={`cursor-pointer ${chart === 'bar' ? 'text-[#114862]' : 'text-[#54c5cf]'}`}
                                        onClick={() => setChart('bar')}
                                    />
                                </div>
                            </div>
                            
                        {
                            chart === 'line' ?
                                <LineChart labels={labels()} data={data()} barsColor='rgba(0,80,114,1)' fillColor='rgba(84,197,207,1)' title={`${generateTitle()} test`} />
                                :
                                <BarChart labels={labels()} data={data()} barsColor='rgba(0,80,114,1)' title={`${generateTitle()} test`} />
                        }
                        {
                            chart === 'line' ? 
                                <LineChart labels={labels()} data={data()} barsColor='rgba(125,157,37,1)' fillColor='rgba(186,200,147,1)' title={`${generateTitle()} positive`} />
                                :
                                <BarChart labels={labels()} data={data()} barsColor='rgba(125,157,37,1)' title={`${generateTitle()} positive`} />
                        }              
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
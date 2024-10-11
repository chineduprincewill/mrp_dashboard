import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import BarChart from '../../charts/BarChart';
import AgeBands from '../../common/AgeBands';
import TimerComponent from '../../common/TimerComponent';
import GoogleMapComponent from '../../common/GoogleMapComponent';

const Dashboard = () => {

    const { theme } = useContext(AppContext);

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

    return (
        <div className='w-full m-0'>
            <div className='w-full flex justify-between bg-white h-16 items-center px-2'>
                <span className='uppercase text-[#005072] font-extralight text-3xl'>apin situation room</span>
                <TimerComponent />
            </div>

            <div className='w-full md:flex my-4 space-y-4 md:space-y-0'>
                <div className='w-full md:w-3/5 px-2 space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className={`grid text-center p-2 w-[48.5%] ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                            <span className='text-xs'>Total Tests</span>
                            <span className='text-4xl'>676,609,955</span>
                        </div>
                        <div className={`grid text-center p-2 w-[48.5%] ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                            <span className='text-xs'>Total Positives</span>
                            <span className='text-4xl text-red-500'>6,881,955</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className={`grid text-center p-2 w-[48.5%] ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                            <span className='text-xs'>28-Day Tests</span>
                            <span className='text-2xl'>4,035,254</span>
                        </div>
                        <div className={`grid text-center p-2 w-[48.5%] ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                            <span className='text-xs'>28-Day Positives</span>
                            <span className='text-2xl text-red-500'>28,018</span>
                        </div>
                    </div>
                    <div className={`w-full min-h-96 bg-[#114862] p-4 ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                        <GoogleMapComponent />
                    </div>
                </div>
                <div className='w-full md:w-2/5 px-3'>
                    <div className={`h-[600px] bg-[#114862] ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'} p-2 space-y-2`}>
                        <h1 className='py-1 border-b border-gray-300 text-gray-600 text-lg font-extralight'>Filter</h1>
                        <div className='w-full flex items-center space-x-4 pt-2 pb-4 border-b border-gray-300'>
                            <AgeBands />
                            <select
                                className='border border-gray-400 p-2'
                            >
                                <option value=''>Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            <select
                                className='border border-gray-400 p-2'
                            >
                                <option value=''>Modality</option>
                            </select>
                        </div>
                        <BarChart labels={labels()} data={data()} barsColor='rgba(0,80,114,1)' title='Weekly test' />
                        <BarChart labels={labels()} data={data()} barsColor='rgba(246,10,10,1)' title='Weekly positive' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard
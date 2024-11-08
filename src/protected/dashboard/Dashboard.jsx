import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import TimerComponent from '../../common/TimerComponent';
import GoogleMapComponent from '../../common/GoogleMapComponent';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { ImStatsBars } from 'react-icons/im';
import { formatNumber } from 'chart.js/helpers';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { fetchStateDetail, fetchStateLgas, fetchStatesSummary, getTotal28Positives, getTotal28Tests, getTotalPositives, getTotalTests } from '../../apis/dashboardActions';
import SectionLoader from '../../common/SectionLoader';
import { MdGpsFixed } from 'react-icons/md';
import TestsChart from './components/TestsChart';
import PositivesChart from './components/PositivesChart';
import TestsChartModal from './components/TestsChartModal';
import PositivesChartModal from './components/PositivesChartModal';
import { generateMarkers, generateFilledmapMarkers, generateFilledmapCordinates, tokenExpired } from '../../apis/functions';
import FilledMapComponent from '../../common/FilledMapComponent';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    const { token, locality, totaltesting, totalpositive, day28testing, day28positive, updateDashboardValues, cancelFilter, selectedState, updateStateSelection, record, refreshRecord } = useContext(AppContext);
    const [chart, setChart] = useState('line');
    const [period, setPeriod] = useState('weekly');
    const [refreshpage, setRefreshpage] = useState();
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [googleMaps, setGoogleMaps] = useState(window.google);
    const [mapview, setMapview] = useState('testing');
    const [markers, setMarkers] = useState();
    const [pmarkers, setPmarkers] = useState();
    const [statesSummary, setStatesSummary] = useState(null);
    const [stateDetail, setStateDetail] = useState(null);
    const [loc, setLoc] = useState()
    const [totaltest, setTotaltest] = useState();
    const [totalpos, setTotalpos] = useState();
    const [day28test, setDay28test] = useState();
    const [day28pos, setDay28pos] = useState();
    const [showmap, setShowmap] = useState(false);
    const [showtestmodal, setShowtestmodal] = useState(false);
    const [showpositivemodal, setShowpositivemodal] = useState(false);
    const [lgas, setLgas] = useState(null);
    const [filledmarkers, setFilledmarkers] = useState();

    if(tokenExpired(statesSummary) || tokenExpired(stateDetail)){
        window.location.assign('https://apps.apin.org.ng/sitroom/situation-login.php');
    }

    if(window.location.href.split('#')[1] === 'return'){
        navigate('/');
        window.location.reload();
    }

    const clearSelection = () => {
        cancelFilter();
        updateStateSelection(null);
        window.location.reload();
    }

    const displayMapMarkers = () => {
        setShowmap(true);
        refreshRecord(Date.now());
    }

    const toggleMapview = (view, status) => {
        if(view === 'positive' && status === 'testing'){
            setMapview('testing')
        }
        else if(view === 'testing' && status === 'positive'){
            setMapview('positive')
        }
    }

    const generateTitle = () => {
        let msg = period === 'weekly' ? 'Weekly' : 'Last 28 days';
        return msg;
    }


    useEffect(() => {
        fetchStatesSummary(token, {}, setStatesSummary, setError, setFetching);

        const intervalId = setInterval(() => {
            fetchStatesSummary(token, {}, setStatesSummary, setError, setFetching);
        }, 60000); // 60 seconds
      
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        if(statesSummary !== null){
            setLoc(statesSummary?.statesSummary?.state);
            setTotaltest(getTotalTests(statesSummary?.statesSummary));
            setTotalpos(getTotalPositives(statesSummary?.statesSummary));
            setDay28test(getTotal28Tests(statesSummary?.statesSummary));
            setDay28pos(getTotal28Positives(statesSummary?.statesSummary));
        }
    }, [Date.now()])

    useEffect(() => {
        if(stateDetail !== null) {
            setMarkers(generateMarkers(stateDetail));
            setPmarkers(generateFilledmapMarkers(stateDetail));
        }
    }, [selectedState, record]) 

    useEffect(() => {
        if(selectedState !== null){
            const data = {
                state: selectedState
            }
            fetchStateDetail(token, data, setStateDetail, setError, setLoading);
            setShowmap(false);
            setMapview('testing');
        }
    }, [selectedState])

    useEffect(() => {
        refreshRecord(Date.now())
    }, [selectedState])

    useEffect(() => {
        if(pmarkers && lgas !== null) {
            //console.log(pmarkers)
            setFilledmarkers(generateFilledmapCordinates(pmarkers, lgas?.lgas));
        }
    }, [pmarkers, lgas])

    useEffect(() => {
        if(selectedState !== null){
            fetchStateLgas(token, { state: selectedState }, setLgas, setError);
        }
    }, [selectedState])

    return (
        <div className='w-full m-0'>
            <div className='w-full flex justify-between bg-white dark:bg-[#19212c] h-16 items-center px-2'>
                <div className='flex items-baseline space-x-2 uppercase text-[#005072] dark:text-white font-extralight text-xl md:text-3xl'>
                    <div>EPI-SURVEILLANCE {locality && ' - '+locality}</div>
                    {locality && 
                        <div className='flex space-x-2 items-center'>
                            <AiOutlineCloseCircle 
                                size={15} 
                                className='text-red-700 cursor-pointer' 
                                title='cancel selection'
                                onClick={() => clearSelection()}
                            />
                        </div>
                    }
                </div>
                <TimerComponent />
            </div>

            <div className='w-full grid md:flex my-4 space-y-4 md:space-y-0'>
                <div className='w-full md:w-3/5 grid space-y-4 md:space-y-0 px-2'>
                    <div className='w-full space-y-4'>
                        <div className='flex items-center justify-between'>
                            <div className={`grid text-center p-2 w-[48.5%] bg-gray-200 dark:bg-gray-700`}>
                                <span className='text-xs'>Total Tests</span>
                                <span className='text-2xl md:text-4xl'>
                                    {totaltesting ? formatNumber(totaltesting) : (totaltest ? formatNumber(totaltest) : <SectionLoader />) }
                                </span>
                            </div>
                            <div className={`grid text-center p-2 w-[48.5%] bg-gray-200 dark:bg-gray-700`}>
                                <span className='text-xs'>Total Positives</span>
                                <span className='text-2xl md:text-4xl text-[#7d9d25]'>
                                    {totalpositive ? formatNumber(totalpositive) : (totalpos ? formatNumber(totalpos) : <SectionLoader />)}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className={`grid text-center p-2 w-[48.5%] bg-gray-200 dark:bg-gray-700`}>
                                <span className='text-xs'>28-Day Tests</span>
                                <span className='text-2xl'>
                                    {day28testing ? formatNumber(day28testing) : (day28test ? formatNumber(day28test) : <SectionLoader />)}</span>
                            </div>
                            <div className={`grid text-center p-2 w-[48.5%] bg-gray-200 dark:bg-gray-700`}>
                                <span className='text-xs'>28-Day Positives</span>
                                <span className='text-2xl text-[#7d9d25]'>
                                    {day28positive ? formatNumber(day28positive) : (day28pos ? formatNumber(day28pos) : <SectionLoader />)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`w-full grid`}>
                        <div className='h-12 flex items-center'>
                        {
                            selectedState !== null && (
                                showmap ?
                                <div className='w-full flex items-center space-x-8 justify-between'>
                                    <div 
                                        className={`cursor-pointer text-sm py-1 ${mapview === 'testing' && 'text-gray-300 dark:text-gray-700'}`}
                                        onClick={() => toggleMapview(mapview, 'testing')}
                                    >
                                        <IoMdArrowDropleft size={30} />
                                    </div>
                                    <div>
                                    {
                                        mapview === 'testing' ? 'Saturation/coverage for testing' : 'Positives identification'
                                    }
                                    </div>
                                    <div 
                                        className={`cursor-pointer text-sm py-1 ${mapview === 'positive' && 'text-gray-300 dark:text-gray-700'}`}
                                        onClick={() => toggleMapview(mapview, 'positive')}
                                    >
                                        <IoMdArrowDropright size={30} />
                                    </div>
                                </div>
                                :
                                <div className='w-full flex items-center space-x-8 justify-center'>
                                    <div
                                        className='flex space-x-2 items-center cursor-pointer text-green-800 dark:text-green-300'
                                        onClick={() => displayMapMarkers()}
                                    >
                                        <span className='uppercase'>view on map</span>
                                        <MdGpsFixed size={15} />
                                    </div>
                                </div>
                            )
                                
                        }
                        </div>
                        {
                            mapview === 'testing' ? 
                            <GoogleMapComponent loading={loading} selectedState={selectedState} markers={markers && markers} />
                            :
                            <GoogleMapComponent loading={loading} selectedState={selectedState} markers={pmarkers && pmarkers} />
                        }
                        {/**<div className={`${mapview === 'testing' ? 'block' : 'hidden'}`}>
                            <GoogleMapComponent loading={loading} selectedState={selectedState} markers={markers && markers} />
                        </div>
                        <div className={`${mapview === 'positive' ? 'block' : 'hidden'}`}>
                            {mapview === 'positive' && <FilledMapComponent markers={filledmarkers} selectedState={selectedState} />}
                        </div>*/}
                    </div>
                </div>
                <div className='w-full md:w-2/5 grid px-4 space-y-4 md:space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-6'>
                            <div 
                                className={`cursor-pointer text-sm ${period === 'weekly' && 'border-b-2'} border-[#54c5cf] py-1 dark:font-extralight`}
                                onClick={() => setPeriod('weekly')}
                            >
                                Weekly
                            </div>
                            <div 
                                className={`cursor-pointer whitespace-nowrap text-sm ${period === '28days' && 'border-b-2'} border-[#54c5cf] py-1 dark:font-extralight`}
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
                    <TestsChart chart={chart} generateTitle={generateTitle()} detail={stateDetail !== null && stateDetail?.stateDetail} period={period} setShowtestmodal={setShowtestmodal} />
                    <PositivesChart chart={chart} generateTitle={generateTitle()} detail={stateDetail !== null && stateDetail?.stateDetail} period={period} setShowpositivemodal={setShowpositivemodal} />
                </div>
            </div>
            {
                showtestmodal && <TestsChartModal setShowtestmodal={setShowtestmodal} chart={chart} generateTitle={generateTitle()} detail={stateDetail !== null && stateDetail?.stateDetail} period={period} />
            }
            {
                showpositivemodal && <PositivesChartModal setShowpositivemodal={setShowpositivemodal} chart={chart} generateTitle={generateTitle()} detail={stateDetail !== null && stateDetail?.stateDetail} period={period} />
            }
        </div>
    )
}

export default Dashboard
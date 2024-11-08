import React, { Fragment, useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Navlinks from './Navlinks'
import { AppContext } from '../../context/AppContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { TbLayoutDashboardFilled } from 'react-icons/tb'
import Navlinks2 from './Navlinks2'

const Sidebar = ({ toggleSidebar, navOpen }) => {

    const locatn = useLocation();
    const navigate = useNavigate();

    return (
        <Fragment>
            <div 
                className={navOpen ? 'fixed inset-0 z-50 mt-0 bg-black bg-opacity-50 transition-opacity md:hidden' : ''}
                onClick={toggleSidebar}
            ></div>
            <div className={`absolute left-0 top-0 z-50 ${navOpen ? 'block w-[230px]' : 'hidden'} md:block md:w-[230px] h-screen overflow-y-hidden duration-300 ease-linear bg-gray-100 dark:bg-gray-800`}>
                <div className='hidden md:flex md:justify-center md:items-center md:w-full bg-[#005072] px-6 md:h-[50px] space-x-2 text-white'>  
                </div>
                <div className='flex justify-end mt-2 md:hidden px-6'>
                    <AiOutlineClose size={25} className='text-[#005072] cursor-pointer' onClick={toggleSidebar} />
                </div>
                <div className='w-full py-2.5 px-4 mb-2 bg-white dark:bg-[#19212c]'>
                    <div className='w-full flex'>
                        <img src='/assets/logo.png' alt='logo' width='44px' />
                        <div className='ml-2 pl-2 grid border-l border-[#005072] text-[#005072] dark:border-white dark:text-white uppercase'>
                            <span className='text-xs'>case finding</span>
                            <span className='font-semibold text-lg'>dashboard</span>
                        </div>
                    </div>
                </div>
                <div className='w-full px-3 py-1 flex justify-center'>
                    <div className={`w-full p-3 ${locatn.pathname === '/' && 'bg-gray-200 dark:bg-gray-700'} mt-1`}>
                    {
                        locatn.pathname === '/' ?
                            <span>Tests | <span className='text-[#7d9d25]'>Positives</span></span>
                            :
                            <div 
                                className='flex items-center space-x-3 cursor-pointer hover:text-[#a6ce39]'
                                onClick={() => navigate('/#return')}
                            >
                                <TbLayoutDashboardFilled size={17} className='mt-0.5' />
                                <span>Dashboard</span>
                            </div>
                    }
                    </div>
                </div>
                <div className='w-full flex justify-start px-3'>
                {
                    locatn.pathname === '/' ?
                        <Navlinks /> : <Navlinks2 />
                }  
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar
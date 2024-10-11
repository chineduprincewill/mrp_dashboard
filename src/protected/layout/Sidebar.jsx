import React, { Fragment, useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Navlinks from './Navlinks'
import Logo from '/assets/logo.png'
import { AppContext } from '../../context/AppContext'

const Sidebar = ({ toggleSidebar, navOpen }) => {

    const { theme } = useContext(AppContext);

    return (
        <Fragment>
            <div 
                className={navOpen ? 'fixed inset-0 z-50 mt-0 bg-black bg-opacity-50 transition-opacity md:hidden' : ''}
                onClick={toggleSidebar}
            ></div>
            <div className={`absolute left-0 top-0 z-50 ${navOpen ? 'block w-[200px] bg-gray-100' : 'hidden'} md:block md:w-[230px] h-screen overflow-y-hidden duration-300 ease-linear`}>
                <div className='hidden md:flex md:justify-center md:items-center md:w-full bg-[#005072] px-6 md:h-[50px] space-x-2 text-white'>  
                </div>
                <div className='flex justify-end mt-2 md:hidden px-6'>
                    <AiOutlineClose size={25} className='text-[#005072] cursor-pointer' onClick={toggleSidebar} />
                </div>
                <div className='w-full py-2.5 px-4 mb-2 bg-white'>
                    <div className='w-full flex'>
                        <img src='/assets/logo.png' alt='logo' width='44px' />
                        <div className='ml-2 pl-2 grid border-l border-[#005072] text-[#005072] uppercase'>
                            <span className='text-xs'>case finding</span>
                            <span className='font-semibold text-lg'>dashboard</span>
                        </div>
                    </div>
                </div>
                <div className='w-full px-3 py-1 flex justify-center text-center'>
                    <div className={`w-full p-3 ${ theme === 'dark' ? 'bg-[#114862]' : 'bg-gray-200'}`}>
                        <span>Tests | <span className='text-red-500'>Positives</span> by State</span>
                    </div>
                </div>
                <div className='w-full flex justify-start p-3'>
                    <Navlinks />
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar
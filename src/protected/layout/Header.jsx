import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { formatDateAndTime } from '../../apis/functions';
//import { AuthContext } from '../../context/AuthContext';

const Header = ({ toggleSidebar }) => {

    //const { user, logout } = useContext(AuthContext);
    const locatn = useLocation();
    //const pageTitle = locatn.pathname.replace('/', '').replace('-', ' ');
    const { theme, toggleTheme } = useContext(AppContext);

    return (
        <header className='sticky w-full top-0 z-40 bg-[#005072] h-[50px] py-2'>
            <div className='flex flex-grow items-center justify-between p-2 md:px-3 2xl:px-11'>
                <div className='flex items-center space-x-3'>   
                    <RxHamburgerMenu size={25} className='text-gray-100 cursor-pointer' onClick={toggleSidebar} />
                    <div className='text-xl font-bold hidden md:block md:pl-[180px] capitalize'>{}</div>
                </div>
                <div className='flex items-center space-x-4 md:space-x-8'>
                    <div className='flex justify-end text-white space-x-4 text-sm'>
                        <span className='cursor-pointer hover:text-[#a6ce39]'>CEO Dashboard</span>
                        <div className='h-6 border-x border-gray-400'></div>
                        <span className='cursor-pointer hover:text-[#a6ce39]'>MRP</span>
                        <div className='h-6 border-x border-gray-400'></div>
                        <span className='cursor-pointer hover:text-[#a6ce39]'>NDR</span>
                        <div className='h-6 border-x border-gray-400'></div>
                        <span className='cursor-pointer hover:text-[#a6ce39]'>NMRS</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
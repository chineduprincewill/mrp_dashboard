import React, { useContext, useEffect, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ThemeToggle from '../../common/ThemeToggle';
import { TbLayoutDashboardFilled, TbVirusSearch } from 'react-icons/tb';

const Header = ({ toggleSidebar }) => {

    const locatn = useLocation();

    return (
        <header className='sticky w-full top-0 z-40 bg-[#005072] h-[50px] py-2'>
            <div className='flex flex-grow items-center justify-between p-2 md:px-3 2xl:px-11'>
                <div className='flex items-center space-x-3'>   
                    <RxHamburgerMenu size={25} className='text-gray-100 cursor-pointer' onClick={toggleSidebar} />
                    <div className='text-xl font-bold hidden md:block md:pl-[180px] capitalize'>{}</div>
                </div>
                <div className='flex items-center space-x-4 md:space-x-8'>
                    <div className='flex justify-end text-white space-x-4 text-sm'>
                    {
                        locatn.pathname === '/' ?
                            <Link to='/case-finders' className='flex space-x-1 hover:text-[#a6ce39]'>
                                <TbVirusSearch size={20} />
                                <span className='hidden md:block'>Case finders</span>
                            </Link>
                            :
                            <Link to='/#return' className='flex space-x-1 hover:text-[#a6ce39]'>
                                <TbLayoutDashboardFilled size={16} className='mt-0.5' />
                                <span className='hidden md:block'>Dashboard</span>
                            </Link>
                    }
                        
                        <div className='h-6 border-x border-gray-400'></div>
                        <span className='cursor-pointer hover:text-[#a6ce39]'>CEO Dashboard</span>
                        <div className='h-6 border-x border-gray-400'></div>
                        <a href='https://apps.apin.org.ng/sitroom/dash/public/index.php'><span className='cursor-pointer hover:text-[#a6ce39]'>MRP</span></a>
                        <div className='h-6 border-x border-gray-400'></div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
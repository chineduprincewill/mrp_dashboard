import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TbVirusSearch } from 'react-icons/tb';
import { CiSettings } from 'react-icons/ci';
import { HiUser } from 'react-icons/hi';

const Navlinks2 = () => {

    const locatn = useLocation();

    const navlinks = [
        {
            id: 1,
            title: "Case finders",
            url: "/case-finders",
            icon: <TbVirusSearch size={17} />
        },
        {
            id: 2,
            title: "Profile",
            url: "#",
            icon: <HiUser size={17} />
        },
        {
            id: 3,
            title: "Settings",
            url: "#",
            icon: <CiSettings size={17} />
        },
    ]

    return (
        <ul className='w-full mt-2 space-y-1'>
            {
                (navlinks !== null) && navlinks.map(nav => {
                    return (
                        <li key={nav.id} className={`px-3 py-1.5 md:py-2.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${nav.url === locatn.pathname && 'bg-gray-200 dark:bg-gray-700'}`}>
                            <Link to={nav.url} key={nav.id} className='flex justify-start items-center space-x-3 my-1 hover:text-[#a6ce39]'>
                                {nav.icon}
                                <span>{nav.title}</span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Navlinks2

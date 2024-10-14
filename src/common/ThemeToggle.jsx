import React, { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Toggle theme on button click
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    // Apply theme class to <html> and save to localStorage
    useEffect(() => {
        if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    return (
        theme === 'light' ? 
            <MdDarkMode
                size={22} 
                className='cursor-pointer text-black' 
                onClick={() => toggleTheme()}
            /> 
            : 
            <MdLightMode 
                size={22} 
                className='cursor-pointer' 
                onClick={() => toggleTheme()}
            />
    );
};

export default ThemeToggle;

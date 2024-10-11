import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    //const apptheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState('light');

    /**const [token, setToken] = useState(userData ? userData?.token : '');
    const [user, setUser] = useState(userData ? userData?.user : null);
    const [record, setRecord] = useState(null);

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
    }

    useEffect(() => {
        
        if(localStorage.getItem('isLoggedIn')){
            setToken(userData?.token);
            setUser(userData?.user);
        }
    }, [])

    const refreshRecord = (val) => {
        setRecord(val);
    }*/

    const toggleTheme = (val) => {
        setTheme(localStorage.setItem('theme', val));
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [])

    useEffect(() => {
        localStorage.getItem('theme')
    }, [theme])

    return(
        <AppContext.Provider value={
            { 
                /**token, 
                user, 
                logout, 
                record, 
                refreshRecord*/
                theme,
                toggleTheme
            }
        }>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
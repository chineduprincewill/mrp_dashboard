import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    //const apptheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState('light');
    const [locality, setLocality] = useState();
    const [totaltesting, setTotaltesting] = useState(676609955);
    const [totalpositive, setTotalpostitive] = useState(6881955);
    const [day28testing, setDay28testing] = useState(4035254);
    const [day28positive, setDay28positive] = useState(28018);

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

    const updateDashboardValues = (val0, val1, val2, val3, val4) => {
        setLocality(val0);
        setTotaltesting(val1);
        setTotalpostitive(val2);
        setDay28testing(val3);
        setDay28positive(val4)
    }

    const cancelFilter = () => {
        setLocality();
        setTotaltesting(676609955);
        setTotalpostitive(6881955);
        setDay28testing(4035254);
        setDay28positive(28018)
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [totaltesting])

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
                toggleTheme,
                locality,
                totaltesting,
                totalpositive,
                day28testing,
                day28positive,
                updateDashboardValues,
                cancelFilter
            }
        }>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
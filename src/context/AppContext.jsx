import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [locality, setLocality] = useState();
    const [totaltesting, setTotaltesting] = useState();
    const [totalpositive, setTotalpostitive] = useState();
    const [day28testing, setDay28testing] = useState();
    const [day28positive, setDay28positive] = useState();
    const [selectedState, setSelectedState] = useState(null);
    const [record, setRecord] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    /**const [user, setUser] = useState(userData ? userData?.user : null);
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
    }, [])*/

    const refreshRecord = (val) => {
        setRecord(val);
    }

    const updateDashboardValues = (val0, val1, val2, val3, val4) => {
        setLocality(val0);
        setTotaltesting(val1.toString());
        setTotalpostitive(val2.toString());
        setDay28testing(val3);
        setDay28positive(val4)
        console.log(val0,val1,val2,val3,val4);
    }

    const updateStateSelection = (val) => {
        setSelectedState(val);
    }

    const cancelFilter = () => {
        setLocality();
        setTotaltesting();
        setTotalpostitive();
        setDay28testing();
        setDay28positive()
    }

    useEffect(() => {
        setTheme(localStorage.getItem('theme'));
    }, [localStorage.getItem('theme')])

    return(
        <AppContext.Provider value={
            { 
                token, 
                /**user, 
                logout, 
                record, 
                refreshRecord*/
                locality,
                totaltesting,
                totalpositive,
                day28testing,
                day28positive,
                updateDashboardValues,
                cancelFilter,
                selectedState,
                updateStateSelection,
                record,
                refreshRecord,
                theme
            }
        }>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
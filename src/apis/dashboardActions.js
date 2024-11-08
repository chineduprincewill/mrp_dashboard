import axios from "./baseUrl";

export const fetchStatesSummary = async ( token, data, setStatesSummary, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post(`states-summary`,
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setStatesSummary(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}


export const fetchStateDetail = async ( token, data, setStateDetail, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post(`state-detail`,
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setStateDetail(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}


export const fetchStateLgas = async ( token, data, setLgas, setError ) => {
    try{
        const response  = await axios.post(`state-lgas`,
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setLgas(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }
}


export const getTotalTests = (arr) => {
    let num = 0;
    arr.map(obj => num += parseInt(obj?.total_entries));
    return num;
}

export const getTotalPositives = (arr) => {
    let num = 0;
    arr.map(obj => num += parseInt(obj?.confirmed));
    return num;
}

export const getTotal28Tests = (arr) => {
    let num = 0;
    arr.map(obj => num += parseInt(obj?.last_28_days_count));
    return num;
}

export const getTotal28Positives = (arr) => {
    let num = 0;
    arr.map(obj => num += parseInt(obj?.confirmed_last_28_days));
    return num;
}
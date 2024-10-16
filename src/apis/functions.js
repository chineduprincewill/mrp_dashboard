import { useLocation } from "react-router-dom";

export const formatPagetitle = () => {
    const loc = useLocation();
    return loc.pathname.replace('/', '').replace('-', ' ');
}

export const tableCustomStyles = {
    headCells: {
      style: {
          fontSize: '13px',
          fontWeight: 'bold',
          padding: '0 15px',
          justifyContent: 'left',
      },
      rows: {
        style: {
            fontWeight: 'bold', 
            color: 'red'
        },
    },
    },
  }


export const tokenExpired = (response) => {
    if(response !== null && response?.status === 'Token is Expired'){
        return true;
    }
    else{
        return false
    }
}


export const generatePagetitle = (resourcename) => {

    //resourcename && 
    var exisiting = localStorage.getItem('pagetitle') ? localStorage.getItem('pagetitle') : localStorage.setItem('pagetitle', resourcename);

    var data = exisiting && resourcename ? exisiting + ' - ' + resourcename : exisiting; 
    localStorage.setItem('pagetitle', data);
}


export const formatDate = (dt) => {

    const date = new Date(dt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
  
    return `${monthNames[month]} ${day}, ${year}`;
}


export const formatDateAndTime = (dt) => {

    const date = new Date(dt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${monthNames[month]} ${day}, ${year} ${hour}:${minutes}:${seconds}`;
}

export const formatTime = (dt) => {

    const date = new Date(dt);
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${hour}:${minutes}:${seconds}`;
}

export const alertColors = (val, alert, limit, trend) => {
    let color = 'text-blue-600';

    if(trend === 'increment'){
        if(val === limit || val > limit){
            color = 'bg-red-100 text-red-800';
        }
        else if(val > alert || val === alert){
            color = 'bg-orange-50 text-orange-400';
        }  
    }
    else{

        if( val === limit || val < limit){
            color = 'bg-red-100 text-red-800';
        } 
        else if(val < alert || val === alert){
            color = 'bg-orange-50 text-orange-400';
        } 
    }
    

    return color;
}


export const getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 

    today = yyyy+'-'+mm+'-'+dd;;
    return today;
}


export const getAssetDetailFieldValue = (detail, paramkey) => {
    let value;

    Object.keys(JSON.parse(detail)).map((key, i) => {
        if(key === paramkey){
            value = JSON.parse(detail)[key];
        }
    })

    return value;
}

export const formatNaira = (amount) => {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN"
    });
    return formatter.format(amount);
};

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const generateFiscalYear = () => {
    const currentYear = new Date().getFullYear();
    const dateRanges = [];

    for (let year = 2020; year <= currentYear; year++) {
        const startDate = new Date(year, 9, 1); // October 1st of the current year
        const endDate = new Date(year + 1, 8, 30); // September 30th of the next year
        dateRanges.push({ startDate, endDate });
    }

    return dateRanges;
}

export const pageRefresh = (setRefreshpage) => {
    setTimeout(() => setRefreshpage(Date.now(), 60000));
}

import { useLocation } from "react-router-dom";

export const formatPagetitle = () => {
    const loc = useLocation();
    return loc.pathname.replace('/', '').replace('-', ' ');
}

export const tableCustomStyles = {
    headCells: {
      style: {
          fontSize: '11px',
          textTransform: 'uppercase',
          justifyContent: 'left',
          backgroundColor: localStorage.getItem('theme') === 'dark' ? '#374151' : '#f3f4f6',
          color: localStorage.getItem('theme') === 'dark' ? '#f3f4f6' : '#000',
      },
    },
    rows: {
        style: {
            backgroundColor: localStorage.getItem('theme') === 'dark' ? '#1f2937' : '#f3f4f6',
            color: localStorage.getItem('theme') === 'dark' ? '#d1d5db' : '#000',
        },
    },
    pagination: {
        style: {
            backgroundColor: localStorage.getItem('theme') === 'dark' ? '#1f2937' : '#f3f4f6',
            color: localStorage.getItem('theme') === 'dark' ? '#f3f4f6' : '#000',
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

export const groupAllDataByWeek = (detail) => {
    const weeklyCounts = {};
    detail.forEach(item => {
        const date = moment(item.date_created);
        const startOfWeek = date.startOf('week').format('YYYY-MM-DD');
        weeklyCounts[startOfWeek] = (weeklyCounts[startOfWeek] || 0) + 1;
    });
    return weeklyCounts;
}

export const prepareLast28DaysData = (data) => {
    const today = moment();
    const october1 = moment('2024-10-01');
    const totalDays = today.diff(october1, 'days');

    const startDate = totalDays <= 28 ? october1 : today.clone().subtract(27, 'days');
    const dailyCounts = {};

    data.forEach(item => {
        const date = moment(item.date_created);
        if (date.isBetween(startDate, today, 'day', '[]')) {
            const day = date.format('YYYY-MM-DD');
            dailyCounts[day] = (dailyCounts[day] || 0) + 1;
        }
    });

    const labels = [];
    const counts = [];
    for (let i = 0; i <= today.diff(startDate, 'days'); i++) {
        const day = startDate.clone().add(i, 'days').format('YYYY-MM-DD');
        labels.push(day);
        counts.push(dailyCounts[day] || 0);
    }

    return { labels, counts };
}

/**export const generateFilledmapCordinates = (arr, key) => {
    return arr.reduce((result, currentValue) => {
      // Get the value of the property we want to group by (key)
      const groupKey = currentValue[key];
      
      // If the group doesn't exist in the result object, create it
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      
      // Push the current object into the correct group
      result[groupKey].push(
        {"cooridnates": [currentValue?.latitude,currentValue?.longitude]}
      );
      
      return result;
    }, {}); // Start with an empty object
  }*/

export const generateFilledmapCordinates = (arr, lgas) => {
    let mapArr = [];

    lgas.map(lga => {
        
        let coord = [];
                
        arr.map(item => {
            if(item?.lga === lga.lga && item?.longitude !== 0 && item?.longitude !== "0"){
                const lon = parseFloat(item.longitude);
                const lat = parseFloat(item.latitude);
                coord.push([lon, lat])
            }
        })

        const count = coord.length;

        const endcoord = coord[0];
        coord.push(endcoord);

        let lgaObj = {
            "type": "Feature",
            "properties": { "name": lga.lga, "value": count },
            "geometry": {
                "type": "Polygon",
                "coordinates": [coord]
            }
        }
        
        if(count > 0){
            mapArr.push(lgaObj)
        } 
    }) 
    return mapArr
}

export const generateMarkers = (stateDetail) => {
    let mkrdata = [];
    if(stateDetail !== null){
        stateDetail?.stateDetail.map((sd, index) => {
            mkrdata.push({
                id: index,
                position: {
                    lat: parseFloat(sd?.latitude),
                    lng: parseFloat(sd?.longitude)
                }
            })
        })
    }
    return mkrdata;
}

export const generateFilledmapMarkers = (stateDetail) => {
    let mkrdata = [];
    if(stateDetail !== null){
        stateDetail?.stateDetail.map((sd, index) => {
            if(sd?.record_status === 'Linked'){
                mkrdata.push({
                    id: index,
                    position: {
                        lat: parseFloat(sd?.latitude),
                        lng: parseFloat(sd?.longitude)
                    }
                })
            }
        })
    }
    //console.log(mkrdata);
    return mkrdata;
}

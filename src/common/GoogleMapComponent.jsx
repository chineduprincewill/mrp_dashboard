import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'
import SectionLoader from './SectionLoader';
import NotificationLoader from './NotificationLoader';

// Define the container and map styles
const containerStyle = {
    width: '100%',
    height: '400px'
};

// Center position of the map
const statecords = [
    {
        state: "Benue",
        lat: 7.33333,
        lng: 8.75
    },
    {
        state: "Ondo",
        lat: 7.16667,
        lng: 5.08333
    },
    {
        state: "Ogun",
        lat: 7.16083330,
        lng: 3.34833330
    },
    {
        state: "Oyo",
        lat: 8.0,
        lng: 4.0
    },
    {
        state: "Plateau",
        lat: 9.16667,
        lng: 9.75
    },
]

const center = {
    lat: 7.33333, // Latitude of the center (e.g., San Francisco)
    lng: 8.75 // Longitude of the center
};

/**const markers = [
    { id: 1, name: 'Aganacha Primary Health Clinic', position: { lat: 6.65858, lng: 7.90102 } },
    { id: 2, name: 'Ivetse Primary Health Clinic', position: { lat: 6.67889404300007, lng: 7.89990234400005 } },
    { id: 3, name: 'Okpobila Health Post', position: { lat: 6.61118, lng: 7.91144 } },
    { id: 4, name: 'Gboko Township Clinic', position: { lat: 7.31894, lng: 8.99775 }},
    { id: 5, name: 'Gboko East Primary Health Centre', position: { lat: 7.32928466800007, lng: 9.01110839800003 }},
    { id: 6, name: 'Gboko General Hospital', position: { lat: 7.30324000000007, lng: 8.98705000000007 }},
    { id: 7, name: 'Gboko Primary Health Centre', position: { lat: 7.32769775400004, lng: 8.99652099600007 }},
    { id: 8, name: 'Agwabi Primary Health Centre', position: { lat: 7.48773000000006, lng: 9.24321000000003 }},
    { id: 9, name: 'Dogo Primary Health Clinic', position: { lat: 7.37099000000006, lng: 9.20224000000007 }},
    { id: 10, name: 'Ikov Agudu Primary Health Clinic', position: { lat: 7.42248535100003, lng: 9.22692871100003 }},
    { id: 11, name: 'NKST Health Centre (Sevav)', position: { lat: 7.43450000000007, lng: 9.28831000000002 }},
];*/

const GoogleMapComponent = ({ loading, selectedState, markers }) => {

    const [googleMaps, setGoogleMaps] = useState(window.google);

    console.log(markers);

    const defaultIcon = {
        url: '/assets/marker3.png', // Google Maps default red marker
        scaledSize: googleMaps && new window.google.maps.Size(2, 2), // Resize the marker
    };

    const getStateCenterCord = (val) => {
        let cord;
        statecords.map(stc => {
            if(stc.state === val){
                cord = {
                    lat: stc.lat,
                    lng: stc.lng
                }
            }
        })
        return cord;
    }

    const defaultCenter = {
        lat: 9.077751,
        lng: 8.6774567
    }

    useEffect(() => {
        console.log(getStateCenterCord(selectedState));
    }, [])

    return (
        <div>
        { loading && <NotificationLoader /> }    
            <LoadScript googleMapsApiKey="AIzaSyAKdrTGAZX48oj9p7Z9hmyX1kCMmz8XDF4">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={selectedState !== null ? getStateCenterCord(selectedState) : defaultCenter}
                    zoom={8}
                    className='bg-red-500'
                >
                {/* Map through the markers array and render each marker */}
                    {markers && markers.length > 0 ? markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        icon={defaultIcon}
                    />
                    ))
                    :
                    <Marker
                        position={defaultCenter}
                        icon={defaultIcon}
                    />
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMapComponent
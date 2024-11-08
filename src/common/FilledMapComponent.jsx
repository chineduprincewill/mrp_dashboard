import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const geojsonData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": { "name": "Region 1", "value": 10 },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-73.935242, 40.730610],
              [-74.935242, 40.730610],
              [-74.935242, 41.730610],
              [-73.935242, 41.730610],
              [-73.935242, 40.730610]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": { "name": "Region 2", "value": 20 },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-74.935242, 40.730610],
              [-75.935242, 40.730610],
              [-75.935242, 41.730610],
              [-74.935242, 41.730610],
              [-74.935242, 40.730610]
            ]
          ]
        }
      }
    ]
  };

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

const FilledMapComponent = ({ markers, selectedState }) => {

    const [mapData, setMapData] = useState(null);

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

    useEffect(() => {
        // You can load GeoJSON dynamically or from an API here
        setMapData({
            "type": "FeatureCollection",
            "features": markers
        });
        console.log(markers);
    }, []);

    // Function to style the filled regions based on data properties
    const style = (feature) => {
        return {
        fillColor: feature.properties.value > 5 ? 'red' : 'green',
        weight: 1,
        opacity: 1,
        color: 'blue',
        dashArray: '3',
        fillOpacity: 0.7,
        };
    };

    // Function to highlight features when hovered
    const onEachFeature = (feature, layer) => {
        layer.on({
        mouseover: (e) => {
            const layer = e.target;
            layer.setStyle({
            weight: 3,
            color: '#666',
            fillOpacity: 0.9,
            });
        },
        mouseout: (e) => {
            const layer = e.target;
            layer.setStyle({
            weight: 1,
            color: 'blue',
            fillOpacity: 0.7,
            });
        },
        });
    };

    return (
        <MapContainer center={getStateCenterCord(selectedState)} zoom={8} style={{ height: "60vh", width: "100%" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mapData && (
            <GeoJSON data={mapData} style={style} onEachFeature={onEachFeature} />
        )}
        </MapContainer>
    );
}

export default FilledMapComponent
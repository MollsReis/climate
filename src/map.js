import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import './map.css';

class Map extends React.Component {
    componentDidMount() {
        const stations = require('./station.json').results;
        const tileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        const attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ' +
            'Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

        this.map = L.map(ReactDOM.findDOMNode(this), {
            boxZoom: false,
            center: [47.2, -120.8],
            doubleClickZoom: false,
            dragging: false,
            layers: [ L.tileLayer(tileUrl, { attribution: attribution })],
            scrollWheelZoom: false,
            zoom: 7,
            zoomControl: false
        });

        for (let station of stations) {
            console.log(station);
            L.marker([station.latitude, station.longitude]).addTo(this.map);
        }
    }
    render() {
        return <div className="map" />
    }
}

export default Map;

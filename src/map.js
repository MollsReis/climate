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
            doubleClickZoom: false,
            dragging: false,
            scrollWheelZoom: false,
            zoomControl: false,
            layers: [ L.tileLayer(tileUrl, { attribution: attribution })]
        });

        this.stations = L.featureGroup(stations.map((station) => {
            return L.marker([station.latitude, station.longitude], { title: station.name });
        })).addTo(this.map);

        this.map.fitBounds(this.stations.getBounds());
    }
    render() {
        return <div className="map" />
    }
}

export default Map;

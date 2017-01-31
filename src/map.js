import React from 'react';
import L from 'leaflet';
import List from './list'
import './map.css';

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            stations: require('./station.json').results.sort((a, b) => { return a.name.localeCompare(b.name); })
        };
    }
    componentDidMount() {
        const tileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        const attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ' +
            'Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

        let tiles = L.tileLayer(tileUrl, { attribution: attribution });
        let features = L.featureGroup(this.state.stations.map((station) => {
            return L.marker([station.latitude, station.longitude]).bindPopup(station.name);
        }));

        this.map = L.map('map', { layers: [ tiles, features ]}).fitBounds(features.getBounds());
    }
    handleListItemClick(station) {
        console.log(station);
    }
    render() {
        return (
            <div>
                <div id="map" className="map" />
                <List stations={ this.state.stations } itemClick={ this.handleListItemClick } />
            </div>
        );
    }
}

export default Map;

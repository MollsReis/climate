import React from 'react';
import L from 'leaflet';
import List from './list'
import './map.css';

class Map extends React.Component {
    constructor() {
        super();
        let stationsList = require('./stations.json').results.sort((a, b) => { return a.name.localeCompare(b.name); });
        let statesGeoJSON = require('./states.json');
        let stations = L.featureGroup(stationsList.map((station) => {
            return L.marker([station.latitude, station.longitude], { name: station.name }).bindPopup(station.name);
        }));
        let stateBoundaries = L.geoJson(statesGeoJSON, {
            filter: (feature) => { return feature.properties.NAME === 'Washington'; }
        });
        this.state = { stations: stations, stateBoundaries: stateBoundaries };
    }

    componentDidMount() {
        const tileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        const attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ' +
            'Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        let featureBounds = this.state.stations.getBounds();
        this.map = L.map('map', {
            layers: [
                L.tileLayer(tileUrl, { attribution: attribution }),
                this.state.stations,
                this.state.stateBoundaries
            ],
            maxBounds: featureBounds,
            minZoom: 7,
            zoomControl: false
        }).fitBounds(featureBounds);
    }

    handleListItemClick(station) {
        station.togglePopup();
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

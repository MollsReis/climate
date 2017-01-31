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
            return L.circleMarker([station.latitude, station.longitude], {
                name: station.name,
                color: '#333',
                fill: true,
                fillColor: '#ff6600',
                fillOpacity: 1,
                opacity: 1,
                radius: 6,
                weight: 2
            }).bindPopup(station.name);
        }));
        let stateBoundaries = L.geoJson(statesGeoJSON, {
            fill: false,
            filter: (feature) => { return feature.properties.NAME === 'Washington'; }
        });
        this.state = { stations: stations, stateBoundaries: stateBoundaries };
    }

    componentDidMount() {
        const tileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        const attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ' +
            'Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community | Data from NOAA API';
        let bounds = this.state.stateBoundaries.getBounds();
        let attributionControl = L.control.attribution({ position: 'bottomleft' }).addAttribution(attribution);
        this.map = L.map('map', {
            attributionControl: false,
            layers: [
                L.tileLayer(tileUrl),
                this.state.stateBoundaries,
                this.state.stations
            ],
            maxBounds: bounds,
            minZoom: 7,
            zoomControl: false
        }).fitBounds(bounds).addControl(attributionControl);
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

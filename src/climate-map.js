import React from 'react';
import L from 'leaflet';
import List from './list'
import './climate-map.css';

class ClimateMap extends React.Component {
    constructor(props) {
        super(props);
        this.stations = require('./data/stations.json').reduce((stations, state) => {
            stations.set(state.name, L.layerGroup(state.stations.map((station) => {
                return L.circleMarker([station.lat, station.lng], {
                    name: station.name,
                    color: '#333',
                    fill: true,
                    fillColor: '#ff6600',
                    fillOpacity: 1,
                    opacity: 1,
                    radius: 6,
                    weight: 2
                }).bindPopup(station.name);
            })));
            return stations;
        }, new Map());
        this.stateBoundaries = L.geoJson(require('./data/states.json'), {
            fill: false,
            filter: (state) => state.properties.NAME !== 'Puerto Rico'
        });
    }

    componentDidMount() {
        const tileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        const attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ' +
            'Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community | Data from NOAA API';
        this.map = L.map('climate-map', {
            attributionControl: false,
            center: [38, -95],
            layers: [
                L.tileLayer(tileUrl),
                this.stateBoundaries,
                ...this.stations.values()
            ],
            minZoom: 3,
            zoom: 5
        }).addControl(L.control.attribution({ position: 'bottomleft' }).addAttribution(attribution));
    }

    regionClick(region) {
        console.log(region);
    }

    stationClick(station) {
        console.log(station);
    }

    render() {
        return (
            <div>
                <div id="climate-map" className="climate-map" />
                <List stations={ this.stations }
                      stationClick={ this.stationClick.bind(this) }
                      regionClick={ this.regionClick.bind(this) } />
            </div>
        );
    }
}

export default ClimateMap;

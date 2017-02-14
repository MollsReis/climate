import React from 'react';
import L from 'leaflet';
import List from './list'
import { regionStore, stationStore } from './store.js'
import './style/climate-map.css';

const DEFAULT_CENTER = [38, -95];
const DEFAULT_ZOOM = 5;
const TILE_URL = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const ATTRIBUTION_TEXT = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ' +
    'Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community | Data from NOAA API';

class ClimateMap extends React.Component {
    constructor(props) {
        super(props);

        regionStore.subscribe(this.handleRegionChange.bind(this));
        stationStore.subscribe(this.handleStationChange.bind(this));

        this.stations = require('./data/stations.json').reduce((stations, state) => {
            stations.set(state.name, L.layerGroup(state.stations.map((station) => {
                let popupContents = `<b>${station.name}</b><br />` +
                    `Lat, Lng: ${station.lat.toFixed(4)}, ${station.lng.toFixed(4)}`;
                return L.circleMarker([station.lat, station.lng], {
                    name: station.name,
                    color: '#333',
                    coordsToLatLng: ClimateMap.coordsToLatLng,
                    fill: true,
                    fillColor: '#ff6600',
                    fillOpacity: 1,
                    opacity: 1,
                    radius: 6,
                    weight: 2
                }).bindPopup(popupContents);
            })));
            return stations;
        }, new Map());

        this.regionBoundaries = L.geoJson(require('./data/states.json'), {
            coordsToLatLng: ClimateMap.coordsToLatLng,
            fill: false,
            filter: (region) => region.properties.NAME !== 'Puerto Rico'
        });
    }

    static coordsToLatLng(coords) {
        return [coords[1], coords[0] > 170 ? coords[0] - 360: coords[0]];
    }

    componentDidMount() {
        this.map = L.map('climate-map', {
            attributionControl: false,
            center: DEFAULT_CENTER,
            layers: [
                L.tileLayer(TILE_URL),
                this.regionBoundaries,
                ...this.stations.values()
            ],
            minZoom: 3,
            zoom: DEFAULT_ZOOM,
            zoomControl: false
        }).addControl(L.control.attribution({ position: 'bottomleft' }).addAttribution(ATTRIBUTION_TEXT));
    }

    handleRegionChange() {
        const state = regionStore.getState();
        let boundsArray = [];

        this.regionBoundaries
            .removeFrom(this.map)
            .setStyle((region) => {
                if (!state.regions.length || state.regions.indexOf(region.properties.NAME) !== -1) {
                    return { color: '#3388ff' };
                } else {
                    return { color: 'rgba(0,0,0,0)' };
                }
            })
            .eachLayer((layer) => {
                if (state.regions.length && state.regions.indexOf(layer.feature.properties.NAME) !== -1) {
                    boundsArray.push(layer.getBounds());
                }
            })
            .addTo(this.map)
            .bringToBack();

        for (let entry of this.stations.entries()) {
            const region = entry[0], stations = entry[1];
            if ((!state.regions.length || state.regions.indexOf(region) !== -1) && !this.map.hasLayer(stations)) {
                this.map.addLayer(stations);
            } else if (state.regions.length && state.regions.indexOf(region) === -1 && this.map.hasLayer(stations)) {
                this.map.removeLayer(stations);
            }
        }

        if (boundsArray.length) {
            this.map.fitBounds(boundsArray);
        } else {
            this.map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
        }
    }

    handleStationChange() {
        const state = stationStore.getState();
        console.log(`${state.station} station selected`);
    }

    render() {
        return (
            <div>
                <div id="climate-map" className="climate-map" />
                <List stations={ this.stations } />
                <a className="fork-me" href="https://github.com/EvilScott/climate" target="_blank">
                    GitHub
                </a>
            </div>
        );
    }
}

export default ClimateMap;

import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import './map.css';

class Map extends React.Component {
    componentDidMount() {
        const tileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        const attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ' +
            'Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

        let stations = L.featureGroup(this.props.stations.map((station) => {
            return L.marker([station.latitude, station.longitude]).bindPopup(station.name);
        }));
        this.map = L.map(ReactDOM.findDOMNode(this), {
            layers: [ L.tileLayer(tileUrl, { attribution: attribution })]
        }).addLayer(stations).fitBounds(stations.getBounds());
    }
    render() {
        return (
            <div className="map" />
        );
    }
}

export default Map;

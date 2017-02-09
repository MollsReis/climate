import React from 'react'
import { stationStore } from './store.js'
import './style/station.css'

class Station extends React.Component {
    stationClick(station, e) {
        e.stopPropagation();
        station.openPopup();
        stationStore.dispatch({ type: 'SELECT_STATION', station: station });
    }

    render() {
        return (
            <div className="station" onClick={ this.stationClick.bind(this, this.props.station) }>
                { this.props.station.options.name }
            </div>
        );
    }
}

export default Station;

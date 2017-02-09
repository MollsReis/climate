import React from 'react'
import Station from './station.js'
import { regionStore } from './store.js'
import './style/region.css'

class Region extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    regionClick(region, e) {
        e.stopPropagation();
        this.setState((lastState) => {
            regionStore.dispatch({ type: lastState.show ? 'REMOVE_REGION' : 'ADD_REGION', region: region });
            return { show: !lastState.show };
        });
    }

    renderStation(station, i) {
        return <Station station={ station } key={ station + i } />
    }

    render() {
        return (
            <div className={ 'region' + (this.state.show ? ' show' : '') }
                 onClick={ this.regionClick.bind(this, this.props.region) }>
                { this.props.region } ({ this.props.stations.getLayers().length } stations)
                <div className="stations">
                    { this.props.stations.getLayers().map(this.renderStation.bind(this)) }
                </div>
            </div>
        );
    }
}

export default Region;

import React from 'react'
import store from './store.js'
import './style/station.css'

class Station extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    stationClick(station, e) {
        e.stopPropagation();
        this.setState((lastState) => { return { show: !lastState.show }; });
        store.dispatch({ type: 'SELECT_STATION', station: station });
    }

    render() {
        return (
            <div className={ 'station' + (this.state.show ? ' show' : '') }
                 onClick={ this.stationClick.bind(this, this.props.station) }>
                { this.props.station.options.name }
            </div>
        );
    }
}

export default Station;

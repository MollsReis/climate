import React from 'react'
import './style/station.css'

class Station extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    stationClick(station, e) {
        e.stopPropagation();
        this.setState((lastState) => { return { show: !lastState.show }; });
        //TODO redux action select station
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

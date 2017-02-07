import React from 'react'
import './list.css'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    toggleList() {
        this.setState((lastState) => { return { show: !lastState.show }});
    }

    stationClick(station, e) {
        e.stopPropagation();
        this.props.stationClick(station)
    }

    regionClick(region) {
        this.props.regionClick(region);
    }

    renderStationItem(station, i) {
        return (
            <li className="station" key={ station + i } onClick={ this.stationClick.bind(this, station)}>
                { station.options.name }
            </li>
        );
    }

    renderRegionItem(data, i) {
        let state = data[0], stations = data[1];
        return (
            <li className="region" key={ state + i } onClick={ this.regionClick.bind(this, state) }>
                { state } ({ stations.getLayers().length } stations)
                <ul>
                    { stations.getLayers().map(this.renderStationItem.bind(this)) }
                </ul>
            </li>
        );
    }

    render() {
        return (
            <div className={ 'list' + (this.state.show ? ' show' : '') }>
                <h3 onClick={ this.toggleList.bind(this) }>States // Stations</h3>
                <div className="scroll">
                    <ul>
                        { Array.from(this.props.stations.entries()).map(this.renderRegionItem.bind(this)) }
                    </ul>
                </div>
            </div>
        );
    }
}

export default List;

import React from 'react'
import './list.css'

class List extends React.Component {
    renderItem(station) {
        return (
            <li className="item" key={ station._leaflet_id } onClick={ () => this.props.itemClick(station) }>
                { station.options.name }
            </li>
        );
    }

    render() {
        return (
            <div className="list">
                <h3>WA NOAA Stations</h3>
                <ul>
                    { this.props.stations.getLayers().map(this.renderItem.bind(this)) }
                </ul>
            </div>
        );
    }
}

export default List;

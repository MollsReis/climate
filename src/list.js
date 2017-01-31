import React from 'react'
import './list.css'

class List extends React.Component {
    renderItem(station) {
        return (
            <li className="item" key={ station.id }>{ station.name }</li>
        );
    }
    render() {
        return (
            <div className="list">
                <h3>WA NOAA Stations</h3>
                <ul>
                    { this.props.stations.map(this.renderItem) }
                </ul>
            </div>
        );
    }
}

export default List;

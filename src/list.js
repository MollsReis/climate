import React from 'react'
import './list.css'

class List extends React.Component {
    renderItem(data, i) {
        let state = data[0], stations = data[1];
        return (
            <li className="item" key={ state + i } onClick={ () => this.props.itemClick(state) }>
                { state } ({ stations.getLayers().length } stations)
            </li>
        );
    }

    render() {
        return (
            <div className="list">
                <h3>States // Stations</h3>
                <ul>
                    { Array.from(this.props.stations.entries()).map(this.renderItem.bind(this)) }
                </ul>
            </div>
        );
    }
}

export default List;

import React from 'react'
import './list.css'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    renderItem(data, i) {
        let state = data[0], stations = data[1];
        return (
            <li className="item" key={ state + i } onClick={ () => this.props.itemClick(state) }>
                { state } ({ stations.getLayers().length } stations)
            </li>
        );
    }

    toggleList() {
        this.setState((lastState) => { return { show: !lastState.show }});
    }

    render() {
        return (
            <div className={ 'list' + (this.state.show ? ' show' : '') }>
                <h3 onClick={ this.toggleList.bind(this) }>States // Stations</h3>
                <div className="scroll">
                    <ul>
                        { Array.from(this.props.stations.entries()).map(this.renderItem.bind(this)) }
                    </ul>
                </div>
            </div>
        );
    }
}

export default List;

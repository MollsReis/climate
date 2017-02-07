import React from 'react'
import Region from './region.js'
import './style/list.css'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    toggleList() {
        this.setState((lastState) => { return { show: !lastState.show }});
    }

    renderRegion(data, i) {
        let region = data[0], stations = data[1];
        return <Region className="region" key={ region + i } region={ region } stations={ stations } />;
    }

    render() {
        return (
            <div className={ 'list' + (this.state.show ? ' show' : '') }>
                <h3 onClick={ this.toggleList.bind(this) }>States // Stations</h3>
                <div className="scroll">
                    <div className="regions">
                        { Array.from(this.props.stations.entries()).map(this.renderRegion.bind(this)) }
                    </div>
                </div>
            </div>
        );
    }
}

export default List;

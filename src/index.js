import React from 'react';
import ReactDOM from 'react-dom';
import Map from './map';
import List from './list';
import './index.css';

class App extends React.Component {
    constructor() {
        super();
        let stations = require('./station.json').results.sort((a, b) => { return a.name.localeCompare(b.name); });
        this.state = { stations: stations };
    }
    render() {
        return (
            <div className="app">
                <Map stations={ this.state.stations } />
                <List stations={ this.state.stations } />
            </div>
        );
    }
}

ReactDOM.render(<div><App /></div>, document.getElementById('root'));

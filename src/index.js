import React from 'react';
import ReactDOM from 'react-dom';
import ClimateMap from './climate-map'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './redux/reducers.js'
import './style/index.css';

const store = createStore(reducer, {});

ReactDOM.render(
    <Provider store={ store }>
        <ClimateMap />
    </Provider>,
    document.getElementById('root')
);

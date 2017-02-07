import { createStore } from 'redux'

const store = createStore((state = { region: null, station: null }, action) => {
    switch (action.type) {
        case 'SELECT_REGION':
            return { ...state, region: action.region };
        case 'SELECT_STATION':
            return { ...state, station: action.station };
        default:
            return state;
    }
});

export default store;

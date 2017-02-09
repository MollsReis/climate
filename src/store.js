import { createStore } from 'redux'

const store = createStore((state = { regions: [], station: null }, action) => {
    switch (action.type) {
        case 'ADD_REGION':
            return { ...state, regions: [...state.regions, action.region]};
        case 'REMOVE_REGION':
            return { ...state, regions: state.regions.filter((region) => region !== action.region )};
        case 'CLEAR_REGIONS':
            return { ...state, regions: []};
        case 'SELECT_STATION':
            return { ...state, station: action.station };
        default:
            return state;
    }
});

export default store;

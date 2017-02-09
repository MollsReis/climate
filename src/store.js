import { createStore } from 'redux'

export const regionStore = createStore((state = { regions: [] }, action) => {
    switch (action.type) {
        case 'ADD_REGION':
            return { regions: [...state.regions, action.region] };
        case 'REMOVE_REGION':
            return { regions: state.regions.filter((region) => region !== action.region) };
        case 'CLEAR_REGIONS':
            return { regions: [] };
        default:
            return state;
    }
});

export const stationStore = createStore((state = { station: null }, action) => {
    switch(action.type) {
        case 'SELECT_STATION':
            return { station: action.station };
        case 'CLEAR_STATION':
            return { station: null };
        default:
            return state;
    }
});

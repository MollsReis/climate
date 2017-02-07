import * as types from './action-types'

const reducer = (state = { region: null, station: null }, action) => {
    switch (action.type) {
        case types.SELECT_REGION:
            return { ...state, region: action.region };
        case types.SELECT_STATION:
            return { ...state, station: action.station };
        default:
            return state;
    }
};

export default reducer;

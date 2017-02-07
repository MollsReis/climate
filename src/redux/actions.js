import * as types from './action-types'

export const selectRegion = (region) => {
    return {
        type: types.SELECT_REGION,
        region: region
    }
};

export const selectStation = (station) => {
    return {
        type: types.SELECT_STATION,
        station: station
    }
};

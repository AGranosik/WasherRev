import {
    BUILDING_GETALL
} from "../actions/types";

const initialState = [];

export const buildingReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case BUILDING_GETALL:
            return action.payload;
        default:
            return state;
    }
}
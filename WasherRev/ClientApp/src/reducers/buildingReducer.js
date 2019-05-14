import {
    BUILDING_GETALL,
    BUILDING_DELETE,
    BUILDING_INSERT,
    BUILDING_UPDATE
} from "../actions/types";

const initialState = [];

export const buildingReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case BUILDING_GETALL:
            return action.payload;
        case BUILDING_INSERT:
            return [...state, action.payload];
        case BUILDING_UPDATE:
            {
                const index = state.findIndex(building => building.id === action.payload.id)

                return [
                   ...state.slice(0, index),
                      action.payload,
                   ...state.slice(index + 1)
                ]
            }
        case BUILDING_DELETE:{
            const index = state.findIndex(building => building.id === action.payload);
            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ]
        }
        default:
            return state;
    }
}
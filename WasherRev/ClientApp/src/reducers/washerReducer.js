import {
    WASHER_DELETE,
    WASHER_GETALL,
    WASHER_INSERT,
    WASHER_UPDATE
} from "../actions/types";

const initialState = [];

export const washerReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case WASHER_GETALL:
            return action.payload;
        case WASHER_INSERT:
            return [...state, action.payload];
        case WASHER_UPDATE:
            {
                const index = state.findIndex(washer => washer.id === action.payload.id)

                return [
                   ...state.slice(0, index),
                      action.payload,
                   ...state.slice(index + 1)
                ]
            }
        case WASHER_DELETE:
        {
            const index = state.findIndex(washer => washer.id === action.payload);
            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ]
        }
        default:
            return state;
    }
}
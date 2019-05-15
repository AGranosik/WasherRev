import {
    PRODUCER_DELETE,
    PRODUCER_GETALL,
    PRODUCER_INSERT,
    PRODUCER_UPDATE
} from '../actions/types';

const initialState = [];

export const producerReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case PRODUCER_GETALL:
            return action.payload;
        case PRODUCER_INSERT:
            return [...state, action.payload];
        case PRODUCER_UPDATE:
            {
                const index = state.findIndex(producer => producer.id === action.payload.id)

                return [
                   ...state.slice(0, index),
                      action.payload,
                   ...state.slice(index + 1)
                ]
            }
        case PRODUCER_DELETE:
        {
            const index = state.findIndex(producer => producer.id === action.payload);
            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ]
        }
        default:
            return state;
    }
}
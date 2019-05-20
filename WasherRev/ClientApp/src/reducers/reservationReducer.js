import {
    RESERVATION_DELETE,
    RESERVATION_GETALL,
    RESERVATION_UPDATE,
    RESERVATION_RESERVE
} from '../actions/types';

const initialState = [];

export const reservationReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case RESERVATION_GETALL:
            return action.payload;
        case RESERVATION_UPDATE:
        case RESERVATION_RESERVE:
            {
                const index = state.findIndex(reservation => reservation.id === action.payload.id)

                return [
                   ...state.slice(0, index),
                      action.payload,
                   ...state.slice(index + 1)
                ]
            }
        case RESERVATION_DELETE:
        {
            const index = state.findIndex(reservation => reservation.id === action.payload);
            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ]
        }
        default:
            return state;
    }
}
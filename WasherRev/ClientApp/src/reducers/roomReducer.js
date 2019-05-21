import {
ROOM_DELETE,
ROOM_GETALL,
ROOM_INSERT,
ROOM_UPDATE
} from '../actions/types';

const initialState = [];

export const roomReducer = (state, action) => {
    console.log(action);
    state = state || initialState;
    switch (action.type) {
        case ROOM_GETALL:
            return action.payload;
        case ROOM_INSERT:
            return [...state, action.payload];
        case ROOM_UPDATE:
            {
                const index = state.findIndex(room => room.id === action.payload.id)

                return [
                   ...state.slice(0, index),
                      action.payload,
                   ...state.slice(index + 1)
                ]
            }
        case ROOM_DELETE:
        {
            const index = state.findIndex(room => room.id === action.payload);
            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ]
        }
        default:
            return state;
    }
}
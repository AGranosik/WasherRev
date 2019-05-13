import {
    USERS_GETALL,
    USERS_DELETE,
    USERS_GETFULLINFO,
    USERS_INSERT,
    USERS_UPDATE
} from "../actions/types";
import _ from 'lodash'

const initialState = [];

export const usersReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case USERS_GETALL:
            return action.payload;
        case USERS_GETFULLINFO:
            return action.payload;
        case USERS_INSERT:
            return [...state, action.payload];
        case USERS_UPDATE:
            {
                const index = state.findIndex(user => user.id === action.payload.id)

                return [
                   ...state.slice(0, index),
                      action.payload,
                   ...state.slice(index + 1)
                ]
            }
        case USERS_DELETE:{
            const index = state.findIndex(user => user.id === action.payload);
            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ]
        }
        default:
            return state;
    }
}
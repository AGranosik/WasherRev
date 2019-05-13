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
            return {...state, [action.payload.id] : action.payload };
        case USERS_DELETE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
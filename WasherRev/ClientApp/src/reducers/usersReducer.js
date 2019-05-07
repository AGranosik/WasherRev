import {
    USERS_GETALL,
    USERS_DELETE,
    USERS_GETFULLINFO
} from "../actions/types";

const initialState = [];

export const usersReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case USERS_GETALL:
            return action.payload;
        case USERS_GETFULLINFO:
            return action.payload;
        default:
            return state;
    }
}
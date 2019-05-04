import { USERS_GETALL } from "../actions/types";

const initialState = {
    users: []
}

export const usersReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case USERS_GETALL:
            return {...state, users: action.payload}
    
        default:
            return state;
    }
}
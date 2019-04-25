import { SIGN_IN } from '../actions/types';

const initialState = {
        userId: null,
        token: '',
        role: '',
        username: ''
};

export const reducer = (state, action) => {
    state = state || initialState; 

    switch(action.type){
        case SIGN_IN :{
            const { role, token, id, username } = action.payload;
            return { ...state,
                role: role,
                userId: id,
                token: token,
                username: username
            }

        }
        default:
            return {
                ...state,
                initialState
            }
    }

    return state;
}
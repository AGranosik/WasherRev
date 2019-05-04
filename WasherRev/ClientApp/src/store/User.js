import { SIGN_IN } from '../actions/types';

const initialState = {
        userId: null,
        token: '',
        roleName: '',
        username: ''
};

export const reducer = (state, action) => {
    state = state || initialState;
    switch(action.type){
        case SIGN_IN :{
            const { roleName, token, id, username } = action.payload;
            return { ...state,
                roleName: roleName,
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
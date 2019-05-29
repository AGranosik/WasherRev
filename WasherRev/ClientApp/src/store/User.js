import { SIGN_IN } from '../actions/types';

const initialState = {
        userId: null,
        token: '',
        roleName: '',
        username: '',
        buildingId: ''
};

export const reducer = (state, action) => {
    state = state || initialState;
    switch(action.type){
        case SIGN_IN :{
            const { roleName, token, id, username, buildingId } = action.payload;
            return { ...state,
                roleName: roleName,
                userId: id,
                token: token,
                username: username,
                buildingId: buildingId
            }

        }
        default:
            return {
                ...state,
                initialState
            }
    }
}
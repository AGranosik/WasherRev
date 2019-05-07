import apiProvider from '../api/apiProvider';
import { USERS_GETALL, USERS_DELETE, USERS_GETFULLINFO } from './types';

export const users_getAll = (token) => async (dispatch) =>{
    const response = await apiProvider(token).get('/api/Users');

    dispatch({
        type: USERS_GETALL,
        payload: response.data
    });
} 

export const users_delete = (token, id) => async (dispatch) => {
    const response = await apiProvider(token).delete(`api/Users/${id}`);

    dispatch(
        {type: USERS_DELETE,
        payload: response.data}
    );
}

export const users_getFullInfo = (token) => async (dispatch) => {
    const response = await apiProvider(token).get(`api/Users/GetFullInfo`);

    dispatch({
        type: USERS_GETFULLINFO,
        payload: response.data
    });
}

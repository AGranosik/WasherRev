import apiProvider from '../api/apiProvider';
import { USERS_GETALL, USERS_DELETE, USERS_GETFULLINFO, USERS_INSERT, USERS_UPDATE } from './types';

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
    {   type: USERS_DELETE,
        payload: id
    }
    );
}

export const users_getFullInfo = (token) => async (dispatch) => {
    const response = await apiProvider(token).get(`api/Users/GetFullInfo`);

    dispatch({
        type: USERS_GETFULLINFO,
        payload: response.data
    });
}

export const users_insert = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).post(`api/Users/`,
        model
    );

    dispatch({
        type: USERS_INSERT,
        payload: response.data
    });
}

export const users_update = (token, model) => async (dispatch)=>{
    const response = await apiProvider(token).put('api/Users',
        model
    );

    dispatch({
        type: USERS_UPDATE,
        payload: response.data
    });
}

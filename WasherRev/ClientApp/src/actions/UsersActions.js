import apiProvider from '../api/apiProvider';
import { USERS_GETALL } from './types';

export const users_getAll = (token) => async (dispatch) =>{
    const response = await apiProvider(token).get('/api/Users');

    dispatch({
        type: USERS_GETALL,
        payload: response.data
    });
} 

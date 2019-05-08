import apiProvider from '../api/apiProvider';
import { BUILDING_GETALL } from './types';

export const building_getAll = (token) => async (dispatch) =>{
    const response = await apiProvider(token).get('/api/Building');

    dispatch({
        type: BUILDING_GETALL,
        payload: response.data
    });
}
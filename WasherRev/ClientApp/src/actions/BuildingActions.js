import apiProvider from '../api/apiProvider';
import { BUILDING_GETALL, BUILDING_DELETE, BUILDING_INSERT, BUILDING_UPDATE } from './types';

export const building_getAll = (token) => async (dispatch) =>{
    const response = await apiProvider(token).get('/api/Building');

    dispatch({
        type: BUILDING_GETALL,
        payload: response.data
    });
}

export const building_insert = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).post('api/Building',
        model
    );

    dispatch({
        type: BUILDING_INSERT,
        payload: response.data
    });
}

export const building_update = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).put('api/Building',
        model
    );

    dispatch({
        type: BUILDING_UPDATE,
        payload: response.data
    });
}

export const building_delete = (token, id) => async (dispatch) => {
    const response = await apiProvider(token).delete(`/api/Building/${id}`);

    dispatch({
        type: BUILDING_DELETE,
        payload: id
    });
}
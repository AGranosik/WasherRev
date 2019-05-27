import apiProvider from '../api/apiProvider';
import { ROOM_DELETE, ROOM_GETALL, ROOM_INSERT, ROOM_UPDATE } from './types';

export const room_getall = (token) => async (dispatch) =>{
    const response = await apiProvider(token).get('/api/Room');

    dispatch({
        type: ROOM_GETALL,
        payload: response.data
    });
}

export const room_insert = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).post('api/Room',
        model
    );

    dispatch({
        type: ROOM_INSERT,
        payload: response.data
    });
}

export const room_update = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).put('api/Room',
        model
    );

    dispatch({
        type: ROOM_UPDATE,
        payload: response.data
    });
}

export const room_delete = (token, id) => async (dispatch) => {
    const response = await apiProvider(token).delete(`/api/Room/${id}`);

    dispatch({
        type: ROOM_DELETE,
        payload: id
    });
}
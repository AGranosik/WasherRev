import apiProvider from '../api/apiProvider';
import { WASHER_DELETE, WASHER_GETALL, WASHER_INSERT, WASHER_UPDATE} from './types';

export const washer_getall = (token) => async (dispatch) =>{
    const response = await apiProvider(token).get('/api/Washer');

    dispatch({
        type: WASHER_GETALL,
        payload: response.data
    });
}

export const washer_insert = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).post('api/Washer',
        model
    );

    dispatch({
        type: WASHER_INSERT,
        payload: response.data
    });
}

export const washer_update = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).put('api/Washer',
        model
    );

    dispatch({
        type: WASHER_UPDATE,
        payload: response.data
    });
}

export const washer_delete = (token, id) => async (dispatch) => {
    const response = await apiProvider(token).delete(`/api/Washer/${id}`);

    dispatch({
        type: WASHER_DELETE,
        payload: id
    });
}
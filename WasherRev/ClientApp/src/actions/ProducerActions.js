import apiProvider from '../api/apiProvider';
import { PRODUCER_DELETE, PRODUCER_GETALL, PRODUCER_INSERT, PRODUCER_UPDATE} from './types';

export const producer_getall = (token) => async (dispatch) =>{
    const response = await apiProvider(token).get('/api/Producer');

    dispatch({
        type: PRODUCER_GETALL,
        payload: response.data
    });
}

export const producer_insert = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).post('api/Producer',
        model
    );

    dispatch({
        type: PRODUCER_INSERT,
        payload: response.data
    });
}

export const producer_update = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).put('api/Producer',
        model
    );

    dispatch({
        type: PRODUCER_UPDATE,
        payload: response.data
    });
}

export const producer_delete = (token, id) => async (dispatch) => {
    const response = await apiProvider(token).delete(`/api/Producer/${id}`);

    dispatch({
        type: PRODUCER_DELETE,
        payload: id
    });
}
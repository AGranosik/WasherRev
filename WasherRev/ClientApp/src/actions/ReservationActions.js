import apiProvider from '../api/apiProvider';
import { RESERVATION_DELETE, RESERVATION_GETALL, RESERVATION_UPDATE, RESERVATION_RESERVE } from './types';

export const reservation_getall = (token) => async (dispatch) =>{
    const response = await apiProvider(token).get('/api/Reservation');

    dispatch({
        type: RESERVATION_GETALL,
        payload: response.data
    });
}

export const reservation_update = (token, model) => async (dispatch) => {
    const response = await apiProvider(token).put('api/Reservation',
        model
    );

    dispatch({
        type: RESERVATION_UPDATE,
        payload: response.data
    });
}

export const reservation_delete = (token, id) => async (dispatch) => {
    const response = await apiProvider(token).delete(`/api/Reservation/${id}`);

    dispatch({
        type: RESERVATION_DELETE,
        payload: id
    });
}

export const reservation_reserve = (token, reservationId, usersId) => async (dispatch) => {
    const response = await apiProvider(token).put(`/api/Reservation/${reservationId}/User/${usersId}`);

    dispatch({
        type: RESERVATION_RESERVE,
        payload: response.data
    });
}
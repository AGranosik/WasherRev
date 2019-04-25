import apiProvider from '../api/apiProvider';
import { SIGN_IN } from './types';

export const signIn = (formValues) => async dispatch => {
    const response = await apiProvider().post(
        'api/Users/Authenticate',
        {
         Username: formValues.login,
         Password: formValues.password
        }
    );

    dispatch({ type: SIGN_IN, payload: response.data})
}
// authentication.js

import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/userRegistration', user)
            .then(res => {
                  if(res.data.status== "New User"){
                    history.push('/')
                  }
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/userLogin', user)
            .then(res => {
                const { clientToken } = res.data;
                sessionStorage.setItem("clientToken", clientToken);
                setAuthToken(clientToken);
                const decoded = jwt_decode(clientToken);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('clientToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/');
}

// authentication.js

import axios from 'axios';
import { GET_ERRORS, CURRENT_USER_INFO, NEW_PROJECT_CREATED, OPEN_PROJECT_MODAL, CLOSE_PROJECT_MODAL } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const currentUserInfo = (clientToken) => dispatch => {
    axios.post('/api/dashboard/getCounts', {clientToken: clientToken})
            .then(res => {
                  dispatch({
                    type: CURRENT_USER_INFO,
                    payload: res.data
                  })
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                });
            });
}

export const openProjectModal = () => dispatch => {
  dispatch({
    type: OPEN_PROJECT_MODAL,
    payload: ''
  })
}

export const closeProjectModal = () => dispatch => {
  dispatch({
    type: CLOSE_PROJECT_MODAL,
    payload: ''
  })
}


export const createNewProject = (projectDetails) => dispatch => {
    axios.post("/api/dashboard/createProject", projectDetails)
            .then(res=> {
                  dispatch({
                    type: NEW_PROJECT_CREATED,
                    payload: ''
                  });

            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                });
            })
}

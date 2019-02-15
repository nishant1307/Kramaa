// userReducer.js

import { CURRENT_USER_INFO, NEW_PROJECT_CREATED, OPEN_PROJECT_MODAL, CLOSE_PROJECT_MODAL } from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
  user: '',
  organization: '',
  projectCount: '',
  deviceCount: '',
  thingsCount: '',
  userInfoLoader: true,
  projectModalOpen: false,
  deviceModalOpen: false,
  thingModalOpen: false
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case CURRENT_USER_INFO:
            return {
                ...state,
                user: action.payload.client,
                organization: action.payload.organization,
                projectCount: action.payload.projectCount,
                deviceCount: action.payload.deviceCount,
                thingsCount: action.payload.thingsCount,
                userInfoLoader: false
            }
            break;
        case OPEN_PROJECT_MODAL:
            return {
              ...state,
              projectModalOpen: true
            }
            break;
        case CLOSE_PROJECT_MODAL:
             return {
                ...state,
                projectModalOpen: false
              }
              break;
        case NEW_PROJECT_CREATED:
            return {
              ...state,
              projectCount: projectCount+1,
              projectModalOpen: false
            }

        default:
            return state;
    }
}

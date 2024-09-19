import { NAVIGATE_TO_PROFILE } from '../actions/actiontypes.js';

const initialState = {
  userId: null,
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE_TO_PROFILE:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default navigationReducer;
import { SET_USERS, IS_LOADING } from './constants';

const initialState = {
  users: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
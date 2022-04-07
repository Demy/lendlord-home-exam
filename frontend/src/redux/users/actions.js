import axios from "axios";
import { BASE_URL, END_POINT } from "../../utils/constans";
import { IS_LOADING, SET_USERS } from "./constants";
import { getHeaders } from '../../shared/headers';

export const getUsers = () => dispatch => {
	axios
    .get(BASE_URL + END_POINT.GET_USERS, getHeaders())
    .then(res => {
      dispatch({ type: SET_USERS, payload: res.data });
    }, (err) => {
      console.log(err);
    });
};

export const addUser = (user) => dispatch => {
  dispatch({ type: IS_LOADING, payload: true });
	axios
    .post(BASE_URL + END_POINT.ADD_USER, user, getHeaders())
    .then(res => {
      dispatch({ type: IS_LOADING, payload: false });
      dispatch({ type: SET_USERS, payload: null });
    }, (err) => {
      console.log(err);
      dispatch({ type: IS_LOADING, payload: false });
    });
};

export const saveUser = (user) => dispatch => {
  dispatch({ type: IS_LOADING, payload: true });
	axios
    .post(BASE_URL + END_POINT.SAVE_USER, user, getHeaders())
    .then(res => {
      dispatch({ type: IS_LOADING, payload: false });
      dispatch({ type: SET_USERS, payload: null });
    }, (err) => {
      console.log(err);
      dispatch({ type: IS_LOADING, payload: false });
    });
};

export const deleteUser = (id) => dispatch => {
  dispatch({ type: IS_LOADING, payload: true });
	axios
    .post(BASE_URL + END_POINT.DELETE_USER, { id }, getHeaders())
    .then(res => {
      dispatch({ type: IS_LOADING, payload: false });
      dispatch({ type: SET_USERS, payload: null });
    }, (err) => {
      console.log(err);
      dispatch({ type: IS_LOADING, payload: false });
    });
};
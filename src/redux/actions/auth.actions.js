import * as types from "../constants/auth.constants";
import api from "../api";
import { alertActions } from "./alert.actions";

const loginRequest = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login", { email, password });
    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.accessToken;
    console.log(res.data);
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const loginWithFacebook = (accessToken) => async (dispatch) => {
  dispatch({ type: types.LOGIN_WITH_FACEBOOK_REQUEST, payload: null });
  try {
    const res = await api.get(`/auth/login/facebook/${accessToken}`);
    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
    console.log(res.data);
    dispatch({ type: types.LOGIN_WITH_FACEBOOK_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_FACEBOOK_FAILURE, payload: error });
  }
};

const loginWithGoogle = (accessToken) => async (dispatch) => {
  dispatch({ type: types.LOGIN_WITH_GOOGLE_REQUEST, payload: null });
  try {
    const res = await api.get(`/auth/login/google/${accessToken}`);
    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
    console.log(res.data);
    dispatch({ type: types.LOGIN_WITH_GOOGLE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_GOOGLE_FAILURE, payload: error });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users/", { name, email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};
const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

export const authActions = {
  loginRequest,
  loginWithFacebook,
  loginWithGoogle,
  register,
  getCurrentUser,
  logout,
};

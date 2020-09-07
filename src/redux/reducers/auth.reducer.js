import * as types from "../constants/auth.constants";
const initialState = {
  user: {},
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: false,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.LOGIN_WITH_FACEBOOK_REQUEST:
    case types.LOGIN_WITH_GOOGLE_REQUEST:
    case types.REGISTER_REQUEST:

    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };

    case types.LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.data.accessToken);
      return {
        ...state,
        user: { ...payload.data.user },
        accessToken: payload.data.accessToken,
        loading: false,
        isAuthenticated: true,
      };

    case types.LOGIN_WITH_FACEBOOK_SUCCESS:
      localStorage.setItem("accessToken", payload.data.accessToken);
      return {
        ...state,
        user: { ...payload.data.user },
        accessToken: payload.data.accessToken,
        loading: false,
        isAuthenticated: true,
      };

    case types.LOGIN_WITH_GOOGLE_SUCCESS:
      localStorage.setItem("accessToken", payload.data.accessToken);
      return {
        ...state,
        user: { ...payload.data.user },
        accessToken: payload.data.accessToken,
        loading: false,
        isAuthenticated: true,
      };

    case types.LOGIN_FAILURE:
    case types.LOGIN_WITH_FACEBOOK_FAILURE:
    case types.LOGIN_WITH_GOOGLE_FAILURE:
    case types.REGISTER_FAILURE:
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };

    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };

    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;

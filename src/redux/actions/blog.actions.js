import * as types from "../constants/blog.constants";
import api from "../api";
import { alertActions } from "./alert.actions";
const pageLimit = 6;

const blogsRequest = (page) => async (dispatch) => {
  console.log("*--- blogsRequest ---*");
  dispatch({ type: types.BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`/blogs?page=${page}&limit=${pageLimit}`);
    console.log("res.data:", res.data);
    dispatch({
      type: types.BLOG_REQUEST_SUCCESS,
      payload: { blogs: res.data.data.blogs, pageNum: page },
    });
    console.log("got data from blogRequest", res.data.data);
  } catch (error) {
    dispatch({ type: types.BLOG_REQUEST_FAILURE, payload: error });
  }
};

const getSelfBlog = () => async (dispatch) => {
  dispatch({ type: types.GET_SELF_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`/blogs/me`);
    dispatch({
      type: types.GET_SELF_BLOG_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SELF_BLOG_REQUEST_FAILURE, payload: error });
  }
};

const getSingleBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`/blogs/${blogId}`);
    dispatch({
      type: types.GET_SINGLE_BLOG_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_BLOG_REQUEST_FAILURE, payload: error });
  }
};

const createReview = (blogId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/blogs/${blogId}/reviews`, {
      content: reviewText,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};
const createNewBlog = (title, content) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
  try {
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    const res = await api.post("/blogs", { title, content });

    dispatch({
      type: types.CREATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("New blog has been created!", "success"));
  } catch (error) {
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

const updateBlog = (blogId, title, content) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/blogs/${blogId}`, { title, content });

    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("The blog has been updated!", "success"));
  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};

const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.delete(`/blogs/${blogId}`);
    console.log(res);
    dispatch({
      type: types.DELETE_BLOG_SUCCESS,
      payload: res.data,
    });
    dispatch(alertActions.setAlert("The blog has been deleted!", "success"));
  } catch (error) {
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
  }
};

const updateReactions = (targetType, target, reaction, accessToken) => async (
  dispatch
) => {
  dispatch({ type: types.REACTION_REQUEST, payload: null });

  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.post(`/reaction`, { targetType, target, reaction });
    console.log("res.data:", res.data);
    dispatch({
      type: types.REACTION_REQUEST_SUCCESS,
      payload: res.data.reaction,
    });
  } catch (error) {
    dispatch({ type: types.REACTION_REQUEST_FAILURE, payload: error });
  }
};

export const blogActions = {
  blogsRequest,
  getSingleBlog,
  createReview,
  createNewBlog,
  updateBlog,
  deleteBlog,

  getSelfBlog,
  updateReactions,
  // getPaginationRequest,
};

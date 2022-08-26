import * as api from "../api/index";
import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE } from "../constants/actionTypes";

// action creators
export const getPosts = () => async (dispatch) => {
  try {
    // console.log(`here ${ api.fetchPosts() }`);
    const { data } = (await api.fetchPosts());
    // console.log('Get all post data:- ', data);
    
    dispatch({ type: FETCH_ALL, payload: data.allPosts });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    // console.log('created post\'s data:- ', data);

    dispatch({ type: CREATE, payload: data.newPost });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    // console.log(data);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

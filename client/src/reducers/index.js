import { combineReducers } from "redux";
import postReducers from './postsReducer'

export default combineReducers({
    posts: postReducers,
})
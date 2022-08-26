import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';


// in reducers, state must be initialized to something
const postReducers = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case LIKE:
            // console.log(action.payload);
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            // console.log(action.payload);
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}

export default postReducers;
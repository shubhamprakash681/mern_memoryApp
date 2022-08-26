import axios from 'axios'


// TODO - put it later in .env
const url = process.env.REACT_APP_SERVER_BASE_URL
// console.log(url);

export const fetchPosts = () => {
    // console.log('get url:-', axios.get(url));
    return axios.get(url)
}

export const createPost = (newPost) => {
    return axios.post(url, newPost)
}

export const likePost = (id) => {
    return axios.patch(`${url}/${id}/likePost`)
}
export const updatePost = (id, updatedPost) => {
    return axios.patch(`${url}/${id}`, updatedPost)
}
export const deletePost = (id) => {
    return axios.delete(`${url}/${id}`)
}

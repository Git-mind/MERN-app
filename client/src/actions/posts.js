import * as api from '../api';

// Action Creators - function that return an action. 
// Action is just a type and payload
// with redux thunk, allows to add async(dispatch). Instead of return action, dispatch(actions);
export const getPosts = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch( { type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
    


}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        console.log(post)
        dispatch({type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}

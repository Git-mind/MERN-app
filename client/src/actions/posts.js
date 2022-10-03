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

export const updatePost = (id, post) => async (dispatch) =>{
    try {
        const {data} = await api.updatePost(id, post);

        dispatch({type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async(dispatch) =>{
    try {
        await api.deletePost(id)

        dispatch({type: 'DELETE', payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) =>{
    try {
        const {data} = await api.likePost(id);

        dispatch({type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error)
    }
}
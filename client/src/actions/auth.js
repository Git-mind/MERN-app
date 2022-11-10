import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

// if the action creators are asynchronous, need to use redux-thunk.
// A signin function that return an async function with a dispatch
export const signin = (formData, history) => async(dispatch) =>{
    try {
        console.log(formData)
        // log in the user..
        // make a call to signIn api
        const { data } = await api.signIn(formData);
        console.log(data)

        //once we have our data, pass data to reducer
        dispatch({ type: AUTH, data})

        // after logged in, push user to the homepage
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async(dispatch) =>{
    try {
        // sign in the user..
        const { data } = await api.signUp(formData);

        //once we have our data, pass data to reducer
        dispatch({ type: AUTH, data})

        // after logged in, push user to the homepage
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}
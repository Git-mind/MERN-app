import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action?.data)
            // ?. - optional chaining operator that won't throw an error if we don't have access to the rest object

            // save data in local storage so that the browser know we are logged in
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));


            return {...state, authData: action?.data};
        case LOGOUT:
            //1:14:02 - need to clear local storage, otherwise when you refresh the page it will stay login even when you click logout.
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
}

export default authReducer;
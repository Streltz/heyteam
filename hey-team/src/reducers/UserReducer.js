
import { SIGN_UP, LOGGED_IN, LOGGED_OUT } from '../actions/userAction';
// initial user state
const userInit = {
	logged_in: false,
	userName: '',
	token: ''
}
// if user exists in local storage, assign username to user initial name
console.log('locla', localStorage);
const userName = localStorage.getItem('userName');
const token = localStorage.getItem('token');
if(userName && token){
	userInit.logged_in = true;
	userInit.userName = userName;
	userInit.token = token;
}

const UserReducer = (state = userInit, action) => {
	switch (action.type) {
		case LOGGED_IN:
		return { ...state, logged_in: true, userName: action.payload}

		case LOGGED_OUT:
		return { ...state, logged_in: false, name: null}

		default:
		return state;
	}
};

export default UserReducer;
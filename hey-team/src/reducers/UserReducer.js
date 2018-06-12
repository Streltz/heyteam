
import { SIGN_UP, LOGGED_IN, LOGGED_OUT } from '../actions/userAction';
// initial user state
const userInit = {
	logged_in: false,
	userName: '',
	userId: ''
}
// if user exists in local storage, assign username to user initial name
const userName = localStorage.getItem('userName');
const userId = localStorage.getItem('userId');
if(userName){
	userInit.logged_in = true;
	userInit.userName = userName;
	userInit.userId = userId;
}

const UserReducer = (state = userInit, action) => {
	switch (action.type) {
		case LOGGED_IN:
		return { ...state, logged_in: true, userName}

		case LOGGED_OUT:
		return { ...state, logged_in: false, name: null}

		default:
		return state;
	}
};

export default UserReducer;
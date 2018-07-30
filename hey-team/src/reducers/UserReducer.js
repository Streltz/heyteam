
import { LOGGED_IN, LOGGED_OUT, FETCHED_SLACKUSERS, SEARCH_SLACKUSERS } from '../actions/userAction';
// initial user state
const userInit = {
	logged_in: false,
	userName: '',
	token: '',
	slackUsersOrigin: [],
	slackUsersMutated: [],
	formError: ''
}
// if user exists in local storage, assign username to user initial name
const userName = localStorage.getItem('userName');
console.log('USERNAME', userName);
const token = localStorage.getItem('token');
if(userName && token){
	userInit.logged_in = true;
	userInit.userName = userName;
	userInit.token = token;
}else{
	
}

const UserReducer = (state = userInit, action) => {
	switch (action.type) {
		case LOGGED_IN:
		return { ...state, logged_in: true, userName: action.payload}

		case LOGGED_OUT:
		return { ...state, logged_in: false, name: null}

		case 'CLEAR_FORM_ERROR':
		return { ...state, formError: ''}

		case FETCHED_SLACKUSERS:
		return { ...state, slackUsersOrigin: action.payload }

		case 'SIGNIN_ERROR':
		return { ...state, formError: action.payload}

		case 'SIGNUP_ERROR':
		return { ...state, formError: action.payload}

		case SEARCH_SLACKUSERS:
		if(action.payload === '') return { ...state, slackUsersMutated: [] };
		const users = state.slackUsersOrigin;
		const filtered = users.filter(user=>{
			if(user.profile.display_name.toLowerCase().includes(action.payload.toLowerCase())) {
				return user;	
			}
			return null;
		});
		return { ...state, slackUsersMutated: filtered }

		default:
		return state;
	}
};

export default UserReducer;
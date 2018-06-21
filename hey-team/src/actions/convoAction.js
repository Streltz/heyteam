import axios from 'axios';
const URL = 'http://localhost:5000';
const token = localStorage.getItem('token');

//***
// NOTE: When developing locally, change ROOT_URL to localhost.
// When deploying, change ROOT_URL to heroku URL.
// Need to find a way to automatically set to the right URL depending on the enviroment
// SEE: https://stackoverflow.com/questions/41389584/react-js-use-environment-variables-to-specify-two-api-urls-based-on-production
//***
// const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://mysterious-coast-15187.herokuapp.com' : 'http://localhost:5000'; 
const ROOT_URL = 'http://localhost:5000' || 'https://mysterious-coast-15187.herokuapp.com';

export const addConvo = (info, history) => {
	return dispatch => {
		dispatch({ type: 'LOADING_CONVOS' });
		axios 
		.post(`${ROOT_URL}/conversation`, info, {headers: {token}})
		.then(response => {
			dispatch({ type: 'CONVO_ADDED', payload: response.data });
			history.push('/dashboard');
			})
		.catch(err => {
			dispatch({ type: 'ERROR_ADDING_CONVO', payload: err });
		});
  };
};

export const editConversation = (id, history) => {
	return dispatch => {
		dispatch({ type: 'LOADING_CONVOS' });
		axios
			.put(`${ROOT_URL}/conversation/${id}`)
			.then(response => {
					dispatch({ type: 'CONVO_EDITED', payload: response.data });
				})
		  .catch(err => {
					// disptch({ type: 'ERROR_EDITING_CONVO', payload: err });
			});
	 };
};

export const viewConversation = info => {
	return dispatch => {
		dispatch({ type: 'LOADING_CONVO' });
		axios
			.get(`${ROOT_URL}/convos/${info._id}`)
			.then(response => {
					dispatch({ type: 'VIEW_CONVO', payload: response.data });
			})
		  .catch(err => {
					dispatch({ type: 'ERROR_VIEWING_CONVO', payload: err });
			});
		};
  };

export const deleteConversation = info => {
	 return dispatch => {
		 dispatch({ type: 'LOADING_CONVO' });
		 axios
			 .post(`${ROOT_URL}/convos/remove/${info}`)
			 .then(response => {
					 dispatch({ type: 'DELETED_CONVO', payload: response.data });
				})
		  .catch(err => {
					dispatch({ type: 'ERROR_DELETING_CONVO', payload: err });
		});
 	};
};

export const getConvos = info => {
	return dispatch => {
		 dispatch({ type: 'LOADING_CONVO' });
		 axios
			 .get(`${ROOT_URL}/conversations`, {headers: {token}})
			 .then(response => {
					 dispatch({ type: 'FETCHED_CONVOS', payload: response.data });
				})
 	};
 return { type: 'TEST', payload: null}
};



export default addConvo;
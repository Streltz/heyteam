import axios from 'axios';
const URL = 'http://localhost:5000';
export const SORTING = 'SORTING';

//***
// NOTE: When developing locally, change ROOT_URL to localhost.
// When deploying, change ROOT_URL to heroku URL.
// Need to find a way to automatically set to the right URL depending on the enviroment
// SEE: https://stackoverflow.com/questions/41389584/react-js-use-environment-variables-to-specify-two-api-urls-based-on-production
//***
// const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://mysterious-coast-15187.herokuapp.com' : 'http://localhost:5000'; 
const ROOT_URL = 'http://localhost:5000' || 'https://mysterious-coast-15187.herokuapp.com';
//'http://localhost:5000' || 
const slackURL = 'https://slack.com/api/im.open?token=xoxb-154966377728-379472016500-tmzYflE4ynkTMQikM8eP8BYg';
export const addConvo = (info, history) => {
	return dispatch => {
	   const promises = []; 

		info.participants.map(part=>{
			const promise = axios.post(`${slackURL}&user=${part.id}`);
		   promises.push(promise);
		});

		Promise.all(promises).then(function(values) {
		   info.participants.forEach((p, i)=>{
		   p.channelId = values[i].data.channel.id;
		});

		axios 
		.post(`${ROOT_URL}/conversation`, info, {headers: {token: localStorage.getItem('token')}})
		.then(response => {
		dispatch({ type: 'CONVO_ADDED', payload: response.data });
		history.push('/dashboard');
		})
		.catch(err => {
		dispatch({ type: 'ERROR_ADDING_CONVO', payload: err });
		});
	  });
   };
};

export const editConversation = (id, data, history) => {
	if(data === 'resetNewMessage'){
		data = {type: data, id}
	}
	return dispatch => {
		dispatch({ type: 'LOADING_CONVOS' });
		axios
			.put(`${ROOT_URL}/conversations/${id}`, data, {headers: {token: localStorage.getItem('token')}})
			.then(response => {
					dispatch({ type: 'EDITED_CONVO', payload: response.data });
					history.push(`/dashboard/${id}`);
				})
		  .catch(err => {
					dispatch({ type: 'ERROR_EDITING_CONVO', payload: err });
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

export const deleteConvo = (id, history) => {
	 return dispatch => {
		 dispatch({ type: 'LOADING_CONVO' });
		 axios
			 .delete(`${ROOT_URL}/conversations/${id}`, {headers: {token: localStorage.getItem('token')}})
			 .then(response => {
			 		history.push('/dashboard');
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
			 .get(`${ROOT_URL}/conversations`, {headers: {token: localStorage.getItem('token')}})
			 .then(response => {
					 dispatch({ type: 'FETCHED_CONVOS', payload: response.data });
				})
 	};
};

export const newResponse = convo => {
	return({
		type: 'NEW_RESPONSE',
		payload: convo
	});
};

export const resetNewMessage = id => {
	return({
		type: 'RESET_NEW_MESSAGE',
		payload: id
	});
};

export const sortConvos = tab => {
	return ({
		type: SORTING,
		payload: tab
	});
};



export default addConvo;
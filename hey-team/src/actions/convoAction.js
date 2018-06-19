import axios from 'axios';
const URL = 'http://localhost:5000';

export const addConvo = (info, history) => {
	console.log(info);
	return dispatch => {
		dispatch({ type: 'LOADING_CONVOS' });
		axios 
		.post(`${URL}/conversation`, info)
		.then(response => {
			dispatch({ type: 'CONVO_ADDED', payload: response.data });
				history.push('/');
			})
		.catch(err => {
			dispatch({ type: 'ERROR_ADDING_CONVO', payload: err });
		});
  };
};

export const editConversation = (title, entry, id, history) => {
	return dispatch => {
		dispatch({ type: 'LOADING_CONVOS' });
		axios
			// .get(`${URL}/convos/${info_id}`)
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
			.get(`${URL}/convos/${info._id}`)
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
			 .post(`${URL}/convos/remove/${info}`)
			 .then(response => {
					 dispatch({ type: 'DELETED_CONVO', payload: response.data });
				})
		  .catch(err => {
					dispatch({ type: 'ERROR_DELETING_CONVO', payload: err });
		});
 	};
};

export const getConvos = info => {
	// return dispatch => {
	// 	 dispatch({ type: 'LOADING_CONVO' });
	// 	 axios
	// 		 .get('http://localhost:5000/conversations')
	// 		 .then(response => {
	// 				 dispatch({ type: 'DELETED_CONVO', payload: response.data });
	// 			})
	// 	  .catch(err => {
	// 				dispatch({ type: 'ERROR_DELETING_CONVO', payload: err });
	// 	});
 // 	};
 return { type: 'TEST', payload: null}
};



export default addConvo;
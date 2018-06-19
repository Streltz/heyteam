import axios from 'axios';
export const SIGN_UP = 'SIGN_UP';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const FETCHED_SLACKUSERS = 'FETCHED_SLACKUSERS';
export const SEARCH_SLACKUSERS = 'SEARCH_SLACKUSERS'

const slackURL = 'https://slack.com/api/users.list?token=xoxp-154966377728-282878117506-383146809825-fff51d240128a7d40f5cc858e4fa8756';

export const signOut = (history) => {
  localStorage.removeItem('userName');
  localStorage.removeItem('token');
  history.push('/signin');
  return ({ type: LOGGED_OUT });
}

export const signUp = (newUser, history) => {
  if(newUser.name !== '' || newUser.email !== '' || newUser.password !== ''){
    return (dispatch) => {
      axios.post('http://localhost:5000/signup', newUser)
      .then(res => {
        if(res.status === 200){
          alert('You have signed up successfully, please log in.');
          history.push('/signin');
        }
      });
    }
  }else{
    return ({
      type: 'SIGNUP_ERROR',
      payload: 'Please enter username, email and password'
    })
  }
}

export const signIn = (user, history) => {
  if(user.email !== '' || user.password !== ''){
    return (dispatch) => {
      axios.post('http://localhost:5000/login', user)
      .then(res => {
        if(res.status === 200){
          // server returns a token
          const token = res.data.token;
          const userName = res.data.username;
          localStorage.setItem('token', token);
          localStorage.setItem('userName', userName);
          dispatch({
            type: LOGGED_IN,
            payload: res.data.username
          });
          history.push('/dashboard');       
        }
      });
    }
  }else{
    return ({
      type: 'SIGNIN_ERROR',
      payload: 'Please enter email and password'
    })
  }
}

export const fetchSlackUsers = () => {
  console.log('fetching slack users');
  return (dispatch) => {
    axios.get(`${slackURL}`)
    .then(res => {
      if(res.status === 200){
        console.log(res.data);
        dispatch({
          type: FETCHED_SLACKUSERS,
          payload: res.data.members
        });
      }
    });
  }
}

export const searchSlackUsers = (term) => {
  console.log('search term', term);
  return({
    type: SEARCH_SLACKUSERS, 
    payload: term
  });
}

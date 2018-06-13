import axios from 'axios';
export const SIGN_UP = 'SIGN_UP';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

export const signOut = (history) => {
  localStorage.removeItem('userName');
  localStorage.removeItem('token');
  console.log('after signout', localStorage);
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

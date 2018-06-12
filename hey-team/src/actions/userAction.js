import axios from 'axios';
export const SIGN_UP = 'SIGN_UP';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

export const signOut = (history) => {
  localStorage.removeItem('token');
  history.push('/');
  return ({ type: LOGGED_OUT });
}

export const signUp = (newUser, history) => {
  if(newUser.name !== '' || newUser.email !== '' || newUser.password !== ''){
    return (dispatch) => {
      axios.post('http://localhost:5000/signup', newUser)
      .then(res => {
        if(res.status === 200){
          alert('You have signed up successfully, please log in.');
          history.push('/');
        }
      });
    }
  }
}

export const signIn = (user, history) => {
  if(user.email !== '' || user.password !== ''){
    return (dispatch) => {
      axios.post('http://localhost:5000/signin', user)
      .then(res => {
        if(res.status === 200){
          const token = res.data.token;
          localStorage.setItem('token', token);
          dispatch({
            type: LOGGED_IN,
            payload: res.data.username
          });
          history.push('/dashboard');       
        }
      });
    }
  }
}

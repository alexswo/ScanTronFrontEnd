import { authHeader } from '../util';
import history from '../history';

const apiUrl = 'http://scantronbackend-env.mzszeithxu.us-west-2.elasticbeanstalk.com';

function login(user) {
  return dispatch => {
    // Send action indicating requesting login
    dispatch({ type: 'LOGIN_REQUEST', email: user.email });

    // Set up GET request
    const url = `${apiUrl}/authentication/login`;
    const params = new URLSearchParams();
    params.set('email', user.email);
    params.set('password', user.password);
    const query = params.toString();

    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
    };

    // GET using fetch API
    fetch(`${url}?${query}`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((token) => {
      localStorage.setItem('user', JSON.stringify(token));
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: 'LOGIN_FAIL', error });
    })
  };
}

function register(user) {
  return dispatch => {
    // Send action indicating requesting registration
    dispatch({ type: 'REGISTER_REQUEST', user });

    // Set up POST request
    const url = `${apiUrl}/authentication/register`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    // POST using fetch API
    fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      console.log('sending dispatch messages');
      dispatch({ type: 'VERIFY_REQUEST', email: user.email, firstName: user.firstName });
      // dispatch({ type: 'REGISTER_SUCCESS' });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: 'REGISTER_FAIL', error });
    })
  }
}

function verify(user) {
  return dispatch => {
    console.log('attempt to verify');
    // Set up POST request
    const url = `${apiUrl}/authentication/confirm`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }

    // POST using fetch API
    fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      dispatch({ type: 'VERIFY_SUCCESS' });
      console.log(response);
      history.push('/login');
    })
    .catch((error) => {
      dispatch({ type: 'VERIFY_FAIL', error });
      console.log(error);
      history.push('/register')
    })
  }
}

export default {
    login,
    register,
    verify
};

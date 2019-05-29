import { authHeader } from '../util';

const apiUrl = 'http://scantronbackend-env.mzszeithxu.us-west-2.elasticbeanstalk.com';

function login(email, password) {
  return dispatch => {
    // Send action indicating requesting login
    dispatch({ type: 'LOGIN_REQUEST', email });

    // Set up GET request
    const url = `${apiUrl}/authentication/login`;
    const params = new URLSearchParams();
    params.set('email', email);
    params.set('password', password);
    const query = params.toString();

    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
    };

    // GET using fetch API
    fetch(`${url}?${query}`, requestOptions)
    .then((user) => {
      dispatch({ type: 'LOGIN_SUCCESS', user });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: 'LOGIN_FAIL', error });
    })
  };
}

function register(user) {
  return dispatch => {
    console.log('attempt to register');
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
      dispatch({ type: 'VERIFY_REQUEST', email: user.email, firstName: user.firstName });
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
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
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export default {
    login,
    register,
    verify
};

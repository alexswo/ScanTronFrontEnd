import history from '../history';
const apiUrl = 'http://scantronbackend-env.mzszeithxu.us-west-2.elasticbeanstalk.com';

function logout() {
  return dispatch => {
    dispatch({ type: 'LOGOUT' });
    // window.location.reload();
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const errorMsg = response.statusText;
      return Promise.reject(errorMsg);
    }
    return text && JSON.parse(text);
  });
}

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

    // GET using fetch API
    fetch(`${url}?${query}`, { method: 'GET', credentials: 'include', })
    .then(handleResponse)
    .then((token) => {
      dispatch({ type: 'LOGIN_SUCCESS', user });
      // GET user info
      dispatch(getUser(user));
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
    .then(handleResponse)
    .then((response) => {
      console.log('sending VERIFY_REQUEST messages');
      dispatch({ type: 'VERIFY_REQUEST', email: user.email, firstName: user.firstName });
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
    .then(handleResponse)
    .then((response) => {
      console.log(`dispatching VERIFY_SUCCESS, received ${response}`);
      dispatch({ type: 'VERIFY_SUCCESS' });
      history.push('/login');
    })
    .catch((error) => {
      dispatch({ type: 'VERIFY_FAIL', error });
      console.log(error);
      history.push('/register')
    })
  }
}

function getUser(user) {
  return dispatch => {
    // Set up GET request
    const url = `${apiUrl}/user/${user.email}`;
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };

    // GET using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      console.log(`dispatching GET_USER`);
      dispatch({ type: 'GET_USER', userInfo: response });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

function updateUser(user) {
  return dispatch => {
    // Set up GET request
    const url =  `${apiUrl}/user/${user.email}`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(user),
    };

    // PUT using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      console.log(`updated user, GET updated data`);
      dispatch(getUser(user));
    })
    .catch((error) =>{
      console.log(error);
    })
  }
}

export default {
    logout,
    login,
    register,
    verify,
    getUser,
    updateUser,
};

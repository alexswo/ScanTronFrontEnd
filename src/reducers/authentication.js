let jsonWebToken = JSON.parse(localStorage.getItem('jwt'));
const initialState = jsonWebToken ? { loggedIn: true } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      };
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user,
      };
    case 'LOGIN_FAIL':
      return {
        error: action.error
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}

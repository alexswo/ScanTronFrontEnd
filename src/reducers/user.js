export function user(state = {}, action) {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...action.userInfo
      };
    default:
      return state;
  }
}

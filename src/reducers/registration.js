export function registration(state = {}, action) {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return { registering: true };
    case 'REGISTER_FAIL':
      return { error: action.error };
    case 'VERIFY_REQUEST':
      return {
        verifying: true,
        email: action.email,
        firstName: action.firstName
      };
    case 'VERIFY_SUCCESS':
      return {};
    case 'VERIFY_FAIL':
      return { error: action.error };
    default:
      return state;
  }
}

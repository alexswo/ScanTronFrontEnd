export function alert(state = { visible: false, message: '', status: ''}, action) {
  switch (action.type) {
    case 'SUCCESS':
      return {
        message: action.message,
        status: 'success',
        visible: true,
      };
    case 'FAIL':
      return {
        message: action.message,
        status: 'danger',
        visible: true,
      };
    case 'RESET_ALERT':
      return {
        visible: false,
        message: '',
        status: '',
      }
    default:
      return state;
  }
}

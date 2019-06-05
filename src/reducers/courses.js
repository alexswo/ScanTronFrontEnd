export function courses(state = {}, action) {
  switch (action.type) {
    case 'ALL_COURSES':
      return {
        all_courses: action.courses,
      };
    default:
      return state;
  }
}

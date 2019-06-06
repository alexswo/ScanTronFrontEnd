export function courses(state = { all_courses: [] }, action) {
  switch (action.type) {
    case 'ALL_COURSES':
      return {
        all_courses: action.courses,
      };
    default:
      return state;
  }
}

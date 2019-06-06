const initialState = {
  all_courses: [],
  courses: {
    exams: [],
  }
}

export function courses(state = initialState, action) {
  switch (action.type) {
    case 'ALL_COURSES':
      return {
        ...state,
        all_courses: action.courses,
      };
    case 'COURSE':
      return {
        ...state,
        course: {
          ...state.course,
          ...action.course,
        }
      }
    case 'CLEAR_COURSE':
      return {
        ...state,
        course: {
          exams: [],
        }
      }
    case 'COURSE_EXAMS':
      return {
        ...state,
        course: {
          ...state.course,
          exams: action.exams,
        }
      }
    default:
      return state;
  }
}

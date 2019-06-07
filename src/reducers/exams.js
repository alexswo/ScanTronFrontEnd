export function exams(state = {}, action) {
  switch (action.type) {
    case 'EXAM':
      return {
        ...state,
        [action.examId]: {
          ...state[action.examId],
          ...action.exam,
        }
      }
    case 'EXAM_GRADES':
      return {
        ...state,
        [action.examId]: {
          ...state[action.examId],
          grades: action.grades
        },
      }
    default:
      return state;
  }
}

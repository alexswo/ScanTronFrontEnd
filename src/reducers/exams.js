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
    case 'EXAM_GRADE':
      return {
        ...state,
        [action.examId]: {
          ...state[action.examId],
          grades: state[action.examId].grades.map(grade => {
            if (grade.gradeId === action.gradeId) {
              return  action.grade;
            }
            return grade;
          })
        }
      }
    case 'CLEAR_GRADE':
      return {
        ...state,
        [action.examId]: {
          ...state[action.examId],
          grades: state[action.examId].grades.filter(grade => grade.gradeid !== action.gradeId),
        }
      }
    default:
      return state;
  }
}

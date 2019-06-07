import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Card,
  Button,
  CardHeader,
  CardBody,
} from 'shards-react';
import actions from '../../actions';

const GradeItem = ({ grade }) => {
  return(
    <tr>
      <td>
        {grade.studentid}
      </td>
      <td>
        {grade.score}
      </td>
      <td>
        <Button outline href={`https://${grade.raw_url}`} target='_blank'>
          View
        </Button>
      </td>
      <td>
        <Button outline href={`https://${grade.graded_url}`} target='_blank'>
          Download
        </Button>
      </td>
    </tr>
  )
}

class GradesCard extends Component {
  componentDidMount() {
    const { dispatch, user, id } = this.props;
    dispatch(actions.getExam(user, id));
    dispatch(actions.getAllGrades(user, id));
  }

  render() {
    const { grades } = this.props;
    return (
      <Card style={{ 'width' : '100%' }}>
        <CardHeader className='border-bottom'>
          <h6 className='m-0'>Grades</h6>
        </CardHeader>
        <CardBody className='p-0'>
          <table className='table'>
            <thead className='bg-light'>
              <tr>
                <th scope='col' className='border-0'>
                  Student Id
                </th>
                <th scope='col' className='border-0'>
                  Score
                </th>
                <th scope='col' className='border-0'>
                  Raw Exam Image
                </th>
                <th scope='col' className='border-0'>
                  Graded Exam
                </th>
              </tr>
            </thead>
            <tbody>
              {grades && grades.map(grade => (
                <GradeItem grade={grade} />
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state, { id }) {
  let scores = [];
  if (state.exams[id] && state.exams[id].grades) {
    const {grades} = state.exams[id];
    scores = grades.map(grade => grade.score);
  }
  return {
    scores,
    ...state.exams[id],
    user: state.authentication.user
  }
}

export default connect(mapStateToProps)(GradesCard);

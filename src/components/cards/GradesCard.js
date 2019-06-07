import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
} from 'shards-react';
import actions from '../../actions';
import GradeItem from './GradeItem.js';

class GradesCard extends Component {
  componentDidMount() {
    const { dispatch, user, id } = this.props;
    dispatch(actions.getExam(user, id));
    dispatch(actions.getAllGrades(user, id));
  }

  render() {
    const { grades } = this.props;
    return (
      <Card style={{ 'width' : '100%' }} className='mb-4'>
        <CardHeader className='border-bottom'>
          <h6 className='m-0'>Grades</h6>
        </CardHeader>
        <CardBody className='p-0'>
          <table className='table' align='right'>
            <thead className='bg-light'>
              <tr className='text-center'>
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
                <th scope='col' className='border-0'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {grades && grades.map(grade => (
                <GradeItem grade={grade} key={grade.gradeid} {...this.props} />
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

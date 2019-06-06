import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/layout/SideBar';
import {Container, Row, Col} from 'shards-react';
import AssignmentCard from '../components/cards/AssignmentCard';
import CreateExamCard from '../components/cards/CreateExamCard';
import OverviewCard from '../components/cards/OverviewCard';
import actions from '../actions';

class AssignmentView extends Component {
  componentDidMount() {
    const { dispatch, user, courseId } = this.props;
    dispatch(actions.getAllExams(user, courseId));
    dispatch(actions.getCourse(user, courseId));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actions.clearCourse());
  }

  render() {
    const { courseId, name, description, exams } = this.props;
    return (
      <Container fluid>
        <Row>
          <SideBar/>
          <Col
            className='main-content'
            lg={ { size: 10, offset: 2 } }
            md={ { size: 9, offset: 3 } }
            sm='12'
            tag='main'
          >
            <Container fluid className='main-content-container px-4'>
              <Row className='page-header py-4'>
                <Col xs='12' sm='4' className='text-center text-md-left mb-sm-0'>
                  <span className='text-uppercase page-subtitle'>Exams Overview For</span>
                  <h3 className='page-title'>{name}</h3>
                </Col>
              </Row>
              <OverviewCard description={description} id={courseId}/>
              <CreateExamCard id={ courseId }/>
              {exams && exams.map(exam => (
                <Row noGutters style={{ 'width': '100%' }} key={exam.examid} className='mb-4'>
                  <AssignmentCard title={exam.name} />
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    ...state.courses.course,
    user: state.authentication.user,
    courseId: match.params.courseId,
  }
}

export default connect(mapStateToProps)(AssignmentView);

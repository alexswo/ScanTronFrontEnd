import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/layout/SideBar';
import { Container, Row, Col } from 'shards-react';
import ExamCard from '../components/cards/ExamCard';
import GradesCard from '../components/cards/GradesCard';
import actions from '../actions';

class ExamView extends Component {
  componentDidMount() {
    const { dispatch, user, examId } = this.props;
    dispatch(actions.getExam(user, examId));
  }

  render() {
    const { examId, name } = this.props;
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
                  <span className='text-uppercase page-subtitle'>Exam Overview</span>
                  <h3 className='page-title'>{name}</h3>
                </Col>
              </Row>
              <Row noGutters style={{ 'width': '100%' }} className='mb-4'>
                <ExamCard title={name} id={examId} />
              </Row>
              <GradesCard id={examId}/>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    ...state.exams[match.params.examId],
    user: state.authentication.user,
    examId: match.params.examId,
  }
}

export default connect(mapStateToProps)(ExamView);

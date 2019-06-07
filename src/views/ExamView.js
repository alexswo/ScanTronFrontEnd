import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/layout/SideBar';
import {
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Button
} from 'shards-react';
import ExamCard from '../components/cards/ExamCard';
import ExamInfoCard from '../components/cards/ExamInfoCard';
import GradesCard from '../components/cards/GradesCard';
import actions from '../actions';

class ExamView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    const { dispatch, user, examId } = this.props;
    dispatch(actions.getExam(user, examId));
  }

  handleDelete() {
    const { dispatch, examId, user, courseid } = this.props;
    dispatch(actions.deleteExam(user, examId, courseid));
  }

  toggleModal() {
   this.setState({ open: !this.state.open });
  }

  render() {
    const { examId, name, answers } = this.props;
    const { open } = this.state;
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
                <Button outline theme='danger' className='mr-2 ml-auto' onClick={ this.toggleModal }>Delete Exam</Button>
                <Modal open={ open } toggle={ this.toggleModal }>
                  <ModalHeader>Are you sure?</ModalHeader>
                  <ModalBody>
                    <Row>
                      Delete this exam permanently?
                    </Row>
                    <Row className='mt-2'>
                      <Button className='mr-2' outline theme='danger' onClick={ this.handleDelete }>Yes</Button>
                      <Button className='mr-2' outline theme='secondary' onClick={ this.toggleModal }>No</Button>
                    </Row>
                  </ModalBody>
                </Modal>
              </Row>
              <Row noGutters style={{ 'width': '100%' }} className='mb-4'>
                <ExamCard title={name} id={examId} />
              </Row>
              <GradesCard id={examId}/>
              <ExamInfoCard answers={answers} />
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

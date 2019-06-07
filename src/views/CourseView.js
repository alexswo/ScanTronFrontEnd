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
  Button,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  FormTextarea,
  FormInput,
} from 'shards-react';
import ExamCard from '../components/cards/ExamCard';
import CreateExamCard from '../components/cards/CreateExamCard';
import actions from '../actions';

class CourseView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update: false,
      del: false,
      desc: '',
      n: '',
      submitted: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.handleUpdate= this.handleUpdate.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, user, courseId } = this.props;
    dispatch(actions.getAllExams(user, courseId));
    dispatch(actions.getCourse(user, courseId));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actions.clearCourse());
  }

  handleDelete() {
    const { dispatch, id, user } = this.props;
    dispatch(actions.deleteCourse(user, id));
  }

  toggleUpdate() {
   this.setState({ update: !this.state.update });
  }

  toggleDelete() {
   this.setState({ del: !this.state.del });
  }

  handleUpdate(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { desc, n } = this.state;
    const { dispatch, user, name, description, courseId } = this.props;
    if (desc !== '' || n !== '') {
      dispatch(actions.updateCourse(user, courseId, { name: n || name , description: desc || description }));
      this.setState({
        desc: '',
        n: '',
        submitted: false,
        update: false,
      });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { courseId, name, description, exams } = this.props;
    const { del, update, desc, submitted, n } = this.state;
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
                  <span className='text-uppercase page-subtitle'>Course Overview</span>
                  <h3 className='page-title'>{name}</h3>
                </Col>
                <Button outline theme='accent' className='mr-2 ml-auto' onClick={ this.toggleUpdate }>
                  Edit Course
                </Button>
                <Modal open={ update } toggle={ this.toggleUpdate }>
                  <ModalHeader>Edit Description</ModalHeader>
                  <ModalBody>
                    <Row form>
                      <Form onSubmit={ this.handleUpdate } className='w-100'>
                        <FormInput
                          type='text'
                          invalid={submitted && n === ''}
                          name='n'
                          value={n}
                          onChange={this.handleChange}
                          placeholder={`New Course Title`}
                        />
                        <FormTextarea
                          className='mt-2'
                          invalid={submitted && desc === ''}
                          type='text'
                          name='desc'
                          value={desc}
                          onChange={this.handleChange}
                          placeholder='New Description'
                        />
                        <Button outline className='mt-2'>Edit</Button>
                      </Form>
                    </Row>
                  </ModalBody>
                </Modal>
                <Button outline theme='danger' className='mr-2 ml-2' onClick={ this.toggleDelete }>Delete Course</Button>
                <Modal open={ del } toggle={ this.toggleDelete }>
                  <ModalHeader>Are you sure?</ModalHeader>
                  <ModalBody>
                    <Row>
                      Delete this course permanently?
                    </Row>
                    <Row className='mt-2'>
                      <Button className='mr-2' outline theme='danger' onClick={ this.handleDelete }>Yes</Button>
                      <Button className='mr-2' outline theme='secondary' onClick={ this.toggleDelete }>No</Button>
                    </Row>
                  </ModalBody>
                </Modal>
              </Row>
              <Card className='mb-2 mt-2' style={{ 'width': '100%' }}>
                <CardHeader className='border-bottom'>
                  <Row>
                    <Col>
                      <h6 className='m-0'>Description</h6>
                    </Col>
                  </Row>
                </CardHeader>
                <ListGroup flush>
                  <ListGroupItem className='p-3'>
                    {/* Description */}
                      {description}
                  </ListGroupItem>
                </ListGroup>
              </Card>
              <CreateExamCard id={ courseId }/>
              {exams && exams.map(exam => (exam &&
                <Row noGutters style={{ 'width': '100%' }} key={exam.examid} className='mb-4'>
                  <ExamCard title={exam.name} id={exam.examid} />
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

export default connect(mapStateToProps)(CourseView);

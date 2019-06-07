import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Collapse,
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalBody,
  ModalHeader
} from 'shards-react';
import actions from '../../actions';
import examSheet from '../../mc_sheet.pdf';

class CreateExamCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      answers: [''],
      collapse: false,
      open: false,
      submitted: false,
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleModal = this.toggleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleCollapse() {
   this.setState({ collapse: !this.state.collapse });
  }

  toggleModal() {
   this.setState({ open: !this.state.open });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { name, answers } = this.state;
    const { dispatch, user, id } = this.props;
    if (name && answers.length > 0) {
      dispatch(actions.createExam(user, id, { name, answers }));
      this.setState({
        name: '',
        answers: [''],
        collapse: false,
        submitted: false,
      })
    }
  }

  handleAddAnswer() {
    const { answers } = this.state;
    const newAnswers = answers.concat(['']);
    this.setState({
      answers: newAnswers,
    });
  };

  handleRemoveAnswer(i) {
    const { answers } = this.state;
    this.setState({
      answers: answers.filter((s, si) => i !== si)
    });
  };

  handleAnswerChange(i) {
    return event => {
      const { answers } = this.state;
      const newAnswers = answers.map((answer, ai) => {
        if (i !== ai) return answer;
        return event.target.value;
      });

      this.setState({ answers: newAnswers });
    }
  }

  handleDelete() {
    const { dispatch, id, user } = this.props;
    dispatch(actions.deleteCourse(user, id));
  }

  render() {
    const { name, answers, submitted, open } = this.state;
    return(
      <div className='py-4'>
        <Button className='mr-2' onClick={ this.toggleCollapse }>Create Exam</Button>
        <Button outline theme='danger' className='mr-2' onClick={ this.toggleModal }>Delete Course</Button>
        <Collapse open={ this.state.collapse }>
          <div className="p-3 mt-3 border rounded">
            <Form onSubmit={ this.handleSubmit }>
              <Row form>
                {/* Exam Name */}
                <Col md='6' className='form-group'>
                  <label htmlFor='name'>Exam Name</label>
                  {submitted && !name &&
                    <div className='help-block text-danger'>Exam name is required</div>}
                  <FormInput
                    name='name'
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </Col>
              </Row>
              <Row form>
                {/* Answers */}
                <Col md='6' className='form-group'>
                  <label htmlFor='description'>Answers</label>
                  { answers.map((answer, i) => (
                    <InputGroup key={ `Answer ${i}` }>
                      <FormInput
                        invalid={submitted && !answer}
                        type='text'
                        placeholder={`Answer for Question ${i + 1}`}
                        value={ answer }
                        onChange={ this.handleAnswerChange(i) }
                      />
                      <InputGroupAddon type="append">
                        <Button outline onClick={ () => this.handleRemoveAnswer(i) } className='small'>-</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  ))}
                  <Button
                    theme='accent'
                    onClick={ this.handleAddAnswer }
                    className='small mt-2'
                  >
                    Add Answer
                  </Button>
                  <Button
                    href={examSheet}
                    theme='light'
                    className='small ml-2 mt-2'
                    download='exam_sheet.pdf'
                  >
                    Download Exam
                  </Button>
                </Col>
              </Row>
              <Button theme='accent'>Create</Button>
            </Form>
          </div>
        </Collapse>
        <Modal open={open} toggle={ this.toggleModal }>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalBody>
            <Row>
              Delete this course permanently?
            </Row>
            <Row className='mt-2'>
              <Button className='mr-2' outline theme='danger' onClick={ this.handleDelete }>Yes</Button>
              <Button className='mr-2' outline theme='secondary' onClick={ this.toggleModal }>No</Button>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.authentication.user,
  }
}

export default connect(mapStateToProps)(CreateExamCard);

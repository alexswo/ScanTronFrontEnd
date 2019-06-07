import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Collapse,
  Form,
  FormInput,
  FormSelect,
  InputGroup,
} from 'shards-react';
import actions from '../../actions';
import examSheet from '../../mc_sheet.pdf';

const options = [
  { value: '', label: 'Add Answer' },
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
];

class CreateExamCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      answers: ['', '', '', '', ''],
      collapse: false,
      submitted: false,
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  toggleCollapse() {
   this.setState({ collapse: !this.state.collapse });
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
    if (name && answers.filter(answer => answer === '').length === 0) {
      dispatch(actions.createExam(user, id, { name, answers }));
      this.setState({
        name: '',
        answers: ['', '', '', '', ''],
        collapse: false,
        submitted: false,
      })
    }
  }

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

  render() {
    const { name, answers, submitted } = this.state;
    return(
      <div className='py-4'>
        <Button className='mr-2' onClick={ this.toggleCollapse }>Create Exam</Button>
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
                      <FormSelect
                        invalid={submitted && !answer}
                        value={ answer }
                        onChange={ this.handleAnswerChange(i) }
                      >
                        {options.map(option => (
                          <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                      </FormSelect>
                    </InputGroup>
                  ))}
                  <Button
                    href={examSheet}
                    outline
                    theme='secondary'
                    className='small mt-2'
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

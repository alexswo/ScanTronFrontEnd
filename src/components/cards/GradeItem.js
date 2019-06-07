import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormInput,
  Row,
} from 'shards-react';
import actions from '../../actions';

class GradeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: -1,
      open: false,
      submitted: false,
    };

    this.toggleModal = this.toggleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleModal() {
   this.setState({
     open: !this.state.open,
     submitted: false,
   });
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
    const { score } = this.state;
    const { dispatch, grade, user, id } = this.props;
    if (score >= 0) {
      dispatch(actions.updateGrade(user, { score }, grade.gradeid, id));
      this.setState({
        score: null,
        open: false,
        submitted: false,
      })
    }
  }

  render() {
    const { grade, dispatch, user, id } = this.props;
    const { open, score, submitted } = this.state;
    return(
      <tr className='text-center'>
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
        <td>
          <Button outline theme='warning' className='mr-2' onClick={ this.toggleModal }>
            Update
          </Button>
          <Button outline theme='danger' onClick={ () => dispatch(actions.deleteGrade(user, grade.gradeid, id)) }>
            Delete
          </Button>
          <Modal open={open} toggle={ this.toggleModal }>
            <ModalHeader>Update Score</ModalHeader>
            <ModalBody>
              <Row form>
                <Form onSubmit={ this.handleSubmit }>
                  <FormInput
                    type='number'
                    invalid={submitted && score < 0}
                    name='score'
                    value={(score >= 0 && score) || ''}
                    onChange={this.handleChange}
                    placeholder={`Previous Score: ${grade.score}`}
                  />
                </Form>
                <Button className='ml-4'>Update Grade</Button>
              </Row>
            </ModalBody>
          </Modal>
        </td>
      </tr>
    )
  }
}

export default GradeItem;

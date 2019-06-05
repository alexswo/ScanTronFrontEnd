import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Collapse,
  Form,
  FormInput,
  FormTextarea,
} from 'shards-react';
import actions from '../../actions';

class CreateCourseCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        name: '',
        description: '',
      },
      collapse: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
   this.setState({ collapse: !this.state.collapse });
 }

  handleChange(event) {
    const { name, value } = event.target;
    const { course } = this.state;
    this.setState({
      course: {
        ...course,
        [name]: value
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { course } = this.state;
    const { dispatch, email } = this.props;
    if (course.name && course.description) {
      dispatch(actions.createCourse({ email }, course));
    }
    this.setState({
      course: {
        name: '',
        description: '',
      },
      collapse: false,
    })
  }

  render() {
    const { course } = this.state;
    return(
      <div className='py-4'>
        <Button onClick={this.toggle}>Create Course</Button>
        <Collapse open={this.state.collapse}>
          <div className="p-3 mt-3 border rounded">
            <Form onSubmit={ this.handleSubmit }>
              <Row form>
                {/* First Name */}
                <Col md='6' className='form-group'>
                  <label htmlFor='firstName'>Course Name</label>
                  <FormInput
                    name='name'
                    value={ course.name }
                    onChange={ this.handleChange }
                  />
                </Col>
              </Row>
              <Row form>
                {/* Last Name */}
                <Col md='6' className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <FormTextarea
                    name='description'
                    value={ course.description }
                    onChange={ this.handleChange }
                  />
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
    email: state.authentication.user.email,
  }
}

export default connect(mapStateToProps)(CreateCourseCard);

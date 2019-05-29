import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button,
} from 'shards-react';
import actions from '../../actions';

class RegisterCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConf: '',
        school: ''
      },
      submitted: false,
      verify: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.email && user.password && user.password === user.passwordConf) {
      dispatch(actions.register(user));
    }
  }

  render() {
    const { user, submitted } = this.state;
    const { error } = this.props;
    return (
      <Card className='mb-4' style={{
          'width' : '100%'
        }}>
        <CardHeader className='border-bottom'>
          <h6 className='m-0'>Register</h6>
        </CardHeader>
        <ListGroup flush={true}>
          <ListGroupItem className='p-3'>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  {error && <div className='help-block text-danger'>An account with the given email already exists!</div>}
                  <Row form={true}>
                    {/* First Name */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='feFirstName'>First Name</label>
                      <FormInput name='firstName' value={user.firstName} onChange={this.handleChange} placeholder='First Name'/>
                      {submitted && !user.firstName && <div className='help-block text-danger'>First Name is required</div>}
                    </Col>
                    {/* Last Name */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='feLastName'>Last Name</label>
                      <FormInput name='lastName' value={user.lastName} onChange={this.handleChange} placeholder='Last Name'/>
                      {submitted && !user.lastName && <div className='help-block text-danger'>Last Name is required</div>}
                    </Col>
                  </Row>
                  <Row form={true}>
                    {/* Email */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='feEmail'>Email</label>
                      <FormInput name='email' value={user.email} onChange={this.handleChange} type='email' placeholder='Email Address' autoComplete='email'/>
                      {submitted && !user.email && <div className='help-block text-danger'>Email is required</div>}
                    </Col>
                    {/* School */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='feCity'>School</label>
                      <FormInput name='school' value={user.school} onChange={this.handleChange} id='feCity' placeholder='School'/>
                      {submitted && !user.school && <div className='help-block text-danger'>School is required</div>}
                    </Col>
                  </Row>
                  <Row form={true}>
                    {/* Password */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='fePassword'>Password</label>
                      <FormInput name='password' value={user.password} onChange={this.handleChange} type='password' placeholder='Password'/>
                      {submitted && !user.password && <div className='help-block text-danger'>Password is required</div>}
                    </Col>
                    {/* Confirm Password */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='fePassword'>Confirm Password</label>
                      <FormInput name='passwordConf' value={user.passwordConf} onChange={this.handleChange} type='password' placeholder='Confirm Password'/>
                      {submitted && (!user.passwordConf || user.passwordConf !== user.password) && <div className='help-block text-danger'>Please confirm your password</div>}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={{
                        size: 10
                      }} md={{
                        size: 9
                      }}>
                      <Button theme='accent'>Register</Button>
                      <Link to='/login' className="btn btn-link">Cancel</Link>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
  )}
}

function mapStateToProps(state) {
    const { error } = state.registration;
    return {
      error
    };
}

export default connect(mapStateToProps)(RegisterCard);

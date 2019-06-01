import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'shards-react';
import actions from '../actions';

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email !== '' && password !== '') {
      dispatch(actions.login({ email, password }))
    }
  }

  render() {
    const { email, password, submitted } = this.state;
    const { error } = this.props;

    return (
      <Container fluid>
        <Row noGutters>
          <Col />
          <Col className='my-4'>
            <Card small className='mb-4 pt-3'>
              <CardHeader className='border-bottom text-center'>
                <div className='mb-3 mx-auto'>
                </div>
                <h4 className='mb-0'>Gradus</h4>
                <span className='text-muted d-block mb-2'>Login</span>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className='px-4'>
                  {error && <div className='help-block text-danger'>Incorrect email or password!</div>}
                  <form name='form' onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                      <label htmlFor='email'>Email</label>
                      <input type='text' className='form-control' name='email' value={email} onChange={this.handleChange} />
                      {submitted && !email &&
                        <div className='help-block text-danger'>Email is required</div>}
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                      <label htmlFor='password'>Password</label>
                      <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} />
                      {submitted && !password &&
                        <div className='help-block text-danger'>Password is required</div>}
                    </div>
                    <div className='form-group'>
                      <button className='btn btn-primary'>Login</button>
                      <Link to='/register' className='btn btn-link'>Register</Link>
                    </div>
                  </form>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
    const { error } = state.authentication;
    return {
        error
    };
}

export default connect(mapStateToProps)(LoginView);

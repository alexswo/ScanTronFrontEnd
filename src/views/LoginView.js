import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'shards-react';

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
      userDetails: {
       name: "Gradus",
       jobTitle: "Login",
     }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username !== '' && password !== '') {
      sessionStorage.setItem('user', 'logged in')
      this.props.history.push('/');
    }
  }

  render() {
    const { username, password, submitted, userDetails } = this.state;

    return (
      <Container fluid>
        <Row noGutters>
          <Col />
          <Col className='my-4'>
            <Card small className="mb-4 pt-3">
              <CardHeader className="border-bottom text-center">
                <div className="mb-3 mx-auto">
                </div>
                <h4 className="mb-0">{userDetails.name}</h4>
                <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="px-4">
                  <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                      <label htmlFor="username">Username</label>
                      <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                      {submitted && !username &&
                        <div className="help-block">Username is required</div>}
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                      {submitted && !password &&
                        <div className="help-block">Password is required</div>}
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary">Login</button>
                      <Link to="/register" className="btn btn-link">Register</Link>
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

export default withRouter(LoginView);

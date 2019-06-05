import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  InputGroupText,
} from 'shards-react';
import actions from '../../actions';

class SettingsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: props.firstName,
        lastName: props.lastName,
        school: props.school,
        email: props.email,
      },
      changed: false,
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
      },
      changed: true,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user, changed } = this.state;
    const { dispatch } = this.props;
    if (changed) {
      dispatch(actions.updateUser(user));
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { user } = this.state;
    dispatch(actions.getUser(user));
  }

  render() {
    const { user } = this.state;
    const { email } = this.props;
    return (
      <Card className='mb-4' style={ { 'width': '100%' } }>
        <CardHeader className='border-bottom'>
          <h6 className='m-0'>Settings</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className='p-3'>
            <Row>
              <Col>
                <Form onSubmit={ this.handleSubmit }>
                  <Row form>
                    {/* First Name */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='firstName'>First Name</label>
                      <FormInput
                        name='firstName'
                        value={ user.firstName }
                        onChange={ this.handleChange }
                      />
                    </Col>
                    {/* Last Name */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='lastName'>Last Name</label>
                      <FormInput
                        name='lastName'
                        value={ user.lastName }
                        onChange={ this.handleChange }
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {/* School */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='school'>School</label>
                      <FormInput
                        name='school'
                        value={ user.school }
                        onChange={ this.handleChange }
                      />
                    </Col>
                    {/* Email */}
                    <Col md='6' className='form-group'>
                      <label>Email</label>
                      <InputGroupText>{ email }</InputGroupText>
                    </Col>
                  </Row>
                  <Button theme='accent'>Update Account</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.user,
    email: state.authentication.user.email,
  };
}

export default connect(mapStateToProps)(SettingsCard);

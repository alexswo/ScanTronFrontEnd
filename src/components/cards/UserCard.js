import React, {Component} from 'react';
import {connect} from 'react-redux';
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
  InputGroupText
} from 'shards-react';
import actions from '../../actions';

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        school: ''
      },
      submitted: false,
      changed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      },
      changed: true,
      submitted: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({submitted: true});
    const {user, changed} = this.state;
    const {dispatch, email, school, firstName, lastName} = this.props;
    if (changed) {
      dispatch(actions.updateUser({
        firstName: user.firstName || firstName,
        lastName: user.lastName || lastName,
        school: user.school || school,
      }, email));
      this.setState({
        user: {
          firstName: '',
          lastName: '',
          school: ''
        },
        submitted: false,
        changed: false
      })
    }
  }

  componentDidMount() {
    const {dispatch, user} = this.props;
    dispatch(actions.getUser(user));
  }

  render() {
    const {user, submitted} = this.state;
    const {email, firstName, lastName, school} = this.props;
    return (<Card className='mb-4' style={{
        'width' : '100%'
      }}>
      <CardHeader className='border-bottom'>
        <h6 className='m-0'>User Profile</h6>
      </CardHeader>
      <ListGroup flush="flush">
        <ListGroupItem className='p-3'>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Row form="form">
                  {/* First Name */}
                  <Col md='6' className='form-group'>
                    <label htmlFor='firstName'>First Name</label>
                    <FormInput name='firstName' invalid={submitted && !user.firstName} value={user.firstName} onChange={this.handleChange} placeholder={firstName}/>
                  </Col>
                  {/* Last Name */}
                  <Col md='6' className='form-group'>
                    <label htmlFor='lastName'>Last Name</label>
                    <FormInput name='lastName' invalid={submitted && !user.lastName} value={user.lastName} onChange={this.handleChange} placeholder={lastName}/>
                  </Col>
                </Row>
                <Row form="form">
                  {/* School */}
                  <Col md='6' className='form-group'>
                    <label htmlFor='school'>School</label>
                    <FormInput name='school' invalid={submitted && !user.school} value={user.school} onChange={this.handleChange} placeholder={school}/>
                  </Col>
                  {/* Email */}
                  <Col md='6' className='form-group'>
                    <label>Email</label>
                    <InputGroupText>{email}</InputGroupText>
                  </Col>
                </Row>
                <Button theme='accent'>Update Account</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>)
  }
}

function mapStateToProps(state) {
  return {
    ...state.user,
    user: state.authentication.user
  };
}

export default connect(mapStateToProps)(UserCard);

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

class VerifyCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmCode: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      confirmCode: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { confirmCode } = this.state;
    const { dispatch, email } = this.props;
    if (email && confirmCode) {
      console.log(email);
      console.log(confirmCode);
      dispatch(actions.verify({ email, confirmCode }));
    }
  }

  render() {
    const { confirmCode, submitted } = this.state;
    return (
      <Card className='mb-4' style={ { 'width' : '100%' } }>
        <CardHeader className='border-bottom'>
          <h6 className='m-0'>Welcome { this.props.firstName }! Please Verify your account</h6>
        </CardHeader>
        <ListGroup flush={ true }>
          <ListGroupItem className='p-3'>
            <Row>
              <Col>
                <Form onSubmit={ this.handleSubmit }>
                  <Row form={ true }>
                    {/* Verification Code */}
                    <Col md='6' className='form-group'>
                      <label htmlFor='feFirstName'>Verification Code</label>
                      <FormInput name='confirmCode' value={ confirmCode } onChange={ this.handleChange } placeholder='Verification Code'/>
                      { submitted && !confirmCode && <div className='help-block text-danger'>Verification Code is required</div> }
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={ { size: 10 } } md={ { size: 9 } }>
                      <Button theme='accent'>Verify</Button>
                      <Link to='/login' className='btn btn-link'>Cancel</Link>
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
  const { verifying, email, firstName } = state.registration;
  return {
    verifying,
    email,
    firstName
  };
}

export default connect(mapStateToProps)(VerifyCard);

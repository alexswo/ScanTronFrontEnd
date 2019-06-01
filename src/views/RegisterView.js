import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'shards-react';
import RegisterCard from '../components/cards/RegisterCard'
import VerifyCard from '../components/cards/VerifyCard'

const RegisterView = (props) => {
  const { verifying } = props;
  return (
    <Container fluid>
      <Row>
        <Col />
        <Col
          className='main-content my-4'
          tag='main'
        >
          {verifying ? <VerifyCard /> : <RegisterCard />}
        </Col>
        <Col />
      </Row>
    </Container>
  )

}

function mapStateToProps(state) {
    const { verifying } = state.registration;
    return {
        verifying
    };
}

export default connect(mapStateToProps)(RegisterView);

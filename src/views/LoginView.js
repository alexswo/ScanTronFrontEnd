import React from 'react';
import { Container, Row, Col } from 'shards-react';
import LoginCard from '../components/cards/LoginCard';

const LoginView = () => {
  return (
    <Container fluid>
      <Row>
        <Col />
        <Col className='main-content my-4' tag='main'>
          <LoginCard />
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default LoginView;

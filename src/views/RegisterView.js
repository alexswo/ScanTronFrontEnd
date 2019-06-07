import React from 'react';
import { Container, Row, Col } from 'shards-react';
import RegisterCard from '../components/cards/RegisterCard'

const RegisterView = () => {
  return (
    <Container fluid>
      <Row>
        <Col />
        <Col className='main-content my-4' tag='main'>
          <RegisterCard />
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default RegisterView;

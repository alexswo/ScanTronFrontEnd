import React from 'react';
import { Container, Row, Col } from 'shards-react';
import VerifyCard from '../components/cards/VerifyCard';

const VerifyView = () => {
  return (
    <Container fluid>
      <Row>
        <Col />
        <Col className='main-content my-4' tag='main'>
          <VerifyCard />
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default VerifyView;

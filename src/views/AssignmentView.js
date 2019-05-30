import React from 'react';
import SideBar from '../components/layout/SideBar';
import { Container, Row, Col } from 'shards-react';
import AssignmentCard from '../components/cards/AssignmentCard'

const AssignmentView = () => (
  <Container fluid>
    <Row>
      <SideBar />
      <Col
        className='main-content'
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm='12'
        tag='main'
      >
        <Container fluid className='main-content-container px-4'>
          <Row className='page-header py-4'>
            <Col xs='12' sm='4' className='text-center text-md-left mb-sm-0'>
              <span className='text-uppercase page-subtitle'>Assignment Overview</span>
              <h3 className='page-title'>Assignment 1</h3>
            </Col>
          </Row>
          <Row noGutters style={{ 'width': '100%' }} className='py-4'>
            <AssignmentCard title='Assignment 1'/>
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
)

export default AssignmentView;

import React from 'react';
import SideBar from '../components/layout/SideBar';
import { Container, Row, Col } from "shards-react";
import AssignmentCard from '../components/cards/AssignmentCard';
import StudentCard from '../components/cards/StudentCard';

const StudentView = () => (
  <Container fluid>
    <Row>
      <SideBar />
      <Col
        className="main-content"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        <Container fluid className="main-content-container px-4">
          <Row className="page-header py-4">
            <Col xs="12" sm="4" className="text-center text-md-left mb-sm-0">
              <span className="text-uppercase page-subtitle">Student Overview</span>
              <h3 className="page-title">Student 1</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 9 }} md={{ size: 8 }}>
              <Row noGutters style={{ 'width': '100%' }} className="py-4">
                <AssignmentCard />
              </Row>

              <Row noGutters style={{ 'width': '100%' }} className="py-4">
                <AssignmentCard />
              </Row>

              <Row noGutters style={{ 'width': '100%' }} className="py-4">
                <AssignmentCard />
              </Row>

              <Row noGutters style={{ 'width': '100%' }} className="py-4">
                <AssignmentCard />
              </Row>
            </Col>
            <Col className='py-4'>
              <StudentCard />
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
)

export default StudentView;

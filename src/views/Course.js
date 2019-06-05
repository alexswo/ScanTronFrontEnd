import React from 'react';
import SideBar from '../components/layout/SideBar';
import { Container, Row, Col } from 'shards-react';
import AssignmentCard from '../components/cards/AssignmentCard';
import OverviewCard from '../components/cards/OverviewCard';

const CourseView = () => (
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
              <span className='text-uppercase page-subtitle'>Course Overview</span>
              <h3 className='page-title'>Com Sci 130</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 9 }} md={{ size: 8 }}>
              <Row noGutters style={{ 'width': '100%' }} className='py-4'>
                <AssignmentCard title='SRS 1'/>
              </Row>

              <Row noGutters style={{ 'width': '100%' }} className='py-4'>
                <AssignmentCard title='SRS2'/>
              </Row>

              <Row noGutters style={{ 'width': '100%' }} className='py-4'>
                <AssignmentCard title='Midterm'/>
              </Row>

              <Row noGutters style={{ 'width': '100%' }} className='py-4'>
                <AssignmentCard title='Project Presentation'/>
              </Row>
            </Col>
            <Col className='py-4'>
              <OverviewCard />
            </Col>
          </Row>

        </Container>
      </Col>
    </Row>
  </Container>
)

export default CourseView;

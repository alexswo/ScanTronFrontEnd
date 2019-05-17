import React from 'react';
import SideBar from '../components/layout/SideBar';
import { Container, Row, Col } from "shards-react";
import OverviewCard from '../components/cards/OverviewCard';

const ClassesView = () => (
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
              <span className="text-uppercase page-subtitle">Gradus</span>
              <h3 className="page-title">Classes Overview</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 10 }} md={{ size: 9 }}>
              <Row noGutters style={{ 'width': '100%' }} className="py-4">
                <OverviewCard title='CS130'/>
              </Row>

              <Row noGutters style={{ 'width': '100%' }} className="py-4">
                <OverviewCard title='CS131'/>
              </Row>

              <Row noGutters style={{ 'width': '100%' }} className="py-4">
                <OverviewCard title='CS35L'/>
              </Row>

              <Row noGutters style={{ 'width': '100%' }} className="py-4">
                <OverviewCard title='CS33'/>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
)

export default ClassesView;

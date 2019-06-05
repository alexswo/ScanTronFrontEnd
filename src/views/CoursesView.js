import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/layout/SideBar';
import {
  Container,
  Row,
  Col,
} from 'shards-react';
import OverviewCard from '../components/cards/OverviewCard';
import CreateCourseCard from '../components/cards/CreateCourseCard';
import actions from '../actions';

class CoursesView extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(actions.getAllCourses(user));
  }

  render() {
    const { all_courses } = this.props;
    return (
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
                  <span className='text-uppercase page-subtitle'>Gradus</span>
                  <h3 className='page-title'>Courses Overview</h3>
                </Col>
              </Row>
              <CreateCourseCard />
              <Row>
                <Col lg={{ size: 10 }} md={{ size: 9 }}>
                  {all_courses && all_courses.map(course => (
                    <Row noGutters style={{ 'width': '100%' }} className='py-4' key={course.courseid}>
                      <OverviewCard name={course.name} description={course.description} />
                    </Row>
                  ))}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.courses,
    user: state.authentication.user,
  }
}

export default connect(mapStateToProps)(CoursesView);

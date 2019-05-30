import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'shards-react';

const StudentCard = ({ title }) => (
  <Card className='mb-4' style={{ 'width': '100%' }}>
    <CardHeader className='border-bottom'>
      <h6 className='m-0'>{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className='p-3'>
        {/* First Name */}
        <label htmlFor='feFirstName'>First Name</label>
        <span className='px-4'>Joe</span>
      </ListGroupItem>
      <ListGroupItem className='p-3'>
        {/* Last Name */}
        <label htmlFor='feFirstName'>Last Name</label>
        <span className='px-4'>Bruin</span>
      </ListGroupItem>
      <ListGroupItem className='p-3'>
        {/* Email Address */}
        <label htmlFor='feFirstName'>Email Address</label>
        <span className='px-4'>joebruin@ucla.edu</span>
      </ListGroupItem>
      <ListGroupItem className='p-3'>
        {/* Assignments Turned In */}
        <label htmlFor='feFirstName'>Assignments Completed</label>
        <span className='px-4'>23</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

StudentCard.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

StudentCard.defaultProps = {
  title: 'Student Info'
};

export default StudentCard;

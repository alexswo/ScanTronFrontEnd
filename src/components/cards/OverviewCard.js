import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'shards-react';

const OverviewCard = ({ title }) => (
  <Card className='mb-4' style={{ 'width': '100%' }}>
    <CardHeader className='border-bottom'>
      <Link to='/classes/cs130'><h6 className='m-0'>{title}</h6></Link>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className='p-3'>
        {/* Number of Students */}
        <label htmlFor='feFirstName'>Students Enrolled</label>
        <br />
        <span>250</span>
      </ListGroupItem>
      <ListGroupItem className='p-3'>
        {/* School */}
        <label htmlFor='feFirstName'>University</label>
        <br />
        <span>University of California, Los Angeles</span>
      </ListGroupItem>
      <ListGroupItem className='p-3'>
        {/* Description */}
        <label htmlFor='feFirstName'>Description</label>
        <br />
        <span>
          One of the many great classes taught by Professor Eggert
        </span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

OverviewCard.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

OverviewCard.defaultProps = {
  title: 'Class Overview'
};

export default OverviewCard;

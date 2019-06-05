import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'shards-react';

const OverviewCard = ({ name, description }) => (
  <Card className='mb-4' style={{ 'width': '100%' }}>
    <CardHeader className='border-bottom'>
      <Link to='/classes/cs130'><h6 className='m-0'>{name}</h6></Link>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className='p-3'>
        {/* Description */}
        <label>Description</label>
        <br />
        <span>
          {description}
        </span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

export default OverviewCard;

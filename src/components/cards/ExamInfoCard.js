import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'shards-react';

const ExamInfoCard = ({ name, answers, id }) => (
  <Card className='mb-4 mt-2' style={{ 'width': '100%' }}>
    <CardHeader className='border-bottom'>
      <Link to={'/course/' + id}><h6 className='m-0'>Answers</h6></Link>
    </CardHeader>
    <ListGroup flush>
      {answers && answers.map((answer, i) => (
        <ListGroupItem className='p-3 ml-2' key={i}>
          {`Question ${i+1}: ${answer}`}
        </ListGroupItem>
      ))}
    </ListGroup>
  </Card>
);

export default ExamInfoCard;

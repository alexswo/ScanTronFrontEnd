import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "shards-react";

const OverviewCard = ({ title }) => (
  <Card className="mb-4" style={{ 'width': '100%' }}>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        {/* Course Title */}
        <label htmlFor="feFirstName">Course Title</label>
        <br />
        <span>Computer Science 130</span>
      </ListGroupItem>
      <ListGroupItem className="p-3">
        {/* Professor */}
        <label htmlFor="feFirstName">Professor</label>
        <br />
        <span>Paul Eggert</span>
      </ListGroupItem>
      <ListGroupItem className="p-3">
        {/* Number of Students */}
        <label htmlFor="feFirstName">Students Enrolled</label>
        <br />
        <span>250</span>
      </ListGroupItem>
      <ListGroupItem className="p-3">
        {/* School */}
        <label htmlFor="feFirstName">University</label>
        <br />
        <span>University of California, Los Angeles</span>
      </ListGroupItem>
      <ListGroupItem className="p-3">
        {/* Description */}
        <label htmlFor="feFirstName">Description</label>
        <br />
        <span>
          Great class that prepares you for the industry by teaching you how to be an exceptional software engineer
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
  title: "Class Overview"
};

export default OverviewCard;

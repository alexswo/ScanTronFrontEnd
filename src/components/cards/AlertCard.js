import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from "shards-react";

class AlertCard extends Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.state = {
      visible: false,
      countdown: 0,
      timeUntilDismissed: 3
    };

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (this.props.visible && prevProps.visible !== this.props.visible) {
      this.clearInterval();
      this.interval = setInterval(this.handleTimeChange, 1000);
      this.setState({
        visible: true,
        countdown: 0,
        timeUntilDismissed: 3
      });
      this.clearInterval();
      this.interval = setInterval(this.handleTimeChange, 1000);
    }
  }

  handleTimeChange() {
    if (this.state.visible && this.state.countdown < this.state.timeUntilDismissed - 1) {
      this.setState({
        ...this.state,
        ...{ countdown: this.state.countdown + 1 }
      });
      return;
    }
    const { dispatch } = this.props;
    this.setState({ ...this.state, timeUntilDismissed: 3, ...{ visible: false } });
    this.clearInterval();
    dispatch({ type: 'RESET_ALERT' });
  }

  clearInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const { status, message } = this.props;
    const { visible } = this.state;
    console.log(visible);
    return (
      <Alert className="mt-4" open={ visible } theme={ status }>
        { message }
      </Alert>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.alert,
  }
}

export default connect(mapStateToProps)(AlertCard);

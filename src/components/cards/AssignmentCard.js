import React, {Component} from 'react';
import Chart from 'chart.js';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody} from 'shards-react';

export default class AssignmentCard extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');
    const { line, data, labels, datasets } = this.props;

    new Chart(myChartRef, { line, data, labels, datasets });
  }
  
  render() {
    return (
      <Card style={{
          'width' : '100%'
        }}>
        <CardHeader className='border-bottom'>
          <Link to='/assignment' className='disabled-link'>{this.props.title}</Link>
        </CardHeader>
        <CardBody className='pt-0'>
          <canvas ref={this.chartRef} style={{
              maxWidth: '100% !important'
            }}/>
        </CardBody>
      </Card>
    );
  }
}

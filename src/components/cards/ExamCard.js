import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from 'chart.js';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody} from 'shards-react';
import actions from '../../actions';

const labels = [
  '0-9',
  '10-19',
  '20-29',
  '30-39',
  '40-49',
  '50-59',
  '60-69',
  '70-79',
  '80-89',
  '90-100',
];

class ExamCard extends Component {
  constructor(props) {
    super(props);

    this.generateData = this.generateData.bind(this);
  }

  chartRef = React.createRef();
  chart;

  generateData(scores) {
    const bins = new Array(10).fill(0);
    scores.forEach(score => {
      if (score !== '100') {
        bins[Math.floor(score/10)] += 1;
      } else {
        bins[9] += 1;
      }
    });
    return bins;
  }

  componentDidMount() {
    const { dispatch, user, id } = this.props;
    dispatch(actions.getExam(user, id));
    dispatch(actions.getAllGrades(user, id));
  }

  componentDidUpdate(prevProps) {
    const { scores } = this.props;
    const data = this.generateData(scores);
    const myChartRef = this.chartRef.current.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(myChartRef, {
      type: 'horizontalBar',
      data: {
        labels,
        datasets: [
          {
            label: 'Class Distribution',
            fill: false,
            data,
            backgroundColor: 'rgba(0,123,255,0.1)',
            borderColor: 'rgba(0,123,255,1)',
            pointBackgroundColor: '#ffffff',
            pointHoverBackgroundColor: 'rgb(0,123,255)',
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 3
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              }
            }
          ]
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }

  render() {
    return (<Card style={{
        'width' : '100%'
      }}>
      <CardHeader className='border-bottom'>
        <Link to={'/exam/' + this.props.id}><h6 className='m-0'>{this.props.title}</h6></Link>
      </CardHeader>
      <CardBody className='pt-0'>
        <canvas ref={this.chartRef} style={{
            maxWidth: '100% !important'
          }}/>
      </CardBody>
    </Card>);
  }
}

function mapStateToProps(state, {id}) {
  let scores = [];
  if (state.exams[id] && state.exams[id].grades) {
    const {grades} = state.exams[id];
    scores = grades.map(grade => grade.score);
  }
  return {
    scores,
    ...state.exams[id],
    user: state.authentication.user
  }
}

export default connect(mapStateToProps)(ExamCard);

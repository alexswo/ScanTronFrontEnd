import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from 'chart.js';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody} from 'shards-react';
import actions from '../../actions';

const labels = [
  '0-10',
  '11-20',
  '21-30',
  '31-40',
  '41-50',
  '51-60',
  '61-70',
  '71-80',
  '81-90',
  '91-100',
];

class ExamCard extends Component {
  constructor(props) {
    super(props);

    this.generateData = this.generateData.bind(this);
  }

  chartRef = React.createRef();

  generateData(scores) {
    return new Array(11).fill(0).map((val, i) => scores.filter(score => Math.floor(score/10) === (i+1)).length);
  }

  componentDidMount() {
    const { dispatch, user, id } = this.props;
    dispatch(actions.getExam(user, id));
    dispatch(actions.getAllGrades(user, id));
  }

  componentDidUpdate(prevProps) {
    let scores = [];
    if (!this.props.scores.length) {
      scores = [10, 20, 30, 40, 50, 60, 70, 80, 80, 65, 64, 70, 34, 91, 92, 100];
    } else {
      scores = this.props.scores;
    }
    const data = this.generateData(scores);
    const myChartRef = this.chartRef.current.getContext('2d');
    new Chart(myChartRef, {
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

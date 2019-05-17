import React, { Component } from 'react';
import Chart from 'chart.js';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody } from "shards-react";

export default class AssignmentCard extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
              labels: Array.from(new Array(11), (_, i) => (i === 0 ? 1 : i)),
                  datasets: [
                    {
                      label: "Class Distribution",
                      fill: "start",
                      data: [
                        1,
                        2,
                        4,
                        4,
                        5,
                        6,
                        8,
                        7,
                        5,
                        2,
                        1
                      ],
                      backgroundColor: "rgba(0,123,255,0.1)",
                      borderColor: "rgba(0,123,255,1)",
                      pointBackgroundColor: "#ffffff",
                      pointHoverBackgroundColor: "rgb(0,123,255)",
                      borderWidth: 1.5,
                      pointRadius: 0,
                      pointHoverRadius: 3
                    },
                  ]
                }
        });
    }
    render() {
        return (
          <Card style={{ 'width': '100%' }}>
            <CardHeader className="border-bottom">
              <Link to='/assignment' className='disabled-link'>{this.props.title}</Link>
            </CardHeader>
            <CardBody className="pt-0">
              <canvas
                ref={this.chartRef}
                style={{ maxWidth: "100% !important" }}
              />
            </CardBody>
          </Card>
        );
    }
}

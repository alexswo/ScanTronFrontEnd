import React, { Component } from 'react';
import Chart from 'chart.js'
import { Card, CardHeader, CardBody } from "shards-react";

export default class AssignmentCard extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
              labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
                  datasets: [
                    {
                      label: "Current Month",
                      fill: "start",
                      data: [
                        500,
                        800,
                        320,
                        180,
                        240,
                        320,
                        230,
                        650,
                        590,
                        1200,
                        750,
                        940,
                        1420,
                        1200,
                        960,
                        1450,
                        1820,
                        2800,
                        2102,
                        1920,
                        3920,
                        3202,
                        3140,
                        2800,
                        3200,
                        3200,
                        3400,
                        2910,
                        3100,
                        4250
                      ],
                      backgroundColor: "rgba(0,123,255,0.1)",
                      borderColor: "rgba(0,123,255,1)",
                      pointBackgroundColor: "#ffffff",
                      pointHoverBackgroundColor: "rgb(0,123,255)",
                      borderWidth: 1.5,
                      pointRadius: 0,
                      pointHoverRadius: 3
                    },
                    {
                      label: "Past Month",
                      fill: "start",
                      data: [
                        380,
                        430,
                        120,
                        230,
                        410,
                        740,
                        472,
                        219,
                        391,
                        229,
                        400,
                        203,
                        301,
                        380,
                        291,
                        620,
                        700,
                        300,
                        630,
                        402,
                        320,
                        380,
                        289,
                        410,
                        300,
                        530,
                        630,
                        720,
                        780,
                        1200
                      ],
                      backgroundColor: "rgba(255,65,105,0.1)",
                      borderColor: "rgba(255,65,105,1)",
                      pointBackgroundColor: "#ffffff",
                      pointHoverBackgroundColor: "rgba(255,65,105,1)",
                      borderDash: [3, 3],
                      borderWidth: 1,
                      pointRadius: 0,
                      pointHoverRadius: 2,
                      pointBorderColor: "rgba(255,65,105,1)"
                    }
                  ]
                }
        });
    }
    render() {
        return (
          <Card style={{ 'width': '100%' }}>
            <CardHeader className="border-bottom">
              Assignment 1
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

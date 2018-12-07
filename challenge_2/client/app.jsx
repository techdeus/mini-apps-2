import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import GraphType from './graphType.jsx';
import GraphDate from './graphDate.jsx';
import helpers from '../helpers/helpers.js';
import Axios from 'axios';
import Moment from 'moment';

const currDate = Moment(new Date()).format('YYYY-MM-DD');

class App extends Component {
    constructor(props) {
        super(props);
            this.state = {
                priceResults: [],
                type: 'bar',
                date: [currDate, currDate],
                disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD',
            }
        this.fetchPrices = this.fetchPrices.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.handleGraphTypeChange = this.handleGraphTypeChange.bind(this);
        this.handleGraphDateChange = this.handleGraphDateChange.bind(this);
    }

    componentDidMount() {
        this.fetchPrices();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    async fetchPrices() {
        const { date } = this.state;
        try {
            const response = await Axios.get(`/getPrices`, {
                params: {
                    date: date,
                }
            });
            if (response) {
                const priceData = await response.data;
                this.setState(
                    { priceResults: priceData }, 
                    () => this.renderChart()
                );
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.log(err);
        }
    };

    handleGraphTypeChange(event) {
        this.setState({
            type: event.target.value
        }, () => {
            this.renderChart();
        })
    };

    handleGraphDateChange(event) {
        let currValue = event.target.value;
        let date = '';
        const dateArr = [];
        if (currValue === 'today') {
            date = new Date();
            const today = Moment(date).format('YYYY-MM-DD');
            dateArr.push(today, today);
        } else if (currValue === 'yesterday') {
            const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
            const formatYesterday = Moment(yesterday).format('YYYY-MM-DD');
            dateArr.push(formatYesterday, formatYesterday);
        } else if (currValue === 'week') {
            const week = ( d => new Date(d.setDate(d.getDate()-7)) )(new Date);
            const formatWeek = Moment(week).format('YYYY-MM-DD');
            date = new Date();
            const today = Moment(date).format('YYYY-MM-DD');
            dateArr.push(formatWeek, today);
        } else if (currValue === 'month') {
            const month = ( d => new Date(d.setDate(d.getDate()-30)) )(new Date);
            const formatMonth = Moment(month).format('YYYY-MM-DD');
            date = new Date();
            const today = Moment(date).format('YYYY-MM-DD');
            dateArr.push(formatMonth, today);
        } else if (currValue === '3') {
            const threeMonths = ( d => new Date(d.setDate(d.getDate()-90)) )(new Date);
            const formatThreeMonths = Moment(threeMonths).format('YYYY-MM-DD');
            date = new Date();
            const today = Moment(date).format('YYYY-MM-DD');
            dateArr.push(formatThreeMonths, today);
        } else if (currValue === '6') {
            const sixMonths = ( d => new Date(d.setDate(d.getDate()-180)) )(new Date);
            const formatSixMonths = Moment(sixMonths).format('YYYY-MM-DD');
            date = new Date();
            const today = Moment(date).format('YYYY-MM-DD');
            dateArr.push(formatSixMonths, today);
        } else {
            const year = ( d => new Date(d.setDate(d.getDate()-365)) )(new Date);
            const formatYear = Moment(year).format('YYYY-MM-DD');
            date = new Date();
            const today = Moment(date).format('YYYY-MM-DD');
            dateArr.push(formatYear, today);
        }
        
        this.setState({
            date: dateArr
        }, () => {
            this.fetchPrices(dateArr);
        })
    };

    renderChart() {
        const { priceResults, type } = this.state;
        const node = this.node;
        const labels = Object.keys(priceResults);
        const results = Object.values(priceResults);
        
        if (window.chart) {
            window.chart.destroy();
        }

        window.chart = new Chart(node, {
            type: type, 
            data: {
                labels: labels,
                datasets: [{
                    label: "Bitcoin Financial Information",
                    data: results,
                    backgroundColor: helpers.genRandomColors(labels.length),
                    borderColor: [
                        "rgba(255, 0, 0, 0.2)",
                    ],
                    borderWidth: 1 
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    };

    render() {
        const { disclaimer } = this.state;
        return (
            <div className="container">
              <div className="title">Cryptocurrency Charting Tool</div>
                <div className="chart">
                    <canvas 
                        style={{width: 100, height: 100}}
                        ref={node => (this.node = node)}
                    />
                </div>
                <div className="formContainer">
                    <GraphType handleGraphTypeChange={this.handleGraphTypeChange} />
                    <GraphDate handleGraphDateChange={this.handleGraphDateChange} />
                </div>
                <div className="disclaimer">
                    {disclaimer}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
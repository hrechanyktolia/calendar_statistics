import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import {getFeedbackInfo, monthList} from "./utils";


const Chart = ({ feedbackData, selectedYear, selectedMonth, selectedDay }) => {
    const { yearRate, labels, dailyRate, dayRate} = getFeedbackInfo(
        feedbackData,
        selectedYear,
        selectedMonth,
        selectedDay
    );

    const lineChartData = {
        labels:
            selectedYear && selectedMonth
                ? labels
                : selectedYear
                    ? monthList
                    : null,
        datasets: [
            {
                data:
                    selectedYear && selectedMonth
                        ? dailyRate
                        : selectedYear
                            ? yearRate
                            : dayRate,
                label: "Середня оцінка",
                borderColor: "#3333ff",
                fill: true,
                lineTension: 0.5,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                fontSize: 20,
            },
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                display: selectedYear && selectedMonth && !selectedDay,
            },
            y: {
                suggestedMax: 5,
                suggestedMin: 0,
            },
        },
    };

    return (
        <div style={{ width: "600px", height: "410px" }}>
            <Line options={chartOptions} data={lineChartData} />
        </div>
    );
};

export default Chart;




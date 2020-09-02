import React, { useState, useEffect } from "react";
import { Bar, ChartData } from "react-chartjs-2";
import "./BarChart.css";

const options = {
  scales: {
    xAxes: [
      {
        ticks: {
          min: 0,
        },
        gridLines: {
          offsetGridLines: true,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          min: 0,
        },
      },
    ],
  },
};
const color = {
  Red: "rgba(235, 26, 26,0.2)",
  RedOutline: "rgba(235, 26, 26,1)",
  Green: "rgba(26, 255, 0,0.2)",
  GreenOutline: "rgba(26, 255, 0,1)",
};

interface props {
  totalCases: number | null;
  totalRecoveries: number | null;
  totalDeaths: number | null;
}

const BarChart: React.FC<props> = ({
  totalCases,
  totalRecoveries,
  totalDeaths,
}) => {
  useEffect(() => {
    setData({
      labels: ["Cases", "Recovered", "Deaths"],
      datasets: [
        {
          // label: "Rainfall",
          backgroundColor: [color.Red, color.Green, color.Red],
          borderColor: [color.RedOutline, color.GreenOutline, color.RedOutline],
          borderWidth: 2,
          data: [totalCases, totalRecoveries, totalDeaths],
        },
      ],
    });
  }, [totalCases, totalRecoveries, totalDeaths]);

  const [data, setData] = useState<ChartData<any>>({
    labels: ["Cases", "Recovered", "Deaths"],
    datasets: [
      {
        // label: "Rainfall",
        backgroundColor: [color.Red, color.Green, color.Red],
        borderColor: [color.RedOutline, color.GreenOutline, color.RedOutline],
        borderWidth: 2,
        data: [totalCases, totalRecoveries, totalDeaths],
      },
    ],
  });
  return (
    <div className="barChart">
      <Bar data={data} options={options}></Bar>
    </div>
  );
};

export default BarChart;

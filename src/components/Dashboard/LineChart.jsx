import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Sales Details",
        data: [31, 40, 28, 51, 42, 90, 20],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 5,
        hover: {
          size: 9,
        },
      },
      xaxis: {
        categories: ["5k", "10k", "15k", "20k", "25k", "30k", "35k"],
        title: {
          text: "",
        },
        labels: {
          show: true,
        },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "%";
          },
        },
        max: 100,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ApexChart;

import React from "react";
import Chart from "react-apexcharts";

type ChartLineType = {
  data: {
    name: string;
    data: number[];
  }[];
};

const ChartLine1: React.FC<ChartLineType> = (props) => {
  const series = props.data as any;

  const options: ApexCharts.ApexOptions = {
    chart: {
      width: 100,
      toolbar: {
        show: false,
      },

      zoom: {
        enabled: false,
      },

      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },

    colors: ["#FF993C"],

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
    },

    yaxis: {
      labels: {
        formatter: (value) => {
          const valueString = value.toString();
          if (valueString.length > 6) {
            return valueString.slice(0, valueString.length - 6) + "tr";
          }

          return valueString;
        },
      },
    },

    responsive: [
      {
        breakpoint: 1000,
      },
    ],
  };

  return (
    <Chart
      height={300}
      width="100%"
      options={options}
      type="area"
      series={series}
    />
  );
};

export default ChartLine1;

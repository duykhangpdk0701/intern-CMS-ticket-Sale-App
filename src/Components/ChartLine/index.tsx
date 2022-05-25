import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartLineType = {
  chartLineData: {
    name: string;
    uv: number;
    pv: number;
    amt: number;
  }[];
};

const ChartLine = (props: ChartLineType) => {
  return (
    <ResponsiveContainer height={300}>
      <AreaChart
        data={props.chartLineData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis axisLine={false} dataKey="name" />
        <YAxis axisLine={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          strokeWidth={4}
          stroke="#ff993b"
          fill="#feebde"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartLine;

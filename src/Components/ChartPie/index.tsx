import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type ChartPieType = {
  chartPieData: {
    name: string;
    value: number;
    fill: string;
  }[];
};

const ChartPie = (props: ChartPieType) => {
  return (
    <ResponsiveContainer height={230}>
      <PieChart width={230} height={230}>
        <Pie
          data={props.chartPieData}
          startAngle={90}
          endAngle={450}
          cx={120}
          cy={120}
          innerRadius={43}
          outerRadius={95}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value">
          {props.chartPieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartPie;

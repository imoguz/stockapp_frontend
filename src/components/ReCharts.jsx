import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ReCharts = ({ stock, stockName }) => {
  const data = Object.values(
    stock.reduce((acc, { createdAt, totalPrice }) => {
      const date = new Date(createdAt).toLocaleDateString();
      acc[date] = acc[date] || { date, [stockName]: 0 };
      acc[date][stockName] += totalPrice;
      return acc;
    }, {})
  );
  return (
    <LineChart width={320} height={320} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey={stockName} stroke="#8884d8" />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default ReCharts;

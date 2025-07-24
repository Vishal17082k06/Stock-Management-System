import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function AvailabilityTrendChart({ data }) {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: "Stock", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          
          {/* Actual vs Forecasted types can be filtered if needed */}
          <Line type="monotone" dataKey="available_stock" stroke="#8884d8" name="Available Stock" />
          <Line type="monotone" dataKey="lower_bound" stroke="#82ca9d" name="Lower Bound" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="upper_bound" stroke="#ff7300" name="Upper Bound" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AvailabilityTrendChart;

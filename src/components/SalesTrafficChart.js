import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DragHandle } from "./StyledComponents";

const SalesTrafficChart = ({ salesData, darkMode }) => (
  <div style={{
    backgroundColor: darkMode ? "#1F2937" : "white",
    borderRadius: "0.5rem",
    padding: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  }}>
    <DragHandle className="drag-handle" />
    <h2 style={{ /* styles */ }}>Sales & Traffic</h2>
    <div style={{ height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
          <XAxis dataKey="month" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
          <YAxis yAxisId="left" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
          <YAxis yAxisId="right" orientation="right" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
          <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "white", border: "none" }} />
          <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#3B82F6" name="Sales ($)" />
          <Line yAxisId="right" type="monotone" dataKey="traffic" stroke="#10B981" name="Traffic" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default SalesTrafficChart;
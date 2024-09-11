import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DragHandle } from "./StyledComponents";

const SalesTrafficChart = ({ salesData, darkMode }) => {
  const [view, setView] = useState("default");
  const [dateRange, setDateRange] = useState("last30Days");
  const [store, setStore] = useState("all");
  const [category, setCategory] = useState("all");

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div style={{
      backgroundColor: darkMode ? "#1F2937" : "white",
      borderRadius: "0.5rem",
      padding: "20px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
    }}>
      <DragHandle className="drag-handle" />
      <h2>Sales & Traffic Dashboard</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          Date Range: 
          <select onChange={handleDateRangeChange} value={dateRange}>
            <option value="last30Days">Last 30 Days</option>
            <option value="last90Days">Last 90 Days</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>
        <div>
          Theme: 
          <select onChange={() => {}} value={darkMode ? "dark" : "light"}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          View: 
          <select onChange={handleViewChange} value={view}>
            <option value="default">Default</option>
            <option value="yearOverYear">Year-over-Year Comparison</option>
            <option value="storeComparison">Store Comparison</option>
            <option value="forecast">Forecast</option>
          </select>
        </div>
        <div>
          Store: 
          <select onChange={handleStoreChange} value={store}>
            <option value="all">All Stores</option>
            <option value="store1">Store 1</option>
            <option value="store2">Store 2</option>
            <option value="store3">Store 3</option>
          </select>
        </div>
        <div>
          Category: 
          <select onChange={handleCategoryChange} value={category}>
            <option value="all">All Categories</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
      </div>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          {view === "default" && (
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
              <XAxis dataKey="month" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
              <YAxis yAxisId="left" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
              <YAxis yAxisId="right" orientation="right" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "white", border: "none" }} />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#3B82F6" name="Sales ($)" />
              <Line yAxisId="right" type="monotone" dataKey="traffic" stroke="#10B981" name="Traffic" />
            </LineChart>
          )}
          {view === "yearOverYear" && (
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
              <XAxis dataKey="month" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
              <YAxis yAxisId="left" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "white", border: "none" }} />
              <Line yAxisId="left" type="monotone" dataKey="currentYearSales" stroke="#3B82F6" name="Current Year Sales ($)" />
              <Line yAxisId="left" type="monotone" dataKey="previousYearSales" stroke="#6366F1" name="Previous Year Sales ($)" />
            </LineChart>
          )}
          {view === "storeComparison" && (
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
              <XAxis dataKey="month" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
              <YAxis yAxisId="left" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "white", border: "none" }} />
              <Line yAxisId="left" type="monotone" dataKey="store1Sales" stroke="#3B82F6" name="Store 1 Sales ($)" />
              <Line yAxisId="left" type="monotone" dataKey="store2Sales" stroke="#10B981" name="Store 2 Sales ($)" />
              <Line yAxisId="left" type="monotone" dataKey="store3Sales" stroke="#F59E0B" name="Store 3 Sales ($)" />
            </LineChart>
          )}
          {view === "forecast" && (
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
              <XAxis dataKey="month" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
              <YAxis yAxisId="left" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "white", border: "none" }} />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#3B82F6" name="Sales ($)" />
              <Line yAxisId="left" type="monotone" dataKey="forecastedSales" stroke="#6366F1" name="Forecasted Sales ($)" />
              <Line yAxisId="left" type="monotone" dataKey="traffic" stroke="#10B981" name="Traffic" />
              <Line yAxisId="left" type="monotone" dataKey="forecastedTraffic" stroke="#F59E0B" name="Forecasted Traffic" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: "20px" }}>
        <div>Conversion Rate: 5%</div>
        <div>Average Order Value: $75</div>
        <div>Total Sales: $10,000</div>
        <div>Total Traffic: 20,000</div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <div>Legend:</div>
        <div>- Blue Line: Sales ($)</div>
        <div>- Green Line: Traffic</div>
        <div>- Purple Line: Forecasted Sales ($)</div>
        <div>- Orange Line: Forecasted Traffic</div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button>Export CSV</button>
        <button>Export Image</button>
      </div>
    </div>
  );
};

export default SalesTrafficChart;
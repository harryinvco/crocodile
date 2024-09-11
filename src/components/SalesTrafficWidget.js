import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardContent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const salesData = {
  last30Days: [
    { date: "2023-09-01", sales: 400, traffic: 150 },
    { date: "2023-09-02", sales: 300, traffic: 130 },
    { date: "2023-09-03", sales: 500, traffic: 200 },
    { date: "2023-09-04", sales: 450, traffic: 180 },
    { date: "2023-09-05", sales: 600, traffic: 250 },
    { date: "2023-09-06", sales: 550, traffic: 230 },
    { date: "2023-09-07", sales: 700, traffic: 300 },
    { date: "2023-09-08", sales: 650, traffic: 280 },
    { date: "2023-09-09", sales: 800, traffic: 350 },
    { date: "2023-09-10", sales: 750, traffic: 330 },
    { date: "2023-09-11", sales: 900, traffic: 400 },
    { date: "2023-09-12", sales: 850, traffic: 380 },
    { date: "2023-09-13", sales: 1000, traffic: 450 },
    { date: "2023-09-14", sales: 950, traffic: 430 },
    { date: "2023-09-15", sales: 1100, traffic: 500 },
    { date: "2023-09-16", sales: 1050, traffic: 480 },
    { date: "2023-09-17", sales: 1200, traffic: 550 },
    { date: "2023-09-18", sales: 1150, traffic: 530 },
    { date: "2023-09-19", sales: 1300, traffic: 600 },
    { date: "2023-09-20", sales: 1250, traffic: 580 },
    { date: "2023-09-21", sales: 1400, traffic: 650 },
    { date: "2023-09-22", sales: 1350, traffic: 630 },
    { date: "2023-09-23", sales: 1500, traffic: 700 },
    { date: "2023-09-24", sales: 1450, traffic: 680 },
    { date: "2023-09-25", sales: 1600, traffic: 750 },
    { date: "2023-09-26", sales: 1550, traffic: 730 },
    { date: "2023-09-27", sales: 1700, traffic: 800 },
    { date: "2023-09-28", sales: 1650, traffic: 780 },
    { date: "2023-09-29", sales: 1800, traffic: 850 },
    { date: "2023-09-30", sales: 1750, traffic: 830 },
  ],
  last90Days: [
    { date: "2023-07-01", sales: 1200, traffic: 450 },
    { date: "2023-07-02", sales: 1100, traffic: 430 },
    { date: "2023-07-03", sales: 1300, traffic: 500 },
    { date: "2023-07-04", sales: 1250, traffic: 480 },
    { date: "2023-07-05", sales: 1400, traffic: 550 },
    { date: "2023-07-06", sales: 1350, traffic: 530 },
    { date: "2023-07-07", sales: 1500, traffic: 600 },
    { date: "2023-07-08", sales: 1450, traffic: 580 },
    { date: "2023-07-09", sales: 1600, traffic: 650 },
    { date: "2023-07-10", sales: 1550, traffic: 630 },
    { date: "2023-07-11", sales: 1700, traffic: 700 },
    { date: "2023-07-12", sales: 1650, traffic: 680 },
    { date: "2023-07-13", sales: 1800, traffic: 750 },
    { date: "2023-07-14", sales: 1750, traffic: 730 },
    { date: "2023-07-15", sales: 1900, traffic: 800 },
    { date: "2023-07-16", sales: 1850, traffic: 780 },
    { date: "2023-07-17", sales: 2000, traffic: 850 },
    { date: "2023-07-18", sales: 1950, traffic: 830 },
    { date: "2023-07-19", sales: 2100, traffic: 900 },
    { date: "2023-07-20", sales: 2050, traffic: 880 },
    { date: "2023-07-21", sales: 2200, traffic: 950 },
    { date: "2023-07-22", sales: 2150, traffic: 930 },
    { date: "2023-07-23", sales: 2300, traffic: 1000 },
    { date: "2023-07-24", sales: 2250, traffic: 980 },
    { date: "2023-07-25", sales: 2400, traffic: 1050 },
    { date: "2023-07-26", sales: 2350, traffic: 1030 },
    { date: "2023-07-27", sales: 2500, traffic: 1100 },
    { date: "2023-07-28", sales: 2450, traffic: 1080 },
    { date: "2023-07-29", sales: 2600, traffic: 1150 },
    { date: "2023-07-30", sales: 2550, traffic: 1130 },
    { date: "2023-07-31", sales: 2700, traffic: 1200 },
    { date: "2023-08-01", sales: 2650, traffic: 1180 },
    { date: "2023-08-02", sales: 2800, traffic: 1250 },
    { date: "2023-08-03", sales: 2750, traffic: 1230 },
    { date: "2023-08-04", sales: 2900, traffic: 1300 },
    { date: "2023-08-05", sales: 2850, traffic: 1280 },
    { date: "2023-08-06", sales: 3000, traffic: 1350 },
    { date: "2023-08-07", sales: 2950, traffic: 1330 },
    { date: "2023-08-08", sales: 3100, traffic: 1400 },
    { date: "2023-08-09", sales: 3050, traffic: 1380 },
    { date: "2023-08-10", sales: 3200, traffic: 1450 },
    { date: "2023-08-11", sales: 3150, traffic: 1430 },
    { date: "2023-08-12", sales: 3300, traffic: 1500 },
    { date: "2023-08-13", sales: 3250, traffic: 1480 },
    { date: "2023-08-14", sales: 3400, traffic: 1550 },
    { date: "2023-08-15", sales: 3350, traffic: 1530 },
    { date: "2023-08-16", sales: 3500, traffic: 1600 },
    { date: "2023-08-17", sales: 3450, traffic: 1580 },
    { date: "2023-08-18", sales: 3600, traffic: 1650 },
    { date: "2023-08-19", sales: 3550, traffic: 1630 },
    { date: "2023-08-20", sales: 3700, traffic: 1700 },
    { date: "2023-08-21", sales: 3650, traffic: 1680 },
    { date: "2023-08-22", sales: 3800, traffic: 1750 },
    { date: "2023-08-23", sales: 3750, traffic: 1730 },
    { date: "2023-08-24", sales: 3900, traffic: 1800 },
    { date: "2023-08-25", sales: 3850, traffic: 1780 },
    { date: "2023-08-26", sales: 4000, traffic: 1850 },
    { date: "2023-08-27", sales: 3950, traffic: 1830 },
    { date: "2023-08-28", sales: 4100, traffic: 1900 },
    { date: "2023-08-29", sales: 4050, traffic: 1880 },
    { date: "2023-08-30", sales: 4200, traffic: 1950 },
    { date: "2023-08-31", sales: 4150, traffic: 1930 },
    { date: "2023-09-01", sales: 4300, traffic: 2000 },
    { date: "2023-09-02", sales: 4250, traffic: 1980 },
    { date: "2023-09-03", sales: 4400, traffic: 2050 },
    { date: "2023-09-04", sales: 4350, traffic: 2030 },
    { date: "2023-09-05", sales: 4500, traffic: 2100 },
    { date: "2023-09-06", sales: 4450, traffic: 2080 },
    { date: "2023-09-07", sales: 4600, traffic: 2150 },
    { date: "2023-09-08", sales: 4550, traffic: 2130 },
    { date: "2023-09-09", sales: 4700, traffic: 2200 },
    { date: "2023-09-10", sales: 4650, traffic: 2180 },
    { date: "2023-09-11", sales: 4800, traffic: 2250 },
    { date: "2023-09-12", sales: 4750, traffic: 2230 },
    { date: "2023-09-13", sales: 4900, traffic: 2300 },
    { date: "2023-09-14", sales: 4850, traffic: 2280 },
    { date: "2023-09-15", sales: 5000, traffic: 2350 },
    { date: "2023-09-16", sales: 4950, traffic: 2330 },
    { date: "2023-09-17", sales: 5100, traffic: 2400 },
    { date: "2023-09-18", sales: 5050, traffic: 2380 },
    { date: "2023-09-19", sales: 5200, traffic: 2450 },
    { date: "2023-09-20", sales: 5150, traffic: 2430 },
    { date: "2023-09-21", sales: 5300, traffic: 2500 },
    { date: "2023-09-22", sales: 5250, traffic: 2480 },
    { date: "2023-09-23", sales: 5400, traffic: 2550 },
    { date: "2023-09-24", sales: 5350, traffic: 2530 },
    { date: "2023-09-25", sales: 5500, traffic: 2600 },
    { date: "2023-09-26", sales: 5450, traffic: 2580 },
    { date: "2023-09-27", sales: 5600, traffic: 2650 },
    { date: "2023-09-28", sales: 5550, traffic: 2630 },
    { date: "2023-09-29", sales: 5700, traffic: 2700 },
    { date: "2023-09-30", sales: 5650, traffic: 2680 },
  ],
  lastYear: [
    { date: "2022-01-01", sales: 4000, traffic: 1500 },
    { date: "2022-02-01", sales: 3000, traffic: 1300 },
    { date: "2022-03-01", sales: 5000, traffic: 1800 },
    { date: "2022-04-01", sales: 4500, traffic: 1600 },
    { date: "2022-05-01", sales: 6000, traffic: 2000 },
    { date: "2022-06-01", sales: 5500, traffic: 1900 },
    { date: "2022-07-01", sales: 7000, traffic: 2500 },
    { date: "2022-08-01", sales: 6500, traffic: 2300 },
    { date: "2022-09-01", sales: 8000, traffic: 3000 },
    { date: "2022-10-01", sales: 7500, traffic: 2800 },
    { date: "2022-11-01", sales: 9000, traffic: 3500 },
    { date: "2022-12-01", sales: 8500, traffic: 3300 },
  ],
  yearOverYear: [
    { date: "2023-01", currentYearSales: 4000, previousYearSales: 3500 },
    { date: "2023-02", currentYearSales: 3000, previousYearSales: 3200 },
    { date: "2023-03", currentYearSales: 5000, previousYearSales: 4500 },
    { date: "2023-04", currentYearSales: 4500, previousYearSales: 4000 },
    { date: "2023-05", currentYearSales: 6000, previousYearSales: 5500 },
    { date: "2023-06", currentYearSales: 5500, previousYearSales: 5000 },
    { date: "2023-07", currentYearSales: 7000, previousYearSales: 6500 },
    { date: "2023-08", currentYearSales: 6500, previousYearSales: 6000 },
    { date: "2023-09", currentYearSales: 8000, previousYearSales: 7500 },
    { date: "2023-10", currentYearSales: 7500, previousYearSales: 7000 },
    { date: "2023-11", currentYearSales: 9000, previousYearSales: 8500 },
    { date: "2023-12", currentYearSales: 8500, previousYearSales: 8000 },
  ],
  storeComparison: [
    { date: "2023-01", store1Sales: 2000, store2Sales: 1500, store3Sales: 500 },
    { date: "2023-02", store1Sales: 1800, store2Sales: 1400, store3Sales: 800 },
    { date: "2023-03", store1Sales: 2200, store2Sales: 1600, store3Sales: 1000 },
    { date: "2023-04", store1Sales: 2100, store2Sales: 1700, store3Sales: 1200 },
    { date: "2023-05", store1Sales: 2400, store2Sales: 1800, store3Sales: 1400 },
    { date: "2023-06", store1Sales: 2300, store2Sales: 1900, store3Sales: 1600 },
    { date: "2023-07", store1Sales: 2600, store2Sales: 2000, store3Sales: 1800 },
    { date: "2023-08", store1Sales: 2500, store2Sales: 2100, store3Sales: 2000 },
    { date: "2023-09", store1Sales: 2800, store2Sales: 2200, store3Sales: 2200 },
    { date: "2023-10", store1Sales: 2700, store2Sales: 2300, store3Sales: 2400 },
    { date: "2023-11", store1Sales: 3000, store2Sales: 2400, store3Sales: 2600 },
    { date: "2023-12", store1Sales: 2900, store2Sales: 2500, store3Sales: 2800 },
  ],
};

const SalesTrafficWidget = ({ darkMode }) => {
  const [view, setView] = useState("default");
  const [dateRange, setDateRange] = useState("last30Days");

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const data = salesData[dateRange];

  // Calculate total sales and traffic for the selected date range
  const totalSales = data.reduce((acc, data) => acc + data.sales, 0);
  const totalTraffic = data.reduce((acc, data) => acc + data.traffic, 0);

  return (
    <Card>
      <CardHeader title="Sales & Traffic" />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Date Range</InputLabel>
            <Select value={dateRange} onChange={handleDateRangeChange} label="Date Range">
              <MenuItem value="last30Days">Last 30 Days</MenuItem>
              <MenuItem value="last90Days">Last 90 Days</MenuItem>
              <MenuItem value="lastYear">Last Year</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>View</InputLabel>
            <Select value={view} onChange={handleViewChange} label="View">
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="yearOverYear">Year-over-Year</MenuItem>
              <MenuItem value="storeComparison">Store Comparison</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginBottom: "10px", fontSize: "0.9rem" }}>
          <div>Total Sales: ${totalSales.toLocaleString()}</div>
          <div>Total Traffic: {totalTraffic.toLocaleString()}</div>
        </div>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            {view === "default" && (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
                <XAxis dataKey="date" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
                <YAxis yAxisId="left" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
                <YAxis yAxisId="right" orientation="right" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "white", border: "none" }} />
                <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#3B82F6" name="Sales ($)" />
                <Line yAxisId="right" type="monotone" dataKey="traffic" stroke="#10B981" name="Traffic" />
              </LineChart>
            )}
            {view === "yearOverYear" && (
              <LineChart data={salesData.yearOverYear}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
                <XAxis dataKey="date" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
                <YAxis yAxisId="left" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "white", border: "none" }} />
                <Line yAxisId="left" type="monotone" dataKey="currentYearSales" stroke="#3B82F6" name="Current Year Sales ($)" />
                <Line yAxisId="left" type="monotone" dataKey="previousYearSales" stroke="#6366F1" name="Previous Year Sales ($)" />
              </LineChart>
            )}
            {view === "storeComparison" && (
              <LineChart data={salesData.storeComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
                <XAxis dataKey="date" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
                <YAxis yAxisId="left" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "white", border: "none" }} />
                <Line yAxisId="left" type="monotone" dataKey="store1Sales" stroke="#3B82F6" name="Store 1 Sales ($)" />
                <Line yAxisId="left" type="monotone" dataKey="store2Sales" stroke="#10B981" name="Store 2 Sales ($)" />
                <Line yAxisId="left" type="monotone" dataKey="store3Sales" stroke="#F59E0B" name="Store 3 Sales ($)" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesTrafficWidget;
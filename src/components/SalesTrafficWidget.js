import React, { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { DollarSign, Users, TrendingUp, ShoppingCart, Truck, Package, Clock } from "lucide-react";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

const SalesTrafficWidget = ({ salesData, darkMode }) => {
  const [dateRange, setDateRange] = useState("last30Days");
  const [selectedStore, setSelectedStore] = useState("All Stores");

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const currentData = useMemo(() => {
    const data = salesData[dateRange];
    if (selectedStore === "All Stores") {
      return data;
    }
    return data.map(day => ({
      ...day,
      sales: day[`${selectedStore}Sales`],
      traffic: day[`${selectedStore}Traffic`],
      orders: day[`${selectedStore}Orders`],
    }));
  }, [salesData, dateRange, selectedStore]);

  const aggregatedData = useMemo(() => {
    const lastDay = currentData[currentData.length - 1];
    const totalSales = selectedStore === "All Stores" ? lastDay.totalSales : lastDay[`${selectedStore}Sales`];
    const totalTraffic = selectedStore === "All Stores" ? lastDay.totalTraffic : lastDay[`${selectedStore}Traffic`];
    const totalOrders = selectedStore === "All Stores" ? lastDay.totalOrders : lastDay[`${selectedStore}Orders`];
    const averageOrderValue = +(totalSales / totalOrders).toFixed(2);
    const conversionRate = +((totalOrders / totalTraffic) * 100).toFixed(2);
    const averageShippingTime = +(Math.random() * 2 + 1).toFixed(1); // Simulated data
    const returnRate = +(Math.random() * 5).toFixed(1); // Simulated data

    return {
      totalSales,
      totalTraffic,
      totalOrders,
      averageOrderValue,
      conversionRate,
      averageShippingTime,
      returnRate,
    };
  }, [currentData, selectedStore]);

  const processedData = useMemo(() => {
    if (dateRange === "last30Days") {
      return currentData;
    } else if (dateRange === "last90Days") {
      return currentData.reduce((acc, curr, index) => {
        const weekIndex = Math.floor(index / 7);
        if (!acc[weekIndex]) {
          acc[weekIndex] = { ...curr, date: `Week ${weekIndex + 1}` };
        } else {
          acc[weekIndex].sales += curr.sales;
          acc[weekIndex].traffic += curr.traffic;
          acc[weekIndex].orders += curr.orders;
        }
        return acc;
      }, []);
    } else {
      return currentData.reduce((acc, curr, index) => {
        const monthIndex = new Date(curr.date).getMonth();
        if (!acc[monthIndex]) {
          acc[monthIndex] = { ...curr, date: new Date(curr.date).toLocaleString('default', { month: 'short' }) };
        } else {
          acc[monthIndex].sales += curr.sales;
          acc[monthIndex].traffic += curr.traffic;
          acc[monthIndex].orders += curr.orders;
        }
        return acc;
      }, []);
    }
  }, [currentData, dateRange]);

  const IndicatorBox = ({ title, value, icon: Icon, color }) => (
    <div style={{ 
      backgroundColor: darkMode ? "#374151" : "#F3F4F6", 
      padding: "10px", 
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div>
        <div style={{ fontSize: "0.875rem", color: darkMode ? "#9CA3AF" : "#6B7280" }}>{title}</div>
        <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: color }}>{value}</div>
      </div>
      <Icon size={24} color={color} />
    </div>
  );

  return (
    <div style={{
      backgroundColor: darkMode ? "#1F2937" : "white",
      borderRadius: "0.5rem",
      padding: "20px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      width: "100%",
    }}>
      <h2 style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "10px",
      }}>Sales & Traffic Analytics</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <select
          value={dateRange}
          onChange={handleDateRangeChange}
          style={{ 
            padding: "5px",
            backgroundColor: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "black",
            border: "1px solid #D1D5DB",
            borderRadius: "0.25rem",
          }}
        >
          <option value="last30Days">Last 30 Days</option>
          <option value="last90Days">Last 90 Days</option>
          <option value="lastYear">Last Year</option>
        </select>
        <select
          value={selectedStore}
          onChange={handleStoreChange}
          style={{ 
            padding: "5px",
            backgroundColor: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "black",
            border: "1px solid #D1D5DB",
            borderRadius: "0.25rem",
          }}
        >
          <option value="All Stores">All Stores</option>
          <option value="Store A">Store A</option>
          <option value="Store B">Store B</option>
          <option value="Store C">Store C</option>
          <option value="Online">Online Store</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "20px" }}>
        <IndicatorBox 
          title="Total Sales" 
          value={`$${aggregatedData.totalSales.toLocaleString()}`} 
          icon={DollarSign} 
          color="#3B82F6"
        />
        <IndicatorBox 
          title="Total Traffic" 
          value={aggregatedData.totalTraffic.toLocaleString()} 
          icon={Users} 
          color="#10B981"
        />
        <IndicatorBox 
          title="Conversion Rate" 
          value={`${aggregatedData.conversionRate}%`} 
          icon={TrendingUp} 
          color="#F59E0B"
        />
        <IndicatorBox 
          title="Avg Order Value" 
          value={`$${aggregatedData.averageOrderValue.toFixed(2)}`} 
          icon={ShoppingCart} 
          color="#EF4444"
        />
        <IndicatorBox 
          title="Total Orders" 
          value={aggregatedData.totalOrders.toLocaleString()} 
          icon={Package} 
          color="#8B5CF6"
        />
        <IndicatorBox 
          title="Avg Shipping Time" 
          value={`${aggregatedData.averageShippingTime} days`} 
          icon={Truck} 
          color="#EC4899"
        />
        <IndicatorBox 
          title="Return Rate" 
          value={`${aggregatedData.returnRate}%`} 
          icon={Clock} 
          color="#6366F1"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
        <div style={{ height: "300px" }}>
          <h3 style={{ marginBottom: "10px", fontSize: "1rem", fontWeight: "bold" }}>Sales & Traffic Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#3B82F6" name="Sales ($)" />
              <Line yAxisId="right" type="monotone" dataKey="traffic" stroke="#10B981" name="Traffic" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ height: "300px" }}>
          <h3 style={{ marginBottom: "10px", fontSize: "1rem", fontWeight: "bold" }}>Orders & Conversion Rate</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="orders" fill="#8B5CF6" name="Orders" />
              <Line yAxisId="right" type="monotone" dataKey="conversionRate" stroke="#F59E0B" name="Conversion Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ height: "300px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1rem", fontWeight: "bold" }}>Sales Distribution by Store</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: 'Store A', value: currentData[currentData.length - 1].Store_ASales },
                { name: 'Store B', value: currentData[currentData.length - 1].Store_BSales },
                { name: 'Store C', value: currentData[currentData.length - 1].Store_CSales },
                { name: 'Online', value: currentData[currentData.length - 1].OnlineSales },
              ]}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {
                COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))
              }
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesTrafficWidget;
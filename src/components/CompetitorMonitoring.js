import React, { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, BarChart2, AlertTriangle } from "lucide-react";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const CompetitorMonitoring = ({ competitorData, selectedCompetitor, setSelectedCompetitor, darkMode }) => {
  const [dateRange, setDateRange] = useState("week");

  const dateRanges = {
    "week": "Last Week",
    "month": "Last Month",
    "year": "Last Year"
  };

  const filteredData = competitorData[selectedCompetitor][dateRange];

  const indicators = useMemo(() => {
    const lastIndex = filteredData.length - 1;
    const ourLastPrice = filteredData[lastIndex].OurStore;
    const ourPrevPrice = filteredData[lastIndex - 1].OurStore;
    const avgCompetitorPrice = (filteredData[lastIndex].StoreA + filteredData[lastIndex].StoreB + filteredData[lastIndex].StoreC) / 3;
    const priceTrend = ourLastPrice > ourPrevPrice ? "up" : "down";
    const priceDiff = Math.abs(ourLastPrice - ourPrevPrice).toFixed(2);
    const competitorDiff = (ourLastPrice - avgCompetitorPrice).toFixed(2);
    const forecast = (ourLastPrice * 1.05).toFixed(2); // Simple 5% increase forecast

    return { ourLastPrice, priceTrend, priceDiff, competitorDiff, forecast };
  }, [filteredData]);

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
      }}>Competitor Price Analysis</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginBottom: "20px" }}>
        <select
          value={selectedCompetitor}
          onChange={(e) => setSelectedCompetitor(e.target.value)}
          style={{ 
            padding: "5px",
            backgroundColor: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "black",
            border: "1px solid #D1D5DB",
            borderRadius: "0.25rem",
            marginBottom: "10px",
            width: "100%",
            maxWidth: "200px",
          }}
        >
          {Object.keys(competitorData).map((shoe) => (
            <option key={shoe} value={shoe}>{shoe}</option>
          ))}
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          style={{ 
            padding: "5px",
            backgroundColor: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "black",
            border: "1px solid #D1D5DB",
            borderRadius: "0.25rem",
            marginBottom: "10px",
            width: "100%",
            maxWidth: "200px",
          }}
        >
          {Object.entries(dateRanges).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "20px" }}>
        <IndicatorBox 
          title="Our Price" 
          value={`$${indicators.ourLastPrice.toFixed(2)}`} 
          icon={DollarSign} 
          color="#3B82F6"
        />
        <IndicatorBox 
          title="Price Trend" 
          value={`${indicators.priceDiff} ${indicators.priceTrend === "up" ? "▲" : "▼"}`} 
          icon={indicators.priceTrend === "up" ? TrendingUp : TrendingDown} 
          color={indicators.priceTrend === "up" ? "#10B981" : "#EF4444"}
        />
        <IndicatorBox 
          title="Vs Competitors" 
          value={`${indicators.competitorDiff > 0 ? "+" : ""}${indicators.competitorDiff}`} 
          icon={BarChart2} 
          color={indicators.competitorDiff > 0 ? "#F59E0B" : "#8B5CF6"}
        />
        <IndicatorBox 
          title="Price Forecast" 
          value={`$${indicators.forecast}`} 
          icon={AlertTriangle} 
          color="#EC4899"
        />
      </div>
      <div style={{ height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" angle={-45} textAnchor="end" height={60} />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip formatter={(value) => value.toFixed(2)} />
            <Legend verticalAlign="top" height={36}/>
            <Line type="monotone" dataKey="StoreA" stroke={COLORS[0]} strokeWidth={2} />
            <Line type="monotone" dataKey="StoreB" stroke={COLORS[1]} strokeWidth={2} />
            <Line type="monotone" dataKey="StoreC" stroke={COLORS[2]} strokeWidth={2} />
            <Line type="monotone" dataKey="OurStore" stroke={COLORS[3]} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompetitorMonitoring;
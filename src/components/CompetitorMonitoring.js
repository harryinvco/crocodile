import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { DragHandle } from "./StyledComponents";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const CompetitorMonitoring = ({ competitorData, selectedCompetitor, setSelectedCompetitor, darkMode }) => {
  const filteredCompetitorData = selectedCompetitor === "All"
    ? competitorData
    : competitorData.filter((comp) => comp.name === selectedCompetitor);

  return (
    <div style={{
      gridColumn: "span 2",
      backgroundColor: darkMode ? "#1F2937" : "white",
      borderRadius: "0.5rem",
      padding: "20px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    }}>
      <DragHandle className="drag-handle" />
      <h2 style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "10px",
      }}>Competitor Monitoring</h2>
      <select
        value={selectedCompetitor}
        onChange={(e) => setSelectedCompetitor(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        <option value="All">All Competitors</option>
        {competitorData.map((comp) => (
          <option key={comp.name} value={comp.name}>{comp.name}</option>
        ))}
      </select>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={filteredCompetitorData} dataKey="marketShare" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {filteredCompetitorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompetitorMonitoring;
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DragHandle } from "./StyledComponents";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const dummyData = {
  "Nike Air Max": [
    { day: "Monday", StoreA: 120, StoreB: 115, StoreC: 110, OurStore: 118 },
    { day: "Tuesday", StoreA: 122, StoreB: 117, StoreC: 112, OurStore: 119 },
    { day: "Wednesday", StoreA: 121, StoreB: 116, StoreC: 111, OurStore: 117 },
    { day: "Thursday", StoreA: 123, StoreB: 118, StoreC: 113, OurStore: 120 },
    { day: "Friday", StoreA: 124, StoreB: 119, StoreC: 114, OurStore: 121 },
    { day: "Saturday", StoreA: 125, StoreB: 120, StoreC: 115, OurStore: 122 },
    { day: "Sunday", StoreA: 126, StoreB: 121, StoreC: 116, OurStore: 123 },
  ],
  "Adidas Ultraboost": [
    { day: "Monday", StoreA: 130, StoreB: 125, StoreC: 120, OurStore: 128 },
    { day: "Tuesday", StoreA: 132, StoreB: 127, StoreC: 122, OurStore: 129 },
    { day: "Wednesday", StoreA: 131, StoreB: 126, StoreC: 121, OurStore: 127 },
    { day: "Thursday", StoreA: 133, StoreB: 128, StoreC: 123, OurStore: 130 },
    { day: "Friday", StoreA: 134, StoreB: 129, StoreC: 124, OurStore: 131 },
    { day: "Saturday", StoreA: 135, StoreB: 130, StoreC: 125, OurStore: 132 },
    { day: "Sunday", StoreA: 136, StoreB: 131, StoreC: 126, OurStore: 133 },
  ],
};

const CompetitorMonitoring = ({ darkMode }) => {
  const [selectedShoe, setSelectedShoe] = useState("Nike Air Max");

  const filteredCompetitorData = dummyData[selectedShoe];

  // Calculate min and max prices for Y-axis domain
  const prices = filteredCompetitorData.flatMap(data => [data.StoreA, data.StoreB, data.StoreC, data.OurStore]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div style={{
      gridColumn: "span 2",
      backgroundColor: darkMode ? "#1F2937" : "white",
      borderRadius: "0.5rem",
      padding: "20px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
    }}>
      <DragHandle className="drag-handle" />
      <h2 style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "10px",
      }}>Competitor Price Analysis</h2>
      <select
        value={selectedShoe}
        onChange={(e) => setSelectedShoe(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        {Object.keys(dummyData).map((shoe) => (
          <option key={shoe} value={shoe}>{shoe}</option>
        ))}
      </select>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredCompetitorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[minPrice - 5, maxPrice + 5]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="StoreA" stroke={COLORS[0]} />
            <Line type="monotone" dataKey="StoreB" stroke={COLORS[1]} />
            <Line type="monotone" dataKey="StoreC" stroke={COLORS[2]} />
            <Line type="monotone" dataKey="OurStore" stroke={COLORS[3]} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompetitorMonitoring;
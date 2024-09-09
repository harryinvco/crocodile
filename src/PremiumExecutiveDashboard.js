import React, { useState } from "react";
import CompetitorMonitoring from "./components/CompetitorMonitoring";
import EmailWidget from "./components/EmailWidget";
import SalesTrafficChart from "./components/SalesTrafficChart";
import Chatbot from "./components/Chatbot";
import TodoList from "./components/TodoList";
import { Container, Title, Button, GridContainer, GridItem } from "./components/StyledComponents";
import Draggable from "react-draggable";

const competitorData = [
  { name: "Comp A", marketShare: 20, growth: 5, satisfaction: 75 },
  { name: "Comp B", marketShare: 15, growth: 3, satisfaction: 70 },
  { name: "Comp C", marketShare: 25, growth: -2, satisfaction: 68 },
  { name: "Crocodiles", marketShare: 30, growth: 7, satisfaction: 82 },
  { name: "Others", marketShare: 10, growth: 1, satisfaction: 72 },
];

const salesData = [
  { month: "Jan", sales: 4000, traffic: 1500 },
  { month: "Feb", sales: 3000, traffic: 1300 },
  { month: "Mar", sales: 5000, traffic: 1800 },
  { month: "Apr", sales: 4500, traffic: 1600 },
  { month: "May", sales: 6000, traffic: 2000 },
  { month: "Jun", sales: 5500, traffic: 1900 },
];

const emails = [
  {
    id: 1,
    sender: "John Doe",
    subject: "Q2 Financial Report",
    preview: "Attached is the Q2 financial report for your review. Key highlights include...",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "Jane Smith",
    subject: "New Store Opening",
    preview: "The grand opening for our 19th location is scheduled for next month. Here are the details...",
    timestamp: "Yesterday",
  },
  {
    id: 3,
    sender: "Marketing Team",
    subject: "Campaign Results",
    preview: "Here are the results of our latest marketing campaign. We've seen a significant increase in...",
    timestamp: "Yesterday",
  },
  {
    id: 4,
    sender: "HR Department",
    subject: "New Hiring Policy",
    preview: "Please review the updated hiring policy for all new employees. The main changes include...",
    timestamp: "2 days ago",
  },
  {
    id: 5,
    sender: "Tech Support",
    subject: "System Maintenance",
    preview: "We will be performing system maintenance this weekend. Please expect some downtime...",
    timestamp: "3 days ago",
  },
];

export default function PremiumExecutiveDashboard() {
  const [selectedCompetitor, setSelectedCompetitor] = useState("All");
  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "Hello! How can I assist you today?" },
  ]);
  const [todos, setTodos] = useState([
    { id: 1, text: "Review Q3 strategy", completed: false },
    { id: 2, text: "Meet with investors", completed: false },
    { id: 3, text: "Approve new hires", completed: true },
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [minimized, setMinimized] = useState({});

  const toggleMinimize = (key) => {
    setMinimized((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Container darkMode={darkMode}>
      <Title>Crocodiles Shoes Executive Dashboard</Title>
      <GridContainer>
        <GridItem minimized={minimized["competitorMonitoring"]}>
          <Button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => toggleMinimize("competitorMonitoring")}
          >
            {minimized["competitorMonitoring"] ? "Maximize" : "Minimize"}
          </Button>
          {!minimized["competitorMonitoring"] && (
            <CompetitorMonitoring
              competitorData={competitorData}
              selectedCompetitor={selectedCompetitor}
              setSelectedCompetitor={setSelectedCompetitor}
              darkMode={darkMode}
            />
          )}
        </GridItem>
        <GridItem minimized={minimized["emailWidget"]}>
          <Button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => toggleMinimize("emailWidget")}
          >
            {minimized["emailWidget"] ? "Maximize" : "Minimize"}
          </Button>
          {!minimized["emailWidget"] && <EmailWidget emails={emails} darkMode={darkMode} />}
        </GridItem>
        <GridItem minimized={minimized["salesTrafficChart"]}>
          <Button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => toggleMinimize("salesTrafficChart")}
          >
            {minimized["salesTrafficChart"] ? "Maximize" : "Minimize"}
          </Button>
          {!minimized["salesTrafficChart"] && <SalesTrafficChart salesData={salesData} darkMode={darkMode} />}
        </GridItem>
        <GridItem minimized={minimized["chatbot"]}>
          <Button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => toggleMinimize("chatbot")}
          >
            {minimized["chatbot"] ? "Maximize" : "Minimize"}
          </Button>
          {!minimized["chatbot"] && (
            <Chatbot chatMessages={chatMessages} setChatMessages={setChatMessages} darkMode={darkMode} />
          )}
        </GridItem>
        <GridItem minimized={minimized["todoList"]}>
          <Button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => toggleMinimize("todoList")}
          >
            {minimized["todoList"] ? "Maximize" : "Minimize"}
          </Button>
          {!minimized["todoList"] && <TodoList todos={todos} setTodos={setTodos} darkMode={darkMode} />}
        </GridItem>
      </GridContainer>
      <div style={{ position: "fixed", top: "20px", right: "20px" }}>
        <Button onClick={() => setDarkMode(!darkMode)} darkMode={darkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </Container>
  );
}
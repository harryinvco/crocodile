import React, { useState } from "react";
import CompetitorMonitoring from "./components/CompetitorMonitoring";
import EmailWidget from "./components/EmailWidget";
import SalesTrafficChart from "./components/SalesTrafficChart";
import Chatbot from "./components/Chatbot";
import TodoList from "./components/TodoList";
import { Container, Title, Button } from "./components/StyledComponents";
import GridLayout from "react-grid-layout";

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

  const layout = [
    { i: "competitorMonitoring", x: 0, y: 0, w: 1, h: 2 },
    { i: "emailWidget", x: 1, y: 0, w: 1, h: 2 },
    { i: "salesTrafficChart", x: 2, y: 0, w: 1, h: 2 },
    { i: "chatbot", x: 0, y: 1, w: 1, h: 2 },
    { i: "todoList", x: 1, y: 1, w: 1, h: 2 },
  ];

  return (
    <Container darkMode={darkMode}>
      <Title>Crocodiles Shoes Executive Dashboard</Title>
      <GridLayout className="layout" layout={layout} cols={3} rowHeight={150} width={1200}>
        <div key="competitorMonitoring">
          <Button onClick={() => toggleMinimize("competitorMonitoring")}>
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
        </div>
        <div key="emailWidget">
          <Button onClick={() => toggleMinimize("emailWidget")}>
            {minimized["emailWidget"] ? "Maximize" : "Minimize"}
          </Button>
          {!minimized["emailWidget"] && <EmailWidget emails={emails} darkMode={darkMode} />}
        </div>
        <div key="salesTrafficChart">
          <Button onClick={() => toggleMinimize("salesTrafficChart")}>
            {minimized["salesTrafficChart"] ? "Maximize" : "Minimize"}
          </Button>
          {!minimized["salesTrafficChart"] && <SalesTrafficChart salesData={salesData} darkMode={darkMode} />}
        </div>
        <div key="chatbot">
          <Button onClick={() => toggleMinimize("chatbot")}>
            {minimized["chatbot"] ? "Maximize" : "Minimize"}
          </Button>
          {!minimized["chatbot"] && (
            <Chatbot chatMessages={chatMessages} setChatMessages={setChatMessages} darkMode={darkMode} />
          )}
        </div>
        <div key="todoList">
          <Button onClick={() => toggleMinimize("todoList")}>
            {minimized["todoList"] ? "Maximize" : "Minimize"}
          </Button>
          {!minimized["todoList"] && <TodoList todos={todos} setTodos={setTodos} darkMode={darkMode} />}
        </div>
      </GridLayout>
      <div style={{ position: "fixed", top: "20px", right: "20px" }}>
        <Button onClick={() => setDarkMode(!darkMode)} darkMode={darkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </Container>
  );
}
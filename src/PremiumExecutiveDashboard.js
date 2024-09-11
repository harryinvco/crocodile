import React, { useState } from "react";
import CompetitorMonitoring from "./components/CompetitorMonitoring";
import EmailWidget from "./components/EmailWidget";
import SalesTrafficWidget from "./components/SalesTrafficWidget";
import Chatbot from "./components/Chatbot";
import TodoList from "./components/TodoList";
import { Container, DashboardContent, DarkModeToggle, Button } from "./components/StyledComponents";
import crocoLogo from './assets/croco-logo.png'; 
import axios from 'axios';

const generateWeekData = (basePrice) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.map(day => ({
    day,
    StoreA: +(basePrice + Math.random() * 10 - 5).toFixed(2),
    StoreB: +(basePrice + Math.random() * 10 - 5).toFixed(2),
    StoreC: +(basePrice + Math.random() * 10 - 5).toFixed(2),
    OurStore: +(basePrice + Math.random() * 10 - 5).toFixed(2),
  }));
};

const generateMonthData = (basePrice) => {
  return Array.from({ length: 4 }, (_, i) => ({
    day: `Week ${i + 1}`,
    StoreA: +(basePrice + Math.random() * 10 - 5).toFixed(2),
    StoreB: +(basePrice + Math.random() * 10 - 5).toFixed(2),
    StoreC: +(basePrice + Math.random() * 10 - 5).toFixed(2),
    OurStore: +(basePrice + Math.random() * 10 - 5).toFixed(2),
  }));
};

const generateYearData = (basePrice) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    day: month,
    StoreA: +(basePrice + Math.random() * 20 - 10).toFixed(2),
    StoreB: +(basePrice + Math.random() * 20 - 10).toFixed(2),
    StoreC: +(basePrice + Math.random() * 20 - 10).toFixed(2),
    OurStore: +(basePrice + Math.random() * 20 - 10).toFixed(2),
  }));
};

const competitorData = {
  "Nike Air Max 270": {
    week: generateWeekData(150),
    month: generateMonthData(150),
    year: generateYearData(150),
  },
  "Adidas Ultraboost 21": {
    week: generateWeekData(180),
    month: generateMonthData(180),
    year: generateYearData(180),
  },
  // ... other shoe models ...
};

const generateSalesData = (days, stores) => {
  const data = [];
  const startDate = new Date(2023, 0, 1);
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const entry = {
      date: date.toISOString().split('T')[0],
      totalSales: 0,
      totalTraffic: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      conversionRate: 0,
    };
    stores.forEach(store => {
      const sales = Math.floor(Math.random() * 10000) + 5000;
      const traffic = Math.floor(Math.random() * 1000) + 500;
      const orders = Math.floor(Math.random() * 100) + 50;
      entry[`${store}Sales`] = sales;
      entry[`${store}Traffic`] = traffic;
      entry[`${store}Orders`] = orders;
      entry.totalSales += sales;
      entry.totalTraffic += traffic;
      entry.totalOrders += orders;
    });
    entry.averageOrderValue = +(entry.totalSales / entry.totalOrders).toFixed(2);
    entry.conversionRate = +((entry.totalOrders / entry.totalTraffic) * 100).toFixed(2);
    data.push(entry);
  }
  return data;
};

const stores = ['Store A', 'Store B', 'Store C', 'Online'];

const salesData = {
  last30Days: generateSalesData(30, stores),
  last90Days: generateSalesData(90, stores),
  lastYear: generateSalesData(365, stores),
};

const emails = [
  {
    id: 1,
    sender: "John Doe",
    subject: "Quarterly Report",
    preview: "I've attached the quarterly report for your review. The numbers look promising...",
    timestamp: "10:30 AM",
    read: false,
    priority: true
  },
  {
    id: 2,
    sender: "Jane Smith",
    subject: "New Product Launch",
    preview: "We're ready to launch the new product line. Can we schedule a meeting to discuss the marketing strategy?",
    timestamp: "Yesterday",
    read: true,
    priority: false
  },
  {
    id: 3,
    sender: "Marketing Team",
    subject: "Campaign Results",
    preview: "Here are the results of our latest marketing campaign. We've seen a significant increase in...",
    timestamp: "Yesterday",
    read: false,
    priority: true
  },
  {
    id: 4,
    sender: "HR Department",
    subject: "New Hiring Policy",
    preview: "Please review the updated hiring policy for all new employees. The main changes include...",
    timestamp: "2 days ago",
    read: true,
    priority: false
  },
  {
    id: 5,
    sender: "Tech Support",
    subject: "System Maintenance",
    preview: "We will be performing system maintenance this weekend. Please expect some downtime...",
    timestamp: "3 days ago",
    read: true,
    priority: false
  },
];

export default function PremiumExecutiveDashboard() {
  const [selectedCompetitor, setSelectedCompetitor] = useState("Nike Air Max 270");
  const [chatMessages, setChatMessages] = useState([]);
  const [todos, setTodos] = useState([
    { id: 1, text: "Review Q3 strategy", completed: false },
    { id: 2, text: "Meet with investors", completed: false },
    { id: 3, text: "Approve new hires", completed: true },
  ]);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Container darkMode={darkMode}>
      <img src={crocoLogo} alt="Crocodiles Shoes Logo" style={{ maxWidth: "200px", marginBottom: "20px" }} />
      <DashboardContent>
        <CompetitorMonitoring
          competitorData={competitorData}
          selectedCompetitor={selectedCompetitor}
          setSelectedCompetitor={setSelectedCompetitor}
          darkMode={darkMode}
        />
        <EmailWidget emails={emails} darkMode={darkMode} />
        <SalesTrafficWidget salesData={salesData} darkMode={darkMode} />
        <TodoList todos={todos} setTodos={setTodos} darkMode={darkMode} />
      </DashboardContent>
      <DarkModeToggle>
        <Button onClick={() => setDarkMode(!darkMode)} darkMode={darkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </DarkModeToggle>
      <Chatbot 
        chatMessages={chatMessages} 
        setChatMessages={setChatMessages} 
        darkMode={darkMode} 
      />
    </Container>
  );
}
import React from "react";
import { Mail, AlertCircle, Clock, Star } from "lucide-react";

const EmailWidget = ({ emails, darkMode }) => {
  const unreadCount = emails.filter(email => !email.read).length;
  const priorityCount = emails.filter(email => email.priority).length;
  const latestEmail = emails[0];

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
        display: "flex",
        alignItems: "center",
      }}>
        <Mail style={{ marginRight: "10px" }} /> Email Summary
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" }}>
        <IndicatorBox 
          title="Unread Emails" 
          value={unreadCount} 
          icon={Mail} 
          color="#3B82F6"
        />
        <IndicatorBox 
          title="Priority Emails" 
          value={priorityCount} 
          icon={AlertCircle} 
          color="#EF4444"
        />
        <IndicatorBox 
          title="Latest Email" 
          value={latestEmail.timestamp} 
          icon={Clock} 
          color="#10B981"
        />
      </div>
      <div style={{
        backgroundColor: darkMode ? "#374151" : "#F3F4F6",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "20px",
      }}>
        <h3 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "5px" }}>Latest Email Preview</h3>
        <p style={{ fontSize: "0.875rem", color: darkMode ? "#D1D5DB" : "#4B5563" }}>
          <strong>{latestEmail.sender}:</strong> {latestEmail.subject}
        </p>
        <p style={{ fontSize: "0.875rem", color: darkMode ? "#9CA3AF" : "#6B7280", marginTop: "5px" }}>
          {latestEmail.preview}
        </p>
      </div>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {emails.map((email) => (
          <div key={email.id} style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderBottom: `1px solid ${darkMode ? "#4B5563" : "#E5E7EB"}`,
          }}>
            {email.priority && <Star size={16} style={{ marginRight: "10px", color: "#F59E0B" }} />}
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontWeight: "bold", color: darkMode ? "white" : "black" }}>{email.sender}</div>
              <div style={{ fontSize: "0.875rem", color: darkMode ? "#D1D5DB" : "#4B5563" }}>{email.subject}</div>
            </div>
            <div style={{ 
              fontSize: "0.75rem", 
              color: darkMode ? "#6B7280" : "#9CA3AF",
              marginLeft: "10px",
            }}>{email.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailWidget;
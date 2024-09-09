import React from "react";
import { Mail } from "lucide-react";

const EmailWidget = ({ emails, darkMode }) => (
  <div style={{
    backgroundColor: darkMode ? "#1F2937" : "white",
    borderRadius: "0.5rem",
    padding: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  }}>
    <h2 style={{
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
    }}>
      <Mail style={{ marginRight: "10px" }} /> Recent Emails
    </h2>
    <div style={{ height: "400px", overflowY: "auto" }}>
      {emails.map((email) => (
        <div key={email.id} style={{
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: darkMode ? "#374151" : "#F3F4F6",
          borderRadius: "0.25rem",
        }}>
          <div style={{ fontWeight: "bold" }}>{email.sender}</div>
          <div style={{ fontSize: "0.875rem", color: "#3B82F6" }}>{email.subject}</div>
          <div style={{
            fontSize: "0.75rem",
            color: darkMode ? "#9CA3AF" : "#6B7280",
            marginTop: "5px",
          }}>{email.preview}</div>
          <div style={{
            fontSize: "0.75rem",
            color: darkMode ? "#6B7280" : "#9CA3AF",
            marginTop: "5px",
          }}>{email.timestamp}</div>
        </div>
      ))}
    </div>
  </div>
);

export default EmailWidget;
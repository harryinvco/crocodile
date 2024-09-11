import React, { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { DragHandle } from "./StyledComponents";

const Chatbot = ({ chatMessages, setChatMessages, darkMode }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { role: "user", content: inputMessage },
      ]);
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { role: "system", content: "I understand. How else can I help you?" },
        ]);
      }, 1000);
      setInputMessage("");
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: darkMode ? "#1F2937" : "white",
            borderRadius: "0.5rem",
            padding: "20px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            width: "300px",
            maxHeight: "500px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>AI Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
                color: darkMode ? "white" : "black",
              }}
            >
              ×
            </button>
          </div>
          <div style={{ height: "300px", overflowY: "auto", marginBottom: "10px" }}>
            {chatMessages.map((msg, index) => (
              <div key={index} style={{
                padding: "10px",
                borderRadius: "0.25rem",
                marginBottom: "5px",
                backgroundColor: msg.role === "user" ? "#DBEAFE" : darkMode ? "#374151" : "#F3F4F6",
                color: msg.role === "user" ? "#1E40AF" : darkMode ? "white" : "black",
                marginLeft: msg.role === "user" ? "20px" : "0",
                marginRight: msg.role === "system" ? "20px" : "0",
              }}>{msg.content}</div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flexGrow: 1,
                padding: "5px",
                marginRight: "10px",
                backgroundColor: darkMode ? "#374151" : "white",
                color: darkMode ? "white" : "black",
                border: "1px solid #D1D5DB",
                borderRadius: "0.25rem",
              }}
            />
            <button onClick={handleSendMessage} style={{
              padding: "5px 10px",
              backgroundColor: "#2563EB",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
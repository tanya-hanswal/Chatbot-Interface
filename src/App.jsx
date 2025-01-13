/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./App.css";
import { IoArrowUp } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("you must write something");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    const genAI = new GoogleGenerativeAI(
      "API_Key"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];
    setMessages(newMessages); //append new messages to the existing ones
    setMessage(""); //clear the input field after sending the message
    console.log(result.response.text());
  };

  const newChat = () => {
    setMessages([]);
  };

  return (
    <>
      <div className="container">
        <div className="chatbot-popup">
          {/*  */}
          <div className="chat-header">
            <div className="header-info">
              <h2 className="logo-text">Chatbot</h2>
              <button onClick={newChat} id="newChatBtn" className="new-chat  ">
                New Chat
              </button>
            </div>
          </div>
          {/* body */}
          <div className="chat-body">
            <div className="messages message user-message">
              {messages?.map((msg, index) => {
                return (
                  <div key={index} className={msg.type}>
                    {msg.text}
                  </div>
                );
              })}
            </div>
          </div>
          {/* footer */}
          <div className="chat-footer">
            <div className="chat-form">
              <input
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
                type="text"
                className="message-input"
                placeholder="message"
              />
              <button>
                <IoArrowUp onClick={hitRequest} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

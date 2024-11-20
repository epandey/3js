import React, { useState } from "react";

// Q&A Data
// Q&A Data
const QnAData = [
  // Work Questions
  {
    question: "What inspired you to become a developer?",
    answer:
      "The joy of solving complex problems and building solutions that impact users' lives inspired me to become a developer.",
  },
  {
    question: "What’s your favorite tech stack to work with?",
    answer:
      "I love working with React, Node.js, and MySQL. This combination allows me to create efficient, scalable, and user-friendly applications.",
  },
  {
    question: "How do you stay updated with new technologies?",
    answer:
      "I read tech blogs, follow industry leaders on social media, and participate in online coding challenges to stay updated.",
  },
  {
    question: "What’s one challenging project you worked on?",
    answer:
      "Developing a privacy-focused AI model for a mental health app was both challenging and rewarding. It required balancing user data security with AI accuracy.",
  },
  {
    question: "If you weren’t a developer, what would you be?",
    answer:
      "Probably a designer! I have a deep appreciation for aesthetics and would love to create visually appealing experiences.",
  },

  // Fun Questions
  {
    question: "What’s your favorite movie or TV series?",
    answer:
      "I love watching 'Breaking Bad' and 'Interstellar.' They're a perfect mix of suspense, science, and great storytelling.",
  },
  {
    question: "If you could have any superpower, what would it be?",
    answer:
      "Teleportation! It would make traveling to new places so much easier and exciting.",
  },
  {
    question: "What’s your go-to snack while coding?",
    answer:
      "Definitely coffee and a pack of dark chocolate. Keeps me energized during long coding sessions!",
  },
  {
    question: "What’s the most adventurous thing you’ve done?",
    answer:
      "Skydiving from 10,000 feet! It was terrifying but exhilarating at the same time.",
  },
  {
    question: "If you could live anywhere in the world, where would it be?",
    answer:
      "Somewhere peaceful, like the Swiss Alps. The serenity and natural beauty are unmatched.",
  },
];

const ChatBot = ({ onClose }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [visibleAnswers, setVisibleAnswers] = useState([]); // Track visible answers

  const handleQuestionClick = (question) => {
    const selectedQnA = QnAData.find((qna) => qna.question === question);
    if (selectedQnA) {
      setChatHistory((prev) => [
        ...prev,
        { type: "user", text: question },
        { type: "bot", text: selectedQnA.answer },
      ]);
      setVisibleAnswers((prev) => [...prev, selectedQnA.answer]); // Add to visible answers
    }
  };

  const handleCloseAnswer = (answer) => {
    setVisibleAnswers((prev) => prev.filter((a) => a !== answer)); // Remove answer from visible list
  };
  const handleDeleteMessage = (index) => {
    setChatHistory((prev) => prev.filter((_, i) => i !== index));
  };
  

  const handleSend = () => {
    if (input.trim()) {
      // Add user's message to chat history
      setChatHistory((prev) => [
        ...prev,
        { type: "user", text: input },
      ]);
  
      // Simulated backend response
      const simulateBackendResponse = (userInput) => {
        // Define predefined answers
        const predefinedAnswers = {
          "What inspired you to become a developer?":
            "The joy of solving complex problems and building solutions that impact users' lives.",
          "What’s your favorite tech stack to work with?":
            "React, Node.js, and MySQL are my favorites.",
          "How do you stay updated with new technologies?":
            "I read tech blogs, follow industry leaders, and participate in online coding challenges.",
        };
  
        // Match user input to predefined answers or return a default message
        return (
          predefinedAnswers[userInput] ||
          "Sorry, I can only answer predefined questions at the moment."
        );
      };
  
      // Get the simulated response
      const response = simulateBackendResponse(input);
  
      // Add bot's response to chat history
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", text: response },
      ]);
  
      // Clear input field
      setInput("");
    }
  };
  

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "350px",
        height: "500px",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#0078D4",
          color: "white",
          padding: "10px",
          fontWeight: "bold",
          textAlign: "center",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        Ask Ekta Bot
      </div>
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
        }}
      >
  

        {/* Display Visible Answers */}
        {visibleAnswers.map((answer, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span style={{ flex: 1, marginRight: "10px" }}>{answer}</span>
            <button
              onClick={() => handleCloseAnswer(answer)}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                cursor: "pointer",
                textAlign: "center",
                lineHeight: "25px",
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, marginBottom: "10px" }}>
          {QnAData.map((qna, index) => (
            <li
              key={index}
              onClick={() => handleQuestionClick(qna.question)}
              style={{
                cursor: "pointer",
                margin: "5px 0",
                textDecoration: "underline",
                color: "#0078D4",
              }}
            >
              {qna.question}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: "5px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "8px 12px",
              backgroundColor: "#0078D4",
              color: "white",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ✖
      </button>
    </div>
  );
};


export default ChatBot;

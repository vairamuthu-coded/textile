import React, { useState } from "react";
import axios from "axios";

const AI_API = "http://localhost:5271/api/AIChat";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await axios.post(AI_API, {
        message: message,
      });

      setAnswer(response.data.answer);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "AI request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "30px auto" }}>
      <h2>Local AI Chat</h2>

      <textarea rows={4} style={{ width: "100%" }} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="உங்கள் கேள்வியை உள்ளிடுங்கள்..." />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "AI பதில் வருகிறது..." : "Send"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {answer && (
        <div>
          <h3>AI Answer</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

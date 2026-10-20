import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5271/api/AIChat";

const AdminDashboard = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sql, setSql] = useState("");
  const [data, setData] = useState([]);
  const [tables, setTables] = useState([]);
  const [count, setCount] = useState(null);
  const [database, setDatabase] = useState("");
  const [table, setTable] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askAI = async () => {
    const userQuestion = question.trim();

    if (!userQuestion || loading) return;

    setLoading(true);
    setError("");
    setAnswer("");
    setSql("");
    setData([]);
    setTables([]);
    setCount(null);
    setDatabase("");
    setTable("");
    setType("");

    try {
      const res = await axios.post(API_URL, {
        question: userQuestion,
      });

      const result = res.data ?? {};

      setAnswer(result.answer ?? "No answer received.");
      setSql(result.sql ?? "");
      setCount(result.count ?? null);
      setDatabase(result.database ?? "");
      setTable(result.table ?? "");
      setType(result.type ?? "chat");

      // Updated controller returns rows, not data.
      setData(Array.isArray(result.rows) ? result.rows : Array.isArray(result.data) ? result.data : []);

      // Handle the List Tables API response.
      setTables(Array.isArray(result.tables) ? result.tables : []);
    } catch (err) {
      const errorMessage = err.response?.data?.answer || err.response?.data?.message || err.message || "Unable to fetch data.";

      setError(errorMessage);
      console.error("AI Chat API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Automatically create columns from query results.
  const columns = data.length > 0 && typeof data[0] === "object" && data[0] !== null ? Object.keys(data[0]) : data.length > 0 ? ["Value"] : [];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "30px auto",
        padding: 15,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>AI Database Assistant</h2>

      <textarea
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        placeholder="Ask anything, or try: List all tables"
        style={{
          width: "100%",
          padding: 10,
          boxSizing: "border-box",
          fontSize: 15,
          resize: "vertical",
        }}
      />

      <button
        type="button"
        onClick={askAI}
        className="col-2 bg-danger right"
        disabled={loading || !question.trim()}
        style={{
          marginTop: 10,
          padding: "8px 20px",
          cursor: loading ? "wait" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Ask AI"}
      </button>

      {error && (
        <div
          style={{
            marginTop: 15,
            padding: 10,
            color: "#b00020",
            backgroundColor: "#fff0f0",
            borderRadius: 5,
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {answer && (
        <div style={{ marginTop: 20 }}>
          <h3>Answer</h3>
          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
            }}
          >
            {answer}
          </div>

          {type && <small style={{ color: "#666" }}>Response type: {type}</small>}
        </div>
      )}

      {database && (
        <p>
          <strong>Database:</strong> {database}
        </p>
      )}

      {table && (
        <p>
          <strong>Table:</strong> {table}
        </p>
      )}

      {count !== null && (
        <p>
          <strong>Count:</strong> {count}
        </p>
      )}

      {sql && (
        <details style={{ margin: "15px 0" }}>
          <summary style={{ cursor: "pointer" }}>View SQL Query</summary>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              overflowX: "auto",
              padding: 12,
              backgroundColor: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: 5,
            }}
          >
            {sql}
          </pre>
        </details>
      )}

      {/* Display database table names */}
      {tables.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Database Tables ({tables.length})</h3>

          <table
            border="1"
            cellPadding="8"
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>Table Name</th>
              </tr>
            </thead>

            <tbody>
              {tables.map((tableName, index) => (
                <tr key={`${tableName}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{tableName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display SQL query result rows */}
      {data.length > 0 && (
        <div style={{ overflowX: "auto", marginTop: 20 }}>
          <h3>Query Results ({data.length} rows)</h3>

          <table
            border="1"
            cellPadding="8"
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>S.No</th>

                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  {columns.map((column) => {
                    const value = typeof row === "object" && row !== null ? row[column] : row;

                    return <td key={column}>{value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && answer && data.length === 0 && tables.length === 0 && !count && <p style={{ color: "#666" }}>No table rows to display. This may be a normal AI chat response.</p>}

      {loading && <p style={{ color: "#555" }}>AI is processing your question. Please wait...</p>}
    </div>
  );
};

export default AdminDashboard;

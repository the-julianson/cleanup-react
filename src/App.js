import React from "react";
import { quotes } from "./quotes";

function fetchQuote(id) {
  const delay = 1000 + Math.floor(Math.random() * 3000);
  console.log(`⏳ Fetching quote #${id} with delay ${delay}ms`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quotes[id % quotes.length]);
    }, delay);
  });
}

export default function App() {
  const [quote, setQuote] = React.useState(null);
  const [id, setId] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [useCleanup, setUseCleanup] = React.useState(true);

  React.useEffect(() => {
    let ignore = false;

    const getQuote = async () => {
      console.log(`⏳ Start fetching quote #${id}`);
      setLoading(true);
      const result = await fetchQuote(id);

      if (useCleanup && ignore) {
        console.log(`❌ Cleanup: Skipping stale quote #${id}`);
        return;
      }

      console.log(`✅ Fetched quote #${id} and setting it`);
      setQuote(result);
      setLoading(false);
    };

    getQuote();

    if (useCleanup) {
      return () => {
        ignore = true;
      };
    }
  }, [id, useCleanup]);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}>
      <h1>🧠 Quote Fetcher</h1>
      <p>
        This demo shows how <strong>cleanup in useEffect</strong> helps prevent async race conditions.
      </p>

      <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "2rem" }}>
        {loading ? (
          <>
          <p style={{ fontSize: "1.2rem" }}>⏳ Loading quote...</p>
          <p>Patience is a virtue</p>
          </>
        ) : quote ? (
          <>
            <p style={{ fontSize: "1.2rem" }}>"{quote.text}"</p>
            <p style={{ color: "#555" }}>— {quote.author} -- #ID: {id}</p>
          </>
        ) : (
          <>
            <p style={{ fontSize: "1.2rem" }}>No quote yet</p>
            <p>Noooooo</p>
          </>
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => setId((prev) => prev === quotes.length - 1 ? 0 : prev + 1)}
          style={{
            padding: "0.5rem 1rem",
            margin: "0.5rem",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "4px"
          }}
        >
          ➡ Next Quote
        </button>

        <button
          onClick={() => setUseCleanup((prev) => !prev)}
          style={{
            padding: "0.5rem 1rem",
            margin: "0.5rem",
            backgroundColor: useCleanup ? "#16a34a" : "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Cleanup is {useCleanup ? "ON ✅" : "OFF ❌"}
        </button>
      </div>
    </div>
  );
}
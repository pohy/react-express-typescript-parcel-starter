import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const [count, setCount] = useState(0);
  const [healthStatus, setHealthStatus] = useState<any | null>(null);
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((resJson) => setHealthStatus(resJson));
  }, [setHealthStatus]);
  return (
    <>
      <h1>App hello</h1>
      <div>
        <h2>React interactive</h2>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
      </div>
      <div>Count: {count}</div>
      <div>
        <h2>API Response</h2>
        {healthStatus ? (
          <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}

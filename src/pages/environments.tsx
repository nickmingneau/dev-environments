import React, { useEffect, useState } from "react";
import axios from "axios";

interface IEnvironment {
  id: string;
  name: string;
  branch: string;
  database: string;
  publicUrl: string;
  state: string;
}

const EnvironmentList = () => {
  const [environments, setEnvironments] = useState<IEnvironment[]>([]);

  useEffect(() => {
    const fetchEnvironments = async () => {
      const response = await axios.get("/api/environments");
      setEnvironments(response.data);
    };

    fetchEnvironments();

    const eventSource = new EventSource("/api/environments/subscribe");
    eventSource.onmessage = (event) => {
      console.log("onmessage", event.data);
      setEnvironments(JSON.parse(event.data));
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleClose = async (id: string) => {
    if (confirm("Are you sure you want to close this environment?")) {
      await axios.post(`/api/environments/close?id=${id}`);
      // No need to manually update the state here as it will be updated by SSE
    }
  };

  return (
    <div>
      <h1>Environments</h1>
      <ul>
        {environments.map((env) => (
          <li key={env.id}>
            {env.name} - {env.state}
            {env.state === "available" && (
              <button onClick={() => handleClose(env.id)}>Close</button>
            )}
            {env.state === "available" && (
              <a href={env.publicUrl} target="_blank" rel="noopener noreferrer">
                Go to Environment
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnvironmentList;

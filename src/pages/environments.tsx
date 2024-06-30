import React, { useEffect, useState } from "react";
import axios from "axios";

const cellStyles = { border: "1px solid #ddd", padding: "8px" };

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
      setEnvironments(JSON.parse(event.data));
    };

    eventSource.onerror = (error) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleClose = async (id: string) => {
    if (confirm("Are you sure you want to close this environment?")) {
      await axios.post(`/api/environments/close?id=${id}`);
    }
  };

  return (
    <div>
      <h1>Environments</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th style={cellStyles}>Name</th>
            <th style={cellStyles}>Branch</th>
            <th style={cellStyles}>Database</th>
            <th style={cellStyles}>State</th>
            <th style={cellStyles}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {environments.map((env) => (
            <tr key={env.id}>
              <td style={cellStyles}>{env.name}</td>
              <td style={cellStyles}>{env.branch}</td>
              <td style={cellStyles}>{env.database}</td>
              <td style={cellStyles}>
                <b>{env.state}</b>
              </td>
              <td style={cellStyles}>
                {env.state === "available" && (
                  <>
                    <button
                      style={{
                        marginRight: "10px",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClose(env.id)}
                    >
                      Close
                    </button>
                    <a
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        padding: "5px 10px",
                      }}
                      href={env.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to Environment
                    </a>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnvironmentList;

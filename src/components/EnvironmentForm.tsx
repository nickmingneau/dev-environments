import React, { useState, useEffect } from "react";
import axios from "axios";
import { IEnvironment } from "../types";

const branches = ["main", "dev", "feature-x", "bugfix-y"];

const rowStyles = {
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const createEnvStyles = {
  border: "1px solid grey",
  borderRadius: "4px",
  padding: "8px",
  cursor: "pointer",
  backgroundColor: "rgb(219 219 219)",
  marginTop: "15Px",
};

const EnvironmentForm: React.FC<{ onSuccess: () => void }> = ({
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [database, setDatabase] = useState("");
  const [usedBranches, setUsedBranches] = useState<string[]>([]);

  useEffect(() => {
    axios.get<IEnvironment[]>("/api/environments").then((response) => {
      const used = response.data.map((env) => env.branch);
      setUsedBranches(used);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEnvironment: IEnvironment = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      branch,
      database,
      publicUrl: "",
      state: "pending",
    };

    await axios.post("/api/environments", newEnvironment);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={rowStyles}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div style={rowStyles}>
        <label>Branch:</label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a branch
          </option>
          {branches
            .filter((b) => !usedBranches.includes(b))
            .map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
        </select>
      </div>
      <div style={rowStyles}>
        <label>Database:</label>
        <input
          type="text"
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={createEnvStyles}>
        Create Environment
      </button>
    </form>
  );
};

export default EnvironmentForm;

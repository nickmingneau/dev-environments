import React, { useState, useEffect } from "react";
import axios from "axios";
import { IEnvironment } from "../types";

const branches = ["main", "dev", "feature-x", "bugfix-y"];

const EnvironmentForm: React.FC<{ onSuccess: () => void }> = ({
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [database, setDatabase] = useState("");
  const [usedBranches, setUsedBranches] = useState<string[]>([]);

  useEffect(() => {
    // Fetch existing environments to determine used branches
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
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
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
      <div>
        <label>Database:</label>
        <input
          type="text"
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Environment</button>
    </form>
  );
};

export default EnvironmentForm;

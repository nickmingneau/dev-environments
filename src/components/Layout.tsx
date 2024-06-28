import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout: React.FC = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;

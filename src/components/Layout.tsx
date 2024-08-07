import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main
          style={{
            flexGrow: 1,
            padding: "20px 20px 20px 30px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav style={{ paddingLeft: "10px" }}>
      <Link href="/">Home</Link>
      <Link href="/environments">Environments</Link>
      <Link href="/create">Create Environment</Link>
    </nav>
  );
};

export default Navbar;

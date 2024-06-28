import React from "react";

const pStyles = {
  padding: "0px 15px",
};

const Sidebar: React.FC = () => {
  return (
    <aside style={{ backgroundColor: "#dbdbdb", maxWidth: "300px" }}>
      <p style={pStyles}>About Me</p>
      <p style={pStyles}>Created by Nick Mingneau</p>
      <p style={pStyles}>
        I am a Senior Frontend Developer with ten years of experience. My main
        focus is Javascript and its ever changing frameworks and libraries. I’m
        always interested in learning about companies with a Javascript or
        Typescript oriented environment. At the moment I’m also open to
        positions as Full-Stack Developer.
      </p>
    </aside>
  );
};

export default Sidebar;

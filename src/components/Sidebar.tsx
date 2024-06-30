import React from "react";

const pStyles = {
  padding: "0px 15px",
};

const asideStyles = {
  backgroundColor: "#dbdbdb",
  maxWidth: "300px",
  padding: "10px",
};

const contactStyles = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0px 15px",
  marginBottom: "5px",
  marginTop: "5px",
};

const Sidebar: React.FC = () => {
  return (
    <aside style={asideStyles}>
      <p style={pStyles}>
        <b>About me</b>
      </p>
      <p style={pStyles}>Nick Mingneau</p>
      <p style={pStyles}>
        I am a Senior Frontend Developer with ten years of experience. My main
        focus is Javascript and its ever changing frameworks and libraries. I’m
        always interested in learning about companies with a Javascript or
        Typescript oriented environment. At the moment I’m also open to
        positions as Full-Stack Developer.
      </p>
      <p style={pStyles}>
        <b>Studies</b>
      </p>
      <p style={pStyles}>
        Master degree in Game and Interactive Media Design from Hogeschool PXL
        Hasselt.
      </p>
      <p style={pStyles}>
        <b>Contact</b>
      </p>
      <p style={{ ...pStyles, ...contactStyles }}>
        <span>TEL:</span>
        <span style={{ marginLeft: "auto" }}>+32 494 94 55 36</span>
      </p>
      <p style={{ ...pStyles, ...contactStyles }}>
        <span>MAIL: </span>
        <span>nickmingneau@icloud.com</span>
      </p>
      <br />
    </aside>
  );
};

export default Sidebar;

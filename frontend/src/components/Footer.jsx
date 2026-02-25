import React from "react";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#82dfb5", 
        color: "white",
        textAlign: "center",
        padding: "12px 0",
        marginTop: "auto",
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} CleanCity360. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;

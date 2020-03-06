import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div>
          <h3>Contact me</h3>
          <p>janne.mulari@gmail.com</p>
          <a className="link" href="https://janne.mulari.com">
            www.jannemulari.com
          </a>
        </div>
        <div>
          <p>Made by Janne Mulari</p>
          <p
            className="link"
            style={{ cursor: "pointer" }}
            onClick={() => {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            Go to top
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

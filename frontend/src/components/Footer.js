import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div>
          <h3>Contact me</h3>
          <p>janne.mulari@gmail.com</p>
          <a
            className="link"
            href="https://jannemulari.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.jannemulari.com
          </a>
        </div>
        <div>
          <span>
            <a
              className="link"
              href="https://www.linkedin.com/in/jannemulari/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a
              className="link"
              href="https://github.com/solidistic"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github fa-2x"></i>
            </a>
          </span>
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
      <p className="footer__version-number">version 1.01</p>
    </div>
  );
};

export default Footer;

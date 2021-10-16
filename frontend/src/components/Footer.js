import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div>
          <h3>Contact me</h3>
          <p>janne.mulari@gmail.com</p>
          <a className="link" href="https://jannemulari.com">
            www.jannemulari.com
          </a>
        </div>
        <div>
          <span>
            <a className="link" href="https://www.linkedin.com/in/jannemulari/">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a className="link" href="https://github.com/solidistic">
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
    </div>
  );
};

export default Footer;

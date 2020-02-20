import React, { useState, useEffect } from "react";

const PasswordValidator = ({ password, repeatedPassword }) => {
  const [message, setMessage] = useState("");
  const [barLength, setBarLength] = useState(1);
  const [security, setSecurity] = useState({
    level: 0,
    digit: false,
    upperCase: false,
    lowerCase: false,
    specialChar: false,
    long: false
  });

  // check how secure password is
  useEffect(() => {
    if (!password) return;

    // any digit
    if (!security.digit && password.search(/\d/) !== -1) {
      setSecurity({
        ...security,
        level: security.level + 1,
        digit: true
      });
    } else if (security.digit && password.search(/\d/) === -1) {
      setSecurity({
        ...security,
        level: security.level - 1,
        digit: false
      });
    }

    // lower case letter
    if (!security.lowerCase && password.search(/[a-z]/) !== -1) {
      setSecurity({
        ...security,
        level: security.level + 1,
        lowerCase: true
      });
    } else if (security.lowerCase && password.search(/[a-z]/) === -1) {
      setSecurity({
        ...security,
        level: security.level - 1,
        lowerCase: false
      });
    }
    // upper case letter
    if (!security.upperCase && password.search(/[A-Z]/) !== -1) {
      setSecurity({
        ...security,
        level: security.level + 1,
        upperCase: true
      });
    } else if (security.upperCase && password.search(/[A-Z]/) === -1) {
      setSecurity({
        ...security,
        level: security.level - 1,
        upperCase: false
      });
    }

    // special char
    if (!security.specialChar && password.search(/\W+/) !== -1) {
      setSecurity({
        ...security,
        level: security.level + 1,
        specialChar: true
      });
    } else if (security.specialChar && password.search(/\W+/) === -1) {
      setSecurity({
        ...security,
        level: security.level - 1,
        specialChar: false
      });
    }

    // long pass
    if (!security.long && password.length >= 12) {
      setSecurity({
        ...security,
        level: security.level + 1,
        long: true
      });
    } else if (security.long && password.length < 12) {
      setSecurity({
        ...security,
        level: security.level - 1,
        long: false
      });
    }
  }, [password, security]);

  useEffect(() => {
    if (password && password.length < 6) setMessage("Password is too short");
    else if (password && password.length >= 6) {
      if (password !== repeatedPassword) setMessage("Passwords doesn't match");
      else if (password === repeatedPassword) setMessage("Passwords match");
    }
  }, [password, repeatedPassword]);

  useEffect(() => {
    console.log("SecureLevel", security);
    setBarLength(security.level * 100);
  }, [security]);

  useEffect(() => {
    console.log(barLength);
  }, [barLength]);

  if (!password) return null;
  return (
    <div>
      <div className="validator">
        <p>Your password must fullfill atleast three (3) of the requirements</p>
        <p>{message}</p>
        <ul>
          <li
            className={security.digit ? "validator__message--fulfilled" : ""}
          >
            Atleast one digit
          </li>
          <li
            className={
              security.lowerCase ? "validator__message--fulfilled" : ""
            }
          >
            Atleast one lowercase letter
          </li>
          <li
            className={
              security.upperCase ? "validator__message--fulfilled" : ""
            }
          >
            Atleast one uppercase letter
          </li>
          <li
            className={
              security.specialChar ? "validator__message--fulfilled" : ""
            }
          >
            Atleast one special character
          </li>
          <li
            className={security.long ? "validator__message--fulfilled" : ""}
          >
            12 or more characters
          </li>
        </ul>
        <div className="validator__background">
          <div className="validator__bar" style={{ width: barLength, }}></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PasswordValidator);

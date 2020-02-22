import React, { useState, useEffect } from "react";

const PasswordValidator = ({ password, repeatedPassword, passwordsMatch }) => {
  const [message, setMessage] = useState({ type: null, text: "" });
  const [barLength, setBarLength] = useState(1);
  const [security, setSecurity] = useState({
    level: 0,
    digit: { found: false, regex: /\d/ },
    upperCase: { found: false, regex: /[A-Z]/ },
    lowerCase: { found: false, regex: /[a-z]/ },
    specialChar: { found: false, regex: /\W+/ },
    long: { found: false, req: 12 }
  });

  // check how secure password is
  useEffect(() => {
    if (!password) return;

    for (let [key, value] of Object.entries(security)) {
      console.log(key, value);
      if (key === "level") continue;

      if (key === "long") {
        console.log("checking for pw length");
        return () => {
          if (!value.found && password.length >= 12) {
            console.log("pw length GREATER than 12");
            return setSecurity({
              ...security,
              level: security.level + 1,
              [key]: { ...security[key], found: true }
            });
          } else if (value.found && password.length < 12) {
            console.log("pw length LESS than 12");
            return setSecurity({
              ...security,
              level: security.level - 1,
              [key]: { ...security[key], found: false }
            });
          }
        };
      }

      if (!value.found && password.search(value.regex) !== -1) {
        setSecurity({
          ...security,
          level: security.level + 1,
          [key]: { ...security[key], found: true }
        });
      } else if (value.found && password.search(value.regex) === -1) {
        setSecurity({
          ...security,
          level: security.level - 1,
          [key]: { ...security[key], found: false }
        });
      }
    }
  }, [password, security]);

  useEffect(() => {
    if (password && password.length < 6) {
      setMessage({ type: "error", text: "Password is too short" });
    } else if (password && password.length >= 6) {
      if (password !== repeatedPassword) {
        setMessage({ type: "error", text: "Passwords doesn't match" });
        passwordsMatch(false);
      } else if (password === repeatedPassword) {
        setMessage({ type: "success", text: "Passwords match" });
        if (security.level >= 3) passwordsMatch(true);
      }
    }
  }, [password, repeatedPassword, passwordsMatch, security.level]);

  useEffect(() => {
    setBarLength((security.level / 5) * 100);
  }, [security]);

  if (!password) return null;
  return (
    <div>
      <div className="validator">
        <p
          className={
            message.type === "error" ? "message__error" : "message__success"
          }
        >
          {message.text}
        </p>
        <ul>
          <li
            className={
              security.digit.found ? "validator__message--fulfilled" : ""
            }
          >
            Atleast one digit
          </li>
          <li
            className={
              security.lowerCase.found ? "validator__message--fulfilled" : ""
            }
          >
            Atleast one lowercase letter
          </li>
          <li
            className={
              security.upperCase.found ? "validator__message--fulfilled" : ""
            }
          >
            Atleast one uppercase letter
          </li>
          <li
            className={
              security.specialChar.found ? "validator__message--fulfilled" : ""
            }
          >
            Atleast one special character
          </li>
          <li
            className={
              security.long.found ? "validator__message--fulfilled" : ""
            }
          >
            12 or more characters
          </li>
        </ul>
        <div className="validator__background">
          <div
            className={
              message.type === "error"
                ? "validator__bar validator__bar--low"
                : "validator__bar validator__bar--high"
            }
            style={{ width: `${barLength}%` }}
          ></div>
        </div>
        <p>Your password must fullfill atleast three (3) of the requirements</p>
      </div>
    </div>
  );
};

export default React.memo(PasswordValidator);

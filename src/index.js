import React from "react";
import * as serviceWorker from "./serviceWorker";
import ReactDOM from "react-dom";
import "./index.scss";
import BlogApp from "./components/BlogApp";

/* TODO:
  - Kommentit blogi postauksille
  - Tyylittely
  - Production (heroku?)
  - Kun tili poistetaan, poistuu myös sen kirjoittamat postaukset
*/

ReactDOM.render(<BlogApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

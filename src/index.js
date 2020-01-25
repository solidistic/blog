import React from "react";
import * as serviceWorker from "./serviceWorker";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import BlogApp from "./components/BlogApp";

/* TODO:
  - Siirrä focus lisättyyn kommenttiin kun se lisätään
  - Tyylittely
  - Production (heroku?)
  - Cookie parser signaus kaikkiin evästeisiin, HTTPS tarvitaan?
  - Muuta komponentit, jotka tarvitsevat dataa ennen renderöintä, class komponenteiksi
*/

ReactDOM.render(<BlogApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

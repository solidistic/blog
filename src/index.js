import React from "react";
import * as serviceWorker from "./serviceWorker";
import ReactDOM from "react-dom";
import "./index.scss";
import BlogApp from "./components/BlogApp";

/* TODO:
  - Siirrä focus lisättyyn kommenttiin kun se lisätään
  - Tyylittely
  - Production (heroku?)
  - Kun tili poistetaan, poistuu myös sen kirjoittamat postaukset ---- TÄMÄ VIELÄ CONTEXTIIN
  - Cookie parser signaus kaikkiin evästeisiin, HTTPS tarvitaan?
  - Muuta komponentit, jotka tarvitsevat dataa ennen renderöintä, class komponenteiksi

  - Ensimmäinen postaus / kommentti failaa, kun lisätään tyhjään taulukkoon
    * onko ongelma axios, mongoose, dockeriin asennettu mongodb vai joku muu?
*/

ReactDOM.render(<BlogApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

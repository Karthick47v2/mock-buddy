import React from "react";
import ReactDOM from "react-dom/client";
import { VideoStream } from "./Pages/VideoStream";
import { LandingPage } from "./Pages/LandingPage";
import { Nav_Bar } from "./Components/Nav_Bar";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Nav_Bar />
    <LandingPage />
  </React.StrictMode>
);

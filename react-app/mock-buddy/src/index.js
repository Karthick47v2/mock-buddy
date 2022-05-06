import React from "react";
import ReactDOM from "react-dom/client";
import { VideoStream } from "./Pages/VideoStream";
import { LandingPage } from "./Pages/LandingPage";
import { Cam } from "./Pages/Cam";
import { Test } from "./Pages/test";
import { Nav_Bar } from "./Components/Nav_Bar";
import { Slide } from "./Components/slide";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Nav_Bar />
    <Test />
    {/* <Slide
      link={
        "https://docs.google.com/presentation/d/1hgNONfulGjvvCqmDIgv-x6AwdmFtGGGQkAxOlmfShvY/edit?usp=sharing"
      } */}
    />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { Practice} from "./Pages/practice";
import { LandingPage } from "./Pages/LandingPage";
import { Test } from "./Components/video_stream";
import { Nav_Bar } from "./Components/Nav_Bar";
import { Slide } from "./Components/slide";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Nav_Bar />
    {/* <Test /> */}
    <Practice />
    {/* <Slide
      link={
        "https://docs.google.com/presentation/d/1hgNONfulGjvvCqmDIgv-x6AwdmFtGGGQkAxOlmfShvY/edit?usp=sharing"
      } */}
  </React.StrictMode>
);

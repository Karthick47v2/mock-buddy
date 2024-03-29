import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Practice } from "./Pages/Practice";
import { Home } from "./Pages/Home";
import { Error } from "./Pages/Error";
import { HowTo } from "./Pages/HowTo";
import { Results } from "./Pages/Results";
import { SharedLayout } from "./Pages/SharedLayout";
import { ProtectedRoutes } from "./protectedRoutes";
import store from "./store";
import "./CSS/main.min.css";
import "./CSS/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path="practice" element={<Practice />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="practice/results" element={<Results />} />
              </Route>
              <Route path="how-to" element={<HowTo />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

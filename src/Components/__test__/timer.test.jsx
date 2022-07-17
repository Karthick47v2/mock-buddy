import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/index";
import { Timer } from "../timer";

describe("Test timer functionality", () => {
  test("Time should be in 2 digits", () => {
    render(
      <Provider store={store}>
        <Timer />
      </Provider>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("00 : 00");
  });

  // time validation check moved to Practice.test.jsx
});

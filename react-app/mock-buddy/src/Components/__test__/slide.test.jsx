import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/index";
import { Slide } from "../slide";

describe("Test Slides and modal components", () => {
  test("Modal should popup at fresh start of Google slides", () => {
    render(
      <Provider store={store}>
        <Slide />
      </Provider>
    );
    expect(screen.getByTestId("insert-link")).toBeInTheDocument();
  });
});

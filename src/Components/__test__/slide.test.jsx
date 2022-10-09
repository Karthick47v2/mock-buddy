import React from "react";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/index";
import { Slide } from "../slide";

const setup = () => {
  render(
    <Provider store={store}>
      <Slide />
    </Provider>
  );
  return screen.getByRole("textbox");
};

describe("Test Slides and modal components", () => {
  test("Modal should popup at fresh start of Google slides", () => {
    setup();
    expect(screen.getByTestId("insert-link")).toBeInTheDocument();
  });
});

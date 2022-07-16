import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/index";
import { ModalPopup } from "../modalPopup";

// according to eslint rules
const setup = () => {
  render(
    <Provider store={store}>
      <ModalPopup />
    </Provider>
  );
};

describe("Test ModalPopup attributes", () => {
  test("Modal must be centered", () => {
    setup();
    expect(screen.queryByTestId("insert-link")).toHaveClass(
      "modal-dialog-centered"
    );
  });

  test("Modal can't be closed by key event", () => {
    setup();
    fireEvent.keyDown(screen.queryByTestId("insert-link"), {
      key: "Escape",
      code: "Escape",
      keycode: 27,
      charCode: 27,
    });
    expect(screen.getByTestId("insert-link")).toBeInTheDocument();
  });
});

describe("Test ModalPopup component", () => {
  test("Render submit form on screen", () => {
    setup();
    expect(screen.getByTestId("slide-input")).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ModalPopup } from "../modalPopup";

describe("Test ModalPopup attributes", () => {
  test("Modal must be centered", () => {
    render(<ModalPopup show={true} />);

    expect(screen.queryByTestId("insert-link")).toHaveClass(
      "modal-dialog-centered"
    );
  });
  test("Modal can't be closed by key event", () => {
    render(<ModalPopup show={true} />);

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
    render(<ModalPopup show={true} />);
    expect(screen.getByTestId("slide-input")).toBeInTheDocument();
  });
});

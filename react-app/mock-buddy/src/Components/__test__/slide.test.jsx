import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Slide } from "../slide";

describe("Test Slides and modal components", () => {
  test("Modal should popup at fresh start of Google slides", () => {
    render(<Slide />);
    expect(screen.getByTestId("insert-link")).toBeInTheDocument();
  });
});

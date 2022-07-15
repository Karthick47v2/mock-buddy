import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Timer } from "../timer";

const setup = () => {
  render(<Timer isActive={true} />);
};

describe("Test timer functionality", () => {
  test("Time should be in 2 digits", () => {
    setup();
    expect(screen.getByRole("heading")).toHaveTextContent("00 : 00");
  });

  test("Timer should display correct time", () => {
    jest.useFakeTimers();
    setup();
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByRole("heading")).toHaveTextContent("00 : 10");
    jest.useRealTimers();
  });
});

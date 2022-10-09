import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Error } from "../Error";
import store from "../../store/index";

const setup = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Error />
      </MemoryRouter>
    </Provider>
  );
};

describe("Render error page with proper info", () => {
  test("Show error", () => {
    setup();
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Oops.. Page not found"
    );
  });
  test("Show navigation", () => {
    setup();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});

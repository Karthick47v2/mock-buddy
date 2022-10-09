import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { FetchMock } from "@react-mock/fetch";
import { Home } from "../Home";
import store from "../../store/index";

const setup = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <FetchMock
          options={{
            matcher: process.env.REACT_APP_LANG_END_POINT + "init/",
            response: { status: 200 },
            method: "GET",
          }}
        >
          <Home />
        </FetchMock>
      </MemoryRouter>
    </Provider>
  );
};

describe("Render home page with proper info", () => {
  test("Show about", async () => {
    setup();
    expect(screen.getByTestId("home-head")).toHaveTextContent(
      "About Mock-Buddy"
    );
  });
  test("Show image", async () => {
    setup();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});

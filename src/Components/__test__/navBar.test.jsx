import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "../navBar";

test("Should navigate to correct path", async () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  render(
    <BrowserRouter history={history}>
      <NavBar />
    </BrowserRouter>
  );

  const links = screen.getAllByRole("link");

  expect(links[0].getAttribute("href")).toBe("/");
  expect(links[1].getAttribute("href")).toBe("/");
  expect(links[2].getAttribute("href")).toBe("/how-to");
  expect(links[3].getAttribute("href")).toBe("/practice");
});

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store/index";
import { ModalPopup } from "../modalPopup";
import { SlideInput } from "../slideInput";
import { Slide } from "../slide";

const setup = () => {
  render(
    <Provider store={store}>
      <SlideInput />
    </Provider>
  );
  return screen.getByRole("textbox");
};

const setupModal = () => {
  render(
    <Provider store={store}>
      <ModalPopup />
    </Provider>
  );
  return screen.getByRole("textbox");
};

const clickSubmit = async (txtBox, url) => {
  await userEvent.type(txtBox, url);
  const submitBtn = screen.getByRole("button");
  await userEvent.click(submitBtn);
};

describe("Test Google link input", () => {
  test("Input should be initially empty", () => {
    expect(setup().value).toBe("");
  });

  test("Should be able to type url", async () => {
    const txtBox = setup();
    await userEvent.type(txtBox, "sample");
    expect(txtBox.value).toBe("sample");
  });
});

describe("Validate user input", () => {
  let txtBox;
  beforeEach(() => {
    txtBox = setupModal();
  });
  test("Should display error on wrong format", async () => {
    await clickSubmit(txtBox, "https://docs.google.com/presentation/s");
    expect(screen.getByTestId("validator")).toHaveAttribute(
      "data-validity",
      "false"
    );

    await clickSubmit(txtBox, "https://www.google.com/presentation/s");
    expect(screen.getByTestId("validator")).toHaveAttribute(
      "data-validity",
      "false"
    );

    await clickSubmit(txtBox, "www.google.com/presentation/d/");
    expect(screen.getByTestId("validator")).toHaveAttribute(
      "data-validity",
      "false"
    );
  });
});

test("Should proceed futher on correct input format", async () => {
  render(
    <Provider store={store}>
      <Slide />
    </Provider>
  );
  await clickSubmit(
    screen.getByRole("textbox"),
    "https://docs.google.com/presentation/d/xxx"
  );
  expect(screen.getByTestId("validator")).toHaveAttribute(
    "data-validity",
    "true"
  );
});

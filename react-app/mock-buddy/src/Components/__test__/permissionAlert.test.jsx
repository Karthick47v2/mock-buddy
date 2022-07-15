import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PermissionAlert } from "../permissionAlert";

describe("Test alert attributes", () => {
  test("Alert should be in red", () => {
    render(<PermissionAlert />);
    expect(screen.getByRole("alert")).toHaveClass("alert-danger");
  });
});

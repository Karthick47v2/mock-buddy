import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AccordionMapper } from "../accordionMapper";

const setup = () => {
  const dummyMap = [
    {
      val: "2.5663",
      attr: `Visibility score: `,
      expl: `This is insights of ..`,
    },
  ];
  render(<AccordionMapper scores={dummyMap} />);
};

describe("Test AccordionMapper component renders correctly", () => {
  test("Render contents from props", () => {
    setup();
    expect(screen.getByText(/visibility score/i)).toBeInTheDocument();
    expect(screen.getByText(/insights of/i)).toBeInTheDocument();
  });

  test("Show on 2 decimal point values", () => {
    setup();
    expect(screen.queryByText(/2.5663/i)).not.toBeInTheDocument();
    expect(screen.getByText(/2.57/i)).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { ResultsAccordionMapper } from "../resultsAccordionMapper";
import { MistakesAccordionMapper } from "../mistakesAccordionMapper";

const setupResults = () => {
  const dummyMap = [
    {
      val: "3 %",
      attr: `Visibility score: `,
      expl: `This is insights of ..`,
    },
  ];
  render(<ResultsAccordionMapper scores={dummyMap} />);
};

const setupMistakes = () => {
  const dummyMap = [
    [
      {
        id: 1,
        mistake: `ERRULE:_1`,
        exp: `Spelling Error`,
        top3: ["AA", "AV"],
      },
    ],
  ];
  render(<MistakesAccordionMapper mistakes={dummyMap} />);
};

describe("Test AccordionMapper component renders correctly", () => {
  test("Render contents from props", () => {
    setupResults();
    expect(screen.getByText(/visibility score/i)).toBeInTheDocument();
    expect(screen.getByText(/insights of/i)).toBeInTheDocument();
  });

  test("Print percentage for results", () => {
    setupResults();
    expect(screen.getByText(/3 %/i)).toBeInTheDocument();
  });

  test("Print error and suggestions for errors", () => {
    setupMistakes();
    expect(screen.getByRole("heading")).toHaveTextContent("Slide 1");
  });
});

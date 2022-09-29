import React from "react";
import { Accordion } from "react-bootstrap";

/**
 * JSX component for mapping array to Accordion
 * @param {Object} props - component props
 * @param {Object} props.scores - array of dictionary of scores
 * @returns {JSX.Element} - popup modal
 */
export const ResultsAccordionMapper = (props) => {
  return (
    <Accordion className="mt-5" data-testid="accordion">
      {props.scores.map((score, idx) => (
        <Accordion.Item key={idx} eventKey={idx} className="mt-1">
          <Accordion.Header>
            {score.attr + parseFloat(score.val).toFixed(2)}
          </Accordion.Header>
          <Accordion.Body> {score.expl}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

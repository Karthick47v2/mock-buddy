import React from "react";
import { Accordion } from "react-bootstrap";
import "../CSS/accordion.css";

export const MistakesAccordionMapper = (props) => {
  return (
    <Accordion className="mt-5" data-testid="accordion">
      {props.mistakes.map((slide, idx) => (
        <Accordion.Item key={idx} eventKey={idx} className="mt-1">
          <Accordion.Header>{`Slide ${slide[0].id}`}</Accordion.Header>
          <Accordion.Body>
            {slide.map((mistake, idx) => (
              <div key={idx}>
                <ul>
                  <li style={{ color: "#e69b00" }}>{`#${idx + 1} - ${
                    mistake.exp
                  }`}</li>
                </ul>
                <p
                  style={{ color: "#aa070d" }}
                >{`Error: ${mistake.mistake}`}</p>
                <p>{`Suggestion(s): ${mistake.top3}`}</p>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

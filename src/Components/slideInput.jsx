import React from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useSelector } from "react-redux";

/**
 * JSX component for modal user input
 * @param {Object} props - component props
 * @param {() => void} props.onFormSubmit - submit form
 * @param {() => void} props.onFormChange - handle user input event
 * @returns {JSX.Element} - form
 */
export const SlideInput = (props) => {
  const errorStatus = useSelector((state) => state.slide.errorStatus);
  return (
    <Form noValidate onSubmit={props.onFormSubmit} data-testid="slide-input">
      <Form.Group className="mb-3">
        <FloatingLabel
          controlId="glink"
          label="Paste link here"
          className="text-dark"
        >
          <Form.Control
            required
            type="text"
            placeholder=""
            isInvalid={errorStatus}
            onChange={props.onFormChange}
          />
          <Form.Control.Feedback
            data-testid={"validator"}
            data-validity={!errorStatus}
            type="invalid"
          >
            Please enter a valid URL
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button variant="primary" type="submit">
        Continue
      </Button>
    </Form>
  );
};

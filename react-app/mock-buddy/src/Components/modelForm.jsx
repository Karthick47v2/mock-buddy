import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Modal_Form = (props) => {
  return (
    <div className="col text-center">
      <Form onSubmit={props.onFormSubmit}>
        <FloatingLabel label="Name" className="mb-3" controlId="floatingInput">
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={props.onFormChange}
          />
        </FloatingLabel>
        {/* <FloatingLabel label="Email" className="mb-3" controlId="floatingInput">
          <Form.Control type="email" placeholder="Enter email" />
        </FloatingLabel> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

import React, { forwardRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { SlideInput } from "./slideInput";

/**
 * JSX component for displaying popup modal
 * @param {Object} props - component props
 * @param {() => void} props.handleClose - close modal
 * @param {(gLink: string) => void} props.setGLink - set glink value
 * @param {Ref} ref - reference to container object
 * @returns {JSX.Element} - popup modal
 */
export const ModalPopup = forwardRef((props, ref) => {
  /**
   * @type {[Boolean, Function]} Error
   */
  const [error, setError] = useState(false);
  /**
   * @type {[string, Function]}
   */
  const [tempGLink, setTempGLink] = useState("");

  const handleFormChange = (e) => {
    setTempGLink(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (
      form.checkValidity() === false ||
      !tempGLink.includes("docs.google.com/presentation/d/")
    ) {
      setError(true);
      e.stopPropagation();
    } else {
      setError(false);
      props.setGLink(tempGLink);
      props.handleClose();
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      backdrop="static"
      keyboard={false}
      container={ref}
      style={{ position: "absolute", backgroundColor: "black" }}
      className="text-light"
      data-testid="insert-link"
    >
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title>Paste Google slide link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          You need a publicly shared google slide in order to continue
          'Presentation mode' or else, switch to 'Speech mode'
        </h5>
        <SlideInput
          onFormSubmit={handleFormSubmit}
          onFormChange={handleFormChange}
          formError={error}
        />
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
});

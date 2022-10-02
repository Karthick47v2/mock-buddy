import React, { forwardRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { practiceActions } from "../store/practice-slice";
import { slideActions } from "../store/slide-slice";
import { SlideInput } from "./slideInput";

/**
 * JSX component for displaying popup modal
 * @param {Ref} ref - reference to container object
 * @returns {JSX.Element} - popup modal
 */
export const ModalPopup = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.practice.showModal);
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
      dispatch(slideActions.setErrorStatus({ status: true }));
      e.stopPropagation();
    } else {
      dispatch(
        slideActions.setErrorStatus({ status: false, gLink: tempGLink })
      );
      dispatch(practiceActions.switchModalVisibility(false));
    }
  };

  return (
    <Modal
      show={showModal}
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
        <h5>You need a publicly shared google slide in order to continue</h5>
        <SlideInput
          onFormSubmit={handleFormSubmit}
          onFormChange={handleFormChange}
        />
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
});

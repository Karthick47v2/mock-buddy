import React, { forwardRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { practiceActions } from "../store/practice-slice";
import { slideActions } from "../store/slide-slice";
import { DrivePicker } from "./drivePicker";

/**
 * JSX component for displaying popup modal
 * @param {Ref} ref - reference to container object
 * @returns {JSX.Element} - popup modal
 */
export const ModalPopup = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.practice.showModal);
  /**
   * @type {[boolean, Function]}
   */
  const [isShared, setIsShared] = useState(true);

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
        <Modal.Title>Select presentation slide</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5> Make sure its publicly shared</h5>
        {!isShared && (
          <h5 style={{ color: "#aa070d" }}>
            Please select publicly shared slide
          </h5>
        )}
        <DrivePicker
          label={"Choose Slide"}
          viewId={"PRESENTATIONS"}
          callback={(data) => {
            if (data.action === "picked") {
              if (data.docs[0].isShared) {
                setIsShared(true);
                dispatch(
                  slideActions.setSlideLink({
                    gLink: data.docs[0].url,
                  })
                );
                dispatch(practiceActions.switchModalVisibility(false));
              } else {
                setIsShared(false);
              }
            }
          }}
        />
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
});

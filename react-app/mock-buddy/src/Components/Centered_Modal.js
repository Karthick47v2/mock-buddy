import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Modal_Form } from "./Modal_Form";

export const Centered_Model = (props) => {
  const [userName, setUserName] = useState("");

  const handleFormChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(userName);
    fetch("/user", {
      method: "POST",
      body: JSON.stringify({
        content: userName,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((msg) => {
        console.log(msg);
        setUserName("");
      });
    props.onHide();
  };
  return (
    <Modal
      show={props.show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">Welcome</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal_Form
          onFormSubmit={handleFormSubmit}
          onFormChange={handleFormChange}
        />
      </Modal.Body>
    </Modal>
  );
};

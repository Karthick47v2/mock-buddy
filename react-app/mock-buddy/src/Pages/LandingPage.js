import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { Centered_Model } from "../Components/Centered_Modal";
import { Off_Canvas } from "../Components/Off_Canvas";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const LandingPage = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        On
      </Button>
      <Centered_Model
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
      <Container>
        <Col>
          <Row>
            <h1>MOCK-BUDDY</h1>
          </Row>
          <Row>
            <p>some infos</p>
          </Row>
        </Col>
        <Col></Col>
        <Col></Col>
      </Container>
    </>
  );
};

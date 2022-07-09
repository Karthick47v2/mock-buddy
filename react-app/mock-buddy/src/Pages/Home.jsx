import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import img from "../Images/home.svg";

// home page

export const Home = () => {
  return (
    <Container className="mt-5 mb-5 text-center text-secondary">
      <Row>
        <Col xs={6}>
          <Image src={img} fluid={true} />
        </Col>
        <Col className="d-flex align-items-center">
          <h3>
            Mock-Buddy is an AI powered web application for practicing your
            presentation and public speaking skills (remote)
          </h3>
        </Col>
      </Row>

      <Row>
        <h1 className="mt-5 mb-5"> About Mock-Buddy </h1>
      </Row>

      <Row className="mb-5">
        <Col>
          <h5>
            Public speaking and/or giving presentations are crucial moments in
            one's career. Too often fear takes over our performance.
          </h5>
        </Col>
        <Col>
          <h5>
            Spend 10 minutes everyday to enchance your vocal ability. Practice
            in private without any embarrassment
          </h5>
        </Col>
      </Row>

      <Row>
        <Col>
          <h5>
            Mock-Buddy is built on the premise that practice & preparation are
            crucial to get over your anxieties when doing presentation
          </h5>
        </Col>
        <Col>
          <h5>
            Get in-depth analysis of your speech style and tips to help you
            improve areas where you may have weaknesses.
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

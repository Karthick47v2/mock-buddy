import { Container, Row, Col, Image } from "react-bootstrap";
import img from "../Images/home-page/home.svg";

export const Home = () => {
  const abtTxt = [
    {
      col1: `Public speaking and/or giving presentations are crucial moments in
            one's career. Too often fear takes over our performance.`,
      col2: `Spend 10 minutes everyday to enchance your vocal ability. Practice
            in private without any embarrassment.`,
    },
    {
      col1: `Mock-Buddy is built on the premise that practice & preparation are
            crucial to get over your anxieties when doing presentation.`,
      col2: `Get in-depth analysis of your speech style and tips to help you
            improve areas where you may have weaknesses.`,
    },
  ];
  return (
    <Container className="mt-5 mb-5 text-center text-secondary">
      <Row>
        <Col xs={6}>
          <Image src={img} fluid={true} />
        </Col>

        <Col className="d-flex align-items-center">
          <h3>
            Mock-Buddy is an AI powered web application for practicing your
            presentation and public speaking skills.
          </h3>
        </Col>
      </Row>
      <Row>
        <h1 className="mt-5 mb-5"> About Mock-Buddy </h1>
      </Row>
      {abtTxt.map((abt, index) => (
        <Row key={index} className="mb-5">
          <Col>
            <h5>{abt.col1}</h5>
          </Col>

          <Col>
            <h5>{abt.col2}</h5>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

import { Container, Col, Row, Image } from "react-bootstrap";
import { AccordionMapper } from "../Components/accordionMapper";
import audio from "../Images/results-page/audio.svg";
import video from "../Images/results-page/video.svg";

export const Results = () => {
  const audioScores = [
    {
      attr: `Speech rate (wpm): `,
      val: "0",
      expl: `This is insights of ..`,
    },
    {
      val: "0",
      attr: `Speech confidence score: `,
      expl: `This is insights of ..`,
    },
  ];

  const videoScores = [
    {
      val: "0",
      attr: `Visibility score: `,
      expl: `This is insights of ..`,
    },
    {
      val: "0",
      attr: `Posture score: `,
      expl: `This is insights of ..`,
    },
    {
      val: "0",
      attr: `Interactivity score: `,
      expl: `This is insights of ..`,
    },
  ];
  return (
    <Container className="my-5 text-secondary">
      <div className="text-center">
        <h1 className="mb-5"> Results </h1>
      </div>
      <Row>
        <Col>
          <Image src={audio} fluid style={{ maxWidth: "60%" }} />
        </Col>

        <Col>
          <Image src={video} fluid style={{ maxWidth: "60%" }} />
        </Col>
      </Row>

      <Row>
        <Col>
          <AccordionMapper scores={audioScores} />
        </Col>

        <Col>
          <AccordionMapper scores={videoScores} />
        </Col>
      </Row>
    </Container>
  );
};

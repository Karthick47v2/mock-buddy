import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const VideoStream = () => {
  const [isRecord, setIsRecord] = useState(false);

  useEffect(() => {
    console.log(isRecord);
  }, [isRecord]);

  const stopRec = () => {
    fetch("/video_stream/stop", {
      method: "POST",
      body: JSON.stringify({
        content: "hi",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div>
      <Container style={{ color: "white" }}>
        <Row>
          <Col></Col>
          <Col xs={5}>
            <Card>
              <Card.Img
                varient="top"
                src="http://localhost:5000/video_stream"
                alt="video-stream"
              />
              <Card.Body>
                <Card.Title>Video Stream</Card.Title>
                <Card.Text>hi</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => setIsRecord(!isRecord)}
                  // disabled={isRecord}
                >
                  Record
                </Button>
                <Button
                  variant="success"
                  onClick={() => stopRec()}
                  // disabled={!isRecord}
                >
                  Finish
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

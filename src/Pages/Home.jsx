import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { practiceActions } from "../store/practice-slice";
import { slideActions } from "../store/slide-slice";
import { avActions } from "../store/av-slice";
import img from "../Images/home-page/home.svg";

export const Home = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(practiceActions.switchRestrictAccess(true));
    dispatch(practiceActions.resetReducer());
    dispatch(slideActions.resetReducer());
    dispatch(avActions.resetReducer());

    // GET req - reset required variables on start
    fetch(process.env.REACT_APP_LANG_END_POINT + "init/")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          const err = (data && data.message) || res.status;
          return Promise.reject(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-5 mb-5 text-center text-secondary">
      <Row>
        <Col xs={6}>
          <Image src={img} fluid />
        </Col>

        <Col className="d-flex align-items-center ms-4">
          <div>
            <h4>
              Finding it hard to adjust your presentations to a remote setting?
              Delivering remote presentations isn't entirely that different from
              regular ones. The main challenge remains keeping your audience
              engaged.
            </h4>
            <h3 className="mt-3">
              That's where Mock-Buddy comes, an AI powered web application for
              practicing your remote presentation and public speaking skills.
            </h3>
          </div>
        </Col>
      </Row>
      <Row>
        <h1 className="mt-5 mb-5" data-testid="home-head">
          About Mock-Buddy
        </h1>
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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";
import { ResultsAccordionMapper } from "../Components/resultsAccordionMapper";

export const AudioResults = () => {
  const audioResults = useSelector((state) => state.av.audioResults);
  const [emoList, setEmoList] = useState([]);
  const ser = JSON.parse(audioResults.fb);

  const colorPalette = ["#6c63ff", "#8c7cff", "#ab96ff", "#c9b1ff", "#e8cdff"];

  useEffect(() => {
    setEmoList([]);
    for (const [idx, [key, val]] of Object.entries(Object.entries(ser))) {
      if (idx >= 3) {
        break;
      }
      let emo;
      switch (key) {
        case "0":
        case "2":
        case "3":
        case "5":
          emo = "Neutral";
          break;
        case "1":
        case "6":
          emo = "Pleasant";
          break;
        case "4":
          emo = "Fear";
          break;
        default:
          break;
      }
      setEmoList((arr) => [
        ...arr,
        { title: emo, value: val, color: colorPalette[idx] },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const audioScores = [
    {
      val: Math.round(audioResults.wpm) + " wpm",
      attr: `Speech rate : `,
      expl: (
        <div>
          <h5>Why speech rate is important?</h5>
          <p>
            Your speaking pace affects how your audience perceives{" "}
            <b>you and your message</b>. If your audience can't keep up with
            you, you can lose them. If you speak too slowly, your audience will
            get bored.
          </p>
          <h5>What is average speech rate for public speaking?</h5>
          <p>
            According to the National Center for Voice and Speech, the average
            speech rate for public speaking is <b>125-175 wpm </b> at a
            comfortable pace. Research shows that the most of popular TED talks
            are between 150 and 175 wpm. <br />
          </p>
          <h5>How to achieve optimal score</h5>
          Below are some factors that affects speech rate, most of which can be
          controlled by you.
          <ul>
            <li>
              <b>Nervousness</b> - When you're nervous, you speak much faster
              and only take short pause as you rush through the content. So,
              relax your mind before speeches. Practice more, practice in front
              of your friends, get rid of your anxiety.
            </li>
            <li>
              <b>Mental fatigue</b> - Fatigue severely affects your thought
              processes, making it difficult to articulate yourself, causing you
              to talk more slowly. Take care of your brain health and practice
              meditation and mindfulness.
            </li>
            <li>
              <b>Verbal pause</b> - Breaks up the content and emphasizes what
              you are saying. This automatically slows down your speech rate to
              keep audience engaged.
            </li>
            <li>
              <b>Lack of practice</b> - It's always take longer when practicing
              first time. Do it over and over again to get a mental map of what
              you're saying. Sometimes more complex words and sentences will
              take a lot of time. Practicing and going with the flow will
              improve it.
            </li>
          </ul>
        </div>
      ),
    },
    {
      val: "",
      attr: `Speech analysis : `,
      expl: (
        <div>
          <Row className="mb-3">
            <Col></Col>
            <Col xs={5}>
              <PieChart
                data={emoList}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={{
                  fontSize: "6px",
                  fontFamily: "sans-serif",
                  fill: "#212529",
                  fontWeight: "700",
                }}
                animate
              />
            </Col>
            <Col style={{ textAlign: "justify" }} className="my-auto"></Col>
          </Row>
          <h5>Why speech confidence is important?</h5>
          <p>
            Public speaking is about getting your message across to your
            audience. Confidence allows to speak with <b>clarity</b>. Research
            shows that people from impressions about a leader's competence in as
            little as half a minute. In other words, your audience will decide
            whether you are <b>trustworthy</b> or not within seconds. Everything
            is amplified on stage not just your voice. If you are confident,
            this is amplified and if you are lacking in confidence this is
            amplified too.
          </p>
          <h5>How to achieve confidence in speaking..</h5>
          Below are some factors that helps to speak confidently, most of which
          can be controlled by you.
          <ul>
            <li>
              <b>Know your topic</b> - The better you understand and care what
              you're talking about, the less you'll get off track. Plan
              carefully what you want to present. The more organized you are,
              the less nervous you'll be.
            </li>
            <li>
              <b>Practice</b> - Practice the entire presentation multiple times.
              Do it for a few people with whom you feel comfortable and ask for
              their feedback.
            </li>
            <li>
              <b>Visualize success</b> - Imagine that your presentation going
              well. Positive thoughts can help decrease some of your negativity
              about your social performance and help ease anxiety.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return <ResultsAccordionMapper scores={audioScores} />;
};

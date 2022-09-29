import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";
import { MistakesAccordionMapper } from "./mistakesAccordionMapper";

export const SlideResults = () => {
  const pptxResults = useSelector((state) => state.slide.pptxResults);

  const [fontList, setFontList] = useState([]);
  const [ttlMistakeCount, setTtlMistakeCount] = useState(0);
  const [ttlWordCount, setTtlWordCount] = useState(0);

  const colorPalette = ["#6c63ff", "#8c7cff", "#ab96ff", "#c9b1ff", "#e8cdff"];

  const fontCount = JSON.parse(pptxResults.font_count);
  const wordCountPerSlide = JSON.parse(pptxResults.word_count);
  const mistakePerSlide = JSON.parse(pptxResults.mistake);

  useEffect(() => {
    setFontList([]);
    let wCount = 0;
    let mCount = 0;

    wordCountPerSlide.map((wordsList) =>
      wordsList.map((wordCount) => (wCount += wordCount))
    );

    mistakePerSlide.map((mistakes) => (mCount += mistakes.length));

    setTtlWordCount(wCount);
    setTtlMistakeCount(mCount);

    for (const [idx, [key, val]] of Object.entries(Object.entries(fontCount))) {
      setFontList((arr) => [
        ...arr,
        { title: key, value: val, color: colorPalette[idx] },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row>
        <p>We found some error </p>
      </Row>
      <Row>
        <Col>
          <PieChart
            data={[
              {
                title: "Error",
                value: ttlMistakeCount,
                color: "#88060a",
              },
            ]}
            lineWidth={30}
            totalValue={ttlWordCount}
            background="#4a7f0f"
            labelPosition={0}
            label={({ dataEntry }) =>
              dataEntry.title + "\n ~" + Math.round(dataEntry.percentage) + "%"
            }
            labelStyle={{
              fontSize: "4px",
              fontFamily: "sans-serif",
              fill: "#aa070d",
              fontWeight: "800",
            }}
            animate
          />
        </Col>
        <Col></Col>
        <Col>
          <PieChart
            data={fontList}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              fontSize: "4px",
              fontFamily: "sans-serif",
              fill: "#212529",
            }}
            animate
          />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <MistakesAccordionMapper mistakes={mistakePerSlide} />
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

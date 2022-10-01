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
  const [slideWordCount, setSlideWordCount] = useState([]);

  const colorPalette = ["#6c63ff", "#8c7cff", "#ab96ff", "#c9b1ff", "#e8cdff"];

  const fontCount = JSON.parse(pptxResults.font_count);
  const slideCount = JSON.parse(pptxResults.slide_count);
  const shapeCount = JSON.parse(pptxResults.shape_count);
  const wordCountPerSlide = JSON.parse(pptxResults.word_count);
  const mistakePerSlide = JSON.parse(pptxResults.mistake);

  useEffect(() => {
    setFontList([]);
    setSlideWordCount([]);
    let wCount = 0;
    let mCount = 0;

    wordCountPerSlide.map((wordsList) =>
      wordsList.map((wordCount) => (wCount += wordCount))
    );

    wordCountPerSlide.map((wordsList, index) => {
      let sum = wordsList.reduce((a, b) => a + b, 0);
      if (sum > 30) {
        return setSlideWordCount((arr) => [
          ...arr,
          { value: sum, idx: index + 1 },
        ]);
      }
      return 0;
    });

    mistakePerSlide.map((mistakes) => (mCount += mistakes.length));

    setTtlWordCount(wCount);
    setTtlMistakeCount(mCount);

    if (Object.keys(fontCount).length <= 3) {
      for (const [idx, [key, val]] of Object.entries(
        Object.entries(fontCount)
      )) {
        setFontList((arr) => [
          ...arr,
          { title: key, value: val, color: colorPalette[idx] },
        ]);
      }
    } else {
      setFontList(Object.keys(fontCount).length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col className="my-auto">
              {" "}
              {`Number of Words: ${ttlWordCount}
            Errors found: ${ttlMistakeCount}`}
            </Col>
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
                  dataEntry.title +
                  "\n ~" +
                  Math.round(dataEntry.percentage) +
                  "%"
                }
                labelStyle={{
                  fontSize: "9px",
                  fontFamily: "sans-serif",
                  fill: "#aa070d",
                  fontWeight: "800",
                }}
                animate
              />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <MistakesAccordionMapper mistakes={mistakePerSlide} />
          </Row>
        </Col>
        <Col style={{ textAlign: "justify" }}>
          <Row className="mt-2">
            {Number.isFinite(fontList) ? (
              <ul style={{ marginLeft: "20px" }}>
                <li
                  style={{ color: "#aa070d" }}
                >{`You have used ${fontList} different fonts.`}</li>
                <p style={{ marginLeft: "20px", marginTop: "10px" }}>
                  {" "}
                  As a rule of thumb, you should never use more than 2 or 3
                  fonts in one presentation. Using more than three fonts can be
                  visually distracting and will determine the cleanliness of
                  your presentation design. In addition to limiting the number
                  of fonts you use, it's also important to use fonts
                  consistently.{" "}
                </p>
              </ul>
            ) : (
              <div>
                <Row>
                  <Col className="my-auto">
                    Using three or less fonts is fine. Otherwise, it will be
                    visually distracting. In addition to it, manually check for
                    font consistency.
                  </Col>
                  <Col>
                    <PieChart
                      data={fontList}
                      label={({ dataEntry }) => dataEntry.title}
                      labelStyle={{
                        fontSize: "4px",
                        fontFamily: "sans-serif",
                        fill: "#212529",
                        fontWeight: "700",
                      }}
                      animate
                    />
                  </Col>
                </Row>
              </div>
            )}
          </Row>
          <Row>
            <ul style={{ marginLeft: "20px" }}>
              {ttlWordCount <= slideCount * 30 ? (
                <div className="mt-4 mb-4">
                  <li style={{ color: "#4a7f0f" }}>
                    {`Word count = ${ttlWordCount}/${slideCount * 30}`}
                  </li>
                  <p style={{ marginLeft: "20px", marginTop: "10px" }}>
                    The purpose of the words in slides is to help audience to to
                    get an overview, as well as small bites of detailed summary
                    of data. Always be clear and concise.
                  </p>
                </div>
              ) : (
                <div className="mt-4 mb-4">
                  <li style={{ color: "#aa070d" }}>
                    Word count limit exceeded ({ttlWordCount}/{slideCount * 30})
                  </li>
                  <p style={{ marginLeft: "20px", marginTop: "10px" }}>
                    Don't make your audience read the slides. Keep text to a
                    minimum (6-8 lines per slide, no more than 30 words per
                    slide). We have detected following slides exceeded word
                    limit. Use bullet points to make it more concise.
                  </p>
                  <ul>
                    {slideWordCount.map((obj, idx) => (
                      <li key={idx} style={{ color: "#e69b00" }}>
                        {" "}
                        Slide No: {obj.idx}, word count = {obj.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {shapeCount <= Math.floor(slideCount / 2) ? (
                <div>
                  <li style={{ color: "#aa070d" }}>
                    {" "}
                    Only {shapeCount} pictures/shapes were found. Include at
                    least {Math.floor(slideCount / 2)} for better visual
                    connection.{" "}
                  </li>
                  <p style={{ marginLeft: "20px", marginTop: "10px" }}>
                    Suggestion(s):
                  </p>
                  <ul>
                    <li>
                      Visual aids add clarity to your message - Add appropiate
                      supporting images and shapes when it's difficult to convey
                      your message clearly with words alone. This simplifies
                      your message and help retain your audience's interest.
                    </li>
                    <li>
                      Relevant illustrations to boost audience memory - Adding
                      statistical details via images is a great way to grab your
                      audience's attention. According to HubSpot, adding
                      relevant images to information helps us to retain 65% of
                      the information 3 days later, compared to the 10% we
                      retain without presence of image.
                    </li>
                    <li>
                      Spice up icebreaker by adding cute and funny pictures - We
                      all know cute cat pictures will instantly put us in a
                      better mood. The idea is the same, break the ice between
                      audience before giving you their undivided attention by
                      adding funny or cute pictures, it will definitely increase
                      the enery level for both of you.
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <li style={{ color: "#4a7f0f" }}>
                    Number of shapes and pictures = {shapeCount}
                  </li>
                  <p style={{ marginLeft: "20px", marginTop: "10px" }}>
                    Science has proven that humans are visual creatures. About
                    90% of the information transmitted to our brain is visual.
                    Therefore, it becomes easier to connect with images on a
                    deeper level. Images and shapes in particular help break the
                    monotone. Supporting pictures and shapes will eliminate the
                    potential for miscommunication between you and your audience
                    and incorporating relevant illustrations can help to build
                    more memorable presentations.
                  </p>
                </div>
              )}
            </ul>
          </Row>
          <Row></Row>
        </Col>
      </Row>
    </>
  );
};

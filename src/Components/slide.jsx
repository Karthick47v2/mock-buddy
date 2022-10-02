import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import ReactGoogleSlides from "react-google-slides";
import { useSelector } from "react-redux";
import { ModalPopup } from "./modalPopup";

export const Slide = () => {
  const gLink = useSelector((state) => state.slide.slidesLink);
  /**
   * @type {[Boolean, Function]} IsLoading
   */
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  const camPreview = useSelector((state) => state.av.showCamPreview);
  const imgSrc = useSelector((state) => state.av.imgSrc);

  useEffect(() => {
    if (isLoading && containerRef && containerRef.current) setIsLoading(false);
  }, [isLoading]);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (window.innerHeight > 768 && window.innerWidth > 1024) {
      setHeight(768);
      setWidth(1024);
    } else {
      setHeight(containerRef.current.offsetHeight);
      setWidth(containerRef.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerHeight, window.innerWidth]);

  return (
    <Container
      ref={containerRef}
      style={{ position: "relative" }}
      data-testid="slide"
      fluid
    >
      {camPreview && imgSrc && (
        <img
          alt="cam preview"
          src={imgSrc}
          style={{
            height: "180px",
            width: "240px",
            position: "absolute",
            zIndex: "1",
          }}
        />
      )}

      <ReactGoogleSlides
        width={width}
        height={height}
        slidesLink={gLink}
        showControls={true}
      />
      <ModalPopup ref={containerRef.current} />
    </Container>
  );
};

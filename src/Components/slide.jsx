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

  useEffect(() => {
    if (isLoading && containerRef && containerRef.current) setIsLoading(false);
  }, [isLoading]);

  return (
    <Container
      ref={containerRef}
      style={{ position: "relative" }}
      data-testid="slide"
    >
      <ReactGoogleSlides
        width={1024}
        height={768}
        slidesLink={gLink}
        showControls={true}
      />
      <ModalPopup ref={containerRef.current} />
    </Container>
  );
};

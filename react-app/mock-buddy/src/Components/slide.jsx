import { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import ReactGoogleSlides from "react-google-slides";
import { ModalPopup } from "./modalPopup";

export const Slide = () => {
  /**
   * @type {[string, Function]} Link
   */
  const [gLink, setGLink] = useState(
    "https://docs.google.com/presentation/d/1BVRPYon5oT-a3WGGzN6gPHfZ_k9E9UwwbqazZeY1Srg/edit?usp=sharing"
  );
  //https://docs.google.com/presentation/d/1hgNONfulGjvvCqmDIgv-x6AwdmFtGGGQkAxOlmfShvY/edit?usp=sharing

  /**
   * @type {[Boolean, Function]} Show
   */
  const [show, setShow] = useState(true);
  /**
   * @type {[Boolean, Function]} IsLoading
   */
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    if (isLoading && containerRef && containerRef.current) setIsLoading(false);
  }, [isLoading]);

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  return (
    <Container ref={containerRef} style={{ position: "relative" }}>
      <ReactGoogleSlides
        width={1024}
        height={768}
        slidesLink={gLink}
        showControls={true}
      />
      <ModalPopup
        show={show}
        handleClose={handleClose}
        ref={containerRef.current}
        setGLink={setGLink}
      />
    </Container>
  );
};

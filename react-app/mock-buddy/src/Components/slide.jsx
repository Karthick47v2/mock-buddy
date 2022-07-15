import { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import ReactGoogleSlides from "react-google-slides";
import { ModalPopup } from "./modalPopup";

/**
 * JSX component for google slid preview
 * @param {Object} props - component props
 * @param {Boolean} props.showModal - modal visibility
 * @returns {JSX.Element} - google slides
 */
export const Slide = (props) => {
  /**
   * @type {[string, Function]} Link
   */
  const [gLink, setGLink] = useState(
    "https://docs.google.com/presentation/d/1Dpv-1o9F3g6fZtwiel9boE8Vd1u_GJIpHEU6sO6OTR8/edit?usp=sharing"
  );
  //sample - https://docs.google.com/presentation/d/1hgNONfulGjvvCqmDIgv-x6AwdmFtGGGQkAxOlmfShvY/edit?usp=sharing
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

  const handleClose = () => {
    setShow(false);
    props.handleShowModal(false);
  };

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
      <ModalPopup
        show={show || props.showModal}
        handleClose={handleClose}
        ref={containerRef.current}
        setGLink={setGLink}
      />
    </Container>
  );
};

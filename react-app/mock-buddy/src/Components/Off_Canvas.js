import React, { useState } from "react";
import OffCanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

export const Off_Canvas = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)} className="me-2">
        Click
      </Button>
      <OffCanvas
        show={show}
        onHide={() => setShow(false)}
        scroll={false}
        backdrop={true}
      >
        <OffCanvas.Header
          style={{ offcanvasHorizontalWidth: "100" }}
          closeButton
        >
          <OffCanvas.Title>Menu</OffCanvas.Title>
        </OffCanvas.Header>
        <OffCanvas.Body>Hidasdad</OffCanvas.Body>
      </OffCanvas>
    </>
  );
};

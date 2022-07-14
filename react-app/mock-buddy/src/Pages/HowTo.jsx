import { Container, Image } from "react-bootstrap";
import s1 from "../Images/how-to page/step1.png";
import s2 from "../Images/how-to page/step2.png";
import s3 from "../Images/how-to page/step3.png";

export const HowTo = () => {
  /**
   * @type {{txt: string, img: string}} step - Dictionary of steps and imgs
   */
  const steps = [
    {
      txt: `1. Make sure you are in a well-lit environment then Go to 'Practice' page.`,
      img: s1,
    },
    {
      txt: `2. Paste respective shared Google slide's link if you are using 'Presentation'
     mode or switch to 'Speech' mode.`,
      img: s2,
    },
    {
      txt: `3. After that make sure your face is visible and centered on the webcam
     preview. If all are ok, start practicing by pressing 'Record' button then press
     'Finish' when done.`,
      img: s3,
    },
  ];

  return (
    <Container className="mt-5 mb-5 text-secondary">
      <div className="text-center">
        <h1 className="mb-5"> Steps </h1>
      </div>
      {steps.map((step) => (
        <div>
          <div>
            <h4> {step.txt}</h4>
          </div>
          <div className="mt-3 mb-3 d-flex justify-content-center">
            <Image src={step.img} fluid={true} style={{ maxWidth: "30%" }} />
          </div>
        </div>
      ))}
    </Container>
  );
};

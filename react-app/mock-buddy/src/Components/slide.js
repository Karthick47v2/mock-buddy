import ReactGoogleSlides from "react-google-slides";

export const Slide = ({ link }) => {
  return (
    <ReactGoogleSlides
      width={1280}
      height={720}
      slidesLink={link}
      showControls={true}
    />
  );
};

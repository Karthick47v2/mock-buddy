import ReactGoogleSlides from "react-google-slides";

export const Slide = ({ link }) => {
  return (
    <ReactGoogleSlides
      width={1280}
      height={720}
      slidesLink={link || "https://docs.google.com/presentation/d/1hgNONfulGjvvCqmDIgv-x6AwdmFtGGGQkAxOlmfShvY/edit?usp=sharing"}
      showControls={true}
    />
  );
};

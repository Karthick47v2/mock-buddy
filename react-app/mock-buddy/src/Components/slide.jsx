import ReactGoogleSlides from "react-google-slides";

export const Slide = ({ link }) => {
  return (
    <ReactGoogleSlides
      width={1280}
      height={720}
      slidesLink={
        link ||
        "https://docs.google.com/presentation/d/1BVRPYon5oT-a3WGGzN6gPHfZ_k9E9UwwbqazZeY1Srg/edit?usp=sharing"
      }
      showControls={true}
    />
  );
};

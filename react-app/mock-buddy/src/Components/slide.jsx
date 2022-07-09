import ReactGoogleSlides from "react-google-slides";

// google slide preview

export const Slide = ({ link }) => {
  /*
    link(str): shared google slides link
  */

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

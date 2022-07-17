import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import img from "../Images/error-page/404.svg";

export const Error = () => {
  return (
    <div className="text-center text-secondary">
      <Image src={img} fluid style={{ maxWidth: "25%" }} className="my-5" />
      <h2> Oops.. Page not found </h2>
      <Link to="/"> Back home </Link>
    </div>
  );
};

import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <h2> 404 </h2>
      <p> Oops.. Page not found </p>
      <Link to="/"> Back home </Link>
    </>
  );
};

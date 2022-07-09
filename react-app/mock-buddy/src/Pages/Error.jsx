import { Link } from "react-router-dom";

// error page

export const Error = () => {
  return (
    <div className="text-center text-secondary">
      <h1> 404 </h1>
      <h2> Oops.. Page not found </h2>
      <Link to="/"> Back home </Link>
    </div>
  );
};

import { Nav_Bar } from "../Components/nav_bar";
import { Outlet } from "react-router";

export const SharedLayout = () => {
  return (
    <>
      <Nav_Bar />
      <Outlet />
    </>
  );
};

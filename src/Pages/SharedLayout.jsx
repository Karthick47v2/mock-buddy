import { Outlet } from "react-router";
import { NavBar } from "../Components/navBar";

export const SharedLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

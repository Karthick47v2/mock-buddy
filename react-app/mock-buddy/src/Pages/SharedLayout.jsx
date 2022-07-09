import { NavBar } from "../Components/navBar";
import { Outlet } from "react-router";

// shared navigation bar for whole site

export const SharedLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

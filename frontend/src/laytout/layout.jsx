import React from "react";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import {NavbarWithSearch} from "../components/NavbarWithSearch";
function Layout(props) {
  return (
    <>
      <NavbarWithSearch />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;

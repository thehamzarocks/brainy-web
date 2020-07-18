import React from "react";
import HeaderBar from "./HeaderBar";

function Layout(props) {
  return (
    <React.Fragment>
      <HeaderBar />
      {props.children}
    </React.Fragment>
  );
}
export default Layout;

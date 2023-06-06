import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Overlay from "../Overlay/Overlay";

import { FlexWrapper100Width } from "../styles/FlexWrappers.styled";

export default function RootLayout() {
  return (
    <>
      <Overlay />
      <Sidebar />
      <FlexWrapper100Width direction="column">
        <Header />
        <Outlet />
      </FlexWrapper100Width>
    </>
  );
}

import React from "react";
import NavigationBar from "./NavigationBar";
import Wrapper from "./Wrapper";

interface LayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: LayoutProps) {
  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <NavigationBar />
      <div
        className="flex flex-col overflow-auto"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <Wrapper>{children}</Wrapper>
      </div>
    </div>
  );
}

export default DefaultLayout;

import  { ReactNode } from "react";
import AppNavbar from "./AppNavbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
};

export default Layout;

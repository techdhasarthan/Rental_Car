// src/components/Layout.js
import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ["/sign-up", "/sign-in"].includes(location.pathname);

  return (
    <Fragment>
      {!isAuthPage && <Header    />}
      <div  className="">
        <Routers   > {children}</Routers>
       
      </div>
     {!isAuthPage && <Footer />}
    </Fragment>
  );
};

export default Layout;

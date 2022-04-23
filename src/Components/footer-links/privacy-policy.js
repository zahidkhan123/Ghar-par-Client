import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import Iframe from "react-iframe";
import Footer from "./../footer";

function PrivacyPolicy() {
  const { service } = useParams();
  let { path, url } = useRouteMatch();
  localStorage.setItem("url", url);
  return (
    <div>
      <Iframe
        url="https://gharpar.co/privacy-policy/"
        width="100%"
        height="1050px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
}

export default PrivacyPolicy;

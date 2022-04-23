import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import Iframe from "react-iframe";
import Footer from "./../footer";
import * as Action from "../../store/actions";
import { history } from "../../index";

function Faq() {
  const dispatch = useDispatch();
  let { url } = useRouteMatch();
  localStorage.setItem("url", url);
  const lastStateValue = useSelector(({ service }) => service.lastStateValue);

  useEffect(() => {
    dispatch(Action.Addresses());
    dispatch(Action.removeCouponData());
  }, []);

  window.onbeforeunload = function (e) {
    e.preventDefault();

    // history.push("/home/services");

    dispatch(Action.lastStateValue(true));
  };

  useEffect(() => {
    dispatch(Action.editPage1(false));
    dispatch(Action.editPage2(false));
    dispatch(Action.editPage3(false));
  }, []);
  return (
    <div>
      <Iframe
        url="https://gharpar.co/app-faq/"
        width="100%"
        height="1850px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
      <Footer />
    </div>
  );
}

export default Faq;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Topinfobar from "./fixed-top";
import Banner from "./banner";
import Services from "./services/services";
import Footer from "./footer";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import * as Action from "../store/actions";
import Loader from "react-loader-spinner";

function Home() {
  const dispatch = useDispatch();

  const auth = useSelector(({ auth }) => auth.isAuth);
  const loading = useSelector(({ auth }) => auth.isLoading);

  useEffect(() => {
    dispatch(Action.keepMeLogin());
  }, []);

  if (!auth) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "block",
            marginLeft: "50%",
            marginRight: "50%",
            marginTop: "20%",
            width: "50%",
          }}
        >
          <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <>
          {/* <Topinfobar /> */}
          {/* <Banner /> */}
        </>
      )}
    </div>
  );
}

export default Home;

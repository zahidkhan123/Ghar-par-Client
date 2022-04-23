import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Phone from "../images/phone.svg";
import { history } from "../index";
import * as Action from "../store/actions";
import Logo from "../images/Logo-Original.svg";

const AlreadyExitNumber = () => {
  const dispatch = useDispatch();
  return (
    <section>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="sign-in-box">
        <div className="exit-num">
          <div className="d-flex flex-column">
            <img src={Phone} alt="Phone" />
            <span>+92 {localStorage.getItem("number")}</span>
            <small>This number is already registered. Please sign in.</small>
          </div>
          <span
            onClick={() => {
              dispatch(Action.userExistError(false));
              dispatch(Action.geustUserType(false));
              history.push("/");
            }}
            className="done-btn"
            style={{ color: "white" }}
          >
            Sign In
          </span>
        </div>
      </div>
    </section>
  );
};

export default AlreadyExitNumber;

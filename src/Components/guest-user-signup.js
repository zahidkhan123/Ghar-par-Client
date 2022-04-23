import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../images/Logo-Original.svg";
import AppStore from "../images/apps-store.png";
import PlayStore from "../images/play-store.png";
import ForArrow from "../images/arrow-forward.svg";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { history } from "../index";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as Action from "../store/actions";

const GuestUser = () => {
  const dispatch = useDispatch();

  const { handleSubmit, register, errors, reset } = useForm({
    mode: "onSubmit",
  });
  const registerErrorMsg2 = useSelector(({ auth }) => auth.registerError);
  const [registerErrorMsg, setRegisterErrorMsg] = useState(null);
  const [numberError, setNumberError] = useState(false);
  const [numberErrorMsg, setNumberErrorMsg] = useState("");
  const [number, setNumber] = useState("");
  const [cnicNumber, setCnicNumber] = useState("");
  const [error, setError] = useState(false);
  const [cnic, setCnic] = useState("");
  const [terms, setTerm] = useState(false);
  const profileUpdateError = useSelector(
    ({ service }) => service.profileUpdateError
  );

  useEffect(() => {
    if (registerErrorMsg2) {
      setRegisterErrorMsg(registerErrorMsg2);
    }
  }, [registerErrorMsg2]);

  const registerData = (values) => {
    if (values.pwd !== values.vpwd) {
      setError(true);
    } else {
      const obj = {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.pwd,
        confirm_password: values.vpwd,
        cnic: values.cnic,
      };
      const obj1 = {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.pwd,
        confirm_password: values.vpwd,
        number: localStorage.getItem("number"),
      };

      localStorage.setItem("guestUserData", JSON.stringify(obj1));
      localStorage.setItem("guestUserDataType", true);

      dispatch(Action.guestUserRegistrationProcess(obj, history));
      setNumberError("");
      localStorage.setItem("guestVerf", true);
    }
  };

  const onChange = (event) => {
    setNumberError("");
    setNumber(event.target.value);
  };

  return (
    <section className="guest-user-signup container d-flex align-items-center flex-column justify-content-btween">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <label>Get Discount</label>
      <div className="sign-in-box">
        <div className="leaf"></div>
        <form onSubmit={handleSubmit(registerData)} className="signing-form">
          <div className="form-group">
            <label for="signFirstName" className="d-none"></label>
            {error && (
              <div
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: "red",
                }}
              >
                Password does not match
              </div>
            )}
            {/* <input
              type="text"
              placeholder="First Name"
              className="input-signing"
            /> */}
            <input
              name="firstName"
              ref={register({ required: "First Name is Required" })}
              type="text"
              placeholder="First Name"
              className="input-signing"
              onChange={() => setError(false)}
              style={{
                border: errors.firstName ? "1px solid red " : "0px solid white",
                outline: errors.firstName && "none",
              }}
            />
            {errors.firstName && (
              <div style={{ width: "100%", textAlign: "left", color: "red" }}>
                {errors.firstName.message}
              </div>
            )}
          </div>
          <div className="form-group">
            <label for="signLastName" className="d-none"></label>
            {/* <input
              type="text"
              placeholder="Last Name"
              className="input-signing"
            /> */}
            <input
              name="lastName"
              ref={register({ required: "Last Name is Required" })}
              type="text"
              placeholder="last Name"
              className="input-signing"
              onChange={() => setError(false)}
              style={{
                border: errors.lastName ? "1px solid red " : "0px solid white",
                outline: errors.lastName && "none",
              }}
            />
            {errors.lastName && (
              <div style={{ width: "100%", textAlign: "left", color: "red" }}>
                {errors.lastName.message}
              </div>
            )}
          </div>
          {/* <div className="form-group">
            <label for="signPhoneNumber" className="d-none"></label>

            <InputMask
              placeholder="03XX XXXX XXX"
              className="input-signing"
              mask="0\3999999999"
              maskChar={null}
              value={number}
              onChange={onChange}
              style={{
                border: numberError ? "1px solid red " : "0px solid white",
              }}
            />
            <input
              name="number"
              ref={register}
              value={number}
              style={{
                display: "none",
              }}
            />
            {numberError && (
              <div style={{ width: "100%", textAlign: "left", color: "red" }}>
                {numberError}
              </div>
            )}
          </div> */}
          <div className="form-group">
            <label for="signCNIC" className="d-none"></label>
            <InputMask
              name="cnic"
              placeholder="Enter CNIC"
              className="input-signing"
              mask="99999-9999999-9"
              maskChar={null}
              value={`${cnic}`}
              onChange={(e) => {
                errors.cnic = null;
                setError(false);
                setNumberError("");
                setCnic(e.target.value);
                dispatch(Action.profileUpdateError(null));
              }}
              style={{
                border: errors.cnic ? "1px solid red " : "0px solid white",
                outline: errors.cnic && "none",
              }}
            />
            <input
              name="cnic"
              x
              type="text"
              value={cnic}
              ref={register({ required: "CNIC Is Required" })}
              style={{ display: "none" }}
            />
            {errors.cnic && (
              <div style={{ width: "100%", textAlign: "left", color: "red" }}>
                {errors.cnic.message}
              </div>
            )}

            {profileUpdateError && (
              <div
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: "red",
                }}
              >
                {profileUpdateError}
              </div>
            )}

            {/* {numberError && (
              <div
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: "red",
                }}
              >
                {numberError}
              </div>
            )} */}

            {/* <input type="text" placeholder="CNIC" className="input-signing" /> */}
          </div>
          <div className="form-group">
            <label for="signPassword" className="d-none"></label>
            {/* <input
              type="password"
              placeholder="Password"
              className="input-signing"
            /> */}
            <input
              name="pwd"
              ref={register({
                required: "Password is Required",
                pattern: {
                  value: /^\S*$/,
                  message: "Password must not contain white spaces",
                },
              })}
              type="password"
              placeholder="Enter Password"
              className="input-signing"
              onChange={() => setError(false)}
              style={{
                border: errors.pwd ? "1px solid red " : "0px solid white",
                outline: errors.pwd && "none",
              }}
            />
            {errors.pwd && (
              <div style={{ width: "100%", textAlign: "left", color: "red" }}>
                {errors.pwd.message}
              </div>
            )}
          </div>
          <div className="form-group">
            <label for="signVerifyPassword" className="d-none"></label>
            {/* <input
              type="password"
              placeholder="Verify Password"
              className="input-signing"
            /> */}
            <input
              name="vpwd"
              type="password"
              placeholder="Verify Password"
              className="input-signing"
              ref={register({
                required: "Verify Password is Required",
                pattern: {
                  value: /^\S*$/,
                  message: "Password must not contain white spaces",
                },
              })}
              onChange={() => setError(false)}
              style={{
                border: errors.vpwd ? "1px solid red " : "0px solid white",
                outline: errors.vpwd && "none",
              }}
            />
            {errors.vpwd && (
              <div style={{ width: "100%", textAlign: "left", color: "red" }}>
                {errors.vpwd.message}
              </div>
            )}
          </div>
          <div className="form-check form-rem">
            <input
              name="terms"
              className="form-check-input"
              type="checkbox"
              checked={terms}
              onChange={() => setTerm(!terms)}
              ref={register({
                required: "Please accept terms and policy",
              })}
              id="defaultCheck1"
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              <a
                href="https://gharpar.co/terms-and-conditions/"
                target="_blank"
                style={{ color: "black" }}
              >
                <span style={{ fontSize: "12px" }}>Terms & Conditions</span>
              </a>
            </label>
            {errors.terms && (
              <div style={{ width: "100%", textAlign: "left", color: "red" }}>
                {errors.terms.message}
              </div>
            )}
          </div>

          <button type="submit" className="btn continue-btn">
            <img src={ForArrow} alt="arrow" />{" "}
          </button>
        </form>
      </div>
    </section>
  );
};

export default GuestUser;

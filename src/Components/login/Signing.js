import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Logo from "../../images/Logo-Original.svg";
import AppStore from "../../images/apps-store.png";
import PlayStore from "../../images/play-store.png";
import ForArrow from "../../images/arrow-forward.svg";
import * as Action from "../../store/actions";
import { Redirect } from "react-router-dom";
import { history } from "../../index";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { toast, ToastContainer } from "react-toastify";
import cookie from "js-cookie";

toast.configure();

const Signing = (props) => {
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(false);
  const [code, setCode] = useState("");
  const { handleSubmit, register, errors, reset } = useForm({
    mode: "onSubmit",
  });
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
    reset: reset2,
  } = useForm({
    mode: "onSubmit",
  });
  const auth = useSelector(({ auth }) => auth.isAuth);
  const [terms, setTerm] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState(null);
  const [loginErrorLs, setLoginErrorLs] = useState(0);
  const [registerErrorMsg, setRegisterErrorMsg] = useState(null);
  const [reffError, setReffError] = useState(null);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const [number, setNumber] = useState("");

  const [error, setError] = useState(false);

  const [numberError, setNumberError] = useState("");

  const loginErrorMsg2 = useSelector(({ auth }) => auth.loginError);
  const registerErrorMsg2 = useSelector(({ auth }) => auth.registerError);
  const guestUser = useSelector(({ auth }) => auth.guestUser);
  const lastStateValue = useSelector(({ service }) => service.lastStateValue);

  // FOR DEMO SERVER
  // useEffect(() => {
  //   if (!localStorage.getItem("storageCleared")) {
  //     dispatch(Action.authType());
  //     localStorage.clear();
  //     localStorage.setItem("storageCleared", true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("storageCleared")) {
  //     dispatch(Action.authType());
  //     localStorage.clear();
  //     localStorage.removeItem("storageCleared");
  //   }
  // }, []);

  // FOR LIVE SERVER
  //this is working on live
  // useEffect(() => {
  //   if (!localStorage.getItem("storageCleared")) {
  //     dispatch(Action.authType());
  //     localStorage.clear();
  //     localStorage.setItem("storageCleared", true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("storageCleared")) {
  //     dispatch(Action.authType());
  //     localStorage.clear();
  //     localStorage.removeItem("storageCleared");
  //   }
  // }, []);

  useEffect(() => {
    const parsed = queryString.parse(props.location.search);
    let params = props.location.search;
    console.log(params);
    console.log(parsed);

    //expire cookie in 30 seconds
    // var date = new Date();
    // date.setTime(date.getTime() + 30 * 1000);
    // var threeminutes = new Date(new Date().getTime() + 3 * 60 * 1000);

    if (params.includes(`utm_source`)) {
      cookie.set("utm_source", parsed.utm_source, {
        expires: 7,
      });
      dispatch(Action.linktracking());
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("latitude", position.coords.latitude);
      localStorage.setItem("longitude", position.coords.longitude);
    });

    // let apiCall = async () => {
    //   let res = await geolocation;
    //   localStorage.setItem("latitude", res.latitude);
    //   localStorage.setItem("longitude", res.longitude);
    // };
    // apiCall();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("storageCleared")) {
      dispatch(Action.authType());
      localStorage.clear();
      localStorage.removeItem("storageCleared");
    }
  }, []);
  const changeHandler = (event) => {
    setCode(event.target.value);
    localStorage.setItem("code", event.target.value);
    setReffError(null);
  };

  useEffect(() => {
    if (lastStateValue) {
      history.push("/home/services");
      dispatch(Action.lastStateValue(false));
    }
  }, [lastStateValue]);

  useEffect(() => {
    if (signIn) {
      document.title = "Sign In | GharPar";
    } else if (signUp) {
      document.title = "Sign Up | GharPar";
    } else {
      document.title = "Sign In | GharPar";
    }
  }, [signIn, signUp]);

  useEffect(() => {
    // let loginErrorLs = localStorage.getItem("loginError")
    if (loginErrorMsg2) {
      if (loginErrorLs == 1) {
        setLoginErrorMsg(loginErrorMsg2);
      }
    }
    if (registerErrorMsg2) {
      if (registerErrorMsg2 === "You entered wrong referral code.") {
        setReffError(registerErrorMsg2);
        dispatch({
          type: Action.REGISTER_ERROR,
          payload: "",
        });
      } else {
        setRegisterErrorMsg(registerErrorMsg2);
      }
    }
  }, [loginErrorMsg2, registerErrorMsg2, loginErrorLs]);
  // useEffect(() => {
  //   if (loginErrorMsg == null) {
  //     dispatch({
  //       type: "LOGIN_ERROR",
  //       payload: null,
  //     });
  //   }
  // }, [loginErrorMsg]);

  // useEffect(() => {
  //   ReactPixel.init(process.env.FB_PIXEL_ID);
  //   ReactPixel.pageView();
  // }, []);

  const registerData = (values) => {
    let number1 = values.number;
    let output1 = [];
    let sNumber1 = number1.toString();

    for (var i = 0, len1 = sNumber1.length; i < len1; i += 1) {
      output1.push(+sNumber1.charAt(i));
    }
    output1.shift();

    let newNmbr1 = output1.join("").toString();

    const obj = {
      firstName: values.firstName,
      lastName: values.lastName,
      pwd: values.pwd,
      vpwd: values.vpwd,
      number: newNmbr1,
      referred_by: code,
      terms: values.terms,
    };
    if (number.length == 11) {
      localStorage.setItem("userData", JSON.stringify(obj));

      dispatch(Action.registerProcess(obj, history));
      setNumberError("");
    } else {
      setNumberError("Number must be 11 digit");
    }
  };
  const loginData = (values) => {
    let number = values.nmbr;
    let output = [];
    let sNumber = number.toString();

    for (var i = 0, len = sNumber.length; i < len; i += 1) {
      output.push(+sNumber.charAt(i));
    }
    output.shift();

    let newNmbr = output.join("").toString();

    const obj = {
      nmbr: newNmbr,
      password: values.password,
      remember: values.remember,
    };

    if (output.length == 10) {
      dispatch(Action.loginProcess(obj, history));
      localStorage.setItem("login", true);

      setLoginErrorLs(1);
      setNumberError("");
    } else {
      setNumberError("Number must be 11 digit");
    }
  };

  let urlPath = localStorage.getItem("url");

  if (auth) {
    return <Redirect to={urlPath} />;
  }

  const onChange = (event) => {
    setLoginErrorLs(0);
    // localStorage.setItem("loginError" , 0)
    errors.nmbr = null;
    errors2.number = null;
    setLoginErrorMsg(null);
    setRegisterErrorMsg(null);
    setNumberError("");
    setNumber(event.target.value);
  };

  return (
    <section className="container d-flex align-items-center flex-column justify-content-between">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>

      <div className="sign-in-box">
        <div className="leaf"></div>
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item ">
            <a
              className="nav-link active tabs"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-home"
              role="tab"
              onClick={() => {
                reset();
                reset2();
                setLoginErrorMsg(null);
                setRemember(false);
                setSignIn(!signIn);
                setSignUp(false);
              }}
              aria-controls="pills-home"
              aria-selected="true"
            >
              Sign In
            </a>
          </li>
          <li className="nav-item ">
            <a
              className="nav-link tabs"
              id="pills-profile-tab"
              data-toggle="pill"
              href="#pills-profile"
              role="tab"
              onClick={() => {
                reset();
                reset2();
                setTerm(false);
                setNumber("");
                setNumberError("");
                setRegisterErrorMsg(null);
                dispatch(Action.isForget(false));
                setSignUp(!signUp);
                setSignIn(false);
                setReffError(null);
              }}
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Sign Up
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <form onSubmit={handleSubmit(loginData)} className="signing-form">
              <div className="form-group">
                <label htmlFor="signInEmail" className="d-none"></label>
                {loginErrorMsg && (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "left",
                      color: "red",
                    }}
                  >
                    {loginErrorMsg}
                  </div>
                )}
                <InputMask
                  // name="number"
                  placeholder="03XX XXXX XXX"
                  className="input-signing"
                  mask="0\3999999999"
                  maskChar={null}
                  value={number}
                  onChange={onChange}
                  // style={{
                  //   border: numberError ? "1px solid red " : "0px solid white",
                  // }}
                  style={{
                    border: errors.nmbr ? "1px solid red " : "0px solid white",
                    outline: errors.nmbr && "none",
                  }}
                />
                {/* <input
                  name="nmbr"
                  ref={register}
                  style={{
                    display: "none",
                  }}
                  value={number}
                  placeholder="03XX XXXX XXX"
                  className="input-signing"
                />
                {numberError && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {numberError}
                  </div>
                )} */}
                <input
                  name="nmbr"
                  type="text"
                  value={number}
                  ref={register({ required: "Number Is Required" })}
                  style={{ display: "none" }}
                />
                {errors.nmbr && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {errors.nmbr.message}
                  </div>
                )}
                {numberError && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {numberError}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="signInPassword" className="d-none"></label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={() => setLoginErrorMsg(null)}
                  className="input-signing"
                  ref={register({ required: "Password is Required" })}
                  style={{
                    border: errors.password
                      ? "1px solid red "
                      : "0px solid white",
                    outline: errors.password && "none",
                  }}
                />
                {errors.password && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="remember-wrapper">
                <div className="form-check form-rem">
                  <input
                    name="remember"
                    className="form-check-input"
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    ref={register}
                    id="defaultCheck1"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary gp-Btn  continue-btn "
                >
                  <img src={ForArrow} alt="arrow" />
                </button>
              </div>
              <div className="forget-pass">
                <Link
                  onClick={() => {
                    dispatch(Action.geustUserType(false));
                    dispatch(Action.isForget(true));
                  }}
                  to="/forget-password"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
            <div
              onClick={() => {
                dispatch(Action.isForget(false));
                dispatch(Action.geustUserType(true));
              }}
              className="footer-content"
            >
              <Link
                onClick={() => {
                  dispatch(Action.isForget(false));
                  dispatch(Action.geustUserType(true));
                }}
                to="/guest-user"
              >
                Continue as guest User
              </Link>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <form
              onSubmit={handleSubmit2(registerData)}
              className="signing-form"
            >
              <div className="form-group">
                <label htmlFor="signInEmail" className="d-none"></label>
                {registerErrorMsg === null && reffError !== null ? (
                  <>
                    <div
                      style={{ width: "100%", textAlign: "left", color: "red" }}
                    >
                      {reffError}
                    </div>
                  </>
                ) : (
                  <>
                    {registerErrorMsg && (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "left",
                          color: "red",
                        }}
                      >
                        {registerErrorMsg}
                      </div>
                    )}
                  </>
                )}

                <input
                  name="firstName"
                  ref={register2({
                    required: "First Name is Required",
                    pattern: {
                      value:
                        /^([a-zA-Z0-9.]+|[a-zA-Z0-9.]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/,
                      message: "Invalid Name",
                    },
                  })}
                  type="text"
                  placeholder="First Name"
                  className="input-signing"
                  onChange={() => setRegisterErrorMsg(null)}
                  style={{
                    border: errors2.firstName
                      ? "1px solid red "
                      : "0px solid white",
                    outline: errors2.firstName && "none",
                  }}
                />
                {errors2.firstName && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {errors2.firstName.message}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="signInEmail" className="d-none"></label>
                <input
                  name="lastName"
                  ref={register2({
                    required: "Last Name is Required",
                    pattern: {
                      value:
                        /^([a-zA-Z0-9.]+|[a-zA-Z0-9.]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/,
                      message: "Invalid Name",
                    },
                    // pattern: {
                    //   value: /^[A-Za-z]+$/,
                    //   message: "Invalid Name",
                    // },
                  })}
                  type="text"
                  placeholder="Last Name"
                  className="input-signing"
                  onChange={() => setRegisterErrorMsg(null)}
                  style={{
                    border: errors2.lastName
                      ? "1px solid red "
                      : "0px solid white",
                    outline: errors2.lastName && "none",
                  }}
                />
                {errors2.lastName && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {errors2.lastName.message}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="signInPassword" className="d-none"></label>
                <InputMask
                  placeholder="03XX XXXX XXX"
                  className="input-signing"
                  mask="0\3999999999"
                  maskChar={null}
                  value={number}
                  onChange={onChange}
                  // style={{
                  //   border: numberError ? "1px solid red " : "0px solid white",
                  // }}
                  style={{
                    border: errors2.number
                      ? "1px solid red"
                      : "0px solid white",
                    outline: errors2.number && "none",
                  }}
                />
                {/* <input
                  name="number"
                  ref={register2}
                  value={number}
                  style={{
                    display: "none",
                  }}
                /> */}
                <input
                  name="number"
                  type="text"
                  value={number}
                  ref={register2({ required: "Number Is Required" })}
                  style={{ display: "none" }}
                />
                {errors2.number && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {errors2.number.message}
                  </div>
                )}
                {numberError && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {numberError}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="signInPassword" className="d-none"></label>
                <input
                  name="pwd"
                  ref={register2({
                    required: "Password is Required",
                    pattern: {
                      value: /^\S*$/,
                      message: "Password must not contain white spaces",
                    },
                    validate: (value) =>
                      value.length > 7 ||
                      "Password digits must be 8 character long",
                  })}
                  type="password"
                  placeholder="Enter Password"
                  className="input-signing"
                  onChange={() => setRegisterErrorMsg(null)}
                  style={{
                    border: errors2.pwd ? "1px solid red " : "0px solid white",
                    outline: errors2.pwd && "none",
                  }}
                />
                {errors2.pwd && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {errors2.pwd.message}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="signInPassword" className="d-none"></label>
                <input
                  name="vpwd"
                  type="password"
                  placeholder="Verify Password"
                  className="input-signing"
                  ref={register2({
                    required: "Verify Password is Required",
                    pattern: {
                      value: /^\S*$/,
                      message: "Password must not contain white spaces",
                    },
                    validate: (value) =>
                      value.length > 7 ||
                      "Password digits must be 8 character long",
                  })}
                  onChange={() => setRegisterErrorMsg(null)}
                  style={{
                    border: errors2.vpwd ? "1px solid red " : "0px solid white",
                    outline: errors2.vpwd && "none",
                  }}
                />
                {errors2.vpwd && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {errors2.vpwd.message}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="signInPassword" className="d-none"></label>
                <input
                  name="referralcode"
                  type="text"
                  placeholder="Referral Code (optional)"
                  className="input-signing"
                  onChange={changeHandler}
                  // onChange={() => setRegisterErrorMsg(null)}
                />
              </div>
              <div className="remember-wrapper">
                <div className="form-check form-rem">
                  <input
                    name="terms"
                    className="form-check-input"
                    type="checkbox"
                    checked={terms}
                    onChange={() => setTerm(!terms)}
                    ref={register2({
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
                      Terms & Conditions
                    </a>
                  </label>
                  {errors2.terms && (
                    <div
                      style={{ width: "100%", textAlign: "left", color: "red" }}
                    >
                      {errors2.terms.message}
                    </div>
                  )}
                </div>
                <button
                  type="submit2"
                  className="btn btn-primary gp-Btn  continue-btn"
                >
                  <img src={ForArrow} alt="arrow" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="app-download">
        <label>Download our Apps</label>
        <a
          href="https://apps.apple.com/us/app/gharpar-beauty-services/id1259744126"
          target="_blank"
        >
          <img src={AppStore} alt="applestore" />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.onebyte.gharpar&hl=en_US"
          target="_blank"
        >
          <img src={PlayStore} alt="playstore" />
        </a>
        {/* <a href="#">
          <img src={AppStore} alt="applestore" />
        </a>
        <a href="#">
          <img src={PlayStore} alt="playstore" />
        </a> */}
      </div>
      {/* </div> */}
    </section>
  );
};

export default Signing;

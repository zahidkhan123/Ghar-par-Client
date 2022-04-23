import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ForArrow from "../../images/arrow-forward.svg";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import * as Action from "../../store/actions";
import { history } from "../../index";
import { Redirect } from "react-router-dom";
import Logo from "../../images/Logo-Original.svg";

const ForgetPassowrd = () => {
  const dispatch = useDispatch();

  const { handleSubmit, register, errors, reset } = useForm({
    mode: "onSubmit",
  });

  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const errorMsg1 = useSelector(({ auth }) => auth.forgetPasswordError);
  const userExistError = useSelector(({ auth }) => auth.userExistError);
  const back = useSelector(({ auth }) => auth.backButton);
  const guestUser = useSelector(({ auth }) => auth.guestUser);

  useEffect(() => {
    if (userExistError) {
      history.push("/user-already-exist");
    }
  }, [userExistError]);

  useEffect(() => {
    if (guestUser) {
      document.title = "Guest User | GharPar";
    } else {
      document.title = "Forget Passowrd | GharPar";
    }
  }, [guestUser]);

  useEffect(() => {
    if (errorMsg1) {
      setErrorMsg(errorMsg1);
    }
  }, [errorMsg1]);
  useEffect(() => {
    if (errorMsg == null) {
      dispatch({
        type: Action.FORGET_PASSOWRD_ERROR,
        payload: null,
      });
    }
  }, [errorMsg]);

  const data = (values) => {
    if (back) {
      history.push("/");
    } else {
      let number = values.nmbr;
      let output = [];
      let sNumber = number.toString();

      for (var i = 0, len = sNumber.length; i < len; i += 1) {
        output.push(+sNumber.charAt(i));
      }
      output.shift();

      let newNmbr = output.join("").toString();

      localStorage.setItem("number", newNmbr);

      const obj = {
        nmbr: newNmbr,
      };

      if (number.length == 11) {
        if (guestUser) {
          dispatch(Action.guestUserLogin(obj, history));
        } else {
          dispatch(Action.forgetPassword(obj, history));
          setNumberError("");
        }
      } else {
        setNumberError("Number must be 11 digit");
      }
    }
  };

  const onChange = (event) => {
    setNumberError("");
    setErrorMsg(null);
    setNumber(event.target.value);
  };

  return (
    <section>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>

      <div className="sign-in-box">
        <div className="leaf"></div>
        <section className="forget-password">
          <div className="pin-verf">
            {guestUser ? (
              <>
                <label>Phone Number</label>
                <small>Please enter your valid phone number</small>
              </>
            ) : (
              <>
                <label>Forgot Password</label>
                <small>Enter Your Mobile Number Below</small>
              </>
            )}

            <form className="form" onSubmit={handleSubmit(data)}>
              {errorMsg && (
                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    color: "red",
                  }}
                >
                  {errorMsg}
                </div>
              )}
              <InputMask
                // name="number"
                placeholder="03XX XXXX XXX"
                className="form-control "
                mask="0\3999999999"
                maskChar={null}
                value={number}
                onChange={onChange}
                style={{
                  border: numberError ? "1px solid red " : "0px solid white",
                  marginBottom: "10px",
                }}
              />
              <input
                name="nmbr"
                ref={register}
                style={{
                  display: "none",
                }}
                value={number}
                placeholder="03XX XXXX XXX"
                className="form-control "
              />
              {numberError && (
                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    color: "red",
                    marginBottom: "40px",
                  }}
                >
                  {numberError}
                </div>
              )}

              {/* <input
              className="form-control "
              placeholder="Mobile Number"
              aria-label="Search"
            /> */}

              <div className="remember-wrapper">
                <button
                  style={{ display: "none" }}
                  tabindex="0"
                  onClick={() => {
                    dispatch(Action.backButton(false));
                  }}
                  type="submit2"
                  className="btn continue-btn "
                >
                  <img src={ForArrow} alt="arrow" />
                </button>
                <div className="back-button">
                  <button
                    onClick={() => {
                      dispatch(Action.backButton(true));
                      dispatch(Action.geustUserType(false));
                      dispatch(Action.isForget(false));
                    }}
                    type="submit2"
                    className="btn continue-btn"
                  >
                    <img src={ForArrow} alt="arrow" />
                  </button>
                  <span>Back</span>
                </div>
                <button
                  onClick={() => {
                    dispatch(Action.backButton(false));
                  }}
                  type="submit2"
                  className="btn continue-btn "
                >
                  <img src={ForArrow} alt="arrow" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ForgetPassowrd;

import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PinInput from "react-pin-input";
import * as Action from "../../store/actions";
import { history } from "../../index";
import AddGender from "./add-gender";
import Logo from "../../images/Logo-Original.svg";

const PinVerfication = () => {
  const dispatch = useDispatch();
  const [val, setVal] = useState("");
  const [verificationError, setverificationError] = useState(null);
  const [resendCodeMsg, setResendCodeMsg] = useState(null);
  const [resendCodeError, setResendCodeError] = useState(null);
  const [timeOut, setTimeOutt] = useState(false);
  const [count, setCount] = useState(60);
  const [countType, setCountType] = useState(true);

  const verError = useSelector(({ auth }) => auth.verificationError);
  const nmbr = useSelector(({ auth }) => auth.number);
  const verify = useSelector(({ auth }) => auth.isVerificaton);
  const resendCode = useSelector(({ auth }) => auth.resendCodeMsg);
  const resendError = useSelector(({ auth }) => auth.resendCodeError);
  const genderModal = useSelector(({ auth }) => auth.genderModal);
  const guestUser = useSelector(({ auth }) => auth.guestUser);
  const guestUserData = useSelector(({ auth }) => auth.guestUserData);

  useEffect(() => {
    if (verError) {
      setverificationError(verError);
    }
    if (resendCode) {
      setResendCodeMsg(resendCode);
    }
    if (resendError) {
      setResendCodeError(resendError);
    }
  }, [verError, resendCode, resendError]);

  useEffect(() => {
    document.title = "Pin Verification | GharPar";
  }, []);

  useEffect(() => {
    let timeInterval = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    if (count < 1) {
      clearTimeout(timeInterval);
      setTimeOutt(true);
      setCountType(false);
    }
  }, [count]);

  useEffect(() => {
    if (verificationError == null) {
      dispatch({
        type: Action.VERIFICATION_ERROR,
        payload: null,
      });
    }
    if (resendCodeMsg == null) {
      dispatch({
        type: Action.RESEND_CODE_SUCCESS,
        payload: null,
      });
    }
    if (resendCodeError == null) {
      dispatch({
        type: Action.RESEND_CODE_ERROR,
        payload: null,
      });
    }
  }, [verificationError, resendCodeMsg, resendCodeError]);

  const handleChange = (value) => {
    setVal(value);
    setverificationError(null);
    setResendCodeMsg(null);
    setResendCodeError(null);
    if (value.length == 4) {
      if (guestUser) {
        let guestUserNumber = guestUserData.phone;
        dispatch(
          Action.guestUserRegistrationSuccess(value, guestUserNumber, history)
        );
      } else {
        dispatch(
          Action.pinVerificationProcess(value, nmbr, history, !genderModal)
        );
      }
    }
  };
  if (!verify) {
    return <Redirect to="/" />;
  }

  return (
    <section>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>

      <div className="sign-in-box">
        <div className="leaf"></div>
        <div className="pin-verf">
          <label>Verify your number</label>
          <small>
            Enter 4 digit code that you received on this number
            {guestUser ? (
              <span>{` +92${guestUserData?.phone}`}</span>
            ) : (
              <span>{` +92${nmbr}`}</span>
            )}
          </small>
          <PinInput
            length={4}
            focus
            // disabled
            secret
            // ref={(p) => (pin = p)}
            type="numeric"
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{verificationError}</div>
          {/* <form className="form-inline">
          <input className="form-control " placeholder="" aria-label="Search" />
          <input className="form-control " placeholder="" aria-label="Search" />
          <input className="form-control " placeholder="" aria-label="Search" />
          <input className="form-control " placeholder="" aria-label="Search" />
        </form> */}
          {countType && (
            <span className="mt-5" style={{ cursor: "pointer" }}>
              Resend Code : {`${count}s`}
            </span>
          )}
          {timeOut && (
            <>
              <span
                onClick={() => {
                  if (guestUser) {
                    dispatch(Action.resendCodeProcess(guestUserData?.phone));
                    setCountType(true);
                    setTimeOutt(false);
                    setCount(60);
                    setResendCodeMsg("");
                  } else {
                    dispatch(Action.resendCodeProcess(nmbr));
                    setCountType(true);
                    setTimeOutt(false);
                    setCount(60);
                    setResendCodeMsg("");
                  }
                }}
                className="mt-5"
                style={{ cursor: "pointer" }}
              >
                Resend Code
              </span>
              {resendCodeMsg ? (
                ({
                  /* <div style={{ color: "green" }}>{resendCodeMsg}</div> */
                },
                (<div style={{ color: "green" }}></div>))
              ) : (
                <div style={{ color: "red" }}>{resendCodeError}</div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PinVerfication;

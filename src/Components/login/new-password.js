import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as Action from "../../store/actions";
import { history } from "../../index";
import { Link } from "react-router-dom";
import ForArrow from "../../images/arrow-forward.svg";
import Logo from "../../images/Logo-Original.svg";

const NewPassword = () => {
  const dispatch = useDispatch();

  const { handleSubmit, register, errors, reset } = useForm({
    mode: "onChange",
  });
  const [error, setError] = useState(false);

  const data = (values) => {
    if (values.password !== values.confirmpassword) {
      setError(true);
    } else {
      dispatch(Action.updatePassword(values, history));
    }
  };

  useEffect(() => {
    document.title = "New Password | GharPar";
  }, []);

  return (
    <section>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>

      <div className="sign-in-box">
        <div className="leaf"></div>
        <section className="forget-password">
          <div className="pin-verf">
            <label className="new-pass-label">Enter New Password</label>

            <form onSubmit={handleSubmit(data)} className="form new-password">
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
              className="form-control "
              placeholder="New Password"
              aria-label="Search"
            /> */}
              <div>
                <input
                  name="password"
                  ref={register({
                    required: "Password is Required",
                    validate: (value) =>
                      value.length >= 8 || "Password must be 8 characters long",
                    // pattern: {
                    //   value: /[^\s\\]/,
                    //   message: "Invalid Password",
                    // },
                    pattern: {
                      value: /^\S*$/,
                      message: "Password must not contain white spaces",
                    },
                  })}
                  className="form-control "
                  type="password"
                  placeholder="Enter Password"
                  onChange={() => setError(false)}
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
                {/* <input
              className="form-control "
              placeholder="Verify Password"
              aria-label="Search"
            /> */}
                <input
                  name="confirmpassword"
                  type="password"
                  placeholder="Verify Password"
                  className="form-control "
                  ref={register({
                    required: "Verify Password is Required",
                    validate: (value) =>
                      value.length >= 8 || "Password must be 8 characters long",
                    // pattern: {
                    //   value: /[^\s\\]/,
                    //   message: "Invalid Password",
                    // },
                    pattern: {
                      value: /^\S*$/,
                      message: "Password must not contain white spaces",
                    },
                  })}
                  onChange={() => setError(false)}
                  style={{
                    border: errors.confirmpassword
                      ? "1px solid red "
                      : "0px solid white",
                    outline: errors.confirmpassword && "none",
                  }}
                />
                {errors.confirmpassword && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {errors.confirmpassword.message}
                  </div>
                )}
              </div>

              <div className="remember-wrapper">
                <button
                  type="submit2"
                  className="btn continue-btn"
                  style={{ marginTop: "50px" }}
                >
                  {" "}
                  <img src={ForArrow} alt="arrow" />{" "}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
};

export default NewPassword;

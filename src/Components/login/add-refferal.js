import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PinInput from "react-pin-input";
import * as Action from "../../store/actions";
import { history } from "../../index";
import AddGender from "./add-gender";
import { toast, ToastContainer } from "react-toastify";
import Logo from "../../images/Logo-Original.svg";
import ForArrow from "../../images/arrow-forward.svg";

toast.configure();

const AddRefferal = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  const refferalError = useSelector(({ service }) => service.refferalError);
  const refferalSuccess = useSelector(({ service }) => service.refferalSuccess);

  useEffect(() => {
    if (refferalError?.length > 0) {
      toast.error(refferalError);
      dispatch({
        type: Action.REFFERALCODE,
        refferalError: "",
      });
    } else if (refferalSuccess?.length > 0) {
      toast.success(refferalSuccess);
      dispatch({
        type: Action.REFFERALCODE,
        refferalSuccess: "",
      });
    }
  }, [refferalError, refferalSuccess]);

  useEffect(() => {
    document.title = "Add Refferal | GharPar";
  }, []);

  const changeHandler = (event) => {
    setCode(event.target.value);
  };
  // if (!verify) {
  //   return <Redirect to="/" />;
  // }

  return (
    <section>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>

      <div className="sign-in-box">
        <div className="leaf"></div>
        <div className="signing-form">
          <label className="pt-3 pb-3">Refferal Code (if any)</label>
          <input
            type="text"
            placeholder="(Optional)"
            className="input-signing"
            onChange={changeHandler}
          />
          <button
            type="button"
            onClick={() => {
              dispatch(Action.addReferalCode(code));
            }}
            className="btn gp-Btn btn-primary continue-btn "
            style={{
              float: "right",
              margin: "8px",
              backgroundColor: "#f68d2f",
              borderColor: "#f68d2f",
            }}
          >
            <img src={ForArrow} alt="arrow" />
          </button>
          {/* <button
            className="btn-group"
            type="button"
            onClick={() => {
              dispatch(Action.addReferalCode(code));
            }}
          >
            Apply
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default AddRefferal;

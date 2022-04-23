import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../store/actions";
import Pending from "../../images/pending.svg";
import useForceUpdate from "use-force-update";
import { history } from "../../index";
import { useForm } from "react-hook-form";
import Close from "../../images/ic_cross.svg";

// import Discount from "./images/discount.svg";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: "54px 84px",
    borderRadius: 12,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    paper: {
      width: 320,
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
}));

export default function CnicModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();

  const [open, setOpen] = React.useState(false);
  const [cnicValue, setCnicValue] = useState();
  const [numberError, setNumberError] = useState("");

  const cnic = useSelector(({ service }) => service.cnicModal);
  let orderDetail = useSelector(({ service }) => service.orderSummary);
  const limitation = useSelector(({ service }) => service.limitation);
  const profileUpdateError = useSelector(
    ({ service }) => service.profileUpdateError
  );

  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  let pendingTrack = localStorage.getItem("pendingTrack");
  let minAmountError = localStorage.getItem("minAmountError");

  const handleClose = () => {
    if (minAmountError) {
      localStorage.removeItem("minAmountError");
      dispatch(Action.cnicModal(!cnic));
    } else {
      if (localStorage.getItem("pendingTrack")) {
        localStorage.removeItem("pendingTrack");
        dispatch(Action.cnicModal(!cnic));
        history.push("/home/services");
      } else {
        localStorage.setItem("pendingTrack", true);
        forceUpdate();
      }
    }
  };

  const handleCnic = (value) => {
    if (value.cnic.length > 0) {
      if (value.cnic.length === 15 || value.cnic.length === 13) {
        let body = {
          user: {
            cnic: value.cnic,
          },
        };
        dispatch(Action.updateProfile(body));
        forceUpdate();
        localStorage.setItem("updateCnic", true);
        // dispatch(Action.editPage1(!page1));
      } else {
        setNumberError("CNIC number must be 13 characters");
      }
    } else {
      localStorage.setItem("pendingTrack", true);
      forceUpdate();
    }
  };

  const body = (
    <section className="pending-order">
      <div className={classes.paper}>
        <a className="close-btn close" style={{ cursor: "pointer" }}>
          <img onClick={handleClose} src={Close} alt="close" />
        </a>
        <div id="simple-modal-title">
          <div className="container">
            <label className="pending-order-num">
              Your Order ID: {orderDetail?.order?.custom_order_id}
            </label>
          </div>
        </div>
        <div className="pending-order-body" id="simple-modal-description">
          <h4>Pending...</h4>

          <div className="pending-content">
            <h2>One Last Step for Check Out</h2>
          </div>
          <p>Add your CNIC number</p>
          <form onSubmit={handleSubmit(handleCnic)}>
            <InputMask
              name="cnic"
              placeholder="35202-1234567-8"
              // className="profile-input-display"
              className="input-signing"
              mask="99999-9999999-9"
              maskChar={null}
              value={`${cnicValue}`}
              onChange={(e) => {
                setNumberError("");
                setCnicValue(e.target.value);
                dispatch(Action.profileUpdateError(null));
              }}
              style={{
                border: errors.cnic ? "1px solid red" : "1px solid #E2DCD9",
                outline: errors.cnic && "none",
              }}
            />
            <input
              name="cnic"
              type="text"
              value={cnicValue}
              ref={register}
              style={{ display: "none" }}
            />
            {numberError && (
              <div
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: "red",
                }}
              >
                {numberError}
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

            <div style={{ marginTop: "70px" }}>
              <button type="submit1212" className="done-btn">
                {" "}
                Continue
              </button>
            </div>
          </form>
        </div>
        {/* <span
          onClick={() => {
            localStorage.setItem("pendingTrack", true);
            forceUpdate();
          }}
          className="done-btn"
        >
          {" "}
          Continue
        </span> */}
      </div>
    </section>
  );

  const pendingTrackBody = (
    <section className="pending-order">
      <div className={classes.paper}>
        <div id="simple-modal-title">
          <div className="container">
            <label className="pending-order-num">
              Your Order ID: {orderDetail?.order?.custom_order_id}
            </label>
          </div>
        </div>
        <div className="pending-track-body" id="simple-modal-description">
          <h4>Pending...</h4>
          <img
            src={Pending}
            alt="Pending-track-image"
            className="pending-img"
          />
          <p>
            Your order has been placed. we will contact you soon for
            confirmation.
          </p>
        </div>
        {/* <span onClick={localStorage.removeItem("pendingTrack")}> */}
        <span
          to="/home/order-detail"
          onClick={() => {
            return (
              localStorage.removeItem("pendingTrack"),
              dispatch(Action.cnicModal(false)),
              history.replace("/home/order-detail")
            );
          }}
          className="track-btn"
        >
          Track your Appointment
        </span>
        {/* </span> */}
      </div>
    </section>
  );

  const errorModal = (
    <section className="min-order">
      <div className={classes.paper}>
        <a
          onClick={handleClose}
          className="close-btn close"
          style={{ cursor: "pointer" }}
        >
          <img src={Close} alt="close" />
        </a>
        <div className="min-order-title">
          <div className="container">
            <p>Place your minimum order of</p>
          </div>
        </div>
        <div className="min-order-body" id="simple-modal-description">
          <h1>Rs.{limitation?.min_order_price}</h1>

          <span
            onClick={handleClose}
            className="done-btn "
            style={{ cursor: "pointer" }}
          >
            Continue{" "}
          </span>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Pending order
      </button> */}
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {localStorage.getItem("pendingTrack")
          ? pendingTrackBody
          : minAmountError
          ? errorModal
          : body}
        {/* {errorModal} */}
      </Modal>
    </div>
  );
}

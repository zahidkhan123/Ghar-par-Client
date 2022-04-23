import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
// import Discount from "../images/discount.svg";
import Discount from "../images/Group 1228.svg";

import * as Action from "../store/actions";
import { history } from "../index";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: 45,
    paddingBottom: 60,
    borderRadius: 12,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    paper: {
      width: 320,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

export default function GetDiscount(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const discount = useSelector(({ service }) => service.discountModal);
  let orderDetail = useSelector(({ service }) => service.orderSummary);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(Action.discountModal(!discount));
    localStorage.removeItem("couponDiscount");
    history.push("/home/services");
  };

  const body = (
    <section className="get-discount">
      <div className={classes.paper}>
        <div id="simple-modal-title">
          <div className="container">
            <label className="get-dis-label">
              Your Order ID: {orderDetail?.order?.custom_order_id}
            </label>
          </div>
        </div>
        <div className="get-discount-body" id="simple-modal-description">
          <h4>Thank You</h4>
          <div style={{ marginBottom: "40px" }}>
            <p>We received your order successfully.</p>
            <div className="container">
              <img src={Discount} alt="discount-image" />
              {localStorage.getItem("couponDiscount") > 80 ? (
                <div className="container-flat-text">
                  <div className="container-text-flat">Flat Discount</div>
                  <div className="container-text-Rs">
                    Rs.
                    <span className="container-text-amount">
                      {localStorage.getItem("couponDiscount")}
                    </span>{" "}
                  </div>
                </div>
              ) : (
                <div className="container-text">
                  <div className="container-text-avail">Avail</div>
                  <div className="container-text-15perc">{`${localStorage.getItem(
                    "couponDiscount"
                  )}%`}</div>
                  <div className="container-text-discount">Discount</div>
                </div>
              )}
            </div>

            <p>by completing your profile</p>
          </div>
          <span
            onClick={() => {
              dispatch(Action.discountModal(false));
              localStorage.removeItem("couponDiscount");
              history.replace("/guest-user-registration");
            }}
            className="done-btn"
            style={{ cursor: "pointer" }}
          >
            Continue
          </span>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* <button type="button" onClick={true}>
        Discount
      </button> */}
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Giftbox from "../../images/giftbox.png";
import * as Action from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    borderRadius: "10px",
    textAlign: "center",
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    paper: {
      width: 320,
      height: "auto",
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
}));

export default function DealsModal(props) {
  const classes = useStyles();
  // const [modalStyle] = React.useState(getModalStyle);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState();
  let orderSummary = useSelector(({ service }) => service.orderSummary);
  const couponModal = useSelector(({ service }) => service.couponModal);

  const handleClose = () => {
    dispatch(Action.couponModal(false));
  };

  const body = (
    <div className={classes.paper}>
      <h5 id="simple-modal-title">Apply Coupon Code</h5>
      <img src={Giftbox} alt="giftbox" className="mt-5" />
      <input
        defaultValue=""
        className="input-signing mt-5"
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter Coupon"
        type="text"
        style={{ position: "relative" }}
      />
      <p style={{ color: "#8D9296" }}>
        *Note: some of the coupon may apply multiple times.
      </p>
      <div
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="mt-4"
      >
        <button
          onClick={handleClose}
          style={{
            border: "none",
            // position: "absolute",
            height: "45px",
            backgroundColor: "transparent",
            color: "#8D9296",
          }}
          className="done-btnn"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            dispatch(
              Action.applyCoupon(
                couponCode,
                orderSummary?.order_summary?.order_id
              )
            );
          }}
          style={{
            border: "none",
            // position: "absolute",
            height: "45px",
          }}
          className="done-btnn ml-2"
        >
          Apply
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Deal Discount
      </button> */}
      <Modal
        open={couponModal}
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

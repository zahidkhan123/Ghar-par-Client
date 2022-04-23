import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ScratchCard from "react-scratchcard";
import Anniversary from "../../images/Anniversary-Art.svg";
import ScratchButton from "../../images/Scratch-Button.svg";
import DownArrow from "../../images/down-arrow-sketch.svg";
import Close from "../../images/giftbox_close.svg";
import * as Action from "../../store/actions";
import "./scratchModal.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    borderRadius: "10px",
    // textAlign: "center",
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
  const [applyButton, setApplyButton] = useState(false);
  const [couponCode, setCouponCode] = useState();
  let orderSummary = useSelector(({ service }) => service.orderSummary);
  const scratchModal = useSelector(({ service }) => service.scratchModal);

  const handleClose = () => {
    dispatch(Action.scratchModal(false));
  };

  const handleButton = () => {
    setApplyButton(true);
  };

  const settings = {
    width: 400,
    height: 80,
    image: ScratchButton,
    finishPercent: 60,
    onComplete: handleButton,
  };

  const body = (
    <div className={classes.paper}>
      <div className="d-none d-sm-block">
        <a className="close-btn close">
          <img onClick={handleClose} src={Close} alt="close" />
        </a>
      </div>
      <h2 id="simple-modal-title" className="text-center">
        CELEBRATING
      </h2>
      <img src={Anniversary} alt="Anniversary" className="mt-2" />
      <h2 className="text-center">
        SCRATCH TO{" "}
        <span
          style={{
            color: "#F68D2F",
            fontSize: "45px",
          }}
        >
          WIN!
        </span>
      </h2>
      <p className="text-center" style={{ color: "#8D9296" }}>
        Scratch the card by swaping on it.
      </p>
      <img src={DownArrow} alt="arrow" className="mb-2 ml-5" />
      <ScratchCard {...settings}>
        <h3 className="text-center">
          Rs. {orderSummary?.order?.offered_coupon_details?.discount}
        </h3>
      </ScratchCard>
      {/* <p style={{ color: "#8D9296" }}>
        *Note: some of the coupon may apply multiple times.
      </p> */}
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="mt-4"
      >
        {applyButton ? (
          <>
            <button
              onClick={() => {
                dispatch(
                  Action.applyCoupon(
                    orderSummary.order.offered_coupon_details.coupon_code,
                    orderSummary?.order_summary?.order_id
                  )
                );
              }}
              style={{
                border: "none",
                width: "45%",
                // position: "absolute",
                height: "45px",
              }}
              className="done-btnn ml-2"
            >
              Apply
            </button>
            <button
              onClick={handleClose}
              style={{
                border: "2px solid #8D9296",
                width: "45%",
                // position: "absolute",
                height: "45px",
                backgroundColor: "transparent",
                color: "#8D9296",
              }}
              className="done-btnn"
            >
              Not Now
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleClose}
              style={{
                border: "2px solid #8D9296",
                width: "100%",
                // position: "absolute",
                height: "45px",
                backgroundColor: "transparent",
                color: "#8D9296",
              }}
              className="done-btnn"
            >
              Not Now
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Deal Discount
      </button> */}
      <Modal
        open={scratchModal}
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

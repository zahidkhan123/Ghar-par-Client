import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Giftbox from "../../images/giftbox_popup.svg";
import Close from "../../images/giftbox_close.svg";
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
  let orderSummary = useSelector(({ service }) => service.orderSummary);
  const giftBoxModal = useSelector(({ service }) => service.giftBoxModal);
  const handleClose = () => {
    dispatch(Action.giftBoxModal(false));
  };

  const body = (
    <div className={classes.paper}>
      <div className="d-none d-sm-block">
        <a className="close-btn close">
          <img onClick={handleClose} src={Close} alt="close" />
        </a>
      </div>

      <img src={Giftbox} alt="giftbox" width="100%" className="mt-3" />
      <p className="mt-4" style={{ color: "#8D9296" }}>
        {orderSummary?.gift_popup_content}
      </p>
      <div
        style={{ display: "flex", justifyContent: "space-evenly" }}
        className="mt-4"
      >
        <button
          onClick={handleClose}
          style={{
            border: "1px solid #8D9296",
            // position: "absolute",
            height: "40px",
            backgroundColor: "transparent",
            color: "#8D9296",
            width: "40%",
          }}
          className="done-btnn"
        >
          No
        </button>
        <button
          onClick={() => {
            dispatch(
              Action.applygiftBox(orderSummary?.order_summary?.order_id)
            );
          }}
          style={{
            border: "none",
            // position: "absolute",
            height: "40px",
            width: "40%",
          }}
          className="done-btnn ml-2"
        >
          Yes
        </button>
      </div>
    </div>
  );
  return (
    <div>
      {orderSummary !== undefined &&
      orderSummary.gift_popup_content !== undefined &&
      orderSummary?.gift_popup_content !== "" &&
      orderSummary?.gift_popup_content !== null ? (
        <>
          <Modal
            open={giftBoxModal}
            className={classes.modal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

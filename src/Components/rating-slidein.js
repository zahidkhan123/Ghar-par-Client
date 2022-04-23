import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import clsx from "clsx";
import RateBeautician from "./rate-beautician";
import OrderCancel from "./orders-detail/order-cancel";
import * as Action from "../store/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    paddingBottom: 0,
    maxWidth: 960,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    right: 0,
    top: 0,
  },

  [theme.breakpoints.down("sm")]: {
    paper: {
      overflow: "auto",
    },
  },
}));

export default function RatingSlideIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const ratingSlideInModal = useSelector(
    ({ service }) => service.ratingSlideInModal
  );

  const handleClose = () => {
    localStorage.removeItem("orderShowId");
    dispatch({
      type: Action.RATING_SLIDE_IN_MODAL,
      payload: false,
    });
    // dispatch(Action.ratingSlideInModal(!ratingSlideInModal));
  };

  const body = (
    <section className="slidein-modal">
      <button
        type="button"
        className="close-btn"
        data-dismiss="paper"
        onClick={handleClose}
      ></button>
      <div className={classes.paper}>
        <button
          type="button"
          className="close-btn"
          data-dismiss="paper"
          onClick={handleClose}
        ></button>
        <div className="rating-slidein-body" id="simple-modal-description">
          <OrderCancel />
          <RateBeautician />
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        slidein
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

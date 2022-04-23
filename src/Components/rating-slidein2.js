import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import clsx from "clsx";
import RateBeautician from "./rate-beautician";
import OrderCancel from "./orders-detail/order-cancel";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    paddingBottom: 0,
    maxWidth: 960,
    height: "100%",
    // overflow: "visible,auto",
    // overflowY: "auto !important",
    // "overflow-x": "visible",
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
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <section className="slidein-modal">
      <div className={classes.paper}>
        <div className="rating-slidein-body" id="simple-modal-description">
          <button
            type="button"
            className="close-btn"
            data-dismiss="paper"
            onClick={handleClose}
          ></button>
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

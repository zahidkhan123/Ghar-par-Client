import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Warning from "../../images/ic_warning.svg";
import Close from "../../images/Group 1201.svg";
import * as Action from "../../store/actions";
import { history } from "../../index";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 382,
    height: 382,
    backgroundColor: theme.palette.background.paper,
    padding: 30,
    borderRadius: 20,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    paper: {
      width: 320,
      padding: 24,
    },
  },
}));

export default function DealNotAvailable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(props.open);

  const notActiveDeal = useSelector(({ service }) => service.notActiveDeal);

  // const handleOpen = () => {
  //   setOpen(notActiveDeal);
  // };

  const handleClose = () => {
    dispatch(Action.notActiveDealModal(false));
  };

  const body = (
    <section className="deal-c">
      <div className={classes.paper}>
        <a className="close-btn close">
          <img onClick={handleClose} src={Close} alt="close" />
        </a>
        <div className="deal-warning-title">
          <div className="container">
            <img src={Warning} alt="Warning-image" />
          </div>
        </div>
        <div className="deal-warning-body" id="simple-modal-description">
          <p>
            The selected deal service is not valid for specified Date & Time
          </p>

          <span
            onClick={() => {
              dispatch(Action.orderDetail(props.values, history));
              dispatch(Action.notActiveDealModal(false));
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
      {/* <button type="button" onClick={handleOpen}>
        Deal Not Available
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

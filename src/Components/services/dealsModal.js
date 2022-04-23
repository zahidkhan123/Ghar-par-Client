import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IndependenceDay from "../../images/Group 1173.svg";
import AvailDiscount from "../../images/Group 1193.svg";
import BackgroundImage from "../../images/Group 1194.svg";
import Close from "../../images/ic_close.svg";
import * as Action from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1120,
    height: 590,
    // backgroundColor: theme.palette.background.paper,
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
      height: 165,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

export default function DealsModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(props.open);
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [image, setImage] = React.useState("");

  const dealModal = useSelector(({ service }) => service.dealsModal);
  const deals = useSelector(({ service }) => service.dealsData);
  console.log(deals);

  useEffect(() => {
    if (deals) {
      setImage(deals?.deal_banner);
    }
  }, []);
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    localStorage.setItem("isClose", true);
    dispatch(Action.dealsModal(false));
  };

  const onImgLoad = ({ target: img }) => {
    setWidth(`${img.width}px`);
    setHeight(`${img.height}px`);
  };

  const body = (
    <section className="deal-discount">
      <div
        className={`${classes.paper} deal-popup `}
        style={{
          backgroundImage: `url(${deals?.deal_banner})`,
          "background-size": "cover",
          "background-repeat": "no-repeat",
          // width: width,
          // height: height,
          cursor: "pointer",
        }}
        onClick={() => {
          localStorage.setItem("isClose", true);
          dispatch(Action.dealsModal(false));
        }}
      >
        <img
          // onLoad={onImgLoad}
          style={{ display: "none" }}
          src={deals?.deal_banner}
          alt="close"
        />
        <a className="close-btn close">
          <img
            style={{ border: "1px solid red", borderRadius: "50%" }}
            onClick={handleClose}
            src={Close}
            alt="close"
          />
        </a>
        <div className="container">
          {/* <img src={IndependenceDay} alt="independence-day-image" /> */}
          {/* <img src={deals?.deal_banner} alt="independence-day-image" /> */}
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Deal Discount
      </button> */}
      <Modal
        open={dealModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

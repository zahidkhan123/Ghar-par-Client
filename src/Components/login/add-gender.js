import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Female from "../../images/ic_female.svg";
import * as Action from "../../store/actions";
import { history } from "../../index";
import AddCity from "./select-city";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 322,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
  },
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    width: 161,
    height: 161,
    color: "#fff",
    // backgroundImage: `url(${Female})`,
  },
  checkedIcon: {
    backgroundColor: "orange",

    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      content: "",
    },
  },
}));
function StyledRadio(props) {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Select Gender | GharPar";
  }, []);

  return (
    <Radio
      className={classes.root}
      color="default"
      {...props}
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
    />
  );
}

export default function AddGender(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // const genderModal = useSelector(({ auth }) => auth.genderModal);
  const cityModal = useSelector(({ auth }) => auth.cityModal);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGender = (name) => {
    dispatch(Action.genderModal(name, true));
  };

  const body = (
    <section className="select-gender">
      <div className={classes.paper}>
        <div id="simple-modal-title">
          <div className="container">
            <div id="simple-modal-title" className="modal-title">
              <label>Choose your gender</label>
            </div>
          </div>
        </div>
        <div className="select-address-body" id="simple-modal-description">
          <div className="container ">
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="customized-radios">
                <FormControlLabel
                  value="female"
                  control={<StyledRadio />}
                  label="I'm Female"
                  onClick={() => handleGender("Female")}
                  labelPlacement="bottom"
                  className="sel-female"
                  // style={{ color: "#fff" }}
                />

                <FormControlLabel
                  value="male"
                  label="I'm Male"
                  labelPlacement="bottom"
                  control={<StyledRadio />}
                  className="sel-male"
                  disabled
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Select Gender
      </button> */}
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <AddCity open={cityModal} />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ForArrow from "../../images/arrow-forward.svg";
import Tick from "../../images/ic_tick.svg";

import * as Action from "../../store/actions";
import { history } from "../../index";

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
    width: 29,
    height: 29,
    borderRadius: 4,
    backgroundColor: "#E2DCD9",
  },
  checkedIcon: {
    backgroundColor: "#F68D2F",

    backgroundImage: `url(${Tick})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "15px",

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
    document.title = "Select City | GharPar";
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
export default function AddCity(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cityId, setCityId] = useState("");
  const [cityName, setCityName] = useState("");

  const cityModal = useSelector(({ auth }) => auth.cityModal);
  const cities = useSelector(({ service }) => service.cities);

  useEffect(() => {
    dispatch(Action.getCities());
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCity = (cityId, cityName) => {
    setCityId(cityId);
    setCityName(cityName);
  };

  const submitCity = () => {
    dispatch(Action.cityModal(cityId, cityName, history));
  };

  const body = (
    <section className="select-city">
      <div className={classes.paper}>
        <div id="simple-modal-title">
          <div className="container">
            <div id="simple-modal-title" className="modal-title">
              <label>Select your city</label>
            </div>
          </div>
        </div>
        <div className="select-address-body" id="simple-modal-description">
          <div className="container ">
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="customized-radios">
                {cities &&
                  cities.map((city) => {
                    return (
                      <FormControlLabel
                        value={city.city_name}
                        label={city.city_name}
                        control={<StyledRadio />}
                        onClick={() => handleCity(city.id, city.city_name)}
                        labelPlacement="start"
                        className="sel-radio-btn"
                      />
                    );
                  })}
              </RadioGroup>
            </FormControl>

            <div className="sel-city-btn">
              {cityId && cityName ? (
                <button
                  type="submit2"
                  className="btn continue-btn "
                  style={{ backgroundColor: "#F68D2F" }}
                  onClick={submitCity}
                >
                  <img src={ForArrow} alt="arrow" />{" "}
                </button>
              ) : (
                <button type="submit2" className="btn continue-btn " disabled>
                  <img src={ForArrow} alt="arrow" />{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div>
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

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import FormControl from "@material-ui/core/FormControl";
// import clsx from "clsx";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import ForArrow from "../../images/arrow-forward.svg";
// import * as Action from "../../store/actions";
// import { history } from "../../index";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: "absolute",
//     width: 322,
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: 12,
//   },
//   root: {
//     "&:hover": {
//       backgroundColor: "transparent",
//     },
//   },
//   icon: {
//     width: 29,
//     height: 29,
//     borderRadius: 4,
//     backgroundColor: "#E2DCD9",
//   },
//   checkedIcon: {
//     backgroundColor: "#F68D2F",

//     "&:before": {
//       display: "block",
//       width: 16,
//       height: 16,

//       content: "",
//     },
//   },
// }));
// function StyledRadio(props) {
//   const classes = useStyles();

//   return (
//     <Radio
//       className={classes.root}
//       color="default"
//       {...props}
//       checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
//       icon={<span className={classes.icon} />}
//     />
//   );
// }
// export default function TransitionsModal() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const body = (
//     <section className="select-city">
//       <div className={classes.paper}>
//         <div id="simple-modal-title">
//           <div className="container">
//             <div id="simple-modal-title" className="modal-title">
//               <label>Select your city</label>
//             </div>
//           </div>
//         </div>
//         <div className="select-address-body" id="simple-modal-description">
//           <div className="container ">
//             <FormControl component="fieldset">
//               <RadioGroup aria-label="gender" name="customized-radios">
//                 <FormControlLabel
//                   value="Karachi"
//                   label="Karachi"
//                   control={<StyledRadio />}
//                   labelPlacement="start"
//                   className="sel-radio-btn"
//                 />
//                 <FormControlLabel
//                   value="Islamabad"
//                   control={<StyledRadio />}
//                   label="Islamabad"
//                   labelPlacement="start"
//                   className="sel-radio-btn"
//                 />
//                 <FormControlLabel
//                   value="Lahore"
//                   control={<StyledRadio />}
//                   label="Lahore"
//                   labelPlacement="start"
//                   className="sel-radio-btn"
//                 />
//                 <FormControlLabel
//                   value="Karachi"
//                   label="Karachi"
//                   control={<StyledRadio />}
//                   labelPlacement="start"
//                   className="sel-radio-btn"
//                 />
//                 <FormControlLabel
//                   value="Islamabad"
//                   control={<StyledRadio />}
//                   label="Islamabad"
//                   labelPlacement="start"
//                   className="sel-radio-btn"
//                 />
//                 <FormControlLabel
//                   value="Lahore"
//                   control={<StyledRadio />}
//                   label="Lahore"
//                   labelPlacement="start"
//                   className="sel-radio-btn"
//                 />
//               </RadioGroup>
//             </FormControl>

//             <div className="sel-city-btn">
//               <button type="submit2" className="btn continue-btn" disabled>
//                 {" "}
//                 <img src={ForArrow} alt="arrow" />{" "}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );

//   return (
//     <div>
//       <button type="button" onClick={handleOpen}>
//         Select City
//       </button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         {body}
//       </Modal>
//     </div>
//   );
// }

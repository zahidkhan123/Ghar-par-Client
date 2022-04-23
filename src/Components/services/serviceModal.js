import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Close from "../../images/ic_crossblack.svg";
import Plus from "../../images/ic_plus.svg";
import ActivePlus from "../../images/active_plus.svg";
import ActiveMinus from "../../images/active_minus.svg";
import * as Action from "../../store/actions";
import useForceUpdate from "use-force-update";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    padding: "16px 15px 24px 32px",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(2, 4, 3),
    borderRadius: 18,
  },
  [theme.breakpoints.down("sm")]: {
    paper: {
      width: 300,
    },
  },
}));

export default function ServicesAddOnModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [addOnArr, setAddOnArr] = useState([]);
  const [checkedArr, setCheckedArr] = useState([]);

  const forceUpdate = useForceUpdate();
  const modalOpen = useSelector(({ service }) => service.serviceModalOpen);
  const adds = useSelector(({ service }) => service.addsOn);
  // const checkedValues = useSelector(
  //   ({ service }) => service.addOnsCheckedValues
  // );
  const checkedValues = useSelector(({ service }) => service.addOnItem);

  const handleClose = () => {
    dispatch(Action.serviceModalAction(!modalOpen));
    setCheckedArr([]);
    setAddOnArr([]);
  };

  const handleDone = () => {
    dispatch(Action.serviceModalAction(!modalOpen));
    // dispatch(Action.addOnArrray());
    dispatch(Action.addData(addOnArr));
    // dispatch(Action.addOnsCheckValues(checkedArr));
    setCheckedArr([]);
    setAddOnArr([]);
  };
  const body = (
    <div className={classes.paper}>
      <div className="addon-header" id="simple-modal-title">
        <div className="container">
          <label>Add Ons</label>
          <a
            className="close-btn close"
            onClick={handleClose}
            style={{ cursor: "pointer", marginRight: "15px" }}
          >
            <img src={Close} alt="close" />
          </a>
        </div>
      </div>
      {/* <div className="services-detail"> */}
      <div className="addon-body" id="simple-modal-description">
        {adds?.map((add, index) => {
          return (
            <>
              <form>
                <div class="checkbtn border-bottom">
                  {/* <input
                    type="checkbox"
                    id={add.id}
                    name="check-box"
                    // checked={true}
                  /> */}

                  {checkedValues?.map((x) => {
                    return x?.map((y) => {
                      return y.type == true &&
                        y.id == add.id &&
                        y.service_id == add.service_id ? (
                        <input
                          type="checkbox"
                          id={add.id}
                          name="check-box"
                          checked={true}
                        />
                      ) : y.type == false &&
                        y.id == add.id &&
                        y.service_id == add.service_id ? (
                        <input
                          type="checkbox"
                          id={add.id}
                          name="check-box"
                          checked={false}
                        />
                      ) : null;
                    });
                  })}
                  {checkedArr?.map((y) => {
                    return y.type == true &&
                      y.id == add.id &&
                      y.serviceId == add.service_id ? (
                      <input
                        type="checkbox"
                        id={add.id}
                        name="check-box"
                        checked={true}
                      />
                    ) : y.type == false &&
                      y.id == add.id &&
                      y.serviceId == add.service_id ? (
                      <input
                        type="checkbox"
                        id={add.id}
                        name="check-box"
                        checked={false}
                      />
                    ) : null;
                  })}

                  <label
                    onClick={() => {
                      // dispatch(
                      //   Action.addOnsCheckValues(
                      //     true,
                      //     index,
                      //     add.service_id,
                      //     add.id
                      //   )
                      // );
                      for (let index = 0; index < checkedArr.length; index++) {
                        if (checkedArr[index].id == add.id) {
                          return;
                        }
                      }
                      setCheckedArr([
                        ...checkedArr,
                        {
                          type: true,
                          index: index,
                          serviceId: add.service_id,
                          id: add.id,
                        },
                      ]);
                      setAddOnArr([...addOnArr, { ...add, type: true }]);
                      // dispatch(Action.addData(add, index));
                      forceUpdate();
                    }}
                    for={add.id}
                    className="check-lab service-item"
                  >
                    <div className="container ">
                      <div className=" d-flex justify-content-between">
                        <div className="addsOn-service-title">
                          {add.service_title}
                        </div>
                        <div className="price-tag">
                          Rs. {add.service_addon_price}
                        </div>
                        <div className="text-right">
                          <span
                            onClick={(e) => {
                              dispatch(
                                Action.addOnsCheckValues(
                                  true,
                                  index,
                                  add.service_id,
                                  add.id
                                )
                              );
                              dispatch(Action.addData(add, index));
                            }}
                            type="button"
                            className="addsOnBtn"
                          >
                            <img src={Plus} alt="plus" />
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-md-8">
                        <label>{add.service_title}</label>
                      </div>
                      <div className="col-md-4 price-tag">
                        <label> Rs. {add.service_addon_price}</label>
                        <span>
                          <img src={Plus} alt="plus" />
                        </span>
                      </div>
                    </div> */}
                  </label>
                </div>
              </form>
            </>
          );
        })}
      </div>

      <div className="addon-btn text-right">
        <span type="button" className="cancel-btn" onClick={handleClose}>
          Cancel
        </span>
        <span
          onClick={handleDone}
          className="done-btn"
          style={{ cursor: "pointer" }}
        >
          Done
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        // disableBackdropClick
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
// import Close from "../../images/ic_crossblack.svg";
// import Plus from "../../images/ic_plus.svg";
// import ActivePlus from "../../images/active_plus.svg";
// import ActiveMinus from "../../images/active_minus.svg";
// import * as Action from "../../store/actions";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: "absolute",
//     width: 500,
//     left: "50%",
//     top: "50%",
//     transform: "translate(-50%,-50%)",
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(2, 4, 3),
//     borderRadius: 18,
//   },
//   [theme.breakpoints.down("sm")]: {
//     paper: {
//       width: 300,
//     },
//   },
// }));

// export default function ServicesAddOnModal(props) {
//   const classes = useStyles();
//   const dispatch = useDispatch();

//   const modalOpen = useSelector(({ service }) => service.serviceModalOpen);
//   const adds = useSelector(({ service }) => service.addsOn);
//   const checkedValues = useSelector(
//     ({ service }) => service.addOnsCheckedValues
//   );

//   const handleClose = () => {
//     dispatch(Action.serviceModalAction(!modalOpen));
//   };

//   const body = (
//     <div className={classes.paper}>
//       <div className="addon-header" id="simple-modal-title">
//         <div className="container">
//           <label>Add Ons</label>
//           <a className="close-btn close" onClick={handleClose}>
//             <img src={Close} alt="close" />
//           </a>
//         </div>
//       </div>
//       {/* <div className="services-detail"> */}
//       {adds?.map((add, index) => {
//         return (
//           <>
//             <div
//               key={add.id}
//               className="addon-body"
//               id="simple-modal-description"
//             >
//               <form>
//                 <div class="checkbtn border-bottom">
//                   {checkedValues?.map((x, index1) => {
//                     return x?.map((y) => {
//                       return y.type == false &&
//                         y.id == add.id &&
//                         y.serviceId === add.service_id ? (
//                         <input
//                           type="checkbox"
//                           id={add.id}
//                           name="check-box"
//                           checked={false}
//                         />
//                       ) : y.type == true &&
//                         y.id == add.id &&
//                         y.serviceId === add.service_id ? (
//                         <input
//                           type="checkbox"
//                           id={add.id}
//                           name="check-box"
//                           checked={true}
//                         />
//                       ) : null;
//                     });
//                   })}
//                   {/* <input type="checkbox" id={add.id} name="check-box" /> */}
//                   <label
//                     onClick={() => {
//                       dispatch(Action.addData(add, index));
//                       dispatch(
//                         Action.addOnsCheckValues(
//                           true,
//                           index,
//                           add.service_id,
//                           add.id
//                         )
//                       );
//                     }}
//                     for={add.id}
//                     className="check-lab service-item"
//                   >
//                     <div className="container ">
//                       <div className=" d-flex justify-content-between">
//                         <div className="addsOn-service-title">
//                           {add.service_title}
//                         </div>
//                         <div className="price-tag">
//                           Rs. {add.service_addon_price}
//                         </div>
//                         <div className="text-right">
//                           <span
//                             onClick={(e) => {
//                               dispatch(Action.addData(add, index));
//                               dispatch(
//                                 Action.addOnsCheckValues(
//                                   true,
//                                   index,
//                                   add.service_id,
//                                   add.id
//                                 )
//                               );
//                             }}
//                             type="button"
//                           >
//                             <img src={Plus} alt="plus" />
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     {/* <div className="row">
//                       <div className="col-md-8">
//                         <label>{add.service_title}</label>
//                       </div>
//                       <div className="col-md-4 price-tag">
//                         <label> Rs. {add.service_addon_price}</label>
//                         <span>
//                           <img src={Plus} alt="plus" />
//                         </span>
//                       </div>
//                     </div> */}
//                   </label>
//                 </div>
//               </form>
//             </div>
//           </>
//         );
//       })}
//       <div className="addon-btn text-right">
//         <span type="button" className="cancel-btn" onClick={handleClose}>
//           Cancel
//         </span>
//         <span onClick={handleClose} className="done-btn">
//           Done
//         </span>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <Modal
//         open={props.open}
//         onClose={handleClose}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         {body}
//       </Modal>
//     </div>
//   );
// }

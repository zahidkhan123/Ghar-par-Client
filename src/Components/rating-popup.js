import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Girl from "../images/girl.png";
import Girl2 from "../images/g2.png";
import YellowStar from "../images/ic_staryellow.svg";
import * as Action from "../store/actions";
import Star from "../images/ic_stargray.svg";
import Close from "../images/ic_cross.svg";
import ReactStars from "react-rating-stars-component";
import BeautyStars from "beauty-stars";
import { useForm } from "react-hook-form";
import useForceUpdate from "use-force-update";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 431,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
  [theme.breakpoints.down("sm")]: {
    paper: {
      width: 320,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

export default function RatingPopup(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [textDisplay, setTextDisplay] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [feedbackValue, setFeedbackValue] = useState("");
  const [check, setCheck] = useState(false);

  // const [error, setError] = useState(false);
  const { handleSubmit, register, errors, reset } = useForm({
    mode: "onSubmit",
  });
  const forceUpdate = useForceUpdate();

  const ratingPopup = useSelector(({ service }) => service.ratingPopup);
  const error = useSelector(({ service }) => service.feedbackError);

  const orderDetail = useSelector(({ service }) => service.showOrderDetail);
  const pendingRating = useSelector(({ service }) => service.pendingRating);

  const technicianRatings = useSelector(
    ({ service }) => service.technicianRatings
  );
  const ratingRecord = useSelector(({ service }) => service.ratingRecord);

  useEffect(() => {
    let orderJobsLength =
      pendingRating?.orders?.length > 0 &&
      pendingRating?.orders[0]?.order_jobs.length
        ? pendingRating?.orders[0]?.order_jobs.length
        : orderDetail?.order_jobs?.length;

    for (let i = 0; i <= orderJobsLength; i++) {
      textDisplay.push("true");
    }
  }, []);

  useEffect(() => {
    setTextDisplay([]);
  }, [pendingRating]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setError(false);
  };

  const handleSubmitt = () => {
    let data = technicianRatings?.map((x, index) => {
      if (x.job_rating <= 3 && x.comments == "") {
        // setError(true);
        dispatch(Action.feedBackError(true));
      }
    });

    let orderJobsLength =
      pendingRating?.orders?.length > 0 &&
      pendingRating?.orders[0]?.order_jobs.length
        ? pendingRating?.orders[0]?.order_jobs.length
        : orderDetail?.order_jobs?.length;
    let technicianRatingLength = technicianRatings?.length;

    if (technicianRatingLength < orderJobsLength) {
      // setError(true);
      dispatch(Action.feedBackError(true));
    }

    // ratingData();
    dispatch(
      Action.submitRating(
        pendingRating?.orders?.length > 0 && pendingRating?.orders[0]?.id
          ? pendingRating?.orders[0]?.id
          : orderDetail?.id,
        technicianRatingLength,
        orderJobsLength
      )
    );
    dispatch(
      Action.ratingRecords(
        pendingRating?.orders?.length > 0 && pendingRating?.orders[0]?.id
          ? pendingRating?.orders[0]?.id
          : orderDetail?.id,
        true
      )
    );
  };
  // let textDisplayy = localStorage.getItem("textDisplay");

  // if (textDisplayy) {
  //   setTextDisplay([]);
  //   localStorage.removeItem("textDisplay");
  // }

  // const ratingData = () => {

  //   if (error == false) {
  //   }
  //   // dispatch(Action.submitRating(orderDetail.id));
  //   // dispatch(Action.ratingRecords(orderDetail.id, true));
  // };

  const handleformRating = (values) => {
    // if (values.length < 0) {
    //   dispatch(Action.feedBackError(true));
    // }
  };

  const body = (
    <section className="rating-popup">
      <div className={classes.paper}>
        <div className="rating-header">
          <label>
            Order ID:{" "}
            {pendingRating?.orders?.length > 0 && pendingRating?.orders[0]?.id
              ? pendingRating?.orders[0]?.custom_order_id
              : orderDetail?.custom_order_id}
          </label>
          {/* <a href="#"> */}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              let id =
                pendingRating?.orders?.length > 0 &&
                pendingRating?.orders[0]?.id
                  ? pendingRating?.orders[0]?.id
                  : orderDetail?.id;
              dispatch(Action.ratingSlideInModal(false, id));
              setTextDisplay([]);
              // setError(false);
              dispatch(Action.skipRating(id));
              localStorage.setItem("tokenn", true);
              dispatch(Action.pendingRating());
              dispatch(Action.feedBackError(false));
              // dispatch(Action.ratingPopup(!ratingPopup));
            }}
          >
            <img src={Close} alt="close button" />
          </span>
          {/* </a> */}
        </div>
        <form onSubmit={handleSubmit(handleformRating)}>
          <div className="rating-body-wrap">
            {pendingRating?.orders?.length > 0
              ? pendingRating?.orders[0]?.order_jobs?.map((x, index) => {
                  return (
                    <div className="rating-body">
                      <img
                        src={
                          x?.technician?.profile_photo_url
                            ? x?.technician?.profile_photo_url
                            : Girl
                        }
                        // src={Girl}
                        style={{
                          borderRadius: "50%",
                          width: "50px",
                          height: "40px",
                        }}
                        alt="Technicions"
                      />
                      <div className="rating-name">
                        <label>{`${x?.technician?.first_name} ${x?.technician?.last_name} ${x?.technician?.membership_code}`}</label>
                      </div>
                      <span>Job ID: {x?.job_code}</span>
                      <small>
                        {/* {orderDetail?.order_date} - {x?.end_time} */}
                        {pendingRating?.orders[0].order_date} - {x?.end_time}
                      </small>

                      {/* <img src={YellowStar} alt="yellowstar" />
                <img src={YellowStar} alt="yellowstar" />
                <img src={YellowStar} alt="yellowstar" />
                <img src={YellowStar} alt="yellowstar" />
                <img src={Star} alt="star" /> */}

                      {/* <div className="rating-stars">
                <ReactStars
                  size={30}
                  // value={z.rating}
                  onChange={(newRating) => {
                    dispatch(
                      Action.technicianRating(newRating, x.id, x, index)
                    );
                  }}
                  emptyIcon={<i className="fa fa-star" />}
                  halfIcon={<i className="fa fa-star-half-alt" />}
                  filledIcon={<i className="fa fa-star" />}
                />
              </div> */}

                      {technicianRatings.length > 0 &&
                        technicianRatings
                          .filter((y) => y.id == x.id)
                          .map((z) => {
                            return (
                              <>
                                <div className="rating-stars">
                                  {/* <ReactStars
                              size={30}
                              count={5}
                              isHalf={false}
                              value={z.job_rating}
                              onChange={(newRating) => {
                                dispatch(
                                  Action.technicianRating(
                                    newRating,
                                    x.id,
                                    x,
                                    index
                                  )
                                );
                              }}
                              // emptyIcon={<i className="fa fa-star" />}
                              // halfIcon={<i className="fa fa-star-half-alt" />}
                              // filledIcon={<i className="fa fa-star" />}
                            /> */}
                                  <BeautyStars
                                    size={30}
                                    inactiveColor="#808080"
                                    value={z.job_rating}
                                    onChange={(newRating) => {
                                      dispatch(
                                        Action.technicianRating(
                                          newRating,
                                          x.id,
                                          x,
                                          index
                                        )
                                      );
                                      // setError(false);
                                      dispatch(Action.feedBackError(false));
                                    }}
                                  />
                                </div>

                                <div className="form-group">
                                  <textarea
                                    className="rating-comment"
                                    rows="3"
                                    value={z.comments}
                                    onChange={(e) => {
                                      dispatch(
                                        Action.ratingPopupComment(
                                          e.target.value,
                                          z.id
                                        )
                                      );
                                      // setError(false);
                                      dispatch(Action.feedBackError(false));
                                    }}
                                    id="comment"
                                    placeholder="write your comments"
                                  />
                                </div>
                                {error &&
                                  z.job_rating <= 3 &&
                                  z.comments === "" && (
                                    <span
                                      style={{
                                        width: "100%",
                                        color: "red",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      Feedback required
                                    </span>
                                  )}
                              </>
                            );
                          })}
                      {textDisplay[index] !== false && (
                        <div className="rating-stars smoothing">
                          {/* <ReactStars
                      size={30}
                      count={5}
                      isHalf={false}
                      onChange={(newRating) => {
                        setTextDisplay([...textDisplay]);
                        dispatch(
                          Action.technicianRating(newRating, x.id, x, index)
                        );
                      }}
                      // emptyIcon={<i className="fa fa-star" />}
                      // halfIcon={<i className="fa fa-star-half-alt" />}
                      // filledIcon={<i className="fa fa-star" />}
                    /> */}
                          <BeautyStars
                            size={30}
                            inactiveColor="#808080"
                            onChange={(newRating) => {
                              // setTextDisplay([...textDisplay, false]);
                              textDisplay[index] = false;

                              // textDisplay.splice(index, 0, false);
                              dispatch(
                                Action.technicianRating(
                                  newRating,
                                  x.id,
                                  x,
                                  index
                                )
                              );
                              // setError(false);
                              dispatch(Action.feedBackError(false));
                            }}
                          />
                          <input
                            style={{ display: "none" }}
                            name={`rating${index}`}
                            type="text"
                            ref={register({ required: "Required" })}
                          />

                          {error && `${errors}.rating${index}` && (
                            <p
                              style={{
                                marginTop: "10px",
                                color: "red",
                              }}
                            >
                              Rating required
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              : orderDetail?.order_jobs?.map((x, index) => {
                  return (
                    <div className="rating-body">
                      <img
                        src={
                          x?.technician?.profile_photo_url
                            ? x?.technician?.profile_photo_url
                            : Girl
                        }
                        // src={Girl}
                        style={{
                          borderRadius: "50%",
                          width: "50px",
                          height: "40px",
                        }}
                        alt="Technicions"
                      />
                      <div className="rating-name">
                        <label>{`${x?.technician?.first_name} ${x?.technician?.last_name} ${x?.technician?.user_details?.beautician_code}`}</label>
                      </div>
                      <span>Job ID: {x?.job_code}</span>
                      <small>
                        {orderDetail?.order_date} - {x?.end_time}
                      </small>

                      {/* <img src={YellowStar} alt="yellowstar" />
                <img src={YellowStar} alt="yellowstar" />
                <img src={YellowStar} alt="yellowstar" />
                <img src={YellowStar} alt="yellowstar" />
                <img src={Star} alt="star" /> */}

                      {/* <div className="rating-stars">
                <ReactStars
                  size={30}
                  // value={z.rating}
                  onChange={(newRating) => {
                    dispatch(
                      Action.technicianRating(newRating, x.id, x, index)
                    );
                  }}
                  emptyIcon={<i className="fa fa-star" />}
                  halfIcon={<i className="fa fa-star-half-alt" />}
                  filledIcon={<i className="fa fa-star" />}
                />
              </div> */}

                      {technicianRatings.length > 0 &&
                        technicianRatings
                          .filter((y) => y.id == x.id)
                          .map((z) => {
                            return (
                              <>
                                <div className="rating-stars">
                                  {/* <ReactStars
                              size={30}
                              count={5}
                              isHalf={false}
                              value={z.job_rating}
                              onChange={(newRating) => {
                                dispatch(
                                  Action.technicianRating(
                                    newRating,
                                    x.id,
                                    x,
                                    index
                                  )
                                );
                              }}
                              // emptyIcon={<i className="fa fa-star" />}
                              // halfIcon={<i className="fa fa-star-half-alt" />}
                              // filledIcon={<i className="fa fa-star" />}
                            /> */}
                                  <BeautyStars
                                    size={30}
                                    inactiveColor="#808080"
                                    value={z.job_rating}
                                    onChange={(newRating) => {
                                      dispatch(
                                        Action.technicianRating(
                                          newRating,
                                          x.id,
                                          x,
                                          index
                                        )
                                      );
                                      // setError(false);
                                      dispatch(Action.feedBackError(false));
                                    }}
                                  />
                                </div>

                                <div className="form-group">
                                  <textarea
                                    className="rating-comment"
                                    rows="3"
                                    value={z.comments}
                                    onChange={(e) => {
                                      dispatch(
                                        Action.ratingPopupComment(
                                          e.target.value,
                                          z.id
                                        )
                                      );
                                      // setError(false);
                                      dispatch(Action.feedBackError(false));
                                    }}
                                    id="comment"
                                    placeholder="write your comments"
                                  />
                                </div>
                                {error &&
                                  z.job_rating <= 3 &&
                                  z.comments === "" && (
                                    <span
                                      style={{
                                        width: "100%",
                                        color: "red",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      Feedback required
                                    </span>
                                  )}
                              </>
                            );
                          })}
                      {textDisplay[index] !== false && (
                        <div className="rating-stars smoothing">
                          {/* <ReactStars
                      size={30}
                      count={5}
                      isHalf={false}
                      onChange={(newRating) => {
                        setTextDisplay([...textDisplay, false]);
                        dispatch(
                          Action.technicianRating(newRating, x.id, x, index)
                        );
                      }}
                      // emptyIcon={<i className="fa fa-star" />}
                      // halfIcon={<i className="fa fa-star-half-alt" />}
                      // filledIcon={<i className="fa fa-star" />}
                    /> */}
                          <BeautyStars
                            size={30}
                            inactiveColor="#808080"
                            onChange={(newRating) => {
                              // setTextDisplay([...textDisplay, false]);
                              textDisplay[index] = false;

                              // textDisplay.splice(index, 0, false);

                              dispatch(
                                Action.technicianRating(
                                  newRating,
                                  x.id,
                                  x,
                                  index
                                )
                              );
                              // setError(false);
                              dispatch(Action.feedBackError(false));
                            }}
                          />
                          <input
                            style={{ display: "none" }}
                            name={`rating${index}`}
                            type="text"
                            ref={register({ required: "Required" })}
                          />

                          {error && `${errors}.rating${index}` && (
                            <span
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              Rating required
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
          </div>

          {/* <div className="rating-body">
          <img src={Girl} alt="Technicions" />
          <div className="rating-name">
            <label>Neelam Kashif GP1103</label>
          </div>
          <span>Job ID: 29672-02</span>
          <small>02 Feb, 2020 - 11:30 AM</small>

          <div className="rating-stars">
            <img src={YellowStar} alt="yellowstar" />
            <img src={YellowStar} alt="yellowstar" />
            <img src={YellowStar} alt="yellowstar" />
            <img src={YellowStar} alt="yellowstar" />
            <img src={Star} alt="star" />
          </div>
        </div>
        <div className="rating-body">
          <img src={Girl2} alt="Technicions" />
          <div className="rating-name">
            <label>Neelam Kashif GP1103</label>
          </div>
          <span>Job ID: 29672-02</span>
          <small>02 Feb, 2020 - 11:30 AM</small>
        </div>

        <div className="rating-stars">
          <img src={YellowStar} alt="yellowstar" />
          <img src={YellowStar} alt="yellowstar" />
          <img src={Star} alt="star" />
          <img src={Star} alt="star" />
          <img src={Star} alt="star" />
        </div> */}
          <div className="form-group" style={{ marginTop: "20px" }}>
            {/* <textarea
            className="rating-comment"
            rows="3"
            id="comment"
            placeholder="write your comments"
          ></textarea> */}
            <button
              // onClick={() => setCheck(true)}
              onClick={handleSubmitt}
              className="btn btn-primary"
              style={{ width: "150px" }}
              type="submit312312"
            >
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    </section>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Rating
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

import React, { Fragment, useState, useEffect, useRef } from "react";
import ForArrow from "../../images/arrow-forward.svg";
import { Redirect, Route, NavLink, useRouteMatch } from "react-router-dom";
import Banner from "../banner";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../store/actions";
import useQuery from "./../../custom-hook/useQuery";
import { toast, ToastContainer } from "react-toastify";
import Profile from "../../images/dummy.jpg";
import { history } from "../../index";
import Footer from "./../footer";

toast.configure();

function Milestones(props) {
  const [code, setCode] = useState("");
  const [isReffered, setIsReffered] = useState(false);
  const dispatch = useDispatch();
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  const changeHandler = (event) => {
    setCode(event.target.value);
  };
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success("Copied on clipboard");
  }

  const refferalError = useSelector(({ service }) => service.refferalError);
  const refferalSuccess = useSelector(({ service }) => service.refferalSuccess);

  useEffect(() => {
    if (refferalError?.length > 0) {
      toast.error(refferalError);
      dispatch({
        type: Action.REFFERALCODE,
        refferalError: "",
      });
    } else if (refferalSuccess?.length > 0) {
      toast.success(refferalSuccess);
      setIsReffered(true);
      dispatch(Action.userMilestones());
      dispatch({
        type: Action.REFFERALCODE,
        refferalSuccess: "",
      });
    }
  }, [refferalError, refferalSuccess]);

  const data = useSelector(({ service }) => service.userMilestones);
  const refferalText =
    "Hi, To get 18% discount on your first order from GharPar Beauty Services please use my referral code " +
    data?.user?.referral_code +
    ". Place your order now! app.gharpar.co";

  useEffect(() => {
    dispatch(Action.userMilestones());
  }, []);

  return (
    <Fragment>
      {data !== undefined && data.user !== undefined ? (
        <>
          <div className="container">
            <div className="welcome-box">
              <div className="id-picture">
                {data.user.profile_photo_url !== null ? (
                  <>
                    <img src={data.user.profile_photo_url} alt="" />
                  </>
                ) : (
                  <>
                    <img src={Profile} alt="" />
                  </>
                )}
              </div>
              <div className="id-profile">
                <div className="id-name">
                  Hello, {data.user.first_name} {data.user.last_name}
                </div>
                <div className="id-status">
                  Keep your milestone complete and get rewarded
                </div>
                {data.user.referred_by !== null ? (
                  <>
                    <div className="id-referal">
                      You referred by: {data.user.referred_by}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {data?.user?.is_first_order === false &&
            data?.user?.referred_by === null &&
            isReffered === false ? (
              <>
                <div className="shadow-box">
                  <div className="box-heading">Refferal Code</div>
                  <div className="box-content">
                    <div className="input-referral-one">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Referral code"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={changeHandler}
                      />
                      <button
                        className="btn-group"
                        type="button"
                        onClick={() => {
                          dispatch(Action.addReferalCode(code));
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="shadow-box">
              <div className="box-heading">
                Complete your 3 orders to get your referral code.
              </div>
              <div className="box-content">
                <ul>
                  {data.user.completed_orders_count === 0 ? (
                    <>
                      <li>
                        {data.user.referred_by !== null ? (
                          <>
                            <label htmlFor="ck1">
                              <input
                                type="checkbox"
                                name="ck1"
                                checked={false}
                              />{" "}
                              Place your 1st order and get <span>18% OFF.</span>{" "}
                            </label>
                          </>
                        ) : (
                          <>
                            <label htmlFor="ck1">
                              <input
                                type="checkbox"
                                name="ck1"
                                checked={false}
                              />{" "}
                              Place your 1st order and get <span>15% OFF.</span>{" "}
                            </label>
                          </>
                        )}
                      </li>

                      <li>
                        <div disabled>
                          <label htmlFor="ck2">
                            <input type="checkbox" name="ck2" checked={false} />{" "}
                            Place your 2nd order and get <span>15% OFF.</span>{" "}
                          </label>
                        </div>
                      </li>

                      <li>
                        <div disabled>
                          <label htmlFor="ck3">
                            <input type="checkbox" name="ck3" checked={false} />{" "}
                            Place your 3rd order and get <span>10% OFF.</span>{" "}
                          </label>
                        </div>
                      </li>
                    </>
                  ) : data.user.completed_orders_count === 1 ? (
                    <>
                      <li>
                        {data.user.referred_by !== null ? (
                          <>
                            <label htmlFor="ck1">
                              <input type="checkbox" name="ck1" checked />{" "}
                              <del>
                                Place your 1st order and get{" "}
                                <span>18% OFF.</span>{" "}
                              </del>
                            </label>
                          </>
                        ) : (
                          <>
                            <label htmlFor="ck1">
                              <input type="checkbox" name="ck1" checked />{" "}
                              <del>
                                Place your 1st order and get{" "}
                                <span>15% OFF.</span>{" "}
                              </del>
                            </label>
                          </>
                        )}
                      </li>
                      <li>
                        <label htmlFor="ck2">
                          <input type="checkbox" name="ck2" checked={false} />{" "}
                          Place your 2nd order and get <span>15% OFF.</span>{" "}
                        </label>
                      </li>

                      <li>
                        <div disabled>
                          <label htmlFor="ck3">
                            <input type="checkbox" name="ck3" checked={false} />{" "}
                            Place your 3rd order and get <span>10% OFF.</span>{" "}
                          </label>
                        </div>
                      </li>
                    </>
                  ) : data.user.completed_orders_count === 2 ? (
                    <>
                      <li>
                        {data.user.referred_by !== null ? (
                          <>
                            <label htmlFor="ck1">
                              <input type="checkbox" name="ck1" checked />{" "}
                              <del>
                                Place your 1st order and get{" "}
                                <span>18% OFF.</span>{" "}
                              </del>
                            </label>
                          </>
                        ) : (
                          <>
                            <label htmlFor="ck2">
                              <input type="checkbox" name="ck2" checked />{" "}
                              <del>
                                Place your 1st order and get{" "}
                                <span>15% OFF.</span>{" "}
                              </del>
                            </label>
                          </>
                        )}
                      </li>
                      <li>
                        <label htmlFor="ck2">
                          <input type="checkbox" name="ck2" checked />{" "}
                          <del>
                            Place your 2nd order and get <span>15% OFF.</span>{" "}
                          </del>
                        </label>
                      </li>
                      <li>
                        <label htmlFor="ck3">
                          <input type="checkbox" name="ck3" checked={false} />{" "}
                          Place your 3rd order and get <span>10% OFF.</span>{" "}
                        </label>
                      </li>
                    </>
                  ) : data.user.completed_orders_count === 3 ||
                    data.user.completed_orders_count > 3 ? (
                    <>
                      <li>
                        {data.user.referred_by !== null ? (
                          <>
                            <label htmlFor="ck1">
                              <input type="checkbox" name="ck1" checked />{" "}
                              <del>
                                Place your 1st order and get{" "}
                                <span>18% OFF.</span>{" "}
                              </del>
                            </label>
                          </>
                        ) : (
                          <>
                            <label htmlFor="ck2">
                              <input type="checkbox" name="ck2" checked />{" "}
                              <del>
                                Place your 1st order and get{" "}
                                <span>15% OFF.</span>{" "}
                              </del>
                            </label>
                          </>
                        )}
                      </li>
                      <li>
                        <label htmlFor="ck2">
                          <input type="checkbox" name="ck2" checked />{" "}
                          <del>
                            Place your 2nd order and get <span>15% OFF.</span>{" "}
                          </del>
                        </label>
                      </li>
                      <li>
                        <label htmlFor="ck3">
                          <input type="checkbox" name="ck3" checked />{" "}
                          <del>
                            Place your 3rd order and get <span>10% OFF.</span>{" "}
                          </del>
                        </label>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </div>
            {data.milestones[1].is_milestone_unlock ? (
              <>
                <div className="shadow-box">
                  <div className="box-heading">
                    Share referral code with your friends and get a free
                    service.
                  </div>
                  <div className="box-content">
                    <div className="input-referral">
                      <textarea
                        className="form-control"
                        value={data.user.referral_code}
                        // ref={textAreaRef}
                      />
                      <textarea
                        style={{ position: "absolute", left: "-2000px" }}
                        className="form-control"
                        value={refferalText}
                        ref={textAreaRef}
                      />
                      <button
                        className="btn-group"
                        type="button"
                        onClick={copyToClipboard}
                      >
                        Share
                      </button>
                    </div>
                    <div className="share-order">
                      <div className="status-label">
                        <span>{data.user.referred_users_count}</span> Signup
                        Users
                      </div>
                      <div className="status-label">
                        <span>{data.user.referred_orders_count}</span> Ordered
                        Users
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div disabled>
                  <div className="shadow-box">
                    <div className="box-heading">
                      Share referral code with your friends and get a free
                      service.
                    </div>
                    <div className="box-content">
                      <div className="input-referral">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Referral code"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          // value={data.user.referral_code}
                        />
                        <button className="btn-group" type="button">
                          Share
                        </button>
                      </div>
                      <div className="share-order">
                        <div className="status-label">
                          <span>0</span> Signup Users
                        </div>
                        <div className="status-label">
                          <span>0</span> Ordered Users
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {data.milestones[2].is_milestone_unlock ? (
              <>
                <div className="shadow-box">
                  <div className="box-heading">
                    Redeem a free service.
                    <label>
                      Redeemed:{" "}
                      <span>
                        {data.milestones[2].availed_free_service_count}/
                        {data.milestones[2].free_service_count}
                      </span>
                    </label>
                  </div>
                  <div className="id-service">
                    Note: Packages are not eligible for free service.{" "}
                  </div>
                  <div className="box-content last">
                    <button className="btn-redeem" disabled>
                      Redeem Service
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div disabled>
                  <div className="shadow-box">
                    <div className="box-heading">
                      Redeem a free service.
                      <label>
                        Redeemed:{" "}
                        <span>
                          {data.milestones[2].availed_free_service_count}/
                          {data.milestones[2].free_service_count}
                        </span>
                      </label>
                    </div>
                    <div className="id-service">
                      Note: Packages are not eligible for free service.{" "}
                    </div>
                    <div className="box-content last">
                      <button className="btn-redeem" disabled>
                        Redeem Service
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="mt-5">
        <Footer />
      </div>
    </Fragment>
  );
}

export default Milestones;

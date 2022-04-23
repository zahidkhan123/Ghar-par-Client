import React, { useState, useEffect } from "react";
import Topinfobar from "./../fixed-top";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../store/actions";
import { history } from "../../index";
import Sale from "../../images/Group 1138.svg";
import Gift from "../../images/gift.svg";
import Disclaimer from "../../images/iconfinder_Warning.svg";
import GiftBox from "../../images/giftbox.png";
import GiftBoxShow from "../../images/giftbox_showpage.png";
import { toast, ToastContainer } from "react-toastify";

import moment from "moment";
import { useRouteMatch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import GetDiscount from "./../get-discount";
import Footer from "./../footer";
import CnicModal from "./pending-order-modal";
import CouponModal from "./couponModal";
import GiftBoxModal from "./giftBoxModal";
import ScratchModal from "./scratchModal";
import { redeemFreeService } from "../../store/actions";

toast.configure();
const CustomerRecep = () => {
  const dispatch = useDispatch();
  let { url } = useRouteMatch();
  localStorage.setItem("url", url);

  const notify = (msg) => {
    toast.error(msg);
  };

  const [arr, setArr] = useState([]);
  const [addOnArr, setAddOnArr] = useState([]);
  const [couponCode, setCouponCode] = useState();
  const [couponCodee, setCouponCodee] = useState();

  const userMilestone = useSelector(({ service }) => service.userMilestones);
  const redeemFreeService = useSelector(
    ({ service }) => service.redeemFreeService
  );

  let items = useSelector(({ service }) => service.items);
  let addOnItems = useSelector(({ service }) => service.addOnItem);
  let data = useSelector(({ auth }) => auth.userData);
  let orderDetail = useSelector(({ service }) => service.orderDetail);
  let orderSummary = useSelector(({ service }) => service.orderSummary);
  let guestUser = useSelector(({ auth }) => auth.guestUser);
  const discount = useSelector(({ service }) => service.discountModal);
  const cnic = useSelector(({ service }) => service.cnicModal);
  const totalPrice = useSelector(({ service }) => service.totalPrice);
  const limitation = useSelector(({ service }) => service.limitation);
  const lastStateValue = useSelector(({ service }) => service.lastStateValue);
  const couponData = useSelector(({ service }) => service.couponData);
  const isGiftBox = useSelector(({ service }) => service.isGiftBox);
  let isFreeService =
    redeemFreeService?.order_billing?.free_service_redeemed_discount;
  const cancelCouponData = useSelector(
    ({ service }) => service.cancelCouponData
  );
  const couponError = useSelector(({ service }) => service.couponError);
  const couponType = useSelector(({ service }) => service.couponType);
  const submitError = useSelector(
    ({ service }) => service.submitSuccessErrorMsg
  );
  const submitType = useSelector(({ service }) => service.submitType);

  let is_reorder = false;
  if (
    orderSummary.order.reorder_id !== undefined &&
    orderSummary.order.reorder_id != ""
  ) {
    is_reorder = true;
  }
  window.onbeforeunload = function (e) {
    e.preventDefault();

    // history.push("/home/services");
    // dispatch(Action.discountModal(false));
    //   dispatch(Action.cnicModal(false));
    dispatch(Action.lastStateValue(true));
  };

  useEffect(() => {
    dispatch(Action.userMilestones());
  }, []);

  // useEffect(() => {
  //   dispatch(Action.orderDetail());
  // }, []);

  useEffect(() => {
    dispatch(Action.Addresses());
    // dispatch(Action.discountModal(false));
    // dispatch(Action.cnicModal(false));
    localStorage.removeItem("page");
    if (orderSummary?.order?.coupon_details) {
      localStorage.setItem("firstOrder", true);
    }
  }, []);
  useEffect(() => {
    if (
      orderSummary?.order?.offered_coupon_details !== undefined &&
      Object.keys(orderSummary?.order?.offered_coupon_details).length > 0
    ) {
      dispatch({
        type: Action.SCRATCH_MODAL,
        payload: true,
      });
    }
  }, []);

  useEffect(() => {
    if (couponData) {
      setCouponCode(couponData.coupon_details.coupon_code);
    }
  }, [couponData]);

  useEffect(() => {
    document.title = "Summary | GharPar";
    if (orderSummary?.order?.coupon_details) {
      setCouponCode(orderSummary?.order?.coupon_details?.coupon_code);
    }
  }, []);

  useEffect(() => {
    // dispatch({
    //   type: Action.COUPON_CODE,
    //   couponType: false,
    // });
    dispatch({
      type: Action.SUBMIT_ORDER_UNSUCCESS,
      errorMsg: "",
      errorType: false,
    });
    dispatch({
      type: Action.GIFTBOX_MODAL,
      payload: true,
    });
    dispatch({
      type: Action.IS_GIFTBOX,
      payload: false,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: Action.REDEEMFREESERVICE,
      payload: "",
      freeServiceSuccess: "",
      freeServiceError: "",
    });
  }, []);

  // useEffect(() => {
  //   let freeServiceError = localStorage.getItem("freeServiceError");
  //   let freeServiceSuccess = localStorage.getItem("freeServiceSuccess");
  //   if (freeServiceError?.length > 0) {
  //     toast.error(freeServiceError);
  //     localStorage.removeItem("freeServiceError");
  //   } else if (freeServiceSuccess?.length > 0) {
  //     toast.success(freeServiceSuccess);
  //     localStorage.removeItem("freeServiceSuccess");
  //   }
  // }, []);

  useEffect(() => {
    dispatch({
      type: Action.COUPON_CODE,
      payload: couponData,
      couponType: false,
      couponError: "",
    });
  }, []);

  useEffect(() => {
    if (couponError?.length > 0) {
      notify(couponError);
      dispatch({
        type: Action.COUPON_CODE,
        couponType: false,
        couponError: "",
      });
    } else if (couponData && localStorage.getItem("couponState")) {
      toast.success("coupon applied successfully");
      localStorage.removeItem("couponState");
      // dispatch(Action.removeCouponErrorMsg());
    }
  }, [couponData, couponError]);

  useEffect(() => {
    if (submitError?.length > 0) {
      notify(submitError);
      dispatch({
        type: Action.SUBMIT_ORDER_UNSUCCESS,
        errorMsg: "",
        errorType: false,
      });
    }
  }, [submitError]);

  // const expiryDate = () => {
  //   if (couponData) {
  //     if (couponData?.coupon_details?.end_datetime) {
  //       console.log("coupon date");
  //       return couponData?.coupon_details?.end_datetime;
  //     } else {
  //       console.log("coupon description");
  //       return couponData?.coupon_details?.description;
  //     }
  //   } else if (orderSummary?.order?.coupon_details?.end_datetime) {
  //     console.log("coupon date");
  //     return orderSummary?.order?.coupon_details?.end_datetime;
  //   } else {
  //     console.log("coupon description");

  //     return orderSummary?.order?.coupon_details?.description;
  //   }
  // };
  return (
    <>
      <Topinfobar />
      <CouponModal />
      <GiftBoxModal />
      <ScratchModal />
      <section className="cutomer-recep" style={{ marginTop: "50px" }}>
        <div className="container">
          {/* <section className="cutomer-recep"> */}
          <div
            className="customer-dtl"
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              <div className="date-time">
                <label>
                  {moment(orderSummary?.order?.order_date).format(
                    "MMMM DD, YYYY"
                  )}
                </label>
                <label>{orderSummary?.order?.order_time}</label>
              </div>
              <div className="personal-dtl">
                <label>
                  {guestUser ? (
                    "User"
                  ) : (
                    <>
                      {data?.first_name + " " + data?.last_name + " "}

                      {data?.membership_code && (
                        <small>({data?.membership_code})</small>
                      )}
                    </>
                  )}
                </label>
                <address>
                  {`${
                    orderSummary?.order?.address?.address_1
                      ? orderSummary?.order?.address?.address_1
                      : ""
                  }, ${orderSummary?.order?.address?.area?.area}, ${
                    orderSummary?.order?.address?.city?.city_name
                  }`}
                </address>
                <label>
                  {data?.country_code}
                  {data?.phone}
                </label>
              </div>
            </div>
            <div className="d-none d-sm-block">
              {isGiftBox ? (
                <>
                  <div>
                    <img src={Gift} alt="" />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="order-summary">
            {localStorage.getItem("dealItemInCart") && (
              <div class="alert alert-warning" role="alert">
                <strong>
                  <img
                    src={Disclaimer}
                    alt="sale"
                    style={{ marginRight: "15px" }}
                  />
                </strong>
                {/* {couponData 
                  ? `All deal services discount won't be applied`
                  : `When coupon is applied all the services which are part of deal, Will apply standard charges.`} */}
                {couponData || localStorage.getItem("firstOrder")
                  ? `When coupon is applied all deal services discount won't be applied`
                  : `You can either apply a coupon OR avail a deal OR a free service.`}
              </div>
            )}

            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Categories</th>
                  <th scope="col">Services</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderSummary?.order?.services_summary &&
                  orderSummary?.order?.services_summary?.map((x, index) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <small>{x.service_category_title}</small>
                          </td>
                          <td className="d-flex flex-column">
                            {items.length > 0 &&
                              items.map((y, indexx) => {
                                let deal = y.is_deal || y.discount_price;
                                return y.service_category_title ===
                                  x.service_category_title ? (
                                  <>
                                    <li>
                                      {y.service_title}
                                      {redeemFreeService?.order_billing
                                        ?.free_service_redeemed_discount > 0 ? (
                                        <></>
                                      ) : (
                                        <>
                                          {couponData ? (
                                            deal &&
                                            couponData?.order_billing
                                              ?.deal_discount > 0 ? (
                                              <img
                                                src={Sale}
                                                alt="sale"
                                                style={{ marginLeft: "20px" }}
                                              />
                                            ) : (
                                              ""
                                            )
                                          ) : cancelCouponData ? (
                                            deal &&
                                            cancelCouponData?.order_billing
                                              ?.deal_discount > 0 ? (
                                              <img
                                                src={Sale}
                                                alt="sale"
                                                style={{ marginLeft: "20px" }}
                                              />
                                            ) : (
                                              ""
                                            )
                                          ) : deal &&
                                            orderSummary?.order_summary
                                              ?.deal_discount > 0 ? (
                                            <img
                                              src={Sale}
                                              alt="sale"
                                              style={{ marginLeft: "20px" }}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      )}

                                      {/* {deal &&
                                      orderSummary?.order_summary
                                        ?.deal_discount > 0 ? (
                                        <img
                                          src={Sale}
                                          alt="sale"
                                          style={{ marginLeft: "20px" }}
                                        />
                                      ) : (
                                        ""
                                      )} */}
                                    </li>
                                    {is_reorder ? (
                                      <>
                                        {y.service_addons &&
                                          y.service_addons.length &&
                                          y.service_addons.map((z) => {
                                            return (
                                              <span
                                                className="d-flex recpient-addon"
                                                style={{ marginBottom: "10px" }}
                                              >
                                                <li>- {z.service_title}</li>
                                              </span>
                                            );
                                          })}
                                      </>
                                    ) : (
                                      <>
                                        {addOnItems &&
                                          addOnItems[indexx] &&
                                          addOnItems[indexx].map((z) => {
                                            return (
                                              <span
                                                className="d-flex recpient-addon"
                                                style={{ marginBottom: "10px" }}
                                              >
                                                <li>- {z.service_title}</li>
                                              </span>
                                            );
                                          })}
                                      </>
                                    )}
                                  </>
                                ) : (
                                  ""
                                );
                              })}
                          </td>
                          <td>
                            {items &&
                              items.map((y, indexx) => {
                                let deal = y.is_deal || y.discount_price;
                                return (
                                  y.service_category_title ===
                                    x.service_category_title && (
                                    <>
                                      <li>
                                        {/* {y.service_price} */}
                                        Rs.
                                        {redeemFreeService?.order_billing
                                          ?.free_service_redeemed_discount >
                                        0 ? (
                                          <>{Math.floor(y.service_price)}</>
                                        ) : (
                                          <>
                                            {couponData
                                              ? y.discount_price &&
                                                couponData?.order_billing
                                                  ?.deal_discount > 0
                                                ? Math.floor(y.discount_price)
                                                : Math.floor(y.service_price)
                                              : cancelCouponData
                                              ? y.discount_price &&
                                                cancelCouponData?.order_billing
                                                  ?.deal_discount > 0
                                                ? Math.floor(y.discount_price)
                                                : Math.floor(y.service_price)
                                              : y.discount_price &&
                                                orderSummary?.order_summary
                                                  ?.deal_discount > 0
                                              ? Math.floor(y.discount_price)
                                              : Math.floor(y.service_price)}
                                            {couponData ? (
                                              deal &&
                                              couponData?.order_billing
                                                ?.deal_discount > 0 ? (
                                                <s
                                                  style={{ marginLeft: "10px" }}
                                                  className="original-price"
                                                >
                                                  Rs.{" "}
                                                  {Math.floor(y.service_price)}
                                                </s>
                                              ) : (
                                                ""
                                              )
                                            ) : cancelCouponData ? (
                                              deal &&
                                              cancelCouponData?.order_billing
                                                ?.deal_discount > 0 ? (
                                                <s
                                                  style={{ marginLeft: "10px" }}
                                                  className="original-price"
                                                >
                                                  Rs.{" "}
                                                  {Math.floor(y.service_price)}
                                                </s>
                                              ) : (
                                                ""
                                              )
                                            ) : deal &&
                                              orderSummary?.order_summary
                                                ?.deal_discount > 0 ? (
                                              <s
                                                style={{ marginLeft: "10px" }}
                                                className="original-price"
                                              >
                                                Rs.{" "}
                                                {Math.floor(y.service_price)}
                                              </s>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        )}
                                        {/* {y.discount_price &&
                                        orderSummary?.order_summary
                                          ?.deal_discount > 0
                                          ? Math.floor(y.discount_price)
                                          : Math.floor(y.service_price)}
                                        {deal &&
                                        orderSummary?.order_summary
                                          ?.deal_discount > 0 ? (
                                          <s
                                            style={{ marginLeft: "10px" }}
                                            className="original-price"
                                          >
                                            Rs. {Math.floor(y.service_price)}
                                          </s>
                                        ) : (
                                          ""
                                        )} */}
                                      </li>
                                      {is_reorder ? (
                                        <>
                                          {y.service_addons &&
                                            y.service_addons.length &&
                                            y.service_addons.map((z) => {
                                              return (
                                                <span
                                                  className="d-flex "
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                >
                                                  <li>
                                                    Rs. {z.service_addon_price}
                                                  </li>
                                                </span>
                                              );
                                            })}
                                        </>
                                      ) : (
                                        <>
                                          {addOnItems &&
                                            addOnItems[indexx] &&
                                            addOnItems[indexx].map((z) => {
                                              return (
                                                <span
                                                  className="d-flex "
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                >
                                                  <li>
                                                    Rs. {z.service_addon_price}
                                                  </li>
                                                </span>
                                              );
                                            })}
                                        </>
                                      )}
                                    </>
                                  )
                                );
                              })}
                            {/* {x.services?.map((y) => {
                              return (
                                <>
                                  <li>{y.total_price / y.unit_count}</li>
                                  {y?.order_service_addons?.map((z) => {
                                    return (
                                      <span
                                        className="d-flex"
                                        style={{ marginBottom: "10px" }}
                                      >
                                        <li>{z.total_price / z.unit_count}</li>
                                      </span>
                                    );
                                  })}
                                </>
                              );
                            })} */}
                          </td>
                          <td>
                            {items.length > 0 &&
                              items.map((y, indexx) => {
                                return (
                                  y.service_category_title ===
                                    x.service_category_title && (
                                    <>
                                      <li>{y.quantity}</li>
                                      {is_reorder ? (
                                        <>
                                          {y.service_addons &&
                                            y.service_addons.length &&
                                            y.service_addons.map((z) => {
                                              return (
                                                <span
                                                  className="d-flex"
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                >
                                                  <li>{z.addOnQuantity}</li>
                                                </span>
                                              );
                                            })}
                                        </>
                                      ) : (
                                        <>
                                          {addOnItems &&
                                            addOnItems[indexx] &&
                                            addOnItems[indexx].map((z) => {
                                              return (
                                                <span
                                                  className="d-flex"
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                >
                                                  <li>{z.addOnQuantity}</li>
                                                </span>
                                              );
                                            })}
                                        </>
                                      )}
                                    </>
                                  )
                                );
                              })}
                          </td>
                          <td className="d-flex flex-column">
                            {items.length > 0 &&
                              items.map((y, indexx) => {
                                let deal = y.is_deal || y.discount_price;
                                return (
                                  y.service_category_title ===
                                    x.service_category_title && (
                                    <>
                                      <li>
                                        {/* {y.service_price * y.quantity} */}
                                        Rs.
                                        {redeemFreeService?.order_billing
                                          ?.free_service_redeemed_discount >
                                          0 &&
                                        redeemFreeService.free_service
                                          .service_id === y.id ? (
                                          <>
                                            <del style={{ color: "red" }}>
                                              {Math.floor(
                                                y.service_price * y.quantity
                                              )}
                                            </del>{" "}
                                            {Math.floor(
                                              y.service_price * y.quantity -
                                                redeemFreeService.order_billing
                                                  .free_service_redeemed_discount
                                            ) === 0 ? (
                                              <>
                                                <span
                                                  style={{
                                                    backgroundColor:
                                                      "forestgreen",
                                                    color: "white",
                                                    paddingTop: "0px",
                                                  }}
                                                >
                                                  Free
                                                </span>
                                              </>
                                            ) : (
                                              <>
                                                {Math.floor(
                                                  y.service_price * y.quantity -
                                                    redeemFreeService
                                                      .order_billing
                                                      .free_service_redeemed_discount
                                                )}
                                              </>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {redeemFreeService?.order_billing
                                              ?.free_service_redeemed_discount >
                                            0 ? (
                                              <>
                                                {Math.floor(
                                                  y.service_price * y.quantity
                                                )}
                                              </>
                                            ) : (
                                              <>
                                                {couponData
                                                  ? y.discount_price &&
                                                    couponData?.order_billing
                                                      ?.deal_discount > 0
                                                    ? Math.floor(
                                                        y.discount_price *
                                                          y.quantity
                                                      )
                                                    : Math.floor(
                                                        y.service_price *
                                                          y.quantity
                                                      )
                                                  : cancelCouponData
                                                  ? y.discount_price &&
                                                    cancelCouponData
                                                      ?.order_billing
                                                      ?.deal_discount > 0
                                                    ? Math.floor(
                                                        y.discount_price *
                                                          y.quantity
                                                      )
                                                    : Math.floor(
                                                        y.service_price *
                                                          y.quantity
                                                      )
                                                  : y.discount_price &&
                                                    orderSummary?.order_summary
                                                      ?.deal_discount > 0
                                                  ? Math.floor(
                                                      y.discount_price *
                                                        y.quantity
                                                    )
                                                  : Math.floor(
                                                      y.service_price *
                                                        y.quantity
                                                    )}
                                                {couponData ? (
                                                  deal &&
                                                  couponData?.order_billing
                                                    ?.deal_discount > 0 ? (
                                                    <s
                                                      style={{
                                                        marginLeft: "10px",
                                                      }}
                                                      className="original-price"
                                                    >
                                                      Rs.{" "}
                                                      {Math.floor(
                                                        y.service_price *
                                                          y.quantity
                                                      )}
                                                    </s>
                                                  ) : (
                                                    ""
                                                  )
                                                ) : cancelCouponData ? (
                                                  deal &&
                                                  cancelCouponData
                                                    ?.order_billing
                                                    ?.deal_discount > 0 ? (
                                                    <s
                                                      style={{
                                                        marginLeft: "10px",
                                                      }}
                                                      className="original-price"
                                                    >
                                                      Rs.{" "}
                                                      {Math.floor(
                                                        y.service_price *
                                                          y.quantity
                                                      )}
                                                    </s>
                                                  ) : (
                                                    ""
                                                  )
                                                ) : deal &&
                                                  orderSummary?.order_summary
                                                    ?.deal_discount > 0 ? (
                                                  <s
                                                    style={{
                                                      marginLeft: "10px",
                                                    }}
                                                    className="original-price"
                                                  >
                                                    Rs.{" "}
                                                    {Math.floor(
                                                      y.service_price *
                                                        y.quantity
                                                    )}
                                                  </s>
                                                ) : (
                                                  ""
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                        {/* {y.discount_price &&
                                        orderSummary?.order_summary
                                          ?.deal_discount > 0
                                          ? Math.floor(
                                              y.discount_price * y.quantity
                                            )
                                          : Math.floor(
                                              y.service_price * y.quantity
                                            )} */}
                                        {/* {deal &&
                                        orderSummary?.order_summary
                                          ?.deal_discount > 0 ? (
                                          <s
                                            style={{ marginLeft: "10px" }}
                                            className="original-price"
                                          >
                                            Rs.{" "}
                                            {Math.floor(
                                              y.service_price * y.quantity
                                            )}
                                          </s>
                                        ) : (
                                          ""
                                        )} */}
                                      </li>
                                      {is_reorder ? (
                                        <>
                                          {y.service_addons &&
                                            y.service_addons.length &&
                                            y.service_addons.map((z) => {
                                              return (
                                                <span
                                                  className="d-flex"
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                >
                                                  <li>
                                                    Rs.{" "}
                                                    {z.service_addon_price *
                                                      z.addOnQuantity}
                                                  </li>
                                                </span>
                                              );
                                            })}
                                        </>
                                      ) : (
                                        <>
                                          {addOnItems &&
                                            addOnItems[indexx] &&
                                            addOnItems[indexx].map((z) => {
                                              return (
                                                <span
                                                  className="d-flex"
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                >
                                                  <li>
                                                    Rs.{" "}
                                                    {z.service_addon_price *
                                                      z.addOnQuantity}
                                                  </li>
                                                </span>
                                              );
                                            })}
                                        </>
                                      )}
                                    </>
                                  )
                                );
                              })}
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
            <div className="d-block d-sm-none">
              {isGiftBox ? (
                <>
                  <div
                    className="d-flex justify-content-between pt-3 pl-3 pb-2 mt-2"
                    style={{
                      backgroundColor: "#fcdabc",
                      color: "#E01515",
                      borderRadius: "10px",
                    }}
                  >
                    <label>Gift Hamper Included</label>
                    <span>
                      <img src={GiftBoxShow} alt="" width="60%" />
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              <div className="special-inst">
                <label>Special Instructions</label>
                <div className="form-group">
                  <textarea
                    className="instr"
                    rows="2"
                    id="comment"
                    placeholder="special instructions"
                    value={orderDetail?.instruction}
                    style={{
                      color: "transparent",
                      "text-shadow": "0 0 0 black",
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-md-row flex-sm-column-reverse">
              <div className="coupon-box">
                <label>Redeem Coupon/ Free Service</label>
                {(!cancelCouponData && orderSummary?.order?.coupon_details) ||
                couponData ? (
                  <>
                    <div className="coupon-area-filled mt-3">
                      <div className="header-sec">
                        <h5>
                          {couponData
                            ? couponData?.coupon_details?.coupon_title
                            : orderSummary?.order?.coupon_details?.coupon_title}
                        </h5>
                        <span>Discount</span>
                      </div>
                      <div className="body-sec">
                        <div className="body-left">
                          <p className="pl-2">
                            Coupon Code:{" "}
                            {couponData
                              ? couponData?.coupon_details?.coupon_code
                              : orderSummary?.order?.coupon_details
                                  ?.coupon_code}
                          </p>
                          <p className="pl-2">
                            Redeemed:{" "}
                            {couponData
                              ? `${couponData?.coupon_details?.self_redeemed}/
                      ${couponData?.coupon_details?.usage_user_limit}`
                              : `${orderSummary?.order?.coupon_details?.self_redeemed}/
                      ${orderSummary?.order?.coupon_details?.usage_user_limit}`}
                          </p>
                        </div>
                        <div className="body-right">
                          {couponData
                            ? couponData?.coupon_details.discount_type ===
                              "percentage"
                              ? couponData?.coupon_details.discount + "%"
                              : couponData?.coupon_details.discount
                            : orderSummary?.order?.coupon_details
                                .discount_type === "percentage"
                            ? orderSummary?.order?.coupon_details.discount + "%"
                            : orderSummary?.order?.coupon_details.discount}
                        </div>
                      </div>

                      <hr />
                      <div className="bottom-sec">
                        <p>
                          Valid till:{" "}
                          {couponData
                            ? couponData?.coupon_details?.end_datetime
                              ? couponData?.coupon_details?.end_datetime
                              : couponData?.coupon_details?.description
                            : orderSummary?.order?.coupon_details?.end_datetime
                            ? orderSummary?.order?.coupon_details?.end_datetime
                            : orderSummary?.order?.coupon_details?.description}
                        </p>
                        <button
                          onClick={() => {
                            dispatch(
                              Action.removeCoupon(
                                couponCode,
                                orderSummary?.order_summary?.order_id
                              )
                            );
                            setCouponCode("");
                          }}
                          className="btn coupon-remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                ) : redeemFreeService?.order_billing
                    ?.free_service_redeemed_discount > 0 ? (
                  <>
                    <div className="coupon-area-filled mt-3">
                      <div className="header-sec">
                        <h5>Free Service</h5>
                        <span>Discount</span>
                      </div>
                      <div className="body-sec">
                        <div className="body-left">
                          <p className="pl-2">Free Service</p>
                          <p className="pl-2">
                            Redeemed:{" "}
                            {
                              userMilestone.milestones[2]
                                .availed_free_service_count
                            }
                            /{userMilestone.milestones[2].free_service_count}
                          </p>
                        </div>
                        <div className="body-right">FREE</div>
                      </div>

                      <hr />
                      <div className="bottom-sec">
                        <p>Valid till: No date</p>
                        <button
                          onClick={() => {
                            dispatch(
                              Action.removeFreeService(
                                orderSummary?.order_summary?.order_id
                              )
                            );
                          }}
                          className="btn coupon-remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="coupon-area mt-3">
                      <div className="image-coupon">
                        <img src={GiftBox} alt="" />
                      </div>
                      <div className="lower-section">
                        <button
                          onClick={() => {
                            dispatch(Action.couponModal(true));
                          }}
                          className="btn coupon-btn mr-1"
                        >
                          Apply Coupon
                        </button>
                        <button
                          onClick={() => {
                            dispatch(
                              Action.redeemFreeService(
                                orderSummary?.order_summary?.order_id
                              )
                            );
                          }}
                          className="btn coupon-btn ml-1"
                        >
                          Free Service
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="total-bill">
                <table>
                  <tr>
                    <td></td>
                    <td>Services Charges</td>

                    {/* <td>Rs. {orderSummary?.order_summary?.total_price}</td> */}
                    <td>
                      Rs.{" "}
                      {couponData
                        ? couponData?.order_billing?.actual_price
                        : cancelCouponData
                        ? cancelCouponData?.order_billing?.actual_price
                        : orderSummary
                        ? orderSummary?.order?.order_billing?.actual_price
                        : redeemFreeService?.order_billing?.actual_price}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Travel Charges</td>
                    {/* <td>Rs. {orderSummary?.order_summary?.travel_charges}</td> */}
                    <td>
                      Rs.{" "}
                      {couponData
                        ? couponData?.order_billing?.travel_charges
                        : cancelCouponData
                        ? cancelCouponData?.order_billing?.travel_charges
                        : orderSummary
                        ? orderSummary?.order?.order_billing?.travel_charges
                        : redeemFreeService?.order_billing?.travel_charges}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Discount</td>
                    {/* <td>Rs. {orderSummary?.order_summary?.discount}</td> */}
                    <td>
                      Rs.{" "}
                      {couponData
                        ? couponData?.order_billing?.discount
                        : cancelCouponData
                        ? cancelCouponData?.order_billing?.discount
                        : orderSummary
                        ? orderSummary?.order?.order_billing?.discount
                        : redeemFreeService?.order_billing?.discount}
                    </td>
                  </tr>

                  {redeemFreeService?.order_billing
                    ?.free_service_redeemed_discount > 0 ? (
                    <>
                      <tr>
                        <td></td>
                        <td>Deal Discount</td>
                        <td>
                          Rs.
                          {/* {Math.floor(orderSummary?.order_summary?.deal_discount)} */}
                          {Math.floor(
                            redeemFreeService?.order_billing?.deal_discount
                          )}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {couponData ? (
                        couponData?.order_billing?.deal_discount > 0 ? (
                          <tr>
                            <td></td>
                            <td>Deal Discount</td>
                            <td>
                              Rs.
                              {/* {Math.floor(orderSummary?.order_summary?.deal_discount)} */}
                              {Math.floor(
                                couponData?.order_billing?.deal_discount
                              )}
                            </td>
                          </tr>
                        ) : (
                          ""
                        )
                      ) : cancelCouponData ? (
                        cancelCouponData?.order_billing?.deal_discount > 0 ? (
                          <tr>
                            <td></td>
                            <td>Deal Discount</td>
                            <td>
                              Rs.
                              {/* {Math.floor(orderSummary?.order_summary?.deal_discount)} */}
                              {Math.floor(
                                cancelCouponData?.order_billing?.deal_discount
                              )}
                            </td>
                          </tr>
                        ) : (
                          ""
                        )
                      ) : orderSummary?.order?.order_billing?.deal_discount >
                        0 ? (
                        <tr>
                          <td></td>
                          <td>Deal Discount</td>
                          <td>
                            Rs.
                            {/* {Math.floor(orderSummary?.order_summary?.deal_discount)} */}
                            {Math.floor(
                              orderSummary?.order?.order_billing?.deal_discount
                            )}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </>
                  )}

                  {couponData ? (
                    couponData?.order_billing?.free_service_redeemed_discount >
                    0 ? (
                      <tr>
                        <td></td>
                        <td>Free Service Discount</td>
                        <td>
                          Rs.
                          {/* {Math.floor(orderSummary?.order_summary?.deal_discount)} */}
                          {Math.floor(
                            couponData?.order_billing
                              ?.free_service_redeemed_discount
                          )}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )
                  ) : cancelCouponData ? (
                    cancelCouponData?.order_billing
                      ?.free_service_redeemed_discount > 0 ? (
                      <tr>
                        <td></td>
                        <td>Free Service Discount</td>
                        <td>
                          Rs.
                          {/* {Math.floor(orderSummary?.order_summary?.deal_discount)} */}
                          {Math.floor(
                            cancelCouponData?.order_billing
                              ?.free_service_redeemed_discount
                          )}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )
                  ) : redeemFreeService ? (
                    redeemFreeService?.order_billing
                      ?.free_service_redeemed_discount > 0 ? (
                      <tr>
                        <td></td>
                        <td>Free Service Discount</td>
                        <td>
                          Rs.
                          {/* {Math.floor(orderSummary?.order_summary?.deal_discount)} */}
                          {Math.floor(
                            redeemFreeService?.order_billing
                              ?.free_service_redeemed_discount
                          )}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )
                  ) : orderSummary?.order?.order_billing
                      ?.free_service_redeemed_discount > 0 ? (
                    <tr>
                      <td></td>
                      <td>Free Service Discount</td>
                      <td>
                        Rs.
                        {/* {Math.floor(orderSummary?.order_summary?.deal_discount)} */}
                        {Math.floor(
                          orderSummary?.order?.order_billing
                            ?.free_service_redeemed_discount
                        )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {/* {cancelCouponData?.order_billing?.deal_discount > 0 ||
                  orderSummary?.order?.order_billing?.deal_discount > 0 ? (
                    <tr>
                      <td></td>
                      <td>Deal Discount</td>
                      <td>
                        Rs.
                        {Math.floor(
                          couponData
                            ? couponData?.order_billing?.deal_discount
                            : cancelCouponData
                            ? cancelCouponData?.order_billing?.deal_discount
                            : orderSummary?.order?.order_billing?.deal_discount
                        )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )} */}

                  {cancelCouponData ? (
                    cancelCouponData?.order_billing?.coupon_discount > 0 ? (
                      <tr>
                        <td></td>
                        <td>Coupon Discount</td>
                        <td>
                          Rs.
                          {Math.floor(
                            cancelCouponData?.order_billing?.coupon_discount
                          )}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )
                  ) : couponData?.order_billing?.coupon_discount > 0 ? (
                    <tr>
                      <td></td>
                      <td>Coupon Discount</td>
                      <td>
                        Rs.
                        {Math.floor(couponData?.order_billing?.coupon_discount)}
                      </td>
                    </tr>
                  ) : orderSummary ? (
                    orderSummary?.order?.order_billing?.coupon_discount > 0 ? (
                      <tr>
                        <td></td>
                        <td>Coupon Discount</td>
                        <td>
                          Rs.
                          {/* {Math.floor(orderSummary?.order_summary?.deal_discount)} */}
                          {Math.floor(
                            orderSummary?.order?.order_billing?.coupon_discount
                          )}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )
                  ) : (
                    redeemFreeService?.order_billing?.coupon_discount > 0 && (
                      <tr>
                        <td></td>
                        <td>Coupon Discount</td>
                        <td>
                          Rs.
                          {Math.floor(
                            redeemFreeService?.order_billing?.coupon_discount
                          )}
                        </td>
                      </tr>
                    )
                  )}
                  {/* {couponData?.order_billing?.coupon_discount > 0 ||
                  orderSummary?.order?.order_billing?.coupon_discount > 0 ? (
                    <tr>
                      <td></td>
                      <td>Coupon Discount</td>
                      <td>
                        Rs.
                        {Math.floor(
                          couponData
                            ? couponData?.order_billing?.coupon_discount
                            : orderSummary?.order?.order_billing
                                ?.coupon_discount
                        )}
                      </td>
                    </tr>
                  ) : 
                    ""
                  } */}

                  <tr>
                    <td></td>
                    <td>Grand Total</td>
                    <td>
                      Rs.
                      {redeemFreeService?.order_billing
                        ?.free_service_redeemed_discount > 0 ? (
                        <>
                          {Math.floor(
                            redeemFreeService?.order_billing?.net_total
                          )}
                        </>
                      ) : (
                        <>
                          {Math.floor(
                            couponData
                              ? couponData?.order_billing?.net_total
                              : cancelCouponData
                              ? cancelCouponData?.order_billing?.net_total
                              : orderSummary?.order?.order_billing?.net_total
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                  {/* {redeemFreeService?.order_billing
                    ?.free_service_redeemed_discount > 0 ? (
                    <></>
                  ) : (
                    <>
                      <tr>
                        <td></td>
                        <td>
                          <div>
                            <input
                              value={
                                couponData || cancelCouponData
                                  ? couponData?.coupon_details
                                    ? couponData?.coupon_details?.coupon_code
                                    : couponData
                                    ? couponCodee
                                    : couponCode
                                  : orderSummary?.order?.coupon_details
                                      ?.coupon_code
                              }
                              className="input-signing"
                              onChange={(e) => setCouponCode(e.target.value)}
                              placeholder="Enter Coupon"
                              type="text"
                              style={{ position: "relative" }}
                            />
                            {cancelCouponData ||
                            !orderSummary?.order?.coupon_details ? (
                              couponData ? (
                                <button
                                  onClick={() => {
                                    dispatch(
                                      Action.removeCoupon(
                                        couponCode,
                                        orderSummary?.order_summary?.order_id
                                      )
                                    );
                                    setCouponCode("");
                                  }}
                                  style={{
                                    border: "none",
                                    position: "absolute",
                                    height: "45px",
                                  }}
                                  className="btn btn-danger"
                                >
                                  Remove
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    dispatch(
                                      Action.applyCoupon(
                                        couponCode,
                                        orderSummary?.order_summary?.order_id
                                      )
                                    );
                                    // setCouponCode("");
                                  }}
                                  style={{
                                    border: "none",
                                    position: "absolute",
                                    height: "45px",
                                  }}
                                  className="done-btnn"
                                >
                                  Apply
                                </button>
                              )
                            ) : (
                              orderSummary?.order?.coupon_details
                                ?.coupon_code !== null && (
                                <button
                                  onClick={() => {
                                    dispatch(
                                      Action.removeCoupon(
                                        cancelCouponData
                                          ? couponCode
                                          : orderSummary?.order?.coupon_details
                                              ?.coupon_code,
                                        orderSummary?.order_summary?.order_id
                                      )
                                    );
                                    setCouponCode("");
                                  }}
                                  style={{
                                    border: "none",
                                    position: "absolute",
                                    height: "45px",
                                  }}
                                  className="btn btn-danger"
                                >
                                  Remove
                                </button>
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                  {userMilestone.milestones !== undefined &&
                  userMilestone?.milestones[2].free_service_count >
                    userMilestone?.milestones[2].availed_free_service_count &&
                  !couponData?.order_billing?.coupon_discount > 0 &&
                  !isFreeService > 0 ? (
                    <>
                      <tr>
                        <td></td>
                        <td>
                          <button
                            className="redeem-btn"
                            onClick={() => {
                              dispatch(
                                Action.redeemFreeService(
                                  orderSummary?.order_summary?.order_id
                                )
                              );
                            }}
                            style={{
                              border: "none",
                              height: "45px",
                            }}
                            className="done-btnn"
                          >
                            Redeem Free Service
                          </button>
                        </td>
                      </tr>
                    </>
                  ) : redeemFreeService !== undefined && isFreeService > 0 ? (
                    <>
                      <tr>
                        <td></td>
                        <td>
                          <button
                            onClick={() => {
                              dispatch(
                                Action.removeFreeService(
                                  orderSummary?.order_summary?.order_id
                                )
                              );
                            }}
                            style={{
                              border: "none",
                              height: "45px",
                            }}
                            className="done-btnn"
                          >
                            Remove Free Service
                          </button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )} */}
                  {/* {redeemFreeService !== undefined && isFreeService > 0 ? (
                    <>
                      <tr>
                        <td></td>
                        <td>
                          <button
                            onClick={() => {
                              dispatch(
                                Action.removeFreeService(
                                  orderSummary?.order_summary?.order_id
                                )
                              );
                            }}
                            style={{
                              border: "none",
                              position: "absolute",
                              height: "45px",
                            }}
                            className="done-btnn"
                          >
                            Remove Free Service
                          </button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {userMilestone?.milestones[2].free_service_count >
                        userMilestone?.milestones[2]
                          .availed_free_service_count &&
                      !couponData?.order_billing?.coupon_discount > 0 ? (
                        <>
                          <tr>
                            <td></td>
                            <td>
                              <button
                                onClick={() => {
                                  dispatch(
                                    Action.redeemFreeService(
                                      orderSummary?.order_summary?.order_id
                                    )
                                  );
                                  setCouponCode("");
                                }}
                                style={{
                                  border: "none",
                                  position: "absolute",
                                  height: "45px",
                                }}
                                className="done-btnn"
                              >
                                Redeem Free Service
                              </button>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )} */}
                </table>
              </div>
            </div>

            {/* {(!cancelCouponData && orderSummary?.order?.coupon_details) ||
            couponData ? (
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col"> Title </th>
                    <th scope="col"> Code </th>
                    <th scope="col"> Discount </th>
                    <th scope="col"> Reedem </th>
                    <th scope="col"> Expiry Date </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {couponData
                        ? couponData?.coupon_details?.coupon_title
                        : orderSummary?.order?.coupon_details?.coupon_title}
                    </td>
                    <td>
                      {couponData
                        ? couponData?.coupon_details?.coupon_code
                        : orderSummary?.order?.coupon_details?.coupon_code}
                    </td>
                    <td>
                      {couponData
                        ? couponData?.coupon_details.discount_type ===
                          "percentage"
                          ? couponData?.coupon_details.discount + "%"
                          : couponData?.coupon_details.discount
                        : orderSummary?.order?.coupon_details.discount_type ===
                          "percentage"
                        ? orderSummary?.order?.coupon_details.discount + "%"
                        : orderSummary?.order?.coupon_details.discount}
                    </td>
                    <td>
                      {couponData
                        ? `${couponData?.coupon_details?.self_redeemed}/
                      ${couponData?.coupon_details?.usage_user_limit}`
                        : `${orderSummary?.order?.coupon_details?.self_redeemed}/
                      ${orderSummary?.order?.coupon_details?.usage_user_limit}`}
                    </td>
                    <td>
                      {couponData
                        ? couponData?.coupon_details?.end_datetime
                          ? couponData?.coupon_details?.end_datetime
                          : couponData?.coupon_details?.description
                        : orderSummary?.order?.coupon_details?.end_datetime
                        ? orderSummary?.order?.coupon_details?.end_datetime
                        : orderSummary?.order?.coupon_details?.description}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              ""
            )} */}
          </div>

          <div className="text-right mt-5">
            <span
              onClick={() => {
                dispatch(Action.handleCheckOut2(false, history));
                return <Redirect to="/home/services" />;
              }}
              className="cancel-btn"
              style={{ cursor: "pointer" }}
            >
              Cancel Order
            </span>
            <span
              onClick={() => {
                dispatch(
                  Action.submitOrder(
                    false,
                    orderSummary?.order?.id,
                    history,
                    true,
                    data,
                    !cancelCouponData
                      ? couponCode
                        ? couponCode
                        : orderSummary?.order?.coupon_details?.coupon_code
                      : "",
                    !cancelCouponData
                      ? couponData
                        ? couponData?.coupon_details?.discount
                        : orderSummary?.order?.coupon_details?.discount
                      : "",
                    is_reorder
                  )
                );

                // dispatch(Action.logoClickedReload(false));
              }}
              style={{ cursor: "pointer" }}
              className="done-btn"
            >
              Submit Order
            </span>
          </div>
          {/* <span
            className="fixed-mob-total d-lg-none"
            onClick={() => {
              dispatch(Action.cartItemError(true));
              if (totalPrice < limitation?.min_order_price) {
                // setError(true);
                localStorage.setItem("minAmountError", true);
                dispatch(Action.cnicModal(!cnic));
              }

              dispatch(
                Action.handleCheckOut(
                  true,
                  history,
                  limitation?.min_order_price
                )
              );
              dispatch(Action.logoClickedReload(false));
            }}
          >
            <span className="chk-btn">
              <label>Place Order</label>
              <label>
                {items?.length} items: Rs. {totalPrice}
              </label>
            </span>
          </span> */}
        </div>
      </section>
      <span
        className="fixed-mob-total d-lg-none"
        onClick={() => {
          dispatch(
            Action.submitOrder(
              false,
              orderSummary?.order?.id,
              history,
              true,
              data,
              !cancelCouponData
                ? couponCode
                  ? couponCode
                  : orderSummary?.order?.coupon_details?.coupon_code
                : "",
              !cancelCouponData
                ? couponData
                  ? couponData?.coupon_details?.discount
                  : orderSummary?.order?.coupon_details?.discount
                : "",
              is_reorder
            )
          );

          // dispatch(Action.logoClickedReload(false));
        }}
      >
        <span className="chk-btn">
          <label>Submit Order</label>
          <label>
            {items?.length} items: Rs.{" "}
            {redeemFreeService?.order_billing?.free_service_redeemed_discount >
            0 ? (
              <>{Math.floor(redeemFreeService?.order_billing?.net_total)}</>
            ) : (
              <>
                {Math.floor(
                  couponData
                    ? couponData?.order_billing?.net_total
                    : orderSummary?.order?.order_billing?.net_total
                )}
              </>
            )}
          </label>
        </span>
      </span>

      <GetDiscount open={discount} />
      <CnicModal open={cnic} />
      <Footer />
    </>
  );
};

export default CustomerRecep;

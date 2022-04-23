import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Girl from "../../images/girl.png";
import Girl2 from "../../images/g2.png";
import YellowStar from "../../images/ic_staryellow.svg";
import Star from "../../images/ic_stargray.svg";
import * as Action from "../../store/actions";
import BackArrow from "../../images/left_arrow.svg";
import GiftBoxShow from "../../images/giftbox_showpage.png";
import moment from "moment";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Sale from "../../images/Group 1138.svg";

const OrderCancel = () => {
  const dispatch = useDispatch();
  const orderDetail = useSelector(({ service }) => service.showOrderDetail);
  const ratingSlideInModal = useSelector(
    ({ service }) => service.ratingSlideInModal
  );
  const [isOpen, setIsOpen] = useState([]);
  const toggle = (id) => {
    if (isOpen.includes(id)) {
      setIsOpen(isOpen.filter((x) => x != id));
    } else {
      setIsOpen([...isOpen, id]);
    }
  };
  return (
    <section className="order-clearance">
      <div className="back-btn">
        <img
          onClick={() => {
            localStorage.removeItem("orderShowId");
            dispatch({
              type: Action.RATING_SLIDE_IN_MODAL,
              payload: false,
            });
            // dispatch(Action.ratingSlideInModal(!ratingSlideInModal));
          }}
          src={""}
        />
      </div>
      <div className="recp-header">
        <div className="d-flex flex-column">
          <label>Order ID: {orderDetail?.custom_order_id}</label>

          <span>
            {moment(orderDetail?.order_date).format("MMMM DD, YYYY")} -
            {orderDetail?.order_time}
          </span>
        </div>
        <div className="order-pending d-flex flex-column align-items-end">
          {orderDetail?.status === "Pending" ? (
            <a style={{ color: "white" }} className="btn-pending ">
              Pending
            </a>
          ) : orderDetail?.status === "Confirmed" ? (
            <a
              style={{ color: "white", cursor: "context-menu" }}
              className="btn-pending"
            >
              Confirmed
            </a>
          ) : orderDetail?.status === "Cancelled" ? (
            <>
              <a style={{ color: "white" }} className="btn-cancel " disable>
                Cancelled
              </a>
              <small>{orderDetail?.cancel_reason}</small>
            </>
          ) : orderDetail?.status === "In_process" ? (
            <>
              <a
                style={{ color: "white", cursor: "context-menu" }}
                className="btn-pending "
              >
                In Process
              </a>
              <small>{orderDetail?.cancel_reason}</small>
            </>
          ) : (
            <>
              <a
                style={{
                  color: "white",
                  backgroundColor: "#57C338",
                  cursor: "context-menu",
                }}
                // className="conf-btn"
                className="btn-pending"
              >
                Completed
              </a>
            </>
          )}
        </div>
      </div>
      <div className="recp-location">
        <address>
          <span className="address-wrapp">
            {` ${
              orderDetail?.address?.address_1
                ? orderDetail?.address?.address_1
                : ""
            }, ${orderDetail?.address?.area?.area}, ${
              orderDetail?.address?.city?.city_name
            }`}
          </span>
        </address>
      </div>
      <div className="giftbox-mbl">
        {orderDetail?.is_gift_avail ? (
          <>
            <div
              className="d-flex justify-content-between pt-3 pl-3 pb-2"
              style={{ backgroundColor: "#fcdabc", color: "#E01515" }}
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

      {/* <div className="recp-location">
        <address>{` ${orderDetail?.address?.address_title} ${orderDetail?.address?.area?.area} ${orderDetail?.address?.city?.city_name}`}</address>
      </div> */}

      <div id="accordion">
        {orderDetail?.status === "Pending" ||
        orderDetail?.status === "Cancelled" ? (
          <div className="order-summary slide-in">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Categories</th>
                  <th scope="col">Services</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail &&
                  orderDetail.order_services.map((x, index) => {
                    return (
                      <>
                        <tr className="slide-in-table-row">
                          <td>
                            <small>{x.service_category_title}</small>
                          </td>
                          {/* <td className="d-flex flex-column"> */}
                          <td>
                            {x.service_title}
                            {x.discounted_price &&
                            orderDetail.deal_discount > 0 ? (
                              <img
                                src={Sale}
                                alt="sale"
                                style={{ marginLeft: "5px" }}
                              />
                            ) : (
                              ""
                            )}
                            {x.order_service_addons?.map((y) => {
                              return (
                                <>
                                  <span className="d-flex">
                                    - {y.service_addon_title}
                                  </span>
                                </>
                              );
                            })}
                          </td>
                          <td>
                            {x.unit_count}
                            {x.order_service_addons?.map((y) => {
                              return (
                                <>
                                  <span className="d-flex">{y.unit_count}</span>
                                </>
                              );
                            })}
                          </td>
                          <td className="d-flex flex-column">
                            {/* <td> */}
                            Rs.{" "}
                            {x.discounted_price && orderDetail.deal_discount > 0
                              ? x.discounted_price
                              : x.total_price}
                            {x.discounted_price &&
                            orderDetail.deal_discount > 0 ? (
                              <s className="original-price">
                                Rs. {x.total_price}
                              </s>
                            ) : (
                              ""
                            )}
                            {x.order_service_addons?.map((y) => {
                              return (
                                <>
                                  <span>Rs. {y.unit_price * y.unit_count}</span>
                                </>
                              );
                            })}
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : orderDetail?.status === "Confirmed" ||
          orderDetail?.status === "Completed" ? (
          orderDetail?.order_jobs?.map((service, index) => {
            return (
              <div key={service.id} className="card resp-card">
                <div className="card-header" id="headingTh">
                  <h5 className="mb-0">
                    <button
                      className={`btn btn-link ${
                        isOpen.includes(service.id)
                          ? " collapsed "
                          : " btn-link "
                      } `}
                      type="button"
                      onClick={() => {
                        toggle(service.id);
                      }}
                    >
                      {(orderDetail?.status === "Confirmed" ||
                        orderDetail?.status === "Completed") &&
                      orderDetail?.order_jobs.length > 0 ? (
                        <div className="resp-card-body">
                          <div className="d-flex">
                            <img
                              src={
                                service?.technician?.profile_photo_url
                                  ? service?.technician?.profile_photo_url
                                  : Girl
                              }
                              alt="Technicions"
                              style={{ borderRadius: "50%" }}
                            />
                            <div className="rating-name">
                              <label
                                style={{ cursor: "pointer" }}
                                className="d-flex flex-column "
                              >
                                {`${service.technician.first_name} ${service.technician.last_name} ${service.technician.membership_code}`}
                                <span>Job ID: {service.job_code}</span>
                              </label>

                              <span
                                style={{
                                  backgroundColor:
                                    service?.job_status == "Cancelled"
                                      ? "#E01515"
                                      : "",
                                  color:
                                    service?.job_status == "Cancelled"
                                      ? "white"
                                      : "",
                                }}
                                className="conf-btn"
                              >
                                {service?.job_status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="resp-card-body">
                          <div className="d-flex">
                            <small className="no-assign">
                              No beautician Assigned
                            </small>
                          </div>
                          <div className="comp-wrap">
                            <div className="rating-name comp-dtl">
                              <label>Services</label>
                              <span>{service.service_category_title}</span>
                            </div>
                            <div className="rating-name comp-dtl">
                              <label>Total Amount</label>
                              <span>Rs. {service.total_price}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  </h5>
                </div>
                <Collapse isOpen={isOpen.includes(service?.id)}>
                  <div class="card-body">
                    {service?.job_status !== "Cancelled" && (
                      <p className="job-time">
                        JOB START TIME: {service?.start_time}
                      </p>
                    )}

                    <table class="table table-borderless">
                      <thead>
                        <tr className="d-flex justify-content-between w-100">
                          <th scope="col">Services</th>
                          {/* <th scope="col">Start Time</th>
                          <th scope="col">Duration</th> */}
                          <th scope="col">Job Amount</th>
                        </tr>
                      </thead>
                      <tbody style={{ padding: "20px" }}>
                        {service?.order_job_services.map((x) => {
                          return (
                            <tr
                              className={
                                x.deal_discount > 0
                                  ? "d-flex justify-content-between sale-items"
                                  : "d-flex justify-content-between"
                              }
                            >
                              <td>
                                <ul>
                                  <li>
                                    {`${x.service_title} X ${x.unit_count}`}
                                    {x.deal_discount > 0 && (
                                      <img
                                        src={Sale}
                                        alt="sale"
                                        style={{ marginLeft: "20px" }}
                                      />
                                    )}
                                    {x?.order_job_service_addons?.map((y) => {
                                      return (
                                        <>
                                          <span className="d-flex">
                                            {`- ${y?.addon_title} X ${y.unit_count}`}
                                          </span>
                                        </>
                                      );
                                    })}
                                  </li>
                                </ul>
                              </td>

                              <td>
                                <ul>
                                  <li className="d-flex flex-column">
                                    {/* Rs. {x.service_price} */}
                                    Rs.{" "}
                                    {x.deal_discount > 0
                                      ? x.discounted_price
                                      : x.service_price * x.unit_count}
                                    {x.deal_discount > 0 && (
                                      <s className="d-flex flex-column original-price">
                                        Rs. {x.service_price * x.unit_count}
                                      </s>
                                    )}
                                    {x.order_job_service_addons?.map((y) => {
                                      return (
                                        <>
                                          <span>
                                            Rs. {y.unit_price * y.unit_count}
                                          </span>
                                        </>
                                      );
                                    })}
                                    {/* <s>Rs.2000</s> */}
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Collapse>
              </div>
            );
          })
        ) : (
          ""
        )}
      </div>
      <div className="recp-inst">
        <label>Special Instructions</label>
        <div className="form-group">
          <textarea
            className="instr"
            rows="3"
            id="comment"
            value={orderDetail?.special_notes}
            placeholder="special instructions"
            style={{
              color: "transparent",
              "text-shadow": "0 0 0 black",
            }}
          ></textarea>
        </div>
      </div>
    </section>
  );
};
export default OrderCancel;

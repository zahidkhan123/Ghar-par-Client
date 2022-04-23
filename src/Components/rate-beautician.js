import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../store/actions";
import RatingPopup from "./rating-popup";
import { history } from "../index";
import GiftBoxShow from "../images/giftbox_showpage.png";

const RateBeautician = () => {
  const dispatch = useDispatch();
  const orderDetail = useSelector(({ service }) => service.showOrderDetail);

  const ratingPopup = useSelector(({ service }) => service.ratingPopup);
  const reOrder = useSelector(({ service }) => service.reOrder);
  // const ratingRecord = useSelector(({ service }) => service.ratingRecord);

  // let filterOrderId = ratingRecord?.filter(
  //   (x) => x.orderId == orderDetail.id
  // )[0];

  // if (filterOrderId == undefined) {
  //   <span
  //     className="btn-rate"
  //     style={{
  //       background: "#2FB5F6",
  //       color: "white",
  //       cursor: "pointer",
  //     }}
  //     onClick={() => dispatch(Action.ratingPopup(!ratingPopup))}
  //   >
  //     Rate Beautician
  //   </span>;
  // } else {
  //   <span className="btn-rate"> Rate Beautician </span>;
  // }

  return (
    <section className="rate">
      <div className="rate-beautician-btn">
        {orderDetail?.is_feedback_given == true ? (
          <span
            className="btn-rate"
            style={{
              background: "#2FB5F6",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => dispatch(Action.reOrder(orderDetail.id, history))}
          >
            Reorder
          </span>
        ) : orderDetail?.status === "Completed" ? (
          <span
            className="btn-rate"
            style={{
              background: "#2FB5F6",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => dispatch(Action.ratingPopup(!ratingPopup))}
          >
            Rate Beautician
          </span>
        ) : (
          <span className="btn-rate"> Rate Beautician </span>
        )}
        {/* <span className="btn-rate">Rate Beautician</span> */}
      </div>
      <div className="charges">
        <div className="net-charge">
          <label>Net Total</label>
          <span>Rs.{Math.floor(orderDetail?.order_billing?.net_total)}</span>
        </div>
        <div className="other-charges">
          <div className="d-flex justify-content-between pb-2">
            <label>Services Charges</label>
            <span>
              Rs. {Math.floor(orderDetail?.order_billing?.actual_price)}
            </span>
          </div>
          <div className="d-flex justify-content-between pb-2">
            <label>Travel Charges</label>
            <span>
              Rs. {Math.floor(orderDetail?.order_billing?.travel_charges)}
            </span>
          </div>
          {orderDetail?.order_billing?.waiting_charges > 0 && (
            <div className="d-flex justify-content-between pb-2">
              <label>Waiting Charges</label>
              <span>
                Rs. {Math.floor(orderDetail?.order_billing?.waiting_charges)}
              </span>
            </div>
          )}

          {orderDetail?.order_billing?.coupon_discount > 0 && (
            <div className="d-flex justify-content-between pb-2">
              <label>Coupon Discount</label>
              <span>
                Rs. {Math.floor(orderDetail?.order_billing?.coupon_discount)}
              </span>
            </div>
          )}

          <div className="d-flex justify-content-between pb-2">
            <label>Discount</label>
            <span> Rs. {Math.floor(orderDetail?.order_billing?.discount)}</span>
          </div>
          {orderDetail?.deal_discount > 0 && (
            <div className="d-flex justify-content-between pb-2">
              <label>Deal Discount</label>
              <span>
                {" "}
                Rs. {Math.floor(orderDetail?.order_billing?.deal_discount)}
              </span>
            </div>
          )}
          {orderDetail?.order_billing?.free_service_redeemed_discount > 0 && (
            <div className="d-flex justify-content-between pb-2">
              <label>Free Service Discount</label>
              <span>
                {" "}
                Rs.{" "}
                {Math.floor(
                  orderDetail?.order_billing?.free_service_redeemed_discount
                )}
              </span>
            </div>
          )}

          {/* <div className="d-flex justify-content-between pb-2">
            <label>Job Discount</label>
            <span> Rs. 0</span>
          </div> */}
          <div className="d-flex justify-content-between pb-2">
            <label>Total Amount</label>
            <span>
              {" "}
              Rs. {Math.floor(orderDetail?.order_billing?.net_total)}
            </span>
          </div>
          <div className="giftbox-web">
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
        </div>
      </div>
      <RatingPopup open={ratingPopup} />
    </section>
  );
};
export default RateBeautician;

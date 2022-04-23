import React, { useState, useEffect } from "react";
import DownArrow from "../../images/ic_downarrow.svg";
import Finder from "../../images/iconfinder.svg";
import Plus from "../../images/plus.svg";
import { useForm } from "react-hook-form";
import Topinfobar from "../fixed-top";
import FixedCart from "../fixed-cart";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../store/actions";
import AddAddress from "../add-address";
import { history } from "../../index";
import CustomerRecep from "../customer-detail/customer-recep";
import { Redirect, Route } from "react-router-dom";
import Home from "./../home";
import moment from "moment";
import { useRouteMatch } from "react-router-dom";
import Footer from "./../footer";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { addDays } from "date-fns";
import { TimePicker } from "@progress/kendo-react-dateinputs";
// import { DatePicker } from "@progress/kendo-react-dateinputs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditGrey from "../../images/ic_edit_grey.svg";
import DealNotAvailable from "./not-available-deal";
import Select from "react-select";
// import OneSignal from "react-onesignal";
import LocationPopup from "./../login/location-popup";

toast.configure();

const engine = new Styletron();
const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const OrderDetails = () => {
  const [css] = useStyletron();
  const dispatch = useDispatch();
  let { url } = useRouteMatch();
  localStorage.setItem("url", url);

  const notify = (msg) => {
    toast.error(msg);
  };

  let datee = new Date();
  let datee1 = moment(datee).add(2, "hours");
  let datee2 = moment(datee).add(1, "days");
  let year = moment(datee1).format("YYYY");
  let month = moment(datee1).format("MM");
  let day = moment(datee1).format("DD");
  let currentDay = moment(datee2).format("DD");
  let nDay = moment(datee).format("DD");
  let hour = moment(datee1).format("HH");
  let minutes = moment(datee1).format("mm");
  let dateee = new Date(2020, 4, 22, 19, 0);
  let currentHour = moment(dateee).format("HH");
  // let max = new Date(2030, 4, 22, 21, 0);
  let Datemin = new Date(year, month - 1, day);

  let Datemax = new Date(2030, 11, 22);
  let cityId = localStorage.getItem("cityId");
  let orderPage = localStorage.getItem("orderPage");

  const { handleSubmit, register, errors } = useForm();
  const [address1, setAddress1] = useState();
  const [addressError, setAddressError] = useState();
  const [date, setDate] = useState(new Date());
  const [condition, setCondition] = useState(false);
  const [addresses, setAddresses] = useState([]);

  // const [max, setMax] = useState(new Date(2030, 4, 22, 21, 0));
  const [max, setMax] = useState();

  const [min, setMin] = useState(new Date(year, month - 1, day, hour, minutes));
  const [value, setValue] = useState(
    new Date(year, month - 1, day, hour, minutes)
  );
  const [obj, setObj] = useState(null);

  const items = useSelector(({ service }) => service.items);
  const cnic = useSelector(({ service }) => service.cnicModal);
  const addressModal = useSelector(({ service }) => service.isAddress);
  const address = useSelector(({ service }) => service.address);
  const auth = useSelector(({ auth }) => auth.isAuth);
  const editAddressPage = useSelector(({ service }) => service.editAddressPage);
  const limitation = useSelector(({ service }) => service.limitation);
  const reOrderData = useSelector(({ service }) => service.reorderData);
  let isReorder = false;
  if (reOrderData !== undefined && Object.keys(reOrderData).length > 0) {
    isReorder = true;
  }

  const data = useSelector(({ auth }) => auth.userData);
  const deal = useSelector(({ service }) => service.dealsData);
  const deals = useSelector(({ service }) => service.dealData);

  const lastStateValue = useSelector(({ service }) => service.lastStateValue);
  const locationPopup = useSelector(({ service }) => service.locationPopup);

  const orderDetailErrorMsg = useSelector(
    ({ service }) => service.orderDetailErrorMsg
  );
  const errorMsg = useSelector(({ service }) => service.orderDetailErrorMssg);
  const totalPrice = useSelector(({ service }) => service.totalPrice);
  const notActiveDeal = useSelector(({ service }) => service.notActiveDeal);

  const guestUser = useSelector(({ auth }) => auth.guestUser);

  // window.addEventListener("beforeunload", function (e) {
  //   e.preventDefault();
  //   history.push("/home/services");
  // });
  window.onbeforeunload = function (e) {
    e.preventDefault();

    // history.push("/home/services");

    dispatch(Action.lastStateValue(true));
  };

  useEffect(() => {
    let filterAddress = address.filter((x) => {
      return (
        x.city_id === cityId ||
        x?.city?.city_name === localStorage.getItem("cityName")
      );
    });
    setAddresses(filterAddress);
  }, [address]);

  useEffect(() => {
    localStorage.setItem("orderPage", true);
    dispatch(Action.removeCouponData());
  }, []);

  // useEffect(() => {
  //   let apiCall = async () => {
  //     const playerId = await OneSignal.getPlayerId();
  //   };
  //   apiCall();
  // }, []);

  // useEffect(() => {
  //   const keyValues = {
  //     user_id: data?.id,
  //     phone: data?.phone,
  //     gender: data?.gender,
  //   };
  //   OneSignal.sendTags(keyValues);
  // }, []);

  // useEffect(() => {
  //   OneSignal.push(function () {
  //     OneSignal.on("notificationDisplay", function (event) {
  //       console.warn("OneSignal notification displayed:", event);
  //     });

  //     //This event can be listened to via the `on()` or `once()` listener
  //   });
  // });

  // useEffect(() => {
  //   let apiCall = async () => {
  //     const playerId = await OneSignal.getPlayerId();
  //     setPlayerId(playerId);
  //   };
  //   apiCall();
  // }, []);

  useEffect(() => {
    let endTime = limitation?.end_time;
    let startTime = limitation?.start_time;
    if (orderDetailErrorMsg) {
      notify(errorMsg);
    }
    let timeInterval = setTimeout(() => {
      dispatch({
        type: Action.ORDER_DETAIL_ERROR_MSG,
        payload: false,
      });
    }, 5000);
    if (!orderDetailErrorMsg) {
      clearTimeout(timeInterval);
    }
  }, [orderDetailErrorMsg]);

  useEffect(() => {
    let startTime = limitation?.start_time;
    let startTimee = moment(startTime, "h:mm A").format("HH");
    let startMinutee = moment(startTime, "h:mm A").format("mm");
    if (condition) {
      if (datee < date) {
        setValue(new Date(2020, 4, 22, startTimee, startMinutee));
        setMin(new Date(2020, 4, 22, startTimee, startMinutee));
        setCondition(false);
      } else {
        setValue(new Date(year, month - 1, day, hour, minutes));
        setMin(new Date(year, month - 1, day, hour, minutes));
      }
    }
  }, [date, condition]);

  useEffect(() => {
    let endTime = limitation?.end_time;
    let timee = moment(endTime, "h:mm A").format("HH");
    let minutee = moment(endTime, "h:mm A").format("mm");
    // setMax(new Date(2030, 4, 22, timee, minutee));
    setMax(new Date(2030, 4, 22, 23, 59));
  }, []);

  useEffect(() => {
    let endTime = limitation?.end_time;
    let startTime = limitation?.start_time;
    let endTimee = moment(endTime, "h:mm A").format("HH");
    let endMinutee = moment(endTime, "h:mm A").format("mm");
    let startTimee = moment(startTime, "h:mm A").format("HH");
    let startMinutee = moment(startTime, "h:mm A").format("mm");

    if (value > new Date(year, month - 1, day, endTimee, endMinutee)) {
      setDate(new Date(year, month - 1, currentDay, startTimee, startMinutee));
      setValue(new Date(2020, 4, 22, startTimee, startMinutee));
      setMin(new Date(2020, 4, 22, startTimee, startMinutee));
    }

    // if (value > new Date(year, month - 1, day, 21, 0)) {
    //   setDate(new Date(year, month - 1, currentDay, 9, 0));
    //   setValue(new Date(2020, 4, 22, 9, 0));
    //   setMin(new Date(2020, 4, 22, 9, 0));
    // }
    // else if (value > new Date()) {
    //   setDate(new Date(year, month - 1, day, 9, 0));
    //   setValue(new Date(2020, 4, 22, 9, 0));
    //   setMin(new Date(2  020, 4, 22, 9, 0));
    // }
  }, []);

  useEffect(() => {
    document.title = "Checkout | GharPar";
  }, []);

  useEffect(() => {
    if (errors.addressId) {
      notify(errors.addressId.message);
    }
  });

  // useEffect(() => {
  //   if (value > new Date(year, month - 1, day, 21, 0)) {
  //     // setDate(new Date(year, month - 1, currentDay, 9, 0));
  //     setDate(new Date(year, month, currentDay, 9, 0));
  //   }
  // }, []);

  useEffect(() => {
    dispatch(Action.Addresses());
  }, [editAddressPage]);

  useEffect(() => {
    if (addresses.length > 0) {
      setAddress1(addresses[0].id);
    }
  }, [address, addresses]);

  let checkout = document.getElementById("Checkout");
  let checkout1 = document.getElementById("Checkout1");

  useEffect(() => {
    checkout &&
      checkout.addEventListener("click", function (e) {
        e.stopPropagation();
        document.getElementById("checkout-btn").click();
      });
    checkout1 &&
      checkout1.addEventListener("click", function (e) {
        e.stopPropagation();
        document.getElementById("checkout-btn").click();
      });
  }, [checkout, checkout1]);

  const onSubmit = (values) => {
    debugger;
    setObj(values);

    let dealEndDate = moment(deals?.deal_end_datetime).format("YYYY-MM-DD");
    let dealEndTime = moment(deals?.deal_end_datetime).format("HH:mm");

    console.log(deals);

    let selectedDate = values?.date;
    let selectedTime = values?.time;

    let activeDeal = localStorage.getItem("dealItemInCart");

    if (
      (selectedDate === dealEndDate || selectedDate > dealEndDate) &&
      selectedTime > dealEndTime &&
      activeDeal
    ) {
      dispatch(Action.notActiveDealModal(true));
    } else if (isReorder) {
      dispatch(Action.orderDetail(values, history, reOrderData));
    } else {
      dispatch(Action.orderDetail(values, history));
    }
    // dispatch(Action.orderDetail(values, history));
  };

  if (totalPrice < limitation?.min_order_price) {
    dispatch(Action.cartItemError(true));
    dispatch(
      Action.handleCheckOut1(false, history, limitation?.min_order_price)
    );
  }

  return (
    <>
      <Topinfobar />
      <section className="order-dtl" style={{ marginTop: "50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 " id="servicesTab">
              <div className="order-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-width">
                    <div className="source">
                      <div
                        className="date-and-time"
                        // style={{ display: "inline-flex" }}
                      >
                        <div>
                          <label>DATE </label>

                          {/* <DatePicker
                            onChange={(e) => {
                              setDate(e.target.value);
                              setCondition(true);
                            }}
                            defaultValue={date}
                            min={Datemin}
                            max={Datemax}
                            style={{
                              color: "transparent",
                              "text-shadow": "0 0 0 black",
                            }}
                          /> */}
                          <DatePicker
                            className="react-date-picker"
                            selected={date}
                            onChange={(date) => {
                              setDate(date);
                              setCondition(true);
                            }}
                            minDate={moment().toDate()}
                            autoComplete="off"
                            style={{
                              color: "transparent",
                              "text-shadow": "0 0 0 black",
                            }}
                          />
                        </div>

                        <div className="time">
                          <label>TIME </label>

                          <TimePicker
                            style={{ marginLeft: "20px" }}
                            onChange={(e) => {
                              setValue(e.target.value, "workingggg");
                            }}
                            value={value}
                            min={min}
                            max={max}
                          />
                        </div>

                        <input
                          name="date"
                          ref={register({ required: "Required" })}
                          value={moment(date).format("YYYY-MM-DD")}
                          type="text"
                          style={{ display: "none" }}
                          className="form-control"
                          placeholder="Select Date & Time"
                        />
                        <input
                          name="time"
                          ref={register({ required: "Required" })}
                          value={moment(value).format("HH:mm")}
                          type="text"
                          style={{ display: "none" }}
                          className="form-control"
                          placeholder="Select Date & Time"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="address-wrap mt-3">
                    <div className="form-width address">
                      <label>ADDRESS</label>
                      <input
                        name="addressId"
                        style={{ display: "none" }}
                        value={address1}
                        ref={register({
                          required:
                            "Please add your address to proceed  your order",
                        })}
                      />

                      {errors.addressId && (
                        <div
                          style={{
                            width: "100%",
                            textAlign: "left",
                            color: "red",
                          }}
                        >
                          {addressError}
                        </div>
                      )}
                      <div className="myaddress-wrap">
                        <form className="address-radio-button">
                          {addresses &&
                            addresses.length > 0 &&
                            addresses.map((x, index) => {
                              return (
                                <>
                                  <div
                                    class="radiobtn text-address radio-inline square"
                                    id="myElement"
                                  >
                                    <input
                                      type="radio"
                                      id={index}
                                      style={{ display: "none" }}
                                      checked={address1 === x.id}
                                      onClick={() => {
                                        setAddress1(x.id);
                                      }}
                                    />
                                    <label for={index}>
                                      Address {index + 1}
                                      <img
                                        src={EditGrey}
                                        onClick={() => {
                                          dispatch(
                                            Action.editAddressType(
                                              !editAddressPage
                                            )
                                          );
                                          dispatch(Action.editProfile(true));
                                          dispatch(Action.editAddress(x.id));
                                          dispatch(
                                            Action.addressModal(!addressModal)
                                          );
                                          localStorage.setItem(
                                            "isDefaultAddress",
                                            x.is_default
                                          );
                                        }}
                                      />
                                      <br />
                                      <p className="address-wrapp">
                                        {x?.address_1 ? x?.address_1 : " "}
                                        {", " + x?.area?.area + ", "}
                                        {x?.city?.city_name}
                                      </p>
                                    </label>
                                  </div>
                                </>
                              );
                            })}
                        </form>
                      </div>
                    </div>
                    {guestUser && addresses && addresses.length > 0 ? (
                      <></>
                    ) : (
                      <div className="w-50 ">
                        <span className="add-picker">
                          <div className="text-center d-block">
                            <div className="address-elipse">
                              <img
                                onClick={() => {
                                  errors.addressId = false;
                                  dispatch(Action.addressModal(!addressModal));
                                  dispatch(Action.editProfile(false));
                                  localStorage.removeItem("profileAddress");
                                }}
                                style={{ cursor: "pointer" }}
                                src={Plus}
                                alt="Plus"
                              />
                            </div>
                            <span className="d-block">add new address</span>
                          </div>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="spc-inst">
                      <label>SPECIAL INSTRUCTIONS</label>
                      <div className="form-group">
                        <textarea
                          name="instruction"
                          ref={register}
                          className="instr"
                          rows="3"
                          id="comment"
                          placeholder="Write special instructions regarding your services..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* {document.getElementById("the-box") &&
                    document
                      .getElementById("Checkout")
                      .addEventListener("click", function () {
                        document.getElementById("checkout-btn").click();
                      })} */}

                  <button
                    style={{ display: "none" }}
                    id="checkout-btn"
                    type="submit3"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>

                  {/* <ToastContainer limit={1} /> */}
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <FixedCart />
            </div>
          </div>
        </div>
        <AddAddress open={addressModal} />
        <DealNotAvailable open={notActiveDeal} values={obj} />
        <LocationPopup open={locationPopup} />
        <Footer />
        {/* <div
          id={orderPage ? "Checkout" : ""}
          className="fixed-mob-total d-lg-none"
          onClick={() => {
            dispatch(Action.cartItemError(true));
            if (totalPrice < limitation?.min_order_price) {
              // setError(true);
              localStorage.setItem("minAmountError", true);
              dispatch(Action.cnicModal(!cnic));
            }

            dispatch(
              Action.handleCheckOut(true, history, limitation?.min_order_price)
            );
            dispatch(Action.logoClickedReload(false));
          }}
          // onClick={() => {
          //   dispatch(Action.cartItemError(true));
          //   // if (totalPrice < 1200) {
          //   //   setError(true);
          //   // }

          //   dispatch(Action.handleCheckOut(true, history));
          //   dispatch(Action.logoClickedReload(false));
          // }}
        >
          <span className="chk-btn">
            <label>My Cart</label>
            <label>
              {items?.length} items: Rs. {totalPrice}
            </label>
          </span>
        </div> */}
      </section>
      <span
        className="fixed-mob-total d-lg-none"
        id={orderPage ? "Checkout1" : ""}
        onClick={() => {
          dispatch(Action.cartItemError(true));
          if (totalPrice < limitation?.min_order_price) {
            // setError(true);
            localStorage.setItem("minAmountError", true);
            dispatch(Action.cnicModal(!cnic));
          }

          dispatch(
            Action.handleCheckOut(true, history, limitation?.min_order_price)
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
      </span>
    </>
  );
};
export default OrderDetails;

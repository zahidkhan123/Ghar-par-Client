import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Plus from "../../images/ic_plus.svg";
import ActivePlus from "../../images/active_plus.svg";
import FixedCart from "../fixed-cart";
import * as Action from "../../store/actions";
import ServicesAddOnModal from "../services/serviceModal";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Footer from "../footer";
import Loader from "react-loader-spinner";
import { useRouteMatch } from "react-router-dom";
import { history } from "../../index";
import DealsModal from "./dealsModal";
import Sale from "../../images/Group 1138.svg";
import CnicModal from "../customer-detail/pending-order-modal";
import RatingPopup from "./../rating-popup";
import useForceUpdate from "use-force-update";
import LocationPopup from "./../login/location-popup";

function ServiceDetails() {
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();
  localStorage.setItem("url", url);
  const [isOpen, setIsOpen] = useState([]);

  const [mieow, setMieow] = useState(0);
  let orderPage = localStorage.getItem("orderPage");
  const [error, setError] = useState(false);

  const cnic = useSelector(({ service }) => service.cnicModal);
  const loading = useSelector(({ service }) => service.serviceLoading);
  const services = useSelector(({ service }) => service.services);
  const modalOpen = useSelector(({ service }) => service.serviceModalOpen);
  const unCheckService = useSelector(({ service }) => service.unCheckedService);
  const items = useSelector(({ service }) => service.items);
  const serviceID = useSelector(({ auth }) => auth.serviceData);
  const item = useSelector(({ service }) => service.items);
  const totalPrice = useSelector(({ service }) => service.totalPrice);
  const dealModal = useSelector(({ service }) => service.dealsModal);
  const deals = useSelector(({ service }) => service.dealsData);
  // console.log(deals);
  const deal = useSelector(({ service }) => service.dealData);

  const pendingRating = useSelector(({ service }) => service.pendingRating);

  const subCategoryy = useSelector(({ service }) => service.serviceSubcategory);
  const subCategoryServiceee = useSelector(
    ({ service }) => service.subCategoryService
  );
  const limitation = useSelector(({ service }) => service.limitation);
  const notification = useSelector(({ service }) => service.notificationsData);
  const ratingPopup = useSelector(({ service }) => service.ratingPopup);
  const locationPopup = useSelector(({ service }) => service.locationPopup);
  const discount = useSelector(({ service }) => service.discountModal);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    dispatch(Action.pendingRating());
    localStorage.setItem("page", true);
    dispatch(Action.removeCouponData());
    dispatch(Action.cnicModal(false));
    dispatch(Action.discountModal(false));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("latitude", position.coords.latitude);
      localStorage.setItem("longitude", position.coords.longitude);
    });
  }, []);
  // const handleCheckbox = () => {
  //   let x = unCheckService
  //   x[2] = false
  //   // dispatch(
  //   //   Action.unCheckService(
  //   //     false
  //   //   )
  //   //  )
  // }

  // useEffect(() => {
  //   dispatch(Action.notifications());
  // }, []);

  // useEffect(() => {

  //   if (notification?.notifications?.length > 0) {
  //     let id = notification?.notifications[0]?.parent_id;
  //     dispatch(Action.firstNotificationId(id));
  //   }
  // }, []);

  useEffect(() => {
    dispatch(Action.editPage1(false));
    dispatch(Action.editPage2(false));
    dispatch(Action.editPage3(false));
  }, []);

  useEffect(() => {
    document.title = "Services | GharPar";
  }, []);

  let serv = localStorage.getItem("services");

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   forceUpdate();
    // }, 2000);
    // return () => clearTimeout(timer);
  }, [services]);

  // useEffect(() => {
  //   // return serviceID?.service_categories?.map((x) => {
  //   //   return (
  //   //     x?.service_category_title == "Deal" && dispatch(Action.dealsModal(true))
  //   //   );
  //   // });

  //   let isClose = localStorage.getItem("isClose");
  //   if (isClose) {
  //     dispatch(Action.dealsModal(false));
  //   }
  // }, []);

  let token = localStorage.getItem("tokenn");
  useEffect(() => {
    if (pendingRating?.orders?.length > 0) {
      dispatch(Action.ratingPopup(true));
    }
  }, [pendingRating, token]);

  const toggle = (id) => {
    if (isOpen.includes(id)) {
      setIsOpen(isOpen.filter((x) => x != id));
    } else {
      setIsOpen([...isOpen, id]);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div
          style={{
            display: "block",
            marginLeft: "50%",
            marginRight: "50%",
            marginTop: "10%",
            width: "50%",
          }}
        >
          <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <>
          {subCategoryy && subCategoryy.length > 0 ? (
            <>
              <div className="services-details">
                <div className="container">
                  <div className="tab-content" id="pills-tabContent">
                    <div>
                      <div className="row">
                        <div className="col-md-8  mt-3" id="servicesTab">
                          <div className="services-detail">
                            <div className="accordion" id="accordionExample">
                              {subCategoryy &&
                                subCategoryy.map((subcategory, index) => {
                                  {
                                    {
                                      /* if (mieow == 0) { */
                                    }
                                    dispatch(
                                      Action.subCategoryServices(
                                        subcategory.id,
                                        index
                                      )
                                    );
                                    {
                                      /* if (index == subCategoryy.length - 1) {
                                    setMieow(2);
                                  }
                                } */
                                    }
                                  }
                                  return (
                                    <div key={subcategory.id} className="card">
                                      <div
                                        className="card-header"
                                        id="headingOne"
                                      >
                                        <h2 className="mb-0">
                                          <button
                                            className={`btn btn-link ${
                                              isOpen.includes(subcategory.id)
                                                ? " collapsed "
                                                : " btn-link "
                                            } `}
                                            type="button"
                                            onClick={() => {
                                              toggle(subcategory.id);
                                            }}
                                          >
                                            {subcategory.service_category_title}
                                          </button>
                                        </h2>
                                      </div>
                                      {/* <div
                                        // key={subcategoryService.id}
                                        className="card-body"
                                      > */}
                                      {subCategoryServiceee &&
                                        subCategoryServiceee[index] &&
                                        subCategoryServiceee[index].map(
                                          (subcategoryService, indexx) => {
                                            return (
                                              <Collapse
                                                isOpen={isOpen.includes(
                                                  subcategory.id
                                                )}
                                              >
                                                <div className="card-body">
                                                  <form>
                                                    <div class="checkbtn">
                                                      {unCheckService?.map(
                                                        (x) => {
                                                          return x.type ==
                                                            false &&
                                                            x.id ===
                                                              subcategoryService.id ? (
                                                            <input
                                                              type="checkbox"
                                                              id={
                                                                subcategoryService.id
                                                              }
                                                              name="check-box"
                                                              checked={false}
                                                            />
                                                          ) : x.type == true &&
                                                            x.id ==
                                                              subcategoryService.id ? (
                                                            <input
                                                              type="checkbox"
                                                              id={
                                                                subcategoryService.id
                                                              }
                                                              name="check-box"
                                                              checked={true}
                                                            />
                                                          ) : null;
                                                        }
                                                      )}
                                                      {/* <input
                                                        type="checkbox"
                                                        id={
                                                          subcategoryService.id
                                                        }
                                                        name="check-box"
                                                      /> */}
                                                      <label
                                                        onClick={() => {
                                                          if (
                                                            subcategoryService
                                                              ?.service_addons
                                                              ?.length > 0
                                                          ) {
                                                            let dataId = subcategoryService.service_id
                                                              ? subcategoryService.service_id
                                                              : subcategoryService.id;
                                                            return (
                                                              dispatch(
                                                                Action.unCheckService(
                                                                  true,
                                                                  index,
                                                                  dataId
                                                                )
                                                              ),
                                                              dispatch(
                                                                Action.addItem(
                                                                  subcategoryService,
                                                                  indexx
                                                                )
                                                              ),
                                                              dispatch(
                                                                Action.serviceModalAction(
                                                                  !modalOpen
                                                                )
                                                              ),
                                                              dispatch(
                                                                Action.addOnData(
                                                                  subcategoryService.service_addons
                                                                )
                                                              )
                                                            );
                                                          } else {
                                                            let dataId = subcategoryService.service_id
                                                              ? subcategoryService.service_id
                                                              : subcategoryService.id;
                                                            return (
                                                              dispatch(
                                                                Action.unCheckService(
                                                                  true,
                                                                  index,
                                                                  dataId
                                                                )
                                                              ),
                                                              dispatch(
                                                                Action.addItem(
                                                                  subcategoryService,
                                                                  indexx
                                                                )
                                                              )
                                                            );
                                                          }
                                                        }}
                                                        for={
                                                          subcategoryService.service_id
                                                            ? subcategoryService.service_id
                                                            : subcategoryService.id
                                                        }
                                                        className={
                                                          subcategoryService.is_deal
                                                            ? "check-lab service-item sale-service"
                                                            : "check-lab service-item "
                                                        }
                                                        // className="check-lab service-item "
                                                      >
                                                        {/* <div className="service-item"> */}
                                                        <div className="row">
                                                          <div className="col-md-8">
                                                            <label
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                            >
                                                              {
                                                                subcategoryService.service_title
                                                              }
                                                            </label>
                                                            {subcategoryService.is_deal ||
                                                            subcategoryService.discount_price ? (
                                                              <img
                                                                src={Sale}
                                                                alt="sale"
                                                                className="salee"
                                                                // style={{
                                                                //   marginLeft:
                                                                //     "20px",
                                                                // }}
                                                              />
                                                            ) : (
                                                              ""
                                                            )}
                                                            {subcategoryService
                                                              ?.service_addons
                                                              ?.length > 0 && (
                                                              <span
                                                                // onClick={() => {
                                                                //   dispatch(
                                                                //     Action.serviceModalAction(
                                                                //       !modalOpen
                                                                //     )
                                                                //   );
                                                                //   dispatch(
                                                                //     Action.addOnData(
                                                                //       subcategoryService.service_addons
                                                                //     )
                                                                //   );
                                                                // }}
                                                                className="ads-on"
                                                              >
                                                                Add-ons
                                                              </span>
                                                            )}
                                                          </div>
                                                          <div className="col-md-4 price-tag">
                                                            {/* <label>
                                                              Rs.
                                                              {
                                                                subcategoryService.service_price
                                                              }
                                                            </label> */}
                                                            <label
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                            >
                                                              Rs.{" "}
                                                              {subcategoryService.discount_price
                                                                ? subcategoryService.discount_price
                                                                : subcategoryService.service_price}
                                                            </label>
                                                            {subcategoryService.discount_price && (
                                                              <s className="original-price">
                                                                Rs.{" "}
                                                                {
                                                                  subcategoryService.service_price
                                                                }
                                                              </s>
                                                            )}
                                                            <span
                                                              onClick={() => {
                                                                if (
                                                                  subcategoryService
                                                                    ?.service_addons
                                                                    ?.length > 0
                                                                ) {
                                                                  return (
                                                                    dispatch(
                                                                      Action.addItem(
                                                                        subcategoryService,
                                                                        indexx
                                                                      )
                                                                    ),
                                                                    dispatch(
                                                                      Action.serviceModalAction(
                                                                        !modalOpen
                                                                      )
                                                                    ),
                                                                    dispatch(
                                                                      Action.addOnData(
                                                                        subcategoryService.service_addons
                                                                      )
                                                                    )
                                                                  );
                                                                }

                                                                return dispatch(
                                                                  Action.addItem(
                                                                    subcategoryService,
                                                                    indexx
                                                                  )
                                                                );
                                                              }}
                                                            >
                                                              <img
                                                                src={Plus}
                                                                alt="plus"
                                                              />
                                                            </span>
                                                          </div>
                                                        </div>
                                                        {/* </div> */}
                                                      </label>
                                                    </div>
                                                  </form>
                                                </div>
                                              </Collapse>
                                            );
                                          }
                                        )}
                                    </div>
                                    // </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mt-3">
                          <FixedCart />
                          {/* {error ? (
                            <div className="text-center pt-1">
                              <small style={{ color: "red" }}>
                                Place your minimum order of Rs.{" "}
                                {limitation?.min_order_price}
                              </small>
                            </div>
                          ) : (
                            <div className="text-center pt-1">
                              <small>
                                Place your minimum order of Rs.{" "}
                                {limitation?.min_order_price}
                              </small>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
              <div
                className="fixed-mob-total d-lg-none"
                id={orderPage ? "Checkout" : ""}
                onClick={() => {
                  let fixedCart = document.querySelector("#fixedCart");
                  let servicesTab = document.querySelector("#servicesTab");
                  let mainApp = document.querySelector("#mainApp");

                  if (fixedCart) {
                    fixedCart.classList.remove("display-cart");
                  }

                  if (servicesTab) {
                    servicesTab.classList.remove("disable-content");
                  }

                  if (mainApp) {
                    mainApp.classList.remove("positionn");
                  }
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
                  <label>Proceed to Checkout</label>
                  <label>
                    {items?.length} items: Rs. {totalPrice}
                  </label>
                </span>
              </div>
              <CnicModal open={cnic} />
              <ServicesAddOnModal open={modalOpen} />
              <LocationPopup open={locationPopup} />
            </>
          ) : services && services.length > 0 ? (
            <>
              {/* <button onClick={handleCheckbox}>Check</button> */}
              <div className="services-details">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 " id="servicesTab">
                      {/* <div className="container">  */}
                      <div className="services-detail">
                        <div className="card-body">
                          {services &&
                            services.map((data, index) => {
                              return (
                                <>
                                  <form>
                                    <div class="checkbtn">
                                      {unCheckService?.map((x) => {
                                        return x.type == false &&
                                          x.id == data.id ? (
                                          <input
                                            type="checkbox"
                                            id={data.id}
                                            name="check-box"
                                            checked={false}
                                          />
                                        ) : x.type == true &&
                                          x.id == data.id ? (
                                          <input
                                            type="checkbox"
                                            id={data.id}
                                            name="check-box"
                                            checked={true}
                                          />
                                        ) : null;
                                      })}
                                      <label
                                        onClick={() => {
                                          if (
                                            data?.service_addons?.length > 0
                                          ) {
                                            let dataId = data.service_id
                                              ? data.service_id
                                              : data.id;
                                            return (
                                              dispatch(
                                                Action.unCheckService(
                                                  true,
                                                  index,
                                                  dataId
                                                )
                                              ),
                                              dispatch(
                                                Action.addItem(data, index)
                                              ),
                                              dispatch(
                                                Action.serviceModalAction(
                                                  !modalOpen
                                                )
                                              ),
                                              dispatch(
                                                Action.addOnData(
                                                  data.service_addons
                                                )
                                              )
                                            );
                                          } else {
                                            let dataId = data.service_id
                                              ? data.service_id
                                              : data.id;
                                            return (
                                              dispatch(
                                                Action.unCheckService(
                                                  true,
                                                  index,
                                                  dataId
                                                )
                                              ),
                                              dispatch(
                                                Action.addItem(data, index)
                                              )
                                            );
                                          }
                                        }}
                                        for={
                                          data.service_id
                                            ? data.service_id
                                            : data.id
                                        }
                                        className={
                                          data.is_deal
                                            ? "check-lab service-item sale-service"
                                            : "check-lab service-item "
                                        }
                                      >
                                        {/* <div className="sale-service"> */}
                                        <div className="row">
                                          <div className="col-md-8">
                                            <label
                                              style={{
                                                cursor: "pointer",
                                              }}
                                            >
                                              {data.service_title}
                                            </label>
                                            {data.is_deal ||
                                            data.discount_price ? (
                                              <img
                                                src={Sale}
                                                alt="sale"
                                                className="salee"
                                                // style={{ marginLeft: "20px" }}
                                              />
                                            ) : (
                                              ""
                                            )}
                                            {data?.service_addons?.length >
                                              0 && (
                                              <span className="ads-on">
                                                Add-ons
                                              </span>
                                            )}
                                          </div>
                                          <div className="col-md-4 price-tag">
                                            {/* <label>
                                              Rs. {data.service_price}
                                            </label> */}

                                            <label
                                              style={{
                                                cursor: "pointer",
                                              }}
                                            >
                                              Rs.{" "}
                                              {data.discount_price
                                                ? data.discount_price
                                                : data.service_price}
                                            </label>
                                            {data.discount_price && (
                                              <s className="original-price">
                                                Rs. {data.service_price}
                                              </s>
                                            )}
                                            <span
                                              onClick={() => {
                                                if (
                                                  data?.service_addons?.length >
                                                  0
                                                ) {
                                                  return (
                                                    dispatch(
                                                      Action.addItem(
                                                        data,
                                                        index
                                                      )
                                                    ),
                                                    dispatch(
                                                      Action.serviceModalAction(
                                                        !modalOpen
                                                      )
                                                    ),
                                                    dispatch(
                                                      Action.addOnData(
                                                        data.service_addons
                                                      )
                                                    )
                                                  );
                                                }

                                                return dispatch(
                                                  Action.addItem(data, index)
                                                );
                                              }}
                                            >
                                              <img src={Plus} alt="plus" />
                                            </span>
                                          </div>
                                        </div>
                                        {/* </div> */}
                                      </label>
                                    </div>
                                  </form>
                                </>
                              );
                            })}
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                    <div className="col-md-4 ">
                      <FixedCart />
                      {/* {error ? (
                        <div className="text-center pt-1">
                          <small style={{ color: "red" }}>
                            Place your minimum order of Rs.{" "}
                            {limitation?.min_order_price}
                          </small>
                        </div>
                      ) : (
                        <div className="text-center pt-1">
                          <small>
                            Place your minimum order of Rs.{" "}
                            {limitation?.min_order_price}
                          </small>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
              <div
                className="fixed-mob-total d-lg-none"
                // id={orderPage ? "Checkout" : ""}
                onClick={() => {
                  let fixedCart = document.querySelector("#fixedCart");
                  let servicesTab = document.querySelector("#servicesTab");
                  let mainApp = document.querySelector("#mainApp");

                  if (fixedCart) {
                    fixedCart.classList.remove("display-cart");
                  }

                  if (servicesTab) {
                    servicesTab.classList.remove("disable-content");
                  }

                  if (mainApp) {
                    mainApp.classList.remove("positionn");
                  }
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
                  <label>Proceed to Checkout</label>
                  <label>
                    {items?.length} items: Rs. {totalPrice}
                  </label>
                </span>
              </div>
              <CnicModal open={cnic} />
              <DealsModal open={dealModal} />
              <ServicesAddOnModal open={modalOpen} />
              <RatingPopup open={ratingPopup} />
              <LocationPopup open={locationPopup} />
            </>
          ) : (
            <>
              {/* <button onClick={handleCheckbox}>Check</button> */}
              <div className="services-details">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 " id="servicesTab">
                      {/* <div className="container">  */}
                      <div className="services-detail">
                        <div className="card-body">
                          {deals &&
                            deals?.deal_services?.map((data, index) => {
                              let dataId = data.service_id
                                ? data.service_id
                                : data.id;
                              return (
                                <>
                                  <form>
                                    <div class="checkbtn">
                                      {unCheckService?.map((x) => {
                                        return x.type == false &&
                                          x.id == dataId ? (
                                          <input
                                            type="checkbox"
                                            id={dataId}
                                            name="check-box"
                                            checked={false}
                                          />
                                        ) : x.type == true && x.id == dataId ? (
                                          <input
                                            type="checkbox"
                                            id={dataId}
                                            name="check-box"
                                            checked={true}
                                          />
                                        ) : null;
                                      })}
                                      <label
                                        onClick={() => {
                                          if (
                                            data?.service_addons?.length > 0
                                          ) {
                                            let dataId = data.service_id
                                              ? data.service_id
                                              : data.id;
                                            return (
                                              dispatch(
                                                Action.unCheckService(
                                                  true,
                                                  index,
                                                  dataId
                                                )
                                              ),
                                              dispatch(
                                                Action.addItem(data, index)
                                              ),
                                              dispatch(
                                                Action.serviceModalAction(
                                                  !modalOpen
                                                )
                                              ),
                                              dispatch(
                                                Action.addOnData(
                                                  data.service_addons
                                                )
                                              )
                                            );
                                          } else {
                                            let dataId = data.service_id
                                              ? data.service_id
                                              : data.id;
                                            return (
                                              dispatch(
                                                Action.unCheckService(
                                                  true,
                                                  index,
                                                  dataId
                                                )
                                              ),
                                              dispatch(
                                                Action.addItem(data, index)
                                              )
                                            );
                                          }
                                        }}
                                        for={dataId}
                                        className={
                                          data.is_deal || data.discount_price
                                            ? "check-lab service-item sale-service"
                                            : "check-lab service-item "
                                        }
                                      >
                                        {/* <div className="sale-service"> */}
                                        <div className="row">
                                          <div className="col-md-8">
                                            <label>{data.service_title}</label>
                                            {data.is_deal ||
                                            data.discount_price ? (
                                              <img
                                                src={Sale}
                                                alt="sale"
                                                className="salee"
                                                // style={{ marginLeft: "20px" }}
                                              />
                                            ) : (
                                              ""
                                            )}
                                            {data?.service_addons?.length >
                                              0 && (
                                              <span className="ads-on">
                                                Add-ons
                                              </span>
                                            )}
                                          </div>
                                          <div className="col-md-4 price-tag">
                                            {/* <label>
                                              Rs. {data.service_price}
                                            </label> */}

                                            <label>
                                              Rs.{" "}
                                              {data.discount_price
                                                ? data.discount_price
                                                : data.service_price}
                                            </label>
                                            {data.discount_price && (
                                              <s className="original-price">
                                                Rs.{" "}
                                                {Math.floor(data.service_price)}
                                              </s>
                                            )}
                                            <span
                                              onClick={() => {
                                                if (
                                                  data?.service_addons?.length >
                                                  0
                                                ) {
                                                  return (
                                                    dispatch(
                                                      Action.addItem(
                                                        data,
                                                        index
                                                      )
                                                    ),
                                                    dispatch(
                                                      Action.serviceModalAction(
                                                        !modalOpen
                                                      )
                                                    ),
                                                    dispatch(
                                                      Action.addOnData(
                                                        data.service_addons
                                                      )
                                                    )
                                                  );
                                                }

                                                return dispatch(
                                                  Action.addItem(data, index)
                                                );
                                              }}
                                            >
                                              <img src={Plus} alt="plus" />
                                            </span>
                                          </div>
                                        </div>
                                        {/* </div> */}
                                      </label>
                                    </div>
                                  </form>
                                </>
                              );
                            })}
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                    <div className="col-md-4 ">
                      <FixedCart />
                      {/* {error ? (
                        <div className="text-center pt-1">
                          <small style={{ color: "red" }}>
                            Place your minimum order of Rs.{" "}
                            {limitation?.min_order_price}
                          </small>
                        </div>
                      ) : (
                        <div className="text-center pt-1">
                          <small>
                            Place your minimum order of Rs.{" "}
                            {limitation?.min_order_price}
                          </small>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
              <div
                className="fixed-mob-total d-lg-none"
                id={orderPage ? "Checkout" : ""}
                onClick={() => {
                  let fixedCart = document.querySelector("#fixedCart");
                  let servicesTab = document.querySelector("#servicesTab");
                  let mainApp = document.querySelector("#mainApp");

                  if (fixedCart) {
                    fixedCart.classList.remove("display-cart");
                  }

                  if (servicesTab) {
                    servicesTab.classList.remove("disable-content");
                  }

                  if (mainApp) {
                    mainApp.classList.remove("positionn");
                  }
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
                  <label>Proceed to Checkout</label>
                  <label>
                    {items?.length} items: Rs. {totalPrice}
                  </label>
                </span>
              </div>
              <CnicModal open={cnic} />
              <DealsModal open={dealModal} />
              <ServicesAddOnModal open={modalOpen} />
              <RatingPopup open={ratingPopup} />
              <LocationPopup open={locationPopup} />
            </>
          )}
        </>
      )}
    </Fragment>
  );
}

export default ServiceDetails;

import React, { useEffect, useState, lazy, Suspense } from "react";
import Logo from "../images/Logo-Original.svg";
import { useSelector, useDispatch } from "react-redux";
import CurrentLocation from "../images/current-loc.svg";
import PinLocation from "../images/ic_pin.svg";
import useGeolocation from "react-hook-geolocation";
import Geocode from "react-geocode";

// import Banner from "../images/banner.svg";

import {
  NavLink,
  Link,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import * as Action from "../store/actions";
import OrderDetails from "./orders-detail/order-details";
import OrderTable from "./table";
import AddGender from "./login/add-gender";
import Banner from "./banner";
import location from "../images/location.svg";
import cart from "../images/ic_cart.png";
import Notification from "../images/notification_icon.svg";
import OrderNum from "../images/order_num.svg";
import SuccessIcon from "../images/success_icon.svg";
import CNIC from "../images/notification_cnic.svg";
import Schedual from "../images/schedual.svg";
import Profile from "../images/profile_icon.svg";
import WhatsApp from "../images/icon-whatsapp.png";
import BeaticianIcon from "../images/beautician.svg";
import OneSignal from "react-onesignal";
import moment from "moment";
import axios from "axios";
import { history } from "./../index";
import Loader from "react-loader-spinner";

const Services = lazy(() => import("./services/services"));
const ContactUs = lazy(() => import("./contact-us/contact"));
const Faq = lazy(() => import("./faq's/faq"));
const CustomerProfile = lazy(() =>
  import("./customer-detail/customer-profile")
);
const AboutUs = lazy(() => import("./footer-links/about-us"));
const PrivacyPolicy = lazy(() => import("./footer-links/privacy-policy"));
const TermsCondition = lazy(() => import("./footer-links/terms-conditions"));
const Milestones = lazy(() => import("./milestones/milestones"));

const Topinfobar = () => {
  const dispatch = useDispatch();
  // const geolocation = useGeolocation();
  const { params } = useParams();
  let { url, path } = useRouteMatch();
  localStorage.setItem("url", url);
  const [name, setName] = useState("");
  const [cityNamee, setCityNamee] = useState("");
  // const [newNotification, setNewNotification] = useState(false);
  const cities = useSelector(({ service }) => service.cities);
  const data = useSelector(({ auth }) => auth.userData);
  const dataa = useSelector(({ auth }) => auth.serviceData);
  const auth = useSelector(({ auth }) => auth.isAuth);
  const checkOut = useSelector(({ service }) => service.isCheckOut);
  const genderModal = useSelector(({ auth }) => auth.genderModal);
  const cityAfterLogin = useSelector(({ auth }) => auth.cityAfterLogin);
  const guestUser = useSelector(({ auth }) => auth.guestUser);
  const logoClicked = useSelector(({ auth }) => auth.logoClicked);
  const item = useSelector(({ service }) => service.items);
  const notification = useSelector(({ service }) => service.notificationsData);
  const newNotificationType = useSelector(
    ({ service }) => service.newNotificationType
  );

  const firstNotificationId = useSelector(
    ({ auth }) => auth.firstNotificationId
  );

  useEffect(() => {
    dispatch(Action.notifications());
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("latitude", position.coords.latitude);
      localStorage.setItem("longitude", position.coords.longitude);
    });

    // let apiCall = async () => {
    //   let res = await geolocation;
    //   localStorage.setItem("latitude", res.latitude);
    //   localStorage.setItem("longitude", res.longitude);
    // };
    // apiCall();
  }, []);

  // FOR DEMO SERVER
  // useEffect(() => {
  //   if (!localStorage.getItem("storageCleared")) {
  //     dispatch(Action.authType());
  //     localStorage.clear();
  //     localStorage.setItem("storageCleared", true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("storageCleared")) {
  //     dispatch(Action.authType());
  //     localStorage.clear();
  //     localStorage.removeItem("storageCleared");
  //   }
  // }, []);

  // FOR LIVE SERVER
  //this is working on live
  // useEffect(() => {
  //   if (!localStorage.getItem("storageCleared")) {
  //     dispatch(Action.authType());
  //     localStorage.clear();
  //     localStorage.setItem("storageCleared", true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("storageCleared")) {
  //     dispatch(Action.authType());
  //     localStorage.clear();
  //     localStorage.removeItem("storageCleared");
  //   }
  // }, []);

  useEffect(() => {
    if (!newNotificationType) {
      let id = notification?.notifications[0]?.parent_id;
      dispatch(Action.firstNotificationId(id));
    }
  }, [notification]);
  useEffect(() => {
    Geocode.setApiKey("AIzaSyBgTzuyU5I2H1PUV7XHkg_onbPHNvz5fwg");

    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
  }, []);

  let newNotificationId = notification?.notifications[0]?.parent_id;
  useEffect(() => {
    if (newNotificationId !== firstNotificationId) {
      dispatch(Action.newNotificationType(true));
    }
  }, [notification]);

  // useEffect(() => {
  // Geocode.fromLatLng(lat, lang).then(
  //   (response) => {
  //
  //     const address = response.results[0].formatted_address;
  //
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
  // }, [dataa]);

  useEffect(() => {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(["setSubscription", true]);
    OneSignal.push(function () {
      OneSignal.sendTags({
        user_id: data?.id,
        phone: data?.phone,
        gender: data?.gender,
      });
    });
  }, []);

  useEffect(() => {
    dispatch(Action.pendingRating());
  }, []);

  useEffect(() => {
    var OneSignal = window.OneSignal || [];

    OneSignal.push(function () {
      // Occurs when the user's subscription changes to a new value.
      OneSignal.on("subscriptionChange", function (isSubscribed) {});

      OneSignal.push(function () {
        OneSignal.on("notificationDisplay", function (event) {
          console.warn("OneSignal notification displayed:", event, "Eeevent");
        });
      });
    });
  }, []);

  useEffect(() => {
    dispatch(Action.keepMeLogin());
  }, []);

  useEffect(() => {
    setName(data?.first_name);
  }, [data]);

  useEffect(() => {
    // if (!cityAfterLogin) {
    //   if (localStorage.getItem("gender")) {
    //     dispatch(Action.selectGender(false, history));
    //   } else dispatch(Action.selectGender(true));
    // }
    if (localStorage.getItem("login") || localStorage.getItem("gender")) {
      dispatch(Action.selectGender(false, history));
    } else {
      dispatch(Action.selectGender(true));
    }
  }, []);

  useEffect(() => {
    setCityNamee(localStorage.getItem("cityName"));
  }, [dataa, cityNamee]);

  const handleLogout = (e) => {
    e.preventDefault();
    var OneSignal = window.OneSignal || [];
    OneSignal.push(["setSubscription", false]);
    dispatch(Action.handleLogout());
  };

  const handleCity = (id, cityName, historyy, lat, lang) => {
    localStorage.setItem("cc", true);
    localStorage.setItem("lat", lat);
    localStorage.setItem("lang", lang);
    let urlPath = localStorage.getItem("url");
    if (lat && lang) {
      Geocode.fromLatLng(lat, lang).then(
        (response) => {
          // localStorage.setItem(
          //   "cityName",
          //   response.results[0].address_components[5].short_name
          // );
          localStorage.setItem(
            "cityName",
            response.results[0].address_components[0].short_name
          );
          // setCityNamee(response.results[0].address_components[3].long_name);
          const address = response.results[0].formatted_address;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      localStorage.removeItem("lat");
      localStorage.removeItem("lang");
    }

    localStorage.setItem("cityChange", true);
    localStorage.setItem("changeCity", true);

    // let cityNameee = cityName ? cityName : cityNamee;
    dispatch(Action.cityModal(id, cityName, history, lat, lang, urlPath));
  };

  return !auth ? (
    <Redirect to="/" />
  ) : (
    <>
      <section>
        <div className="top-info">
          <div className="container">
            <div className="d-md-flex justify-content-between d-sm-block text-center">
              <p>Welcome to gharpar services portal</p>
              <div className="info-links">
                <a href="mailto:info@gharpar.co">info@gharpar.co</a>
                <a href="tel:+92 304 111 44 271">+92 304 111 44 27</a>
                <a
                  href="https://api.whatsapp.com/send?phone=+923048888053"
                  target="_blank"
                >
                  <img
                    src={WhatsApp}
                    width="30"
                    style={{ marginLeft: "20px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-bar">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler second-button"
                type="button"
                // data-toggle="collapse"
                data-toggle="dropdown"
                data-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <div className="animated-icon2">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
              <NavLink className="navbar-brand menu-logo nav-link" to="/home">
                <img
                  // onClick={() => {
                  //   dispatch(Action.logoClickedReload(true));
                  //   if (logoClicked) {
                  //     window.location.reload();
                  //   }
                  // }}
                  src={Logo}
                  alt="logo"
                />
              </NavLink>

              <div className="collapse navbar-collapse " id="navbarText">
                <ul className="navbar-nav m-auto">
                  <li className="nav-item mobile-location">
                    <div className="nav-link d-md-none d-sm-block">
                      <img src={location} className="pr-2" alt="location" />
                      <span
                        onClick={() => {
                          localStorage.getItem("page") &&
                            dispatch(Action.locationPopup(true));
                        }}
                      >
                        {cityNamee} <span className="sr-only ">(current)</span>
                      </span>
                    </div>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      onClick={() => {
                        dispatch(Action.logoClickedReload(true));
                        if (logoClicked) {
                          window.location.reload();
                        }
                      }}
                      className="nav-link "
                      to="/home/services"
                    >
                      Services <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      onClick={() => {
                        dispatch(Action.logoClickedReload(false));
                        localStorage.removeItem("page");
                      }}
                      className="nav-link"
                      to="/home/order-detail"
                    >
                      My Orders
                    </NavLink>
                  </li>
                  {!guestUser ? (
                    <>
                      <li className="nav-item">
                        <NavLink
                          onClick={() => {
                            dispatch(Action.logoClickedReload(false));
                            localStorage.removeItem("page");
                            localStorage.setItem("milestone", "milestone");
                          }}
                          className="nav-link"
                          to="/home/milestones"
                        >
                          Loyalty Points
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <li className="nav-item ">
                  <NavLink
                    className="nav-link d-md-none d-sm-block"
                    to="/home/cart"
                  >
                    My Cart <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                */}
                  {!guestUser && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link d-md-none d-sm-block"
                        to="/home/profile"
                        onClick={() => {
                          localStorage.removeItem("page");
                        }}
                      >
                        My Profile<span className="sr-only">(current)</span>
                      </NavLink>
                    </li>
                  )}

                  <li
                    onClick={() => {
                      dispatch(Action.logoClickedReload(false));
                      localStorage.removeItem("page");
                    }}
                    className="nav-item"
                  >
                    {/* <a
                      href="https://gharpar.co/app-contact/"
                      target="_blank"
                      className="nav-link"
                    >
                      Contact Us
                    </a> */}
                    <NavLink className="nav-link" to="/home/contact">
                      Contact Us
                    </NavLink>
                  </li>
                  <li
                    onClick={() => {
                      dispatch(Action.logoClickedReload(false));
                      localStorage.removeItem("page");
                    }}
                    className="nav-item"
                  >
                    {/* <a
                      href="https://gharpar.co/app-faq/"
                      target="_blank"
                      className="nav-link"
                    >
                      FAQ's
                    </a> */}
                    <NavLink className="nav-link" to="/home/faq">
                      FAQ's
                    </NavLink>
                  </li>
                  <li
                    onClick={() => {
                      dispatch(Action.logoClickedReload(false));
                      let id = notification?.notifications[0]?.parent_id;
                      dispatch(Action.firstNotificationId(id));
                    }}
                    onClick={handleLogout}
                    className="nav-item nav-link d-md-none d-sm-block"
                  >
                    Logout<span className="sr-only">(current)</span>
                  </li>
                </ul>
              </div>

              {notification?.notifications.length > 0 && (
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(Action.newNotificationType(false));
                    let id = notification?.notifications[0]?.parent_id;
                    dispatch(Action.firstNotificationId(id));
                  }}
                  className="notification"
                >
                  {newNotificationType && (
                    <span className="notification-dot"></span>
                  )}
                  <ul>
                    <li className="nav-item dropdown">
                      <span className="nav-link" data-toggle="dropdown">
                        <img src={Notification} alt="Notification" />{" "}
                      </span>
                      <div className="dropdown-menu">
                        {notification?.notifications?.map((x) => {
                          let datee = x?.created_at;
                          let hour = moment(datee).format("HH");
                          let timeFormat = moment(datee)
                            .startOf(hour)
                            .fromNow();

                          {
                            /* let content =
                          x.content == "Your order is pending."
                            ? "Your order placed successfully"
                            : x.content; */
                          }

                          return (
                            <Link
                              onClick={() => {
                                dispatch(Action.logoClickedReload(false));
                                localStorage.setItem(
                                  "orderShowId",
                                  x.parent_id
                                );
                              }}
                              className="dropdown-item"
                              to="/home/order-detail"
                            >
                              {/* <img src={OrderNum} alt="OrderNum" />{" "} */}
                              <div>
                                <span>{timeFormat}</span>
                                <p>{x.content}</p>
                              </div>
                            </Link>
                          );
                        })}

                        {/* <a className="dropdown-item" href="#">
                        <img src={OrderNum} alt="OrderNum" />{" "}
                        <div>
                          <span>2 minutes ago</span>
                          <p>Order No. 23409 is Processing</p>
                        </div>
                      </a>
                      <a className="dropdown-item" href="#">
                        <img src={BeaticianIcon} alt="BeaticianIcon" />{" "}
                        <div>
                          <span>21 minutes ago</span>
                          <p>Beautician has assigned</p>
                        </div>
                      </a>
                      <a className="dropdown-item" href="#">
                        <img src={SuccessIcon} alt="successIcon" />{" "}
                        <div>
                          <span>35 minutes ago</span>
                          <p>Order Placed successfully</p>
                        </div>
                      </a>
                      <a className="dropdown-item" href="#">
                        <img src={CNIC} alt="CNICIcon" />{" "}
                        <div>
                          <span>2 days ago</span>
                          <p>Provide CNIC for order approval</p>
                        </div>
                      </a>
                      <a className="dropdown-item" href="#">
                        <img src={Schedual} alt="Schedual" />{" "}
                        <div>
                          <span>13 days ago</span>
                          <p>Order No.28109 Scheduled now</p>
                        </div>
                      </a>
                      <a className="dropdown-item" href="#">
                        <img src={Profile} alt="profile" />{" "}
                        <div>
                          <span>25 days ago</span>
                          <p>Incomplete your profile (70%)</p>
                        </div>
                      </a> */}
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              <div className="name-location-dropdown">
                <li className="nav-item dropdown logout-profile">
                  <span
                    className="nav-link dropdown-toggle  "
                    data-toggle="dropdown"
                  >
                    {guestUser ? `Hi, User` : `Hi, ${name}`}
                    <br />

                    {/* <span style={{ fontSize: "15px" }}>
                        (City : {localStorage.getItem("cityName")})
                      </span> */}
                  </span>

                  <div className="dropdown-menu">
                    {guestUser ? (
                      <ul>
                        <li
                          onClick={() => {
                            dispatch(Action.logoClickedReload(false));
                            let id = notification?.notifications[0]?.parent_id;
                            dispatch(Action.firstNotificationId(id));
                          }}
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    ) : (
                      <>
                        <Link
                          onClick={() => {
                            dispatch(Action.logoClickedReload(false));
                            localStorage.removeItem("page");
                          }}
                          className="dropdown-item"
                          to="/home/profile"
                        >
                          Profile
                        </Link>
                        <ul>
                          <li
                            onClick={() => {
                              dispatch(Action.logoClickedReload(false));
                            }}
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      </>
                    )}
                    {/* <Link className="dropdown-item" to="/home/profile">
                        Profile
                      </Link>
                      <li className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </li> */}
                    {/* <a className="dropdown-item" href="#">
                      Link 3
                </a> */}
                  </div>
                </li>
                <li className="nav-item dropdown location-dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <img src={location} alt="location" />
                    <span>{cityNamee}</span>
                  </div>
                  {localStorage.getItem("page") && (
                    <div className="dropdown-menu ">
                      <ul>
                        <div
                          onClick={() => {
                            localStorage.removeItem("cityId");
                            let pre = localStorage.getItem("changeCityy");
                            localStorage.setItem(
                              "changeCityy",
                              pre ? parseInt(pre) + 1 : 1
                            );
                            handleCity(
                              "",
                              null,
                              history,
                              // geolocation.latitude,
                              // geolocation.longitude
                              localStorage.getItem("latitude"),
                              localStorage.getItem("longitude")
                            );
                          }}
                          className="dropdown-item"
                        >
                          <img src={CurrentLocation} alt="current loaction" />
                          <span>Use Current Location</span>
                        </div>
                        <small>Select City</small>
                        {cities &&
                          cities?.map((x) => {
                            return (
                              <li
                                className="dropdown-item"
                                onClick={() => {
                                  let pre = localStorage.getItem("changeCityy");
                                  localStorage.setItem(
                                    "changeCityy",
                                    pre ? parseInt(pre) + 1 : 1
                                  );

                                  handleCity(x.id, x.city_name);
                                }}
                              >
                                <img src={PinLocation} alt="pin loaction" />
                                <span>{x.city_name}</span>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                </li>
              </div>

              <span
                className="cart"
                id="content-mobile"
                onClick={() => {
                  if (localStorage.getItem("page")) {
                    let fixedCart = document.querySelector("#fixedCart");
                    let servicesTab = document.querySelector("#servicesTab");
                    let mainApp = document.querySelector("#mainApp");

                    if (fixedCart) {
                      fixedCart.classList.toggle("display-cart");
                    }

                    if (servicesTab) {
                      servicesTab.classList.toggle("disable-content");
                    }

                    if (mainApp) {
                      mainApp.classList.toggle("positionn");
                    }
                  }
                }}
              >
                <span>{item?.length}</span>
                <img src={cart} alt="cart" />
              </span>

              <span className="cart" id="content-desktop" onClick={() => {}}>
                <span>{item?.length}</span>
                <img src={cart} alt="cart" />
              </span>
            </nav>
          </div>
        </div>
        {/* <Banner /> */}
        {window.location.pathname === "/home/milestones" ? (
          <></>
        ) : (
          <>
            <Banner />
          </>
        )}
        {/* <Route
          exact
          path="/home"
          render={() => <Redirect to="/home/services" />}
        /> */}
        <Suspense
          fallback={
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
          }
        >
          <Route path="/home/services" component={Services} />
          <Route path="/home/contact" component={ContactUs} />
          <Route path="/home/faq" component={Faq} />
          <Route path="/home/profile" component={CustomerProfile} />
          <Route path="/home/about-us" component={AboutUs} />
          <Route path="/home/privacy-policy" component={PrivacyPolicy} />
          <Route path="/home/terms-conditions" component={TermsCondition} />
          <Route path="/home/milestones" component={Milestones} />
          <Route
            exact
            path="/home"
            render={() => <Redirect to="/home/services" />}
          />
        </Suspense>
        <AddGender open={genderModal} />
      </section>
    </>
  );
};

export default Topinfobar;

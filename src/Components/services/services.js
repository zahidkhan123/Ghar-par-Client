import React, { Fragment, useState, useEffect } from "react";
import ForArrow from "../../images/arrow-forward.svg";
import Close from "../../images/close.png";
import Plus from "../../images/ic_plus.svg";
import Deals from "../../images/Deals.svg";
import { Redirect, Route, NavLink, useRouteMatch } from "react-router-dom";
import Banner from "../banner";
import Loader from "react-loader-spinner";
import ServiceDetails from "./service-detail";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../store/actions";
import useQuery from "./../../custom-hook/useQuery";
import { history } from "../../index";

function Services(props) {
  const dispatch = useDispatch();
  const query = useQuery();
  const categoryName = query.get("category" || "");
  let { url, path } = useRouteMatch();
  localStorage.setItem("url", url);

  const [route, setRoute] = useState("");
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [newValue, setNewValue] = useState(0);

  const data = useSelector(({ auth }) => auth.serviceData);

  const loading = useSelector(({ auth }) => auth.isLoading);
  const logoClicked = useSelector(({ auth }) => auth.logoClicked);
  const services = useSelector(({ service }) => service.services);
  const reOrderData = useSelector(({ service }) => service.reorderData);
  // const addsOnitem1 = useSelector(({ service }) => service.addOnArrayy);
  if (reOrderData !== undefined && Object.keys(reOrderData).length > 0) {
    dispatch({
      type: Action.ADD_ITEM,
      payload: [],
    });
    dispatch({
      type: Action.ADDS_ON_ITEM,
      payload: [],
    });
    dispatch({
      type: Action.TOTAL_PRICE_SETTER,
      payload: 0,
    });
    dispatch({
      type: Action.REORDER_DATA,
      payload: {},
    });
  }
  debugger;
  useEffect(() => {
    let params = props.location.search;
    if (params.includes(`&`)) {
      let value = params.substring(params.indexOf(`&`) + 0);
      localStorage.setItem("additionalParam", value);
    } else {
      localStorage.removeItem("additionalParam");
    }
  }, []);
  useEffect(() => {
    dispatch(Action.editPage1(false));
    dispatch(Action.editPage2(false));
    dispatch(Action.editPage3(false));
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("latitude", position.coords.latitude);
      localStorage.setItem("longitude", position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    dispatch(Action.getMinimumOrder());
  }, []);

  // useEffect(() => {
  //   if (title) {
  //     localStorage.setItem("check", true);
  //   }
  // }, []);

  let isClose = localStorage.getItem("isClose");
  let value = localStorage.getItem("changeCityy");

  useEffect(() => {
    if (data) {
      setId(data?.service_categories[0]?.id);
      setTitle(
        localStorage.getItem("additionalParam")
          ? `${data?.service_categories[0]?.service_category_title
              .replace(/\s+/g, "")
              .replace("&", "")
              .trim()
              .toLowerCase()}?id=${
              data?.service_categories[0]?.id
            }${localStorage.getItem("additionalParam")}`
          : `${data?.service_categories[0]?.service_category_title
              .replace(/\s+/g, "")
              .replace("&", "")
              .trim()
              .toLowerCase()}?id=${data?.service_categories[0]?.id}`
      );
      localStorage.setItem(
        "firstService",
        data?.service_categories[0]?.service_category_title
          .replace(/\s+/g, "")
          .replace("&", "")
          .trim()
          .toLowerCase()
      );
    }
    if (data?.service_categories[0]?.service_category_title === "Deal") {
      localStorage.setItem("isDeal", true);
      if (!isClose) {
        dispatch(Action.dealsModal(true));
      }
      dispatch(Action.deals());
      dispatch(
        Action.serviceSubcategory(data?.service_categories[0]?.id, history)
      );
    } else {
      dispatch(
        Action.serviceSubcategory(data?.service_categories[0]?.id, history)
      );
    }
  }, [data?.service_categories[0]?.id, value]);
  // useEffect(() => {
  // }, [services]);

  // if (firstService) {
  //   // setFirstService(false);
  // }

  return (
    <Fragment>
      {/* <Banner /> */}
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
        <section className="service">
          <div className="services-tabs">
            <div className="container">
              {/* <ul
                className="nav nav-pills d-flex justify-content-lg-center"
                id="pills-tab"
                role="tablist"
              > */}
              <ul
                className="nav nav-pills d-flex "
                id="pills-tab"
                role="tablist"
              >
                {/* <div class="owl_1 owl-carousel "> */}
                {data &&
                  data.service_categories.map((l, index) => {
                    return (
                      <li key={l.id} className="nav-item item">
                        <NavLink
                          className="nav-link"
                          to={
                            localStorage.getItem("additionalParam")
                              ? `${url}/${l.service_category_title
                                  .replace(/\s+/g, "")
                                  .replace("&", "")
                                  .trim()
                                  .toLowerCase()}?id=${
                                  l.id
                                }${localStorage.getItem("additionalParam")}`
                              : `${url}/${l.service_category_title
                                  .replace(/\s+/g, "")
                                  .replace("&", "")
                                  .trim()
                                  .toLowerCase()}?id=${l.id}`
                          }
                          onClick={() => {
                            setRoute(
                              `${url}/${l.service_category_title
                                .replace(/\s+/g, "")
                                .replace("&", "")
                                .trim()
                                .toLowerCase()}`
                            );
                            localStorage.setItem(
                              "serviceTitle",
                              `${l.service_category_title
                                .replace(/\s+/g, "")
                                .replace("&", "")
                                .trim()
                                .toLowerCase()}`
                            );
                            // if (l.service_category_title == "Deal") {
                            //   dispatch(Action.deals());
                            // } else {
                            dispatch(Action.serviceSubcategory(l.id, history));
                            // }
                            localStorage.setItem("serviceId", index);
                            localStorage.removeItem("isDeal");
                          }}
                          style={{
                            "background-color":
                              l.service_category_title == "Deal" && "white",
                          }}
                        >
                          <span>
                            {l.service_category_title == "Deal" ? (
                              <img
                                src={Deals}
                                alt="deal"
                                // style={{ marginLeft: "50px" }}
                              />
                            ) : (
                              l.service_category_title
                            )}

                            {/* {l.service_category_title} */}
                          </span>
                        </NavLink>
                      </li>
                    );
                  })}
                {/* </div> */}
              </ul>
            </div>
          </div>
        </section>
      )}

      <Route
        path="/home/services"
        render={() => <Redirect to={`/home/services/${title}`} />}
      />
      <Route path={route} component={ServiceDetails} />
    </Fragment>
  );
}

export default Services;

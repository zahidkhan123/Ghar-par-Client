import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as Action from "../store/actions";
import Topinfobar from "./fixed-top";
import RatingSlideIn from "./rating-slidein";
import { useRouteMatch } from "react-router-dom";
import Pagination from "./pagination";
import GiftBoxApplied from "../images/giftbox_applied.svg";
import Loader from "react-loader-spinner";
import Banner from "./banner";
import Footer from "./footer";
import { history } from "../index";
import "./table.css";

const StyledTableCell = withStyles((theme) => ({
  table: {
    borderRadius: 12,
  },
  head: {
    backgroundColor: theme.palette.common.red,
  },
  body: {
    fontSize: 14,
    fontWeight: 500,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderRadius: 12,
    marginTop: 18,
  },
});
export default function OrderTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let { path, url } = useRouteMatch();
  localStorage.setItem("url", url);

  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState(false);
  const [historyy, setHistoryy] = useState(false);

  const orderss = useSelector(({ service }) => service.orders);
  const historyListing = useSelector(({ service }) => service.historyListing);
  const guestUser = useSelector(({ auth }) => auth.guestUser);
  const notification = useSelector(({ service }) => service.notificationsData);
  const lastStateValue = useSelector(({ service }) => service.lastStateValue);

  const ratingSlideInModal = useSelector(
    ({ service }) => service.ratingSlideInModal
  );
  const loading = useSelector(({ service }) => service.serviceLoading);

  useEffect(() => {
    dispatch(Action.editPage1(false));
    dispatch(Action.editPage2(false));
    dispatch(Action.editPage3(false));
    localStorage.removeItem("page");
    dispatch(Action.removeCouponData());
  }, []);

  window.onbeforeunload = function (e) {
    e.preventDefault();

    // history.push("/home/services");

    dispatch(Action.lastStateValue(true));
    dispatch(Action.ratingSlideInModal(false));
  };

  let orderShowId = localStorage.getItem("orderShowId");
  useEffect(() => {
    if (orderShowId) {
      dispatch(Action.ratingSlideInModal(true, orderShowId));
    } else {
      dispatch(Action.ratingSlideInModal(false));
    }
  }, [orderShowId]);

  useEffect(() => {
    dispatch(Action.makeIsSubmitTrue(true));
    dispatch(Action.getOrderListing(currentPage));
    dispatch(Action.getHistoryListing(currentPage));
  }, [currentPage, order, historyy]);

  useEffect(() => {
    dispatch(Action.Addresses());
  }, []);

  useEffect(() => {
    document.title = "Orders Detail | GharPar";
  }, []);

  // useEffect(() => {
  //   dispatch(Action.notifications());
  // }, []);

  // useEffect(() => {

  //   if (notification?.notifications?.length > 0) {
  //     let id = notification?.notifications[0]?.parent_id;
  //     dispatch(Action.firstNotificationId(id));
  //   }
  // }, [notification]);

  useEffect(() => {
    dispatch(Action.getHistoryListing());
  }, []);

  let totalPages1 =
    orderss && orderss?.paging_data && orderss?.paging_data?.total_pages;
  let itemPerPage1 =
    orderss && orderss?.paging_data && orderss?.paging_data?.per_page;

  let historyTotalPages1 =
    historyListing &&
    historyListing?.paging_data &&
    historyListing?.paging_data?.total_pages;
  let historyItemPerPage1 =
    historyListing &&
    historyListing?.paging_data &&
    historyListing?.paging_data?.per_page;

  const filterData =
    orderss &&
    orderss?.orders?.filter((data) => {
      return data.id == value;
    });
  // const filterData =
  // orderss &&
  // orderss.orders.filter((data) => {
  //   return data.order_services[0].service_title
  //     .toLowerCase()
  //     .includes(value.toLowerCase());
  // });

  const filterData1 =
    historyListing &&
    historyListing?.orders?.filter((data) => {
      return data.id == value;
    });

  // const filterData1 =
  //   historyListing &&
  //   historyListing.orders.filter((data) => {
  //     return data.order_services[0].service_title
  //       .toLowerCase()
  //       .includes(value.toLowerCase());
  //   });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Topinfobar />
      {/* <Banner /> */}
      <section className="schedule-history">
        <div className="container">
          <div className="sche-header">
            <form className="form-inline">
              <div className="search-input">
                <input
                  value={value}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Search by order ID"
                  aria-label="Search"
                />
              </div>
            </form>
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item ">
                <a
                  className="nav-link active tabs"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  onClick={() => {
                    setValue("");
                    setOrder(!order);
                    setCurrentPage(1);
                    setHistoryy(false);
                  }}
                >
                  Scheduled
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link tabs"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  onClick={() => {
                    setValue("");
                    setOrder(!order);
                    setCurrentPage(1);
                    setHistoryy(true);
                    dispatch(Action.getHistoryListing(currentPage));
                  }}
                >
                  History
                </a>
              </li>
            </ul>
            <Pagination
              totalPages={historyy ? historyTotalPages1 : totalPages1}
              itemsPerPage={historyy ? historyItemPerPage1 : itemPerPage1}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              setPage={setCurrentPage}
            />
          </div>
          <div className="sche-body">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <TableContainer style={{ "min-height": "500px" }}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                    // style={{ "min-height": "500px" }}
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Order ID</StyledTableCell>
                        <StyledTableCell>Date & Time</StyledTableCell>
                        <StyledTableCell>Services</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Amount</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {loading ? (
                      <div
                        style={{
                          display: "block",
                          marginLeft: "180%",
                          marginRight: "",
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
                      <TableBody>
                        {guestUser ? (
                          <div>To see your order you must need to sign up</div>
                        ) : filterData?.length > 0 ? (
                          filterData.map((order) => (
                            <StyledTableRow
                              key={order.id}
                              onClick={() =>
                                dispatch(
                                  Action.ratingSlideInModal(
                                    !ratingSlideInModal,
                                    order.id
                                  )
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <StyledTableCell>
                                {order?.custom_order_id}
                              </StyledTableCell>
                              <StyledTableCell>
                                {`${order?.order_date} & ${order?.order_time}`}
                              </StyledTableCell>
                              <StyledTableCell>
                                {order && order?.order_services?.length > 1
                                  ? order?.order_services[0]?.service_title +
                                    " + ....."
                                  : order?.order_services[0]?.service_title}
                              </StyledTableCell>
                              <StyledTableCell>
                                {order?.is_gift_avail ? (
                                  <>
                                    <img src={GiftBoxApplied} alt="" />
                                  </>
                                ) : (
                                  <></>
                                )}
                              </StyledTableCell>
                              <StyledTableCell>{order?.status}</StyledTableCell>
                              <StyledTableCell>
                                {order?.total_price}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))
                        ) : orderss?.orders?.length > 0 ? (
                          orderss?.orders.map((order) => {
                            return order.status === "Pending" ||
                              order.status === "Confirmed" ||
                              order.status === "In_process" ? (
                              <StyledTableRow
                                key={order?.id}
                                onClick={() =>
                                  dispatch(
                                    Action.ratingSlideInModal(
                                      !ratingSlideInModal,
                                      order.id
                                    )
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <StyledTableCell>{order?.id}</StyledTableCell>
                                <StyledTableCell>
                                  {`${order?.order_date} & ${order?.order_time}`}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {order && order?.order_services.length > 1
                                    ? order?.order_services[0]?.service_title +
                                      " + ....."
                                    : order.order_services[0]?.service_title}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {order?.is_gift_avail ? (
                                    <>
                                      <img src={GiftBoxApplied} alt="" />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {order?.status}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {order?.order_billing?.net_total}
                                </StyledTableCell>
                              </StyledTableRow>
                            ) : null;
                          })
                        ) : (
                          <div>No data found</div>
                        )}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <TableContainer style={{ "min-height": "500px" }}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                    // style={{ "min-height": "500px" }}
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Order ID</StyledTableCell>
                        <StyledTableCell>Date & Time</StyledTableCell>
                        <StyledTableCell>Services</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Amount</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {guestUser ? (
                        <div>To see your order you must need to sign up</div>
                      ) : filterData1?.length > 0 ? (
                        filterData1.map((order) => {
                          return order.status === "Completed" ||
                            order.status === "Cancelled" ? (
                            <StyledTableRow
                              key={order?.id}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                dispatch(
                                  Action.ratingSlideInModal(
                                    !ratingSlideInModal,
                                    order.id
                                  )
                                )
                              }
                            >
                              <StyledTableCell>
                                {order?.custom_order_id}
                              </StyledTableCell>
                              <StyledTableCell>
                                {`${order?.order_date} & ${order?.order_time}`}
                              </StyledTableCell>
                              <StyledTableCell>
                                {order && order?.order_services.length > 1
                                  ? order?.order_services[0]?.service_title +
                                    " + ....."
                                  : order?.order_services[0]?.service_title}
                              </StyledTableCell>
                              <StyledTableCell>
                                {order?.is_gift_avail ? (
                                  <>
                                    <img src={GiftBoxApplied} alt="" />
                                  </>
                                ) : (
                                  <></>
                                )}
                              </StyledTableCell>
                              <StyledTableCell>{order?.status}</StyledTableCell>
                              <StyledTableCell>
                                {order?.total_price}
                              </StyledTableCell>
                            </StyledTableRow>
                          ) : null;
                        })
                      ) : historyListing?.orders?.length > 0 ? (
                        historyListing.orders.map((order) => {
                          return order.status === "Completed" ||
                            order.status === "Cancelled" ? (
                            <StyledTableRow
                              key={order?.id}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                dispatch(
                                  Action.ratingSlideInModal(
                                    !ratingSlideInModal,
                                    order?.id
                                  )
                                )
                              }
                            >
                              <StyledTableCell>{order.id}</StyledTableCell>
                              <StyledTableCell>
                                {`${order?.order_date} & ${order?.order_time}`}
                              </StyledTableCell>
                              <StyledTableCell>
                                {order && order?.order_services?.length > 1
                                  ? order?.order_services[0]?.service_title +
                                    " + ....."
                                  : order?.order_services[0]?.service_title}
                              </StyledTableCell>
                              <StyledTableCell>
                                {order?.is_gift_avail ? (
                                  <>
                                    <img src={GiftBoxApplied} alt="" />
                                  </>
                                ) : (
                                  <></>
                                )}
                              </StyledTableCell>
                              <StyledTableCell>{order?.status}</StyledTableCell>
                              <StyledTableCell>
                                {order?.total_price}
                              </StyledTableCell>
                            </StyledTableRow>
                          ) : null;
                        })
                      ) : (
                        <div>No Order Completed Yet found</div>
                      )}

                      {/* no order completed yet */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <RatingSlideIn open={ratingSlideInModal} />
      </section>
    </>
  );
}

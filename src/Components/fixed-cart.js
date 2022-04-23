import React, { useState, useEffect } from "react";
import ForArrow from "../images/arrow-forward.svg";
import Close from "../images/close.png";
import { Link, Route, Switch } from "react-router-dom";
import OrderDetails from "./orders-detail/order-details";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../store/actions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { history } from "../index";
import EmptyCartImg from "../images/ic_empty_cart.svg";
import Sale from "../images/Group 1138.svg";
import CnicModal from "./customer-detail/pending-order-modal";

const FixedCart = () => {
  const dispatch = useDispatch();

  const [timeOut, setTimeOut] = useState(false);
  const item = useSelector(({ service }) => service.items);
  const addsOnitem = useSelector(({ service }) => service.addOnItem);
  const totalPrice = useSelector(({ service }) => service.totalPrice);
  const cartItemError = useSelector(({ service }) => service.cartItemError);
  const checked = useSelector(({ service }) => service.unCheckedService);
  const deleteItem = useSelector(({ service }) => service.deletedItem);
  const limitation = useSelector(({ service }) => service.limitation);
  const cnic = useSelector(({ service }) => service.cnicModal);
  const reOrderData = useSelector(({ service }) => service.reorderData);
  // const addsOnitem1 = useSelector(({ service }) => service.addOnArrayy);
  let isReorder = false;
  if (reOrderData !== undefined && Object.keys(reOrderData).length > 0) {
    isReorder = true;
  }
  const deletedAddOnItems = useSelector(
    ({ service }) => service.deletedAddOnItems
  );

  const addOnschecked = useSelector(
    ({ service }) => service.addOnsCheckedValues
  );

  let indx = localStorage.getItem("index");

  // const [price, setPrice] = useState(2000);
  const [Value, setValue] = useState(1);
  const [error, setError] = useState(false);
  let orderPage = localStorage.getItem("orderPage");

  useEffect(() => {
    if (totalPrice >= limitation?.min_order_price) {
      setError(false);
    }
    if (item.length < 1) {
      setError(false);
    }
    // if (totalPrice < 1200 && cartItemError === true) {
    //   setError(true);
    // }
  }, [totalPrice, item]);

  const handleChange = (e, i, index) => {
    if (e.target.value == 1) {
      // localStorage.setItem("sameTimeSelection", true);
      localStorage.setItem("oneAfterAnother", true);
    }
    return Promise.all([
      dispatch(Action.changeQuantity(e.target.value, i, index)),
    ]).then(() => {
      setValue(Value + 1);
    });
  };

  const handleRadioChange = (e, item, index) => {
    // localStorage.removeItem("sameTimeSelection");
    localStorage.removeItem("oneAfterAnother");

    return Promise.all([
      dispatch(Action.changeSelectedValue(e.target.value, item, index)),
    ]).then(() => {
      setValue(Value + 1);
    });
  };

  const handleAddOnQuantityChange = (e, ad, index) => {
    return Promise.all([
      dispatch(Action.handleAddOnQuantity(e.target.value, ad, index)),
    ]).then(() => {
      setValue(Value + 1);
    });
  };

  useEffect(() => {
    let timeInterval = setTimeout(() => {
      setTimeOut(false);
    }, 10000);

    if (!timeOut) {
      clearTimeout(timeInterval);
    }
  }, [timeOut]);

  return (
    <>
      <section id="fixedCart" className="fixed-cart ">
        {/* <div className="col-md-12"> */}
        <div className="your-cart">
          <div className="d-flex justify-content-between cart-header">
            <h6>
              My Cart <span>{item?.length}</span>
            </h6>
            {isReorder ? (
              <></>
            ) : (
              <>
                {deleteItem && (
                  <label>
                    Item removed.
                    <a
                      style={{ "text-decoration": "underline" }}
                      onClick={() => {
                        // setTimeOut(true);
                        if (deleteItem.type == "service") {
                          let deleteItemId = deleteItem.item.service_id
                            ? deleteItem.item.service_id
                            : deleteItem.item.id;
                          return deletedAddOnItems.length > 0
                            ? (dispatch(
                                Action.unCheckService(true, 0, deleteItemId)
                              ),
                              dispatch(Action.addItem(deleteItem.item)),
                              deletedAddOnItems?.map((x) => {
                                return (
                                  dispatch(
                                    Action.addOnsCheckValues(
                                      [
                                        {
                                          type: true,
                                          index: 0,
                                          serviceId: x.serviceId,
                                          id: x.id,
                                        },
                                      ]
                                      // true,
                                      // 0,
                                      // x.service_id,
                                      // x.id
                                    )
                                  ),
                                  dispatch(Action.addData([x]))
                                );
                              }),
                              dispatch({
                                type: Action.DELETED_ITEM,
                                payload: null,
                              }))
                            : (dispatch(
                                Action.unCheckService(true, 0, deleteItemId)
                              ),
                              dispatch(Action.addItem(deleteItem.item)),
                              dispatch({
                                type: Action.DELETED_ITEM,
                                payload: null,
                              }));
                        } else if (deleteItem.type == "addOnService") {
                          return (
                            dispatch(
                              Action.addOnsCheckValues(
                                [
                                  {
                                    type: true,
                                    index: 0,
                                    serviceId: deleteItem.item.service_id,
                                    id: deleteItem.item.id,
                                  },
                                ]
                                // true,
                                // 0,
                                // deleteItem.item.service_id,
                                // deleteItem.item.id
                              )
                            ),
                            dispatch(Action.addData([deleteItem.item])),
                            dispatch({
                              type: Action.DELETED_ITEM,
                              payload: null,
                            })
                          );
                        }
                      }}
                    >
                      Undo
                    </a>
                  </label>
                )}
              </>
            )}
          </div>
          <div className="items">
            {item?.length < 1 && (
              <div className="empty-cart-body">
                <img src={EmptyCartImg} alt="empty cart image"></img>
                <label>Empty Cart!</label>
                <small>
                  You haven't added any service to <br></br> your cart yet.
                </small>
              </div>
            )}

            {item &&
              item.map((i, index) => {
                const quantity = i.quantity;
                const selectedValue = i.selectedValue;
                if (i.is_deal || i.discount_price) {
                  localStorage.setItem("dealItemInCart", true);
                }

                return (
                  <>
                    <div
                      key={i.id}
                      // className="add-items"

                      className={
                        i.is_deal || i.discount
                          ? "add-items sale-items"
                          : "add-items"
                      }
                    >
                      {/* <div key={i.id} className="add-items sale-items"> */}
                      <div className="d-flex justify-content-between pb-md-2 pb-sm-0">
                        <label>{i.service_title} </label>

                        <span className="price-tag flex-column">
                          {/* Rs. {i.service_price * quantity} */}
                          Rs.
                          {i.discount_price || i.discount
                            ? i.discount_price * quantity
                            : i.service_price * quantity}
                          {i.is_deal || i.discount ? (
                            <s className="original-price">
                              Rs. {i.service_price * quantity}
                            </s>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>

                      <span className="qty">Qty</span>
                      <div className="select-qty">
                        {isReorder ? (
                          <>
                            <select
                              value={quantity}
                              onChange={(e) => handleChange(e, i, index)}
                              className="qty-opt"
                              name="item"
                              id="item"
                            >
                              <option value={quantity}>{quantity}</option>
                            </select>
                          </>
                        ) : (
                          <>
                            <select
                              value={quantity}
                              onChange={(e) => handleChange(e, i, index)}
                              className="qty-opt"
                              name="item"
                              id="item"
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
                            </select>
                          </>
                        )}
                      </div>
                      {isReorder ? (
                        <>
                          <span
                            onClick={() => (
                              <>
                                {setTimeOut(true)}
                                {
                                  (dispatch(Action.removeItem(i.id, i, index)),
                                  addOnschecked[index]?.length > 0 &&
                                    localStorage.setItem("removeAddOns", true),
                                  checked.length > 0 &&
                                    checked.map((x, index1) => {
                                      let dataId = i.service_id
                                        ? i.service_id
                                        : i.id;
                                      if (x.id == dataId) {
                                        return dispatch(
                                          Action.unCheckService(
                                            false,
                                            index1,
                                            dataId
                                          )
                                        );
                                      }
                                    }))
                                }
                                )
                              </>
                            )}
                            className="remove-btn"
                            style={{ pointerEvents: "none" }}
                          >
                            <img src={Close} alt="close" />
                            Remove
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            onClick={() => (
                              <>
                                {setTimeOut(true)}
                                {
                                  (dispatch(Action.removeItem(i.id, i, index)),
                                  addOnschecked[index]?.length > 0 &&
                                    localStorage.setItem("removeAddOns", true),
                                  checked.length > 0 &&
                                    checked.map((x, index1) => {
                                      let dataId = i.service_id
                                        ? i.service_id
                                        : i.id;
                                      if (x.id == dataId) {
                                        return dispatch(
                                          Action.unCheckService(
                                            false,
                                            index1,
                                            dataId
                                          )
                                        );
                                      }
                                    }))
                                }
                                )
                              </>
                            )}
                            className="remove-btn"
                            style={{ cursor: "pointer" }}
                          >
                            <img src={Close} alt="close" />
                            Remove
                          </span>
                        </>
                      )}
                      {i.is_deal || i.discount ? (
                        <img src={Sale} alt="sale" />
                      ) : (
                        ""
                      )}
                      {isReorder ? (
                        <>
                          {i &&
                            i.service_addons.length > 0 &&
                            i.service_addons.map((ad, index) => {
                              const AddOnQuantity = ad.addOnQuantity;
                              if (ad) {
                                return (
                                  <div className="cart-addon">
                                    <div className="d-flex justify-content-between pb-md-2 pb-sm-0">
                                      <label>{ad.service_title}</label>
                                      <span className="price-tag">
                                        {AddOnQuantity
                                          ? `Rs. ${
                                              ad.service_addon_price *
                                              AddOnQuantity
                                            }`
                                          : `Rs.  ${ad.service_addon_price}`}
                                      </span>
                                    </div>

                                    <span className="qty">Qty</span>
                                    <div className="select-qty">
                                      <select
                                        value={AddOnQuantity}
                                        onChange={(e) =>
                                          handleAddOnQuantityChange(
                                            e,
                                            ad,
                                            index
                                          )
                                        }
                                        className="qty-opt"
                                        name="item"
                                        id="item"
                                      >
                                        <option value={AddOnQuantity}>
                                          {AddOnQuantity}
                                        </option>
                                      </select>
                                    </div>
                                    <span
                                      onClick={() => {
                                        // Promise.all([

                                        addOnschecked.length > 0 &&
                                          addOnschecked.map((x, index1) => {
                                            return x?.map((y, index2) => {
                                              if (
                                                y.id == ad.id &&
                                                y.serviceId == ad.service_id
                                              ) {
                                                return dispatch(
                                                  Action.addOnsCheckValues(
                                                    [
                                                      {
                                                        type: false,
                                                        index: index2,
                                                        serviceId:
                                                          ad.service_id,
                                                        id: ad.id,
                                                      },
                                                    ],
                                                    false,
                                                    index2,
                                                    ad.service_id,
                                                    ad.id
                                                  )
                                                );
                                              }
                                            });
                                          });
                                        dispatch(
                                          Action.removeAddOnItem(ad, index)
                                        );
                                        // ]).then(() => {
                                        //   setValue(Value + 1);
                                        // });
                                      }}
                                      className="remove-btn"
                                      style={{ pointerEvents: "none" }}
                                    >
                                      <img src={Close} alt="close" />
                                      Remove
                                    </span>
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </>
                      ) : (
                        <>
                          {addsOnitem &&
                            addsOnitem[index] &&
                            addsOnitem[index].length > 0 &&
                            addsOnitem[index].map((ad, index) => {
                              const AddOnQuantity = ad.addOnQuantity;

                              if (ad) {
                                return (
                                  <div className="cart-addon">
                                    <div className="d-flex justify-content-between pb-md-2 pb-sm-0">
                                      <label>{ad.service_title}</label>
                                      <span className="price-tag">
                                        {AddOnQuantity
                                          ? `Rs. ${
                                              ad.service_addon_price *
                                              AddOnQuantity
                                            }`
                                          : `Rs.  ${ad.service_addon_price}`}
                                      </span>
                                    </div>

                                    <span className="qty">Qty</span>
                                    <div className="select-qty">
                                      <select
                                        value={AddOnQuantity}
                                        onChange={(e) =>
                                          handleAddOnQuantityChange(
                                            e,
                                            ad,
                                            index
                                          )
                                        }
                                        className="qty-opt"
                                        name="item"
                                        id="item"
                                      >
                                        {quantity == 1 ? (
                                          <option value={1}>1</option>
                                        ) : quantity == 2 ? (
                                          <>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                          </>
                                        ) : quantity == 3 ? (
                                          <>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                          </>
                                        ) : quantity == 4 ? (
                                          <>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                          </>
                                        ) : quantity == 5 ? (
                                          <>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                          </>
                                        ) : quantity == 6 ? (
                                          <>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                          </>
                                        ) : quantity == 7 ? (
                                          <>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>{" "}
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>{" "}
                                            <option value={7}>7</option>
                                          </>
                                        ) : quantity == 8 ? (
                                          <>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                          </>
                                        ) : quantity == 9 ? (
                                          <>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                          </>
                                        ) : quantity == 10 ? (
                                          <>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                            <option value={10}>10</option>
                                          </>
                                        ) : null}
                                      </select>
                                    </div>
                                    <span
                                      onClick={() => {
                                        // Promise.all([

                                        addOnschecked.length > 0 &&
                                          addOnschecked.map((x, index1) => {
                                            return x?.map((y, index2) => {
                                              if (
                                                y.id == ad.id &&
                                                y.serviceId == ad.service_id
                                              ) {
                                                return dispatch(
                                                  Action.addOnsCheckValues(
                                                    [
                                                      {
                                                        type: false,
                                                        index: index2,
                                                        serviceId:
                                                          ad.service_id,
                                                        id: ad.id,
                                                      },
                                                    ],
                                                    false,
                                                    index2,
                                                    ad.service_id,
                                                    ad.id
                                                  )
                                                );
                                              }
                                            });
                                          });
                                        dispatch(
                                          Action.removeAddOnItem(ad, index)
                                        );
                                        // ]).then(() => {
                                        //   setValue(Value + 1);
                                        // });
                                      }}
                                      className="remove-btn"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <img src={Close} alt="close" />
                                      Remove
                                    </span>
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </>
                      )}
                    </div>
                    {isReorder ? (
                      <></>
                    ) : (
                      <>
                        {quantity > 1 && (
                          <div
                            className={
                              i.is_deal || i.discount ? "sale-items" : ""
                            }
                          >
                            <div className="time-opt">
                              <FormControl className="custom-control custom-radio custom-control-inline">
                                <RadioGroup
                                  aria-label="options"
                                  name="options"
                                  // value={
                                  //   localStorage.getItem("sameTimeSelection")
                                  //     ? "same-time"
                                  //     : selectedValue
                                  // }
                                  value={
                                    localStorage.getItem("oneAfterAnother")
                                      ? "one-after-another"
                                      : selectedValue
                                  }
                                  onChange={(e) =>
                                    handleRadioChange(e, i, index)
                                  }
                                >
                                  <FormControlLabel
                                    value="one-after-another"
                                    control={<Radio />}
                                    label="One after another"
                                  />
                                  <FormControlLabel
                                    value="same-time"
                                    control={<Radio />}
                                    label="Same time"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                );
              })}
          </div>
          {isReorder ? (
            <>
              <span
                id={orderPage ? "Checkout" : ""}
                onClick={() => {
                  dispatch(
                    Action.handleCheckOut(
                      true,
                      history,
                      limitation?.min_order_price
                    )
                  );
                  dispatch(Action.logoClickedReload(false));
                  // dispatch(Action.giftBoxModal(true));
                }}
                // onClick={() => dispatch(Action.orderDetail(true, history))}
              >
                <span style={{ cursor: "pointer" }} className="chk-btn">
                  Checkout - Rs. {Math.round(totalPrice)}{" "}
                  <img src={ForArrow} alt="arrow" />
                </span>
              </span>
            </>
          ) : (
            <>
              <span
                id={orderPage ? "Checkout" : ""}
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
                  // dispatch(Action.giftBoxModal(true));
                }}
                // onClick={() => dispatch(Action.orderDetail(true, history))}
              >
                <span style={{ cursor: "pointer" }} className="chk-btn">
                  Checkout - Rs. {Math.round(totalPrice)}{" "}
                  <img src={ForArrow} alt="arrow" />
                </span>
              </span>
            </>
          )}
        </div>

        {error ? (
          <div className="text-center pt-1">
            <small style={{ color: "red" }}>
              Place your minimum order of Rs. {limitation?.min_order_price}
            </small>
          </div>
        ) : (
          <div className="text-center pt-1">
            <small>
              Place your minimum order of Rs. {limitation?.min_order_price}
            </small>
          </div>
        )}
        {/* </div> */}
        <CnicModal open={cnic} />
      </section>
    </>
  );
};

export default FixedCart;

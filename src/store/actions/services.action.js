import baseURL from "../utils/AxiosInstance";
import * as Action from "../../store/actions";
import { toast, ToastContainer } from "react-toastify";
import cookie from "js-cookie";

toast.configure();

export const SERVICE_MODAL_ACTION = "SERVICE_MODAL_ACTION";
export const SERVICE_SUBCATEGORY = "SERVICE_SUBCATEGORY";
export const SERVICE_SUBCATEGORY_ERROR = "SERVICE_SUBCATEGORY_ERROR";
export const SUBCATEGORY_SERVICE = "SUBCATEGORY_SERVICE";
export const SUBCATEGORY_SERVICE_TEST = "SUBCATEGORY_SERVICE_TEST";
export const ADDS_ON = "ADDS_ON";
export const REMOVE_ADDS_ON_ITEM = "REMOVE_ADDS_ON_ITEM";
export const ADDS_ON_ITEM = "ADDS_ON_ITEM";
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SERVICE_LOADING = "SERVICE_LOADING";
export const CHECKOUT = "CHECKOUT";
export const TOTAL_PRICE_SETTER = "TOTAL_PRICE_SETTER";
export const ADDRESS_MODAL = "ADDRESS_MODAL";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const CITIES = "CITIES";
export const AREAS = "AREAS";
export const ORDER_DETAIL = "ORDER_DETAIL";
export const ORDER_SUMMARY = "ORDER_SUMMARY";
export const ORDER_HISTORY = "ORDER_HISTORY";
export const ORDER_LISTING = "ORDER_LISTING";
export const MAKE_ISSUBMIT_TRUE = "MAKE_ISSUBMIT_TRUE";
export const CART_ITEM_ERROR = "CART_ITEM_ERROR";
export const RATING_SLIDE_IN_MODAL = "RATING_SLIDE_IN_MODAL";
export const SHOW_ORDER_SUCCESS = "SHOW_ORDER_SUCCESS";
export const EDIT_PAGE1 = "EDIT_PAGE1";
export const EDIT_PAGE2 = "EDIT_PAGE2";
export const EDIT_PAGE3 = "EDIT_PAGE3";
export const EDIT_PAGE4 = "EDIT_PAGE4";
export const EDIT_ADDRESS = "EDIT_ADDRESS";
export const EDIT_ADDRESS_TYPE = "EDIT_ADDRESS_TYPE";
export const DISCOUNT_MODAL = "DISCOUNT_MODAL";
export const UN_CHECKED_SERVICE = "UN_CHECKED_SERVICE";
export const ADDS_ON_CHECKED_SERVICE = "ADDS_ON_CHECKED_SERVICE";
export const REMOVE_ADD_ONS_INSIDE_SERIVCE = "REMOVE_ADD_ONS_INSIDE_SERIVCE";
export const DELETED_ITEM = "DELETED_ITEM";
export const DELETED_ADD_ON_ITEMS = "DELETED_ADD_ON_ITEMS";
export const ADDRESS_PAGE_RELOAD = "ADDRESS_PAGE_RELOAD";
export const RATING_POPUP = "RATING_POPUP";
export const TECHNICIAN_RATINGS = "TECHNICIAN_RATINGS";
export const RATING_RECORD = "RATING_RECORD";
export const HISTORY_LISTING = "HISTORY_LISTING";
export const DEFAULT_LOADIG = "DEFAULT_LOADIG";
export const ORDER_DETAIL_ERROR_MSG = "ORDER_DETAIL_ERROR_MSG";
export const SESSION_ERROR = "SESSION_ERROR";
export const SESSION_LOGOUT = "SESSION_LOGOUT";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const ADDS_ON_ITEMM = "ADDS_ON_ITEMM";
export const SETTING_API = "SETTING_API";
export const NOTIFICATIONS = "NOTIFICATIONS";
export const DEALS_MODAL = "DEALS_MODAL";
export const DEALS = "DEALS";
export const DEALS_DATA = "DEALS_DATA";
export const NOT_ACTIVE_DEAL = "NOT_ACTIVE_DEAL";
export const PROFILE_PASSWORD_ERROR = "PROFILE_PASSWORD_ERROR";
export const PROFILE_SUCCESS_MSG = "PROFILE_SUCCESS_MSG";
export const CNIC_MODAL = "CNIC_MODAL";
export const NEW_NOTIFICATION_TYPE = "NEW_NOTIFICATION_TYPE";
export const FEEDBACK_ERROR = "FEEDBACK_ERROR";
export const PENDING_RATING = "PENDING_RATING";
export const PROFILE_UPDATE_ERROR = "PROFILE_UPDATE_ERROR";
export const ADD_ADDRESSES = "ADD_ADDRESSES";
export const LOCAL_CITIES = "LOCAL_CITIES";
export const LOCAL_AREAS = "LOCAL_AREAS";
export const LAST_STATE_VALUE = "LAST_STATE_VALUE";
export const LOCATION_POPUP = "LOCATION_POPUP";
export const COUPON_CODE = "COUPON_CODE";
export const SUBMIT_ORDER_UNSUCCESS = "SUBMIT_ORDER_UNSUCCESS";
export const REMOVE_COUPON_ERROR_MSG = "REMOVE_COUPON_ERROR_MSG";
export const CANCEL_COUPON_DATA = "CANCEL_COUPON_DATA";
export const USER_MILESTONES = "USER_MILESTONES";
export const REDEEMFREESERVICE = "REDEEMFREESERVICE";
export const REFFERALCODE = "REFFERALCODE";
export const DEAL_BANNERS = "DEAL_BANNERS";
export const COUPON_MODAL = "COUPON_MODAL";
export const GIFTBOX_MODAL = "GIFTBOX_MODAL";
export const IS_GIFTBOX = "IS_GIFTBOX";
export const SCRATCH_MODAL = "SCRATCH_MODAL";
export const REORDER_DATA = "REORDER_DATA";

export const serviceSubcategory = (id, history) => async (dispatch) => {
  console.log(id);
  dispatch({
    type: SERVICE_LOADING,
    payload: true,
  });

  dispatch({
    type: SERVICE_SUBCATEGORY,
    subcategory: [],
    service: [],
  });

  dispatch({
    type: DEALS,
    payload: null,
  });

  dispatch({
    type: SUBCATEGORY_SERVICE_TEST,
    payload: [],
  });

  try {
    let gender = localStorage.getItem("gender");
    let cityId = localStorage.getItem("cityId");
    let lat = localStorage.getItem("lat");
    let lang = localStorage.getItem("lang");
    let utm_code = cookie.get("utm_source");
    console.log(utm_code);
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let apiPath = cityId
      ? `services.json?service_category_id=${id}&gender=${gender}&city_id=${cityId}`
      : `services.json?service_category_id=${id}&gender=${gender}&latitude=${lat}&longitude=${lang}`;
    if (id !== undefined) {
      let res2 = await baseURL.get(apiPath, header);

      // if (res2.data) {
      //   let pre = localStorage.getItem("services");
      //   if (pre) {
      //     localStorage.setItem("services", parseInt(pre) + 1);
      //   } else {
      //     localStorage.setItem("services", 1);
      //   }
      // }

      dispatch({
        type: SERVICE_SUBCATEGORY,
        subcategory: res2.data.subcategories,
        service: res2.data.services,
      });
      dispatch({
        type: SERVICE_LOADING,
        payload: false,
      });
    }

    let cc = localStorage.getItem("cc");
    let firstService = localStorage.getItem("firstService");
    let serviceTitle = localStorage.getItem("serviceTitle");

    if (cc) {
      // history.push("/home/services/");

      if (serviceTitle && firstService !== serviceTitle) {
        // window.location.reload();
        history.push("/home");
      }

      dispatch({
        type: Action.ADD_ITEM,
        payload: [],
      });
      dispatch({
        type: Action.ADDS_ON_ITEM,
        payload: [],
      });
      dispatch({
        type: Action.PROFILE_SUCCESS_MSG,
        payload: null,
      });
      dispatch({
        type: Action.TOTAL_PRICE_SETTER,
        payload: 0,
      });
      dispatch({
        type: Action.UN_CHECKED_SERVICE,
        payload: [],
      });
      dispatch({
        type: Action.ADDS_ON_CHECKED_SERVICE,
        payload: [],
      });
      dispatch({
        type: Action.DELETED_ITEM,
        payload: null,
      });

      localStorage.removeItem("cc");
      localStorage.removeItem("serviceTitle");
    }
  } catch (error) {
    dispatch({
      type: SERVICE_SUBCATEGORY_ERROR,
      // payload: error.response.data.message,
    });
    dispatch({
      type: SERVICE_LOADING,
      payload: true,
    });
  }
};

export const subCategoryServices = (id, index) => async (dispatch) => {
  // dispatch({
  //   type: SERVICE_LOADING,
  //   payload: true,
  // });
  try {
    let gender = localStorage.getItem("gender");
    let cityId = localStorage.getItem("cityId");
    let lat = localStorage.getItem("lat");
    let lang = localStorage.getItem("lang");
    let utm_code = cookie.get("utm_source");

    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let res2 = cityId
      ? await baseURL.get(
          `services.json?service_category_id=${id}&gender=${gender}&city_id=${cityId}`,
          header
        )
      : await baseURL.get(
          `services.json?service_category_id=${id}&gender=${gender}&latitude=${lat}&longitude=${lang}`,
          header
        );

    dispatch({
      type: SUBCATEGORY_SERVICE,
      payload: res2.data.services,
      index: index,
    });
  } catch (error) {
    dispatch({
      type: SERVICE_SUBCATEGORY_ERROR,
      payload: error?.response?.data?.message,
    });
  }
  // dispatch({
  //   type: SERVICE_LOADING,
  //   payload: false,
  // });
};

export const deals = (history) => async (dispatch) => {
  console.log("deals");
  try {
    dispatch({
      type: SERVICE_LOADING,
      payload: true,
    });

    dispatch({
      type: SERVICE_SUBCATEGORY,
      subcategory: [],
      service: [],
    });
    dispatch({
      type: DEALS,
      payload: null,
    });
    dispatch({
      type: SUBCATEGORY_SERVICE_TEST,
      payload: [],
    });

    let cityId = localStorage.getItem("cityId");
    let lat = localStorage.getItem("lat");
    let lang = localStorage.getItem("lang");
    let utm_code = cookie.get("utm_source");
    console.log(utm_code);
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let apiPath = cityId
      ? `deals.json?city_id=${cityId}`
      : `deals.json?latitude=${lat}&longitude=${lang}`;
    let res2 = await baseURL.get(apiPath, header);
    if (res2) {
      dispatch({
        type: DEALS,
        payload: res2.data[0],
      });

      dispatch({
        type: DEALS_DATA,
        payload: res2.data[0],
      });
      dispatch({
        type: SERVICE_LOADING,
        payload: false,
      });
      dispatch({
        type: DEAL_BANNERS,
        payload: res2.data,
      });
      let cc = localStorage.getItem("cc");
      let firstService = localStorage.getItem("firstService");
      let serviceTitle = localStorage.getItem("serviceTitle");

      if (cc) {
        // history.push("/home/services/");

        if (serviceTitle && firstService !== serviceTitle) {
          // window.location.reload();
          history.push("/home");
        }

        dispatch({
          type: Action.ADD_ITEM,
          payload: [],
        });
        dispatch({
          type: Action.ADDS_ON_ITEM,
          payload: [],
        });
        dispatch({
          type: Action.PROFILE_SUCCESS_MSG,
          payload: null,
        });
        dispatch({
          type: Action.TOTAL_PRICE_SETTER,
          payload: 0,
        });
        dispatch({
          type: Action.UN_CHECKED_SERVICE,
          payload: [],
        });
        dispatch({
          type: Action.ADDS_ON_CHECKED_SERVICE,
          payload: [],
        });
        dispatch({
          type: Action.DELETED_ITEM,
          payload: null,
        });

        localStorage.removeItem("cc");
        localStorage.removeItem("serviceTitle");
      }
    }
  } catch (error) {
    dispatch({
      type: SERVICE_LOADING,
      payload: true,
    });
  }
};

export const dealsModal = (type) => async (dispatch) => {
  dispatch({
    type: DEALS_MODAL,
    payload: type,
  });
};

export const couponModal = (type) => async (dispatch) => {
  dispatch({
    type: COUPON_MODAL,
    payload: type,
  });
};

export const scratchModal = (type) => async (dispatch) => {
  dispatch({
    type: SCRATCH_MODAL,
    payload: type,
  });
};

export const serviceModalAction = (e, id) => async (dispatch) => {
  dispatch({
    type: SERVICE_MODAL_ACTION,
    payload: e,
    id: id,
  });
};

export const addOnData = (data) => async (dispatch) => {
  dispatch({
    type: ADDS_ON,
    payload: null,
  });
  dispatch({
    type: ADDS_ON,
    payload: data,
  });
};

export const addItem = (data) => async (dispatch, getState) => {
  let myArr = getState().service.items;
  let totalPrice = getState().service.totalPrice;

  let dataId = data.service_id ? data.service_id : data.id;
  for (let index = 0; index < myArr.length; index++) {
    let iddd = myArr[index].service_id
      ? myArr[index].service_id
      : myArr[index].id;
    if (iddd == dataId) {
      return;
    }
  }

  if (data.quantity) {
    let price = data.discount_price
      ? data.discount_price
      : Math.floor(data.service_price);
    dispatch({
      type: TOTAL_PRICE_SETTER,
      payload: totalPrice + price * data.quantity,
    });
  } else {
    let price = data.discount_price
      ? data.discount_price
      : Math.floor(data.service_price);
    dispatch({
      type: TOTAL_PRICE_SETTER,
      payload: totalPrice + price,
    });
  }

  // dispatch({
  //   type: TOTAL_PRICE_SETTER,
  //   payload: totalPrice + data.price,

  // });

  let undoQuantity = data.quantity;
  let undoSelectedValue = data.selectedValue;

  let newItem = [
    ...myArr,
    {
      ...data,
      quantity: undoQuantity ? undoQuantity : 1,
      selectedValue: undoSelectedValue
        ? undoSelectedValue
        : "one-after-another",
    },
  ];

  dispatch({
    type: ADD_ITEM,
    payload: newItem,
    // id: data.id,
    // addsId :  ,
    // addsItem :
  });
};

export const removeItem = (id, item, index) => async (dispatch, getState) => {
  let addOnItem = getState().service.addOnItem;
  let items = getState().service.items;

  let totalPrice = getState().service.totalPrice;

  if (item.discount_price > 0) {
    localStorage.removeItem("dealItemInCart");
  }

  // let lengthh = addOnItem && addOnItem[index] && addOnItem[index].length;

  // if (!lengthh) {
  //   dispatch({
  //     type: DELETED_ADD_ON_ITEMS,
  //     payload: [],
  //   });
  // }

  if (item?.service_addons?.length < 1) {
    dispatch({
      type: DELETED_ADD_ON_ITEMS,
      payload: [],
    });
  }

  let newAddONItem = addOnItem;

  let filterAddOnArray = newAddONItem.filter(
    (x) => x == newAddONItem[index]
  )[0];

  let values = [];

  if (filterAddOnArray) {
    dispatch({
      type: DELETED_ADD_ON_ITEMS,
      payload: filterAddOnArray,
    });
    values = filterAddOnArray.map((x) => {
      return x.service_addon_price * x.addOnQuantity;
    });
  }
  const add = (values) => {
    return values.reduce((a, b) => a + b, 0);
  };
  let sum = add(values);
  let discountprice = item.discount_price
    ? item.discount_price
    : item.service_price;
  let price = discountprice * item.quantity + sum;

  dispatch({
    type: TOTAL_PRICE_SETTER,
    payload: totalPrice - price,
  });

  let filteredItemIndex = items.findIndex((x) => x.id == id);

  let mm = newAddONItem.map((x) => {});

  for (let innerIndex = 0; innerIndex < newAddONItem.length; innerIndex++) {
    if (parseInt(filteredItemIndex) === innerIndex) {
      newAddONItem.splice(innerIndex, 1);
    }
  }

  let newAddonArray = newAddONItem;

  // let newAddonArray = newAddONItem.forEach((item, innerIndex) => {
  //   debugger;
  //   if (parseInt(filteredItemIndex) === innerIndex) {
  //     debugger;
  //     newAddONItem.splice(innerIndex, 1);
  //   }
  // });

  // debugger;

  // let newAddonArray = newAddONItem.filter((x) => {
  //   return x !== newAddONItem[index];
  // });

  let fil = items.filter((i) => i.id !== id);
  let fil1 = items.filter((i) => i.id == id)[0];

  dispatch({
    type: DELETED_ITEM,
    payload: { type: "service", item: fil1 },
  });

  dispatch({
    type: REMOVE_ITEM,
    payload: fil,
  });
  dispatch({
    type: ADDS_ON_ITEM,
    payload: newAddonArray,
  });
};

export const addData = (data) => async (dispatch, getState) => {
  let items = getState().service.items;
  let addOnItem = getState().service.addOnItem;
  // let addOnItem = getState().service.addOnArrayy;
  let totalPrice = getState().service.totalPrice;

  // let undoAddOnQuantity = data.addOnQuantity;

  // if (undoAddOnQuantity) {
  //   dispatch({
  //     type: TOTAL_PRICE_SETTER,
  //     payload: totalPrice + data.service_addon_price * undoAddOnQuantity,
  //   });
  // } else {
  //   dispatch({
  //     type: TOTAL_PRICE_SETTER,
  //     payload: totalPrice + data.service_addon_price,
  //   });
  // }

  // for (let index = 0; index < myArr.length; index++) {
  //   if (myArr[index].item.id == data.id) {
  //     return;
  //   }
  // }

  let obj = [];

  if (data.length > 0) {
    data.map((data, index) => {
      obj = [...obj, data.service_addon_price];

      const add = (obj) => {
        return obj.reduce((a, b) => a + b, 0);
      };
      let sum = add(obj);

      let undoAddOnQuantity = data.addOnQuantity;

      if (undoAddOnQuantity) {
        dispatch({
          type: TOTAL_PRICE_SETTER,
          // payload: totalPrice + data.service_addon_price * undoAddOnQuantity,
          payload: totalPrice + sum * undoAddOnQuantity,
        });
      } else {
        dispatch({
          type: TOTAL_PRICE_SETTER,
          // payload: totalPrice + data.service_addon_price,
          payload: totalPrice + sum,
        });
      }

      let filteredItemIndex = items.findIndex((x) => {
        let dataId = x.service_id ? x.service_id : x.id;
        return dataId == data.service_id;
      });

      let newAddOns = addOnItem;
      if (newAddOns[filteredItemIndex]) {
        let check = newAddOns[filteredItemIndex].filter((x) => x.id == data.id);
        if (check.length > 0) {
          dispatch({
            type: TOTAL_PRICE_SETTER,
            payload: totalPrice + 0,
          });
          return;
        } else {
          newAddOns[filteredItemIndex] = [
            ...newAddOns[filteredItemIndex],
            {
              ...data,
              addOnQuantity: undoAddOnQuantity ? undoAddOnQuantity : 1,
            },
          ];
        }
      } else {
        newAddOns[filteredItemIndex] = [
          {
            ...data,
            addOnQuantity: undoAddOnQuantity ? undoAddOnQuantity : 1,
          },
        ];

        // dispatch({
        //   type: ADDS_ON_ITEMM,
        //   payload: newAddOns,
        // });

        dispatch({
          type: ADDS_ON_ITEM,
          payload: newAddOns,
        });
      }
    });
  }
};

// export const addOnArrray = () => async (dispatch, getState) => {
//   let newAddOns = getState().service.addOnArrayy;
//   dispatch({
//     type: ADDS_ON_ITEM,
//     payload: newAddOns,
//   });
// };

export const removeAddOnItem = (data, index) => async (dispatch, getState) => {
  let items1 = getState().service.items;
  let addOnItem1 = getState().service.addOnItem;
  let totalPrice = getState().service.totalPrice;
  let deletedItems = getState().service.deletedItem;

  let price = data.service_addon_price * data.addOnQuantity;
  dispatch({
    type: TOTAL_PRICE_SETTER,
    payload: totalPrice - price,
  });

  let filteredItemIndex1 = items1.findIndex((x) => {
    let itemId = x.service_id ? x.service_id : x.id;
    return itemId == data.service_id;
  });
  let newAddOns1 = addOnItem1;

  if (newAddOns1[filteredItemIndex1]) {
    let f = newAddOns1[filteredItemIndex1].filter((x) => x.id !== data.id);
    let f1 = newAddOns1[filteredItemIndex1].filter((x) => x.id == data.id)[0];
    newAddOns1[filteredItemIndex1] = f;

    dispatch({
      type: DELETED_ITEM,
      payload: { type: "addOnService", item: f1 },
    });

    dispatch({
      type: ADDS_ON_ITEM,
      payload: newAddOns1,
    });

    // dispatch({
    //   type: REMOVE_ADDS_ON_ITEM,
    //   payload: newAddOns1[filteredItemIndex1],
    // });
  }
};

//   let addOnItem1 = getState().service.addOnItem;
//   let theFiltered = addOnItem1[0];
//   let newAddonBefore = theFiltered.filter((x) => {
//     return x.id != data.id;
//   });
//   addOnItem1[index] = newAddonBefore;

//   dispatch({
//     type: ADDS_ON_ITEM,
//     payload: addOnItem1,
//   });
// };
// dispatch({
//   type: ADDS_ON_ITEM,
//   payload: addOnItem1,
// });
// dispatch({
//   type: ADDS_ON_ITEM,
//   payload: addOnItem1,
// });
// dispatch({
//   type: ADDS_ON_ITEM,
//   payload: addOnItem1,
// });
// return;
// };

export const changeQuantity =
  (itemQuantity, item, index) => async (dispatch, getState) => {
    let items2 = getState().service.items;
    let totalPrice = getState().service.totalPrice;

    let filtere = items2.filter((f) => f.id == item.id)[0];

    let DontChang = filtere.quantity;
    filtere.quantity = itemQuantity;

    items2[index] = filtere;
    let discountPrice = item.discount_price
      ? item.discount_price
      : item.service_price;
    let oldPrice = discountPrice * DontChang;
    let newPrice = discountPrice * itemQuantity;
    let newTotalPRice = totalPrice - oldPrice;
    let FinalTotal = newTotalPRice + newPrice;
    dispatch({
      type: TOTAL_PRICE_SETTER,
      payload: FinalTotal,
    });

    dispatch({
      type: ADD_ITEM,
      payload: items2,
    });
  };

export const changeSelectedValue =
  (selectedValue, item, index) => async (dispatch, getState) => {
    // let itemQuantity = localStorage.getItem("sameTimeSelection")

    // if(itemQuantity) {
    //   selectedValue = "same-time"
    // }

    let items3 = getState().service.items;

    let filteredItem = items3.filter((f) => f.id == item.id)[0];
    filteredItem.selectedValue = selectedValue;
    items3[index] = filteredItem;

    dispatch({
      type: ADD_ITEM,
      payload: items3,
    });
  };

export const handleAddOnQuantity =
  (addOnItemQuantity, item, index, addOitem) => async (dispatch, getState) => {
    let items4 = getState().service.items;
    let addOnItem4 = getState().service.addOnItem;
    let totalPrice = getState().service.totalPrice;

    let filteredItemIndex3 = items4.findIndex((x) => {
      let itemId = x.service_id ? x.service_id : x.id;
      return itemId == item.service_id;
    });

    let newAddOns3 = addOnItem4;
    if (newAddOns3[filteredItemIndex3]) {
      let f1 = newAddOns3[filteredItemIndex3].filter((x) => x.id == item.id)[0];
      let DontChang = f1.addOnQuantity;

      let f1Index = newAddOns3[filteredItemIndex3].findIndex(
        (x) => x.id == item.id
      );

      f1.addOnQuantity = addOnItemQuantity;

      newAddOns3[filteredItemIndex3][f1Index] = f1;

      let oldPrice = parseInt(item.service_addon_price) * parseInt(DontChang);
      let newPrice =
        parseInt(item.service_addon_price) * parseInt(addOnItemQuantity);
      let newTotalPRice = parseInt(totalPrice) - parseInt(oldPrice);
      let FinalTotal = parseInt(newTotalPRice) + parseInt(newPrice);

      dispatch({
        type: TOTAL_PRICE_SETTER,
        payload: FinalTotal,
      });

      dispatch({
        type: ADDS_ON_ITEM,
        payload: newAddOns3,
      });
    }
  };

export const handleCheckOut =
  (e, history, minAmount) => async (dispatch, getState) => {
    const totalPrice = getState().service.totalPrice;
    if (totalPrice >= minAmount) {
      dispatch({
        type: CHECKOUT,
        payload: e,
      });
      // history.push("/home/recipient");
      history.push("/home/checkout");
    }
  };
export const handleCheckOut1 =
  (e, history, minAmount) => async (dispatch, getState) => {
    const totalPrice = getState().service.totalPrice;

    if (totalPrice < minAmount) {
      dispatch({
        type: CHECKOUT,
        payload: e,
      });
      history.push("/home/services/facial");
    }
  };
export const handleCheckOut2 = (e, history) => async (dispatch, getState) => {
  dispatch({
    type: CHECKOUT,
    payload: e,
  });
  history.push("/home/services/facial");
};

export const addressModal = (e) => async (dispatch) => {
  dispatch({
    type: ADDRESS_MODAL,
    payload: e,
  });
};

export const giftBoxModal = (e) => async (dispatch) => {
  dispatch({
    type: GIFTBOX_MODAL,
    payload: e,
  });
  dispatch({
    type: IS_GIFTBOX,
    payload: false,
  });
};

export const applygiftBox = (order_id) => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let res = await baseURL.get(`orders/${order_id}/gharpar_gift.json`, header);
    if (res.status === 200) {
      dispatch({
        type: IS_GIFTBOX,
        payload: true,
      });
      dispatch({
        type: GIFTBOX_MODAL,
        payload: false,
      });
    }
  } catch (error) {}
};

export const getCities = () => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let res = await baseURL.get("cities.json", header);

    dispatch({
      type: CITIES,
      payload: res.data,
    });
  } catch (error) {}
};

export const getArea = (id) => async (dispatch) => {
  let lat = localStorage.getItem("lat");
  let lang = localStorage.getItem("lang");
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let res = id
      ? await baseURL.get(`areas.json?city_id=${id}`, header)
      : await baseURL.get(
          `areas.json?latitude=${lat}&longitude=${lang}`,
          header
        );

    dispatch({
      type: AREAS,
      payload: res.data,
    });
  } catch (error) {}
};

export const addAddress = (data, e) => async (dispatch, getState) => {
  const getAddress = getState().service.address;
  const editAddressPage = getState().service.editAddressPage;

  let editMod = localStorage.getItem("editMod");
  let lat = localStorage.getItem("lat");
  let lang = localStorage.getItem("lang");

  let id = localStorage.getItem("editAddressId");
  if (editAddressPage || editMod) {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }
    let cityId;
    if (localStorage.getItem("profileAddress")) {
      cityId = data.city;
    } else {
      cityId = localStorage.getItem("cityId");
    }
    let areaId = data.area;
    let addressTitle = data.detail;
    let isDefault = localStorage.getItem("isDefaultAddress");

    let body;

    cityId
      ? (body = {
          address: {
            address_title: "",
            address_1: `${data.detail}`,
            address_2: "",
            zip_code: "",
            landmark: "",
            latitude: lat ? lat : "",
            longitude: lang ? lang : "",
            is_default: false,
            city_id: cityId,
            area_id: areaId,
          },
        })
      : (body = {
          address: {
            address_title: "",
            address_1: `${data.detail}`,
            address_2: "",
            zip_code: "",
            landmark: "",
            latitude: lat ? lat : "",
            longitude: lang ? lang : "",
            is_default: false,
            // city_id: cityId,
            area_id: areaId,
          },
        });

    let res = await baseURL.put(`addresses/${id}.json`, body, header);

    if (res) {
      // dispatch({
      //   type: PROFILE_SUCCESS_MSG,
      //   payload: "Profile is updated",
      // });
      dispatch({
        type: EDIT_ADDRESS_TYPE,
        payload: false,
      });
      dispatch({
        type: ADDRESS_MODAL,
        payload: e,
      });
      localStorage.removeItem("editMod");

      // dispatch({
      //   type: EDIT_ADDRESS,
      //   payload: res.data,
      // });
    }
  } else {
    try {
      let utm_code = cookie.get("utm_source");
      let header;
      if (utm_code) {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
            REFERRER: `${utm_code}`,
          },
        };
      } else {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };
      }

      let cityId;
      if (localStorage.getItem("profileAddress")) {
        cityId = data.city;
      } else {
        cityId = localStorage.getItem("cityId");
      }
      let areaId = data.area;

      let body;

      cityId
        ? (body = {
            address: {
              address_title: "",
              address_1: `${data.detail}`,
              address_2: "",
              zip_code: "",
              landmark: "",
              latitude: lat ? lat : "",
              longitude: lang ? lang : "",
              is_default: false,
              city_id: cityId,
              area_id: areaId,
            },
          })
        : (body = {
            address: {
              address_title: "",
              address_1: `${data.detail}`,
              address_2: "",
              zip_code: "",
              landmark: "",
              latitude: lat ? lat : "",
              longitude: lang ? lang : "",
              is_default: false,
              // city_id: cityId,
              area_id: areaId,
            },
          });

      let res = await baseURL.post(`addresses.json`, body, header);

      // const obj = Object.values(data);

      // let newAddress = obj.reverse().toString();

      let newData = [...getAddress, res.data];

      dispatch({
        type: ADD_ADDRESS,
        payload: newData,
      });
      dispatch({
        type: ADDRESS_MODAL,
        payload: e,
      });

      // dispatch({a
      //   type: AREAS,
      //   payload: res.data,
      // });
    } catch (error) {}
  }
};

export const addMultipleAddress = () => async (dispatch, getState) => {
  const getLocalAddresses = getState().service.addAddresses;
  const getAddress = getState().service.address;
  let utm_code = cookie.get("utm_source");
  let header;
  if (utm_code) {
    header = {
      headers: {
        "AUTH-TOKEN": localStorage.getItem("token"),
        "Content-Type": "application/json",
        REFERRER: `${utm_code}`,
      },
    };
  } else {
    header = {
      headers: {
        "AUTH-TOKEN": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
  }

  let arr = [...getAddress];

  getLocalAddresses.map(async (x, index) => {
    let body = {
      address: {
        address_title: "",
        address_1: `${x.detail}`,
        address_2: "",
        zip_code: "",
        landmark: "",
        latitude: "",
        longitude: "",
        is_default: false,
        city_id: x.city,
        area_id: x.area,
      },
    };
    let res = await baseURL.post(`addresses.json`, body, header);
    if (res) {
      // let newData = [...getAddress, res.data];
      arr.push(res.data);
    }
  });

  setTimeout(function afterTwoSeconds() {
    dispatch({
      type: ADD_ADDRESSES,
      payload: [],
    });
    dispatch({
      type: Action.LOCAL_CITIES,
      payload: [],
    });
    dispatch({
      type: Action.LOCAL_AREAS,
      payload: [],
    });

    dispatch({
      type: EDIT_PAGE1,
      payload: false,
    });

    dispatch({
      type: EDIT_PAGE2,
      payload: false,
    });

    dispatch({
      type: EDIT_PAGE3,
      payload: false,
    });

    dispatch({
      type: EDIT_PAGE4,
      payload: false,
    });
    dispatch({
      type: PROFILE_SUCCESS_MSG,
      payload: "Profile is updated",
    });
    dispatch({
      type: ADD_ADDRESS,
      payload: arr,
    });
  }, 2000);
};

export const addIslamabadAddress = (data, e) => async (dispatch, getState) => {
  const getAddress = getState().service.islamabadAddress;
  const editAddressPage = getState().service.editAddressPage;

  let lat = localStorage.getItem("lat");
  let lang = localStorage.getItem("lang");

  let id = localStorage.getItem("editAddressId");
  if (editAddressPage) {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let cityId = localStorage.getItem("cityId");
    let areaId = data.area;
    let addressTitle = data.detail;
    let isDefault = localStorage.getItem("isDefaultAddress");

    let body = {
      address: {
        address_title: "",
        address_1: `${addressTitle}`,
        address_2: "",
        zip_code: "",
        landmark: "",
        latitude: lat ? lat : "",
        longitude: lang ? lang : "",
        is_default: isDefault,
        city_id: cityId ? cityId : "",
        area_id: areaId,
      },
    };

    let res = await baseURL.put(`addresses/${id}.json`, body, header);

    dispatch({
      type: EDIT_ADDRESS_TYPE,
      payload: false,
    });
    dispatch({
      type: ADDRESS_MODAL,
      payload: e,
    });
    // dispatch({
    //   type: EDIT_ADDRESS,
    //   payload: res.data,
    // });
  } else {
    try {
      let utm_code = cookie.get("utm_source");
      let header;
      if (utm_code) {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
            REFERRER: `${utm_code}`,
          },
        };
      } else {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };
      }
      let cityId = localStorage.getItem("cityId");
      let areaId = data.area;

      let body = {
        address: {
          address_title: "",
          address_1: `${data.detail}`,
          address_2: "",
          zip_code: "",
          landmark: "",
          latitude: lat ? lat : "",
          longitude: lang ? lang : "",
          is_default: false,
          city_id: cityId ? cityId : "",
          area_id: areaId,
        },
      };

      let res = await baseURL.post(`addresses.json`, body, header);
      // const obj = Object.values(data);

      // let newAddress = obj.reverse().toString();

      let newData = [...getAddress, res.data];

      dispatch({
        type: ADD_ADDRESS,
        payload: newData,
      });
      dispatch({
        type: ADDRESS_MODAL,
        payload: e,
      });

      // dispatch({
      //   type: AREAS,
      //   payload: res.data,
      // });
    } catch (error) {}
  }
};

export const orderDetail =
  (address, history, reorderData) => async (dispatch, getState) => {
    console.log(address);
    localStorage.removeItem("orderPage");
    dispatch({
      type: ORDER_DETAIL,
      payload: address,
    });
    let is_reorder = false;
    if (reorderData !== undefined && Object.keys(reorderData).length > 0) {
      is_reorder = true;
    }

    const items = getState().service.items;
    const addOnItems = getState().service.addOnItem;
    const dataa = getState().auth.userData;
    try {
      let utm_code = cookie.get("utm_source");
      let header;
      if (utm_code) {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
            "DEVICE-TYPE": "web_app",
            REFERRER: `${utm_code}`,
          },
        };
      } else {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
            "DEVICE-TYPE": "web_app",
          },
        };
      }
      let data1 = [];
      let adOndata = [];
      if (!is_reorder) {
        let data = items.map((x, index) => {
          let x1 =
            addOnItems && addOnItems.filter((y, index1) => index1 === index)[0];
          x1 &&
            x1.map((x2) => {
              x2 = {
                service_id: x2.id,
                unit_count: parseInt(x2.addOnQuantity),
              };
              return (adOndata = [...adOndata, x2]);
            });
          data1 = [
            ...data1,
            {
              unit_count: parseInt(x.quantity),
              is_same_time: x.selectedValue === "same-time" ? true : false,
              service_id: x.service_id ? x.service_id : x.id,
              order_service_addons_attributes: adOndata,
            },
          ];
          adOndata = [];
        });
      }

      let body = {};

      if (is_reorder) {
        body = {
          order_id: reorderData.id,
          order: {
            order_date: address.date,
            order_time: address.time,
            special_notes: address.instruction,
            address_id: parseInt(address.addressId),
          },
        };
      } else {
        body = {
          order: {
            order_date: address.date,
            order_time: address.time,
            phone: dataa.phone,
            special_notes: address.instruction,
            address_id: parseInt(address.addressId),
            order_services_attributes: data1,
          },
        };
      }
      let res = "";
      if (is_reorder) {
        res = await baseURL.post(`/orders/re_order.json`, body, header);
      } else {
        res = await baseURL.post(`/orders.json`, body, header);
      }

      dispatch({
        type: ORDER_SUMMARY,
        payload: res.data,
        redeemFreeService: [],
      });
      if (res) {
        history.push("/home/recipient");
        dispatch({
          type: ORDER_DETAIL_ERROR_MSG,
          payload: false,
        });
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "Order Time Should be Between 09:00 AM to 09:00 PM"
      ) {
        dispatch({
          type: ORDER_DETAIL_ERROR_MSG,
          payload: true,
          msg: error.response.data.message,
        });
      } else if (
        error.response.data.message ===
        "Your session expired. Please login again."
      ) {
        dispatch({
          type: Action.SESSION_ERROR,
          payload: true,
        });
        dispatch({
          type: Action.SESSION_LOGOUT,
          payload: false,
        });
        dispatch({
          type: Action.IS_FORGET_PASSOWRD,
          payload: false,
        });
        dispatch({
          type: ADD_ITEM,
          payload: [],
        });
        dispatch({
          type: ADDS_ON_ITEM,
          payload: [],
        });
        dispatch({
          type: TOTAL_PRICE_SETTER,
          payload: 0,
        });
        dispatch({
          type: ADD_ADDRESS,
          payload: [],
        });
        dispatch({
          type: Action.CITY_AFTER_LOGIN,
          payload: false,
        });
        dispatch({
          type: Action.GUEST_USER,
          payload: false,
        });
        dispatch({
          type: CHECKOUT,
          payload: false,
        });
        dispatch({
          type: UN_CHECKED_SERVICE,
          payload: [],
        });
        dispatch({
          type: ADDS_ON_CHECKED_SERVICE,
          payload: [],
        });
        dispatch({
          type: DELETED_ITEM,
          payload: null,
        });
        dispatch({
          type: REORDER_DATA,
          payload: {},
        });
        localStorage.clear();
        alert("Your login session is expired, please login again to continue.");
      } else {
        dispatch({
          type: ORDER_DETAIL_ERROR_MSG,
          payload: true,
          msg: error.response.data.message,
        });
      }
    }
  };

export const submitOrder =
  (e, orderId, history, e1, userData, couponCode, discount, is_reorder) =>
  async (dispatch, getState) => {
    dispatch({
      type: CHECKOUT,
      payload: e,
    });
    const items = getState().service.items;
    const addOnItems = getState().service.addOnItem;
    const address = getState().service.orderDetail;
    const address1 = getState().service.address;
    const dataa = getState().auth.userData;
    const guestUser = getState().auth.guestUser;
    try {
      let utm_code = cookie.get("utm_source");
      let header;
      if (utm_code) {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
            "DEVICE-TYPE": "web_app",
            REFERRER: `${utm_code}`,
          },
        };
      } else {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
            "DEVICE-TYPE": "web_app",
          },
        };
      }
      let data1 = [];
      let adOndata = [];
      let data = [];
      if (is_reorder) {
        items.map((single_service) => {
          data1.push({
            unit_count: single_service.quantity,
            service_id: single_service.id,
            is_same_time: false,
            order_service_addons_attributes: single_service.service_addons.map(
              (single_addon) => {
                return {
                  service_id: single_addon.service_id,
                  unit_count: single_addon.addOnQuantity,
                };
              }
            ),
          });
        });
      } else {
        data = items.map((x, index) => {
          let x1 =
            addOnItems && addOnItems.filter((y, index1) => index1 === index)[0];
          x1 &&
            x1.map((x2) => {
              x2 = {
                service_id: x2.id,
                unit_count: parseInt(x2.addOnQuantity),
              };
              return (adOndata = [...adOndata, x2]);
            });

          data1 = [
            ...data1,
            {
              unit_count: parseInt(x.quantity),
              is_same_time: x.selectedValue === "same-time" ? true : false,
              service_id: x.id,
              order_service_addons_attributes: adOndata,
            },
          ];
          adOndata = [];
        });
      }

      let body;
      if (couponCode) {
        body = {
          order_id: orderId,
          coupon_code: `${couponCode}`,
          order: {
            order_date: address.date,
            order_time: address.time,
            phone: dataa.phone,
            special_notes: address.instruction,
            address_id: address1[0].id,
            order_services_attributes: data1,
          },
        };
      } else {
        body = {
          order_id: orderId,
          order: {
            order_date: address.date,
            order_time: address.time,
            phone: dataa.phone,
            special_notes: address.instruction,
            address_id: address1[0].id,
            order_services_attributes: data1,
          },
        };
      }
      let res = await baseURL.post(`orders.json`, body, header);
      if (res) {
        dispatch({
          type: ORDER_HISTORY,
          payload: res.data,
        });

        if (guestUser && res && !couponCode) {
          history.replace("/guest-user-registration");
        }

        if (guestUser && res && couponCode) {
          localStorage.setItem("couponDiscount", discount);
          dispatch({
            type: DISCOUNT_MODAL,
            payload: true,
          });
        }
        if (res) {
          localStorage.removeItem("dealItemInCart");
          localStorage.removeItem("firstOrder");

          dispatch({
            type: MAKE_ISSUBMIT_TRUE,
            payload: e1,
          });
          dispatch({
            type: ADD_ITEM,
            payload: [],
          });
          dispatch({
            type: ADDS_ON_ITEM,
            payload: [],
          });
          dispatch({
            type: TOTAL_PRICE_SETTER,
            payload: 0,
          });
          dispatch({
            type: ADD_ADDRESS,
            payload: [],
          });
          dispatch({
            type: UN_CHECKED_SERVICE,
            payload: [],
          });
          dispatch({
            type: ADDS_ON_CHECKED_SERVICE,
            payload: [],
          });
          dispatch({
            type: COUPON_CODE,
            payload: null,
            couponError: "",
            couponType: false,
          });
          dispatch({
            type: CANCEL_COUPON_DATA,
            payload: null,
          });
          if (guestUser == false && userData?.cnic !== null) {
            history.replace("/home/order-detail");
            window.location.reload();
            localStorage.setItem("pendingTrack", true);
            dispatch({
              type: CNIC_MODAL,
              payload: true,
            });
            dispatch({
              type: Action.LOGO_CLICKED_RELOAD,
              payload: false,
            });
          } else if (guestUser == true) {
            dispatch({
              type: CNIC_MODAL,
              payload: false,
            });
          } else {
            dispatch({
              type: CNIC_MODAL,
              payload: true,
            });
          }
        }
      }
    } catch (error) {
      if (
        error?.response?.data?.message ==
        "Your session expired. Please login again."
      ) {
        return (
          dispatch({
            type: Action.SESSION_ERROR,
            payload: true,
          }),
          dispatch({
            type: Action.SESSION_LOGOUT,
            payload: false,
          }),
          dispatch({
            type: Action.IS_FORGET_PASSOWRD,
            payload: false,
          }),
          dispatch({
            type: ADD_ITEM,
            payload: [],
          }),
          dispatch({
            type: ADDS_ON_ITEM,
            payload: [],
          }),
          dispatch({
            type: TOTAL_PRICE_SETTER,
            payload: 0,
          }),
          dispatch({
            type: ADD_ADDRESS,
            payload: [],
          }),
          dispatch({
            type: Action.CITY_AFTER_LOGIN,
            payload: false,
          }),
          dispatch({
            type: Action.GUEST_USER,
            payload: false,
          }),
          dispatch({
            type: CHECKOUT,
            payload: false,
          }),
          dispatch({
            type: UN_CHECKED_SERVICE,
            payload: [],
          }),
          dispatch({
            type: ADDS_ON_CHECKED_SERVICE,
            payload: [],
          }),
          dispatch({
            type: DELETED_ITEM,
            payload: null,
          }),
          localStorage.clear(),
          alert(
            "Your login session is expired, please login again to continue."
          )
        );
      } else {
        dispatch({
          type: SUBMIT_ORDER_UNSUCCESS,
          errorMsg: error?.response?.data?.message,
          errortype: true,
        });
      }
    }
  };

export const getOrderListing = (pageNo) => async (dispatch) => {
  dispatch({
    type: SERVICE_LOADING,
    payload: true,
  });
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let res = await baseURL.get(
      `orders.json?status=Scheduled&page=${pageNo}`,
      header
    );

    dispatch({
      type: ORDER_LISTING,
      payload: res.data,
    });

    dispatch({
      type: SERVICE_LOADING,
      payload: false,
    });
  } catch (error) {}
};

export const getHistoryListing = (pageNo) => async (dispatch) => {
  dispatch({
    type: SERVICE_LOADING,
    payload: true,
  });
  let utm_code = cookie.get("utm_source");
  const header = {
    headers: {
      "AUTH-TOKEN": localStorage.getItem("token"),
      "Content-Type": "application/json",
      REFERRER: `${utm_code}`,
    },
  };

  let res = await baseURL.get(
    `orders.json?status=History&page=${pageNo}`,
    header
  );
  dispatch({
    type: HISTORY_LISTING,
    payload: res.data,
  });

  dispatch({
    type: SERVICE_LOADING,
    payload: false,
  });
};

export const makeIsSubmitTrue = (e) => async (dispatch) => {
  dispatch({
    type: MAKE_ISSUBMIT_TRUE,
    payload: e,
  });
};

export const cartItemError = (e) => async (dispatch) => {
  dispatch({
    type: CART_ITEM_ERROR,
    payload: e,
  });
};

export const ratingSlideInModal = (e, id) => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }
    let res = await baseURL.get(`orders/${id}.json`, header);
    dispatch({
      type: SHOW_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {}

  dispatch({
    type: RATING_SLIDE_IN_MODAL,
    payload: e,
  });
};

export const Addresses = () => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }
    let res = await baseURL.get("addresses.json", header);
    dispatch({
      type: ADD_ADDRESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: Action.SESSION_ERROR,
      payload: true,
    });
    dispatch({
      type: Action.SESSION_LOGOUT,
      payload: false,
    });
    dispatch({
      type: Action.IS_FORGET_PASSOWRD,
      payload: false,
    });
    dispatch({
      type: ADD_ITEM,
      payload: [],
    });
    dispatch({
      type: ADDS_ON_ITEM,
      payload: [],
    });
    dispatch({
      type: TOTAL_PRICE_SETTER,
      payload: 0,
    });
    dispatch({
      type: ADD_ADDRESS,
      payload: [],
    });
    dispatch({
      type: Action.CITY_AFTER_LOGIN,
      payload: false,
    });
    dispatch({
      type: Action.GUEST_USER,
      payload: false,
    });
    dispatch({
      type: CHECKOUT,
      payload: false,
    });
    dispatch({
      type: UN_CHECKED_SERVICE,
      payload: [],
    });
    dispatch({
      type: ADDS_ON_CHECKED_SERVICE,
      payload: [],
    });
    dispatch({
      type: DELETED_ITEM,
      payload: null,
    });
    localStorage.clear();
    alert(" Your login session is expired, please login again to continue.");
  }
};

export const updateProfile = (body) => async (dispatch) => {
  const id = localStorage.getItem("userId");
  const updateCnic = localStorage.getItem("updateCnic");
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }
    let res = await baseURL.put(`users/${id}.json`, body, header);
    if (res) {
      // alert("Profile is updated");
      localStorage.setItem("pendingTrack", true);

      if (!updateCnic) {
        dispatch({
          type: PROFILE_SUCCESS_MSG,
          payload: "Profile is updated",
        });
      }

      dispatch({
        type: Action.UPDATE_USER_DATA,
        payload: res.data,
      });
      dispatch({
        type: EDIT_PAGE1,
        payload: false,
      });
      dispatch({
        type: EDIT_PAGE2,
        payload: false,
      });
      localStorage.removeItem("updateCnic");
    }
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_ERROR,
      payload: error?.response?.data?.message,
    });
  }
};

export const updateProfilePassword = (body) => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }
    let res = await baseURL.post(`users/change_password.json`, body, header);
    if (res) {
      // alert("Password is updated");

      dispatch({
        type: PROFILE_SUCCESS_MSG,
        payload: res.data.message,
      });
      dispatch({
        type: EDIT_PAGE1,
        payload: false,
      });
      dispatch({
        type: EDIT_PAGE2,
        payload: false,
      });
      dispatch({
        type: EDIT_PAGE3,
        payload: false,
      });
      dispatch({
        type: EDIT_PAGE4,
        payload: false,
      });
    }
  } catch (error) {
    dispatch({
      type: PROFILE_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
    // alert(error.response.data.message);
  }
};

export const updateProfilePicture = (file) => async (dispatch) => {
  const fd = new FormData();
  fd.append("user[profile_picture]", file, file.name);
  for (var pair of fd.entries()) {
  }

  const id = localStorage.getItem("userId");
  let utm_code = cookie.get("utm_source");
  const header = {
    headers: {
      "AUTH-TOKEN": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
      REFERRER: `${utm_code}`,
    },
  };
  const data = fd;
  let res = await baseURL.put(`users/${id}.json`, data, header);
  if (res) {
    // alert("Profile is updated");
    dispatch({
      type: PROFILE_SUCCESS_MSG,
      payload: "Profile Picture is updated",
    });
    dispatch({
      type: Action.UPDATE_USER_DATA,
      payload: res.data,
    });
    dispatch({
      type: EDIT_PAGE1,
      payload: false,
    });
    dispatch({
      type: EDIT_PAGE2,
      payload: false,
    });
  }
  dispatch({
    type: EDIT_PAGE3,
    payload: false,
  });
};

export const editPage1 = (e) => async (dispatch) => {
  dispatch({
    type: EDIT_PAGE1,
    payload: e,
  });
};
export const editPage2 = (p1, e) => async (dispatch) => {
  dispatch({
    type: EDIT_PAGE1,
    payload: p1,
  });
  dispatch({
    type: EDIT_PAGE2,
    payload: e,
  });
};
export const editPage3 = (p2, e) => async (dispatch) => {
  dispatch({
    type: EDIT_PAGE2,
    payload: p2,
  });
  dispatch({
    type: EDIT_PAGE3,
    payload: e,
  });
};

export const editPage4 = (p3, e) => async (dispatch) => {
  dispatch({
    type: EDIT_PAGE3,
    payload: p3,
  });
  dispatch({
    type: EDIT_PAGE4,
    payload: e,
  });
};

export const editAddress = (id) => async (dispatch) => {
  localStorage.setItem("editAddressId", id);
  let utm_code = cookie.get("utm_source");
  let header = {
    headers: {
      "AUTH-TOKEN": localStorage.getItem("token"),
      "Content-Type": "application/json",
      REFERRER: `${utm_code}`,
    },
  };

  let res = await baseURL.get(`addresses/${id}.json`, header);

  dispatch({
    type: EDIT_ADDRESS,
    payload: res.data,
  });
};

export const deleteAddress = (id) => async (dispatch) => {
  let utm_code = cookie.get("utm_source");
  let header = {
    headers: {
      "AUTH-TOKEN": localStorage.getItem("token"),
      "Content-Type": "application/json",
      REFERRER: `${utm_code}`,
    },
  };

  let res = await baseURL.delete(`addresses/${id}.json`, header);
};

export const editAddressType = (e) => async (dispatch) => {
  dispatch({
    type: EDIT_ADDRESS_TYPE,
    payload: e,
  });
};

export const discountModal = (e) => async (dispatch) => {
  dispatch({
    type: DISCOUNT_MODAL,
    payload: e,
  });
};

export const updateDefaultAddress =
  (id, e, type, defaultType, data) => async (dispatch, getState) => {
    dispatch({
      type: DEFAULT_LOADIG,
      payload: true,
    });

    const address = getState().service.address;
    let arr = [];

    address.map((x) => {
      if (x.is_default) {
        return arr.push(x.id);
      }
    });
    if (arr.length > 0) {
      let utm_code = cookie.get("utm_source");
      let header;
      if (utm_code) {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
            REFERRER: `${utm_code}`,
          },
        };
      } else {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };
      }

      let body = {
        address: {
          address_1: data.address_1,
          is_default: false,
        },
      };

      arr.map((x) => {
        let apiCall = async () => {
          if (x !== id) {
            let res = await baseURL.put(`addresses/${x}.json`, body, header);
            dispatch({
              type: EDIT_ADDRESS,
              payload: res.data,
            });
          }
        };
        apiCall();
      });
    }
    let utm_code = cookie.get("utm_source");
    const header = {
      headers: {
        "AUTH-TOKEN": localStorage.getItem("token"),
        "Content-Type": "application/json",
        REFERRER: `${utm_code}`,
      },
    };

    let body = {
      address: {
        address_1: data.address_1,
        is_default: e,
      },
    };

    let res2 = await baseURL.put(`addresses/${id}.json`, body, header);

    if (res2) {
      dispatch({
        type: EDIT_ADDRESS,
        payload: res2.data,
      });
      dispatch({
        type: ADDRESS_PAGE_RELOAD,
        payload: type,
      });
      dispatch({
        type: DEFAULT_LOADIG,
        payload: false,
      });
    }
  };

// export const unCheckService = (e,index,id) => async (dispatch) => {
//   dispatch({
//     type: UN_CHECKED_SERVICE,
//     payload: e,
//     index:index,
//     id:id
//   });
// };

export const unCheckService = (e, index, id) => async (dispatch, getState) => {
  const checked = getState().service.unCheckedService;
  const addOns = getState().service.addOnsCheckedValues;
  const removeAddOns = getState().service.removeAddOnsInsideSerivce;

  let newAddOns = addOns;

  let condition = localStorage.getItem("removeAddOns");

  if (condition) {
    let filterAddOns = newAddOns.filter((x) => x == newAddOns[index])[0];
    let newAddonArray = newAddOns.filter((x) => x !== filterAddOns);
    dispatch({
      type: ADDS_ON_CHECKED_SERVICE,
      payload: newAddonArray,
    });
    localStorage.removeItem("removeAddOns");
  }

  let checkedValues = checked;
  let totalCheckedValues = [];
  if (checkedValues.length > 0) {
    let filteredValue = checkedValues.filter((y) => y.id !== id);

    totalCheckedValues = [...filteredValue, { id: id, type: e }];
  } else {
    totalCheckedValues = [...checkedValues, { id: id, type: e }];
  }

  // let totalCheckedValues = [...checkedValues, { id: id, type: e }];
  let finalTotalCheckedValues = totalCheckedValues;
  let filterIndexOfCheckedValue = finalTotalCheckedValues.findIndex(
    (x) => x.id == id
  );
  finalTotalCheckedValues[filterIndexOfCheckedValue] = { id: id, type: e };
  dispatch({
    type: UN_CHECKED_SERVICE,
    payload: finalTotalCheckedValues,
  });
};

export const addOnsCheckValues =
  (Arr, e, index, serviceId, id) => async (dispatch, getState) => {
    const servicesCheckedValues = getState().service.unCheckedService;
    const checked = getState().service.addOnsCheckedValues;

    if (Arr.length > 0) {
      Arr.map((data, index) => {
        let filterItemIndex = servicesCheckedValues.findIndex(
          // (x) => x.id == serviceId
          (x) => x.id == data.serviceId
        );

        let newCheckedList = checked;

        if (newCheckedList[filterItemIndex]) {
          let check = newCheckedList[filterItemIndex].filter(
            (x) => x.id == data.id
          );

          if (check.length > 0) {
            // for (let indexx = 0; indexx < check.length; indexx++) {
            //   if (check[indexx].id == data.id) {
            //     newCheckedList[filterItemIndex] = [
            //       newCheckedList.splice(indexx, 1),
            //       { type: data.type, serviceId: data.serviceId, id: data.id },
            //     ];
            //   }
            // }
            newCheckedList[filterItemIndex] = [
              ...newCheckedList[filterItemIndex],
              { type: data.type, serviceId: data.serviceId, id: data.id },
            ];

            // return null;
          } else {
            newCheckedList[filterItemIndex] = [
              ...newCheckedList[filterItemIndex],
              { type: data.type, serviceId: data.serviceId, id: data.id },
            ];
          }
          // dispatch({
          //   type: ADDS_ON_CHECKED_SERVICE,
          //   payload: newCheckedList,
          // });
        } else {
          newCheckedList[filterItemIndex] = [
            { type: data.type, serviceId: data.serviceId, id: data.id },
          ];

          dispatch({
            type: ADDS_ON_CHECKED_SERVICE,
            payload: newCheckedList,
          });
        }
      });
    }
  };

export const removeAddOnsInsideSerivce = (e) => async (dispatch) => {
  dispatch({
    type: REMOVE_ADD_ONS_INSIDE_SERIVCE,
    payload: e,
  });
};

export const deleteItem = (item) => async (dispatch) => {
  dispatch({
    type: DELETED_ITEM,
    payload: item,
  });
};

export const ratingPopup = (type) => async (dispatch) => {
  dispatch({
    type: RATING_POPUP,
    payload: type,
  });
  if (type == false) {
    dispatch({
      type: TECHNICIAN_RATINGS,
      payload: [],
    });
  }
};

export const technicianRating =
  (rating, id, job, index) => async (dispatch, getState) => {
    const previousRatings = getState().service.technicianRatings;

    let filterPreviousRatings = previousRatings.filter((x) => x.id !== id);

    dispatch({
      type: TECHNICIAN_RATINGS,
      payload: [
        ...filterPreviousRatings,
        { id: id, job_rating: rating, comments: "" },
      ],
    });
  };

export const ratingPopupComment =
  (comment, id) => async (dispatch, getState) => {
    const previousRatings = getState().service.technicianRatings;

    let fileterJob = previousRatings.filter((x) => x.id == id);

    let x = fileterJob;
    x[0].comments = comment;

    dispatch({
      type: TECHNICIAN_RATINGS,
      payload: [...previousRatings],
    });
  };

export const submitRating =
  (id, technicianRatingLength, orderJobsLength) =>
  async (dispatch, getState) => {
    const technicianRatings = getState().service.technicianRatings;
    const error = getState().service.feedbackError;

    try {
      let utm_code = cookie.get("utm_source");
      let header;
      if (utm_code) {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
            "DEVICE-TYPE": "web_app",
            REFERRER: `${utm_code}`,
          },
        };
      } else {
        header = {
          headers: {
            "AUTH-TOKEN": localStorage.getItem("token"),
            "Content-Type": "application/json",
            "DEVICE-TYPE": "web_app",
          },
        };
      }
      let body = {
        order: {
          is_feedback_skipped: false,
          order_jobs_attributes: technicianRatings,
        },
      };

      if (technicianRatingLength == orderJobsLength && error == false) {
        let res = await baseURL.post(
          `orders/${id}/order_feedback.json`,
          body,
          header
        );
        if (res) {
          let res1 = await baseURL.get(
            `orders/pending_orders_feedback.json`,
            header
          );
          dispatch({
            type: PENDING_RATING,
            payload: res1.data,
          });
          dispatch({
            type: RATING_SLIDE_IN_MODAL,
            payload: false,
          });
          dispatch({
            type: RATING_POPUP,
            payload: false,
          });
          dispatch({
            type: TECHNICIAN_RATINGS,
            payload: [],
          });
          localStorage.setItem("checkk", true);
        }
      }

      // let res = await baseURL.post(
      //   `orders/${id}/order_feedback.json`,
      //   body,
      //   header
      // );
      // if (res) {
      //   dispatch({
      //     type: RATING_POPUP,
      //     payload: false,
      //   });
      //   dispatch({
      //     type: TECHNICIAN_RATINGS,
      //     payload: [],
      //   });
      // }
    } catch {}
  };

export const skipRating = (id) => async (dispatch, getState) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          "DEVICE-TYPE": "web_app",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          "DEVICE-TYPE": "web_app",
        },
      };
    }
    let body = {
      order: {
        is_feedback_skipped: true,
      },
    };

    let res = await baseURL.post(
      `orders/${id}/order_feedback.json`,
      body,
      header
    );
    if (res) {
      let res1 = await baseURL.get(
        `orders/pending_orders_feedback.json`,
        header
      );
      dispatch({
        type: PENDING_RATING,
        payload: res1.data,
      });
      dispatch({
        type: RATING_POPUP,
        payload: false,
      });
    }
  } catch {}
};

export const ratingRecords = (id, type) => async (dispatch, getState) => {
  const rating = getState().service.ratingRecord;

  let filterRecord = rating.filter((x) => x.id == id);

  dispatch({
    type: RATING_RECORD,
    payload: [...rating, { orderId: id, ratingType: type }],
  });
};

export const editProfile = (type) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_PROFILE,
    payload: type,
  });
};

export const getMinimumOrder = () => async (dispatch) => {
  const id = localStorage.getItem("cityId");
  let lat = localStorage.getItem("lat");
  let lang = localStorage.getItem("lang");
  let utm_code = cookie.get("utm_source");
  const header = {
    headers: {
      "AUTH-TOKEN": localStorage.getItem("token"),
      "Content-Type": "application/json",
      REFERRER: `${utm_code}`,
    },
  };

  let res = id
    ? await baseURL.get(`settings.json?city_id=${id}`, header)
    : await baseURL.get(
        `settings.json?latitude=${lat}&longitude=${lang}`,
        header
      );

  dispatch({
    type: SETTING_API,
    payload: res.data,
  });
};

export const notifications = () => async (dispatch) => {
  let utm_code = cookie.get("utm_source");
  const header = {
    headers: {
      "AUTH-TOKEN": localStorage.getItem("token"),
      "Content-Type": "application/json",
      REFERRER: `${utm_code}`,
    },
  };

  let res = await baseURL.get(`notifications.json`, header);
  dispatch({
    type: NOTIFICATIONS,
    payload: res.data,
  });
};

export const notActiveDealModal = (type) => async (dispatch) => {
  dispatch({
    type: NOT_ACTIVE_DEAL,
    payload: type,
  });
};

export const cnicModal = (type) => async (dispatch) => {
  dispatch({
    type: CNIC_MODAL,
    payload: type,
  });
};

export const newNotificationType = (type) => async (dispatch) => {
  dispatch({
    type: NEW_NOTIFICATION_TYPE,
    payload: type,
  });
};

export const feedBackError = (type) => async (dispatch) => {
  dispatch({
    type: FEEDBACK_ERROR,
    payload: type,
  });
};
export const pendingRating = () => async (dispatch) => {
  let utm_code = cookie.get("utm_source");
  const header = {
    headers: {
      "AUTH-TOKEN": localStorage.getItem("token"),
      "Content-Type": "application/json",
      REFERRER: `${utm_code}`,
    },
  };

  let res = await baseURL.get(`orders/pending_orders_feedback.json`, header);
  dispatch({
    type: PENDING_RATING,
    payload: res.data,
  });
};

export const profileUpdateError = (data) => async (dispatch) => {
  dispatch({
    type: PROFILE_UPDATE_ERROR,
    payload: data,
  });
};

export const addAddresses = (data) => async (dispatch, getState) => {
  let previousAddresses = getState().service.addAddresses;
  let newAddresses = [...previousAddresses, data];

  dispatch({
    type: ADD_ADDRESSES,
    payload: newAddresses,
  });
  dispatch({
    type: ADDRESS_MODAL,
    payload: false,
  });
  localStorage.removeItem("editMod");
};

export const localAreas = (areaName) => async (dispatch, getState) => {
  let previousAreas = getState().service.localAreas;
  let newAreas = [...previousAreas, areaName];

  dispatch({
    type: LOCAL_AREAS,
    payload: newAreas,
  });
};

export const localCities = (cityName) => async (dispatch, getState) => {
  let previousCities = getState().service.localCities;
  if (previousCities) {
    let newCities = [...previousCities, cityName];
    dispatch({
      type: LOCAL_CITIES,
      payload: newCities,
    });
    localStorage.removeItem("cityNameee");
  }
};

export const deleteLocalAddress =
  (data, index) => async (dispatch, getState) => {
    let localAddresses = getState().service.addAddresses;
    let localCities = getState().service.localCities;
    let localAreas = getState().service.localAreas;

    if (localAddresses?.length > 0) {
      let filteredAddresses = localAddresses.filter((x) => x !== data);
      let filteredAreas = localAreas.filter((x, indexx) => indexx !== index);
      let filteredCities =
        localCities && localCities?.filter((x, indexx) => indexx !== index);

      dispatch({
        type: ADD_ADDRESSES,
        payload: filteredAddresses,
      });
      dispatch({
        type: LOCAL_CITIES,
        payload: filteredCities,
      });
      dispatch({
        type: LOCAL_AREAS,
        payload: filteredAreas,
      });
    }
  };

export const editLocalAddress = (data, index) => async (dispatch, getState) => {
  let localAddresses = getState().service.addAddresses;
};

export const lastStateValue = (value) => async (dispatch, getState) => {
  let valuee = getState().service.lastStateValue;

  dispatch({
    type: LAST_STATE_VALUE,
    payload: value,
  });
};

export const locationPopup = (type) => async (dispatch) => {
  dispatch({
    type: LOCATION_POPUP,
    payload: type,
  });
};

export const applyCoupon = (couponId, orderId) => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let body = {
      coupon_code: couponId,
      order_id: orderId,
    };

    if (couponId) {
      let res = await baseURL.post(
        "coupons/check_coupon_validity.json",
        body,
        header
      );
      if (res) {
        localStorage.setItem("couponState", true);
        dispatch({
          type: CANCEL_COUPON_DATA,
          payload: null,
        });
        dispatch({
          type: COUPON_CODE,
          payload: res.data,
        });
        dispatch({
          type: COUPON_MODAL,
          payload: false,
        });
        dispatch({
          type: SCRATCH_MODAL,
          payload: false,
        });
      }
    } else {
      dispatch({
        type: COUPON_CODE,
        couponError: "Coupon cannot be empty",
        couponType: true,
      });
    }
  } catch (error) {
    dispatch({
      type: COUPON_CODE,
      couponError: error.response.data.message,
      couponType: true,
    });
  }
};

export const removeCouponData = () => async (dispatch) => {
  dispatch({
    type: COUPON_CODE,
    payload: null,
    couponError: "",
    couponType: false,
  });
  dispatch({
    type: CANCEL_COUPON_DATA,
    payload: null,
  });
};

export const removeCouponErrorMsg = () => async (dispatch) => {
  dispatch({
    type: REMOVE_COUPON_ERROR_MSG,
    payload: "",
  });
};

export const removeCoupon = (couponId, orderId) => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let body = {
      coupon_code: couponId,
      order_id: orderId,
    };

    let res = await baseURL.post("coupons/cancel_coupon.json", body, header);
    if (res) {
      localStorage.removeItem("firstOrder");
      dispatch({
        type: COUPON_CODE,
        payload: null,
      });
      dispatch({
        type: CANCEL_COUPON_DATA,
        payload: res.data,
      });
    }
  } catch (error) {
    // dispatch({
    //   type: COUPON_CODE,
    //   couponError: error.response.data.message,
    //   couponType: true,
    // });
  }
};

export const userMilestones = () => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let res = await baseURL.get("user_milestones.json", header);
    dispatch({
      type: USER_MILESTONES,
      payload: res.data,
    });
  } catch (error) {}
};

export const redeemFreeService = (orderId) => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let body = {
      order_id: orderId,
    };

    let res = await baseURL.post(
      "user_milestones/redeem_free_service.json",
      body,
      header
    );
    if (res) {
      localStorage.setItem("freeServiceSuccess", "Free Service Redeemed");
      dispatch({
        type: REDEEMFREESERVICE,
        payload: res.data,
        freeServiceSuccess: "Free Service Redeemed",
      });
      toast.success("Free Service Redeemed");
      dispatch({
        type: CANCEL_COUPON_DATA,
        payload: null,
      });
      dispatch({
        type: COUPON_CODE,
        payload: null,
      });
    }
  } catch (error) {
    localStorage.setItem("freeServiceError", error.response.data.message);
    dispatch({
      type: REDEEMFREESERVICE,
      freeServiceError: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const removeFreeService = (orderId) => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let body = {
      order_id: orderId,
    };

    let res = await baseURL.post(
      "user_milestones/cancel_redeemed_free_service.json",
      body,
      header
    );
    if (res) {
      dispatch({
        type: REDEEMFREESERVICE,
        payload: res.data,
        freeServiceSuccess: "Removed Free Service",
      });
      toast.success("Removed Free Service");
      dispatch({
        type: CANCEL_COUPON_DATA,
        payload: null,
      });
      dispatch({
        type: COUPON_CODE,
        payload: null,
      });
    }
  } catch (error) {
    dispatch({
      type: REDEEMFREESERVICE,
      freeServiceError: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const addReferalCode = (code) => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let body = {
      referred_by: code,
    };

    let res = await baseURL.post("users/add_referral_code.json", body, header);
    if (res.status === 200) {
      dispatch({
        type: REFFERALCODE,
        refferalSuccess: "Refferal Code Added",
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: REFFERALCODE,
      refferalError: error.response.data.message,
    });
  }
};

export const reOrder = (orderId, history) => async (dispatch) => {
  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }

    let services = [];
    let addons = [];

    let res = await baseURL.get(
      "orders/re_order.json?order_id=" + orderId,
      header
    );
    if (res.status === 200) {
      dispatch({
        type: REORDER_DATA,
        payload: res.data,
      });
      if (res.data.order_services.length > 0) {
        res.data.order_services.map((service) => {
          services.push({
            id: service.service_id,
            is_deal: service.is_deal,
            discount_price: service.discounted_price,
            quantity: service.unit_count,
            service_price: service.service_price,
            service_title: service.service_title,
            service_category_title: service.service_category_title,
            service_addons: service.service_addons.map((addon) => {
              return {
                addOnQuantity: addon.unit_count,
                id: addon.service_id,
                service_id: addon.service_id,
                is_addon: true,
                service_addon_price: addon.unit_price,
                service_title: addon.service_addon_title,
              };
            }),
          });
          if (service.service_addons.length) {
            service.service_addons.map((addon) => {
              addons.push({
                addOnQuantity: addon.unit_count,
                id: addon.service_id,
                service_id: addon.service_id,
                is_addon: true,
                service_addon_price: addon.unit_price,
                service_title: addon.service_addon_title,
              });
            });
          }
        });
        dispatch({
          type: ADD_ITEM,
          payload: services,
        });
        dispatch({
          type: ADDS_ON_ITEM,
          payload: addons,
        });
        dispatch({
          type: TOTAL_PRICE_SETTER,
          payload: res.data.order_billing.actual_price,
        });
      }
      history.push("/home/checkout");
    }
  } catch (error) {
    dispatch({
      type: REORDER_DATA,
      reorderError: error.response.data.message,
    });
  }
};

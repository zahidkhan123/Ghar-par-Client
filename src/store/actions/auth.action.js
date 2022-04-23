import baseURL from "../utils/AxiosInstance";
import * as Action from "../../store/actions";
import cookie from "js-cookie";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_LOADING = "REGISTER_LOADING";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const SERVICE_DATA = "SERVICE_DATA";
export const SERVICE_DATA_ERROR = "SERVICE_DATA_ERROR";
export const VERIFICATION_SUCCESS = "VERIFICATION_SUCCESS";
export const IS_VERIFICATON = "IS_VERIFICATON";
export const VERIFICATION_ERROR = "VERIFICATION_ERROR";
export const RESEND_CODE_SUCCESS = "RESEND_CODE_SUCCESS";
export const RESEND_CODE_ERROR = "RESEND_CODE_ERROR";
export const KEEP_ME_LOGIN = "KEEP_ME_LOGIN";
export const CITY_MODAL = "CITY_MODAL";
export const GENDER_MODAL = "GENDER_MODAL";
export const FORGET_PASSOWRD = "FORGET_PASSOWRD";
export const IS_FORGET_PASSOWRD = "IS_FORGET_PASSOWRD";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const FORGET_PASSOWRD_ERROR = "FORGET_PASSOWRD_ERROR";
export const CITY_AFTER_LOGIN = "CITY_AFTER_LOGIN";
export const GUEST_USER = "GUEST_USER";
export const GUEST_USER_DATA = "GUEST_USER_DATA";
export const GUEST_USER_DATA_ERROR = "GUEST_USER_DATA_ERROR";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const LOGO_CLICKED_RELOAD = "LOGO_CLICKED_RELOAD";
export const SESSION_LOGOUT = "SESSION_LOGOUT";
export const BACK_BUTTON = "BACK_BUTTON";
export const FIRST_NOTIFICAION_ID = "FIRST_NOTIFICAION_ID";
export const AUTH_TYPE = "AUTH_TYPE";

// export const loginLoading = () => async dispatch => {
//   dispatch({ type: LOGIN_LOADING });
// };

export const loginProcess = (values, history) => async (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
    payload: true,
  });
  dispatch({
    type: "LOGIN_ERROR",
    payload: null,
  });
  dispatch({
    type: GUEST_USER,
    payload: false,
  });

  try {
    const body = {
      user: {
        country_code: "+92",
        phone: values.nmbr,
        password: values.password,
      },
      user_session: {
        device_type: "web",
        device_token: "xxx",
      },
    };
    let res = await baseURL.post("user_sessions.json", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("token", res.data.auth_token);
    localStorage.setItem("userId", res.data.id);

    dispatch({
      type: CITY_MODAL,
      payload: true,
    });
    dispatch({
      type: CITY_AFTER_LOGIN,
      payload: true,
    });

    history.push("/home");
  } catch (error) {
    if (error?.response?.data?.message == "Your Account is not Activated yet") {
      let userData = JSON.parse(localStorage.getItem("userData"));
      let guestUserData = JSON.parse(localStorage.getItem("guestUserData"));
      let guestUserDataType = localStorage.getItem("guestUserDataType");
      let code = localStorage.getItem("code");
      if (code === null) {
        code = "";
      } else {
        code = code;
      }
      if (guestUserData?.number == values?.nmbr) {
        const body = {
          user: {
            first_name: guestUserData.firstName,
            last_name: guestUserData.lastName,
            password: guestUserData.password,
            password_confirmation: guestUserData.confirm_password,
            country_code: "+92",
            phone: guestUserData.number,
            referred_by: code,
          },
        };
        let ress = await baseURL.post("registrations.json", body);

        dispatch({
          type: REGISTER_SUCCESS,
          payload: ress.data,
          number: guestUserData.number,
        });

        history.push("/verification");
      } else if (userData?.number == values?.nmbr) {
        const body = {
          user: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            password: userData.pwd,
            password_confirmation: userData.vpwd,
            country_code: "+92",
            phone: userData.number,
            referred_by: code,
          },
        };

        let res = await baseURL.post("registrations.json", body);

        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
          number: userData.number,
        });

        history.push("/verification");
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: "Your Account is not Activated yet please register again",
        });
      }
    } else {
      dispatch({
        type: LOGIN_ERROR,
        payload: error?.response?.data?.message || "",
      });
    }
  }
  dispatch({
    type: LOGIN_LOADING,
    payload: false,
  });
};

export const registerProcess = (values, history) => async (dispatch) => {
  // dispatch({
  //   type: REGISTER_ERROR,
  //   payload: null,
  // });
  let code = localStorage.getItem("code");
  if (code === null) {
    code = "";
  } else {
    code = code;
  }
  dispatch({
    type: GUEST_USER,
    payload: false,
  });

  try {
    let utm_code = cookie.get("utm_source");
    let header;
    if (utm_code) {
      header = {
        headers: {
          "Content-Type": "application/json",
          "DEVICE-TYPE": "web_app",
          REFERRER: `${utm_code}`,
        },
      };
    } else {
      header = {
        headers: {
          "Content-Type": "application/json",
          "DEVICE-TYPE": "web_app",
        },
      };
    }

    const body = {
      user: {
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.pwd,
        password_confirmation: values.vpwd,
        country_code: "+92",
        phone: values.number,
        referred_by: code,
      },
    };
    let res = await baseURL.post("registrations.json", body, header);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
      number: values.number,
    });
    localStorage.removeItem("code");
    history.push("/verification");
  } catch (error) {
    dispatch({
      type: REGISTER_ERROR,
      payload: error?.response?.data?.message,
    });
  }
};

export const isForget = (e) => async (dispatch) => {
  dispatch({
    type: IS_FORGET_PASSOWRD,
    payload: e,
  });
};

export const pinVerificationProcess =
  (val, nmbr, history, genderModal) => async (dispatch, getState) => {
    const isForgetPassword = getState().auth.isForgetPassword;
    if (isForgetPassword === true) {
      try {
        const body = {
          user: {
            phone: nmbr,
            phone_pin: val,
          },
        };

        let ress = await baseURL.post(
          "user_sessions/forgot_password_pin.json",
          body
        );
        localStorage.setItem("forgetPin", ress.data.forgot_password_code);
        localStorage.setItem("number", nmbr);
        if (ress) {
          history.push("/new-password");
        }
      } catch (error) {
        dispatch({
          type: VERIFICATION_ERROR,
          payload: error?.response?.data?.message,
        });
      }
    } else {
      try {
        const body = {
          user: {
            phone: nmbr,
            phone_pin: val,
          },
          user_session: {
            device_type: "web",
            device_token: "xxx",
          },
        };
        let res = await baseURL.post(
          "user_sessions/pin_verification.json",
          body
        );

        dispatch({
          type: VERIFICATION_SUCCESS,
          payload: res.data,
        });

        localStorage.setItem("token", res.data.auth_token);
        localStorage.setItem("userId", res.data.id);
        if (localStorage.getItem("guestVerf")) {
          // history.push("/home/services");
          history.push("/home");

          localStorage.removeItem("guestVerf");
        } else {
          history.push("/home");
        }
      } catch (error) {
        dispatch({
          type: VERIFICATION_ERROR,
          payload: error?.response?.data?.message,
        });
      }
    }
  };

export const resendCodeProcess = (number) => async (dispatch) => {
  try {
    const body = {
      user: {
        phone: number,
      },
    };

    let res = await baseURL.post("user_sessions/resend_code.json", body);

    dispatch({
      type: RESEND_CODE_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: RESEND_CODE_ERROR,
      payload: error?.response?.data?.message,
    });
  }
};

export const handleLogout = () => async (dispatch) => {
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

    let res = await baseURL.post("user_sessions/logout.json", null, header);
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: res.data.message,
    });
    dispatch({
      type: Action.EDIT_PAGE1,
      payload: false,
    });
    dispatch({
      type: Action.EDIT_PAGE2,
      payload: false,
    });
    dispatch({
      type: Action.EDIT_PAGE3,
      payload: false,
    });
    dispatch({
      type: IS_FORGET_PASSOWRD,
      payload: false,
    });
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
      type: Action.ADD_ADDRESS,
      payload: [],
    });
    dispatch({
      type: CITY_AFTER_LOGIN,
      payload: false,
    });
    dispatch({
      type: GUEST_USER,
      payload: false,
    });
    dispatch({
      type: Action.CHECKOUT,
      payload: false,
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
    // dispatch({
    //   type: Action.EDIT_ADDRESS_TYPE,
    //   payload: false,
    // });
    dispatch({
      type: Action.EDIT_ADDRESS,
      payload: null,
    });
    dispatch({
      type: Action.COUPON_CODE,
      payload: null,
      couponError: "",
      couponType: null,
    });

    localStorage.clear();
    sessionStorage.clear();
    Cache.delete();
    cookie.remove();
  } catch (error) {
    dispatch({
      type: LOGOUT_ERROR,
      payload: error?.response?.data?.message,
    });
  }
};

export const keepMeLogin = () => async (dispatch) => {
  try {
    let id = localStorage.getItem("userId");
    let cityId = localStorage.getItem("cityId");
    let gender = localStorage.getItem("gender");
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
    let res = await baseURL.get(`users/${id}.json`, header);

    dispatch({
      type: KEEP_ME_LOGIN,
      payload: res.data,
    });

    if (res) {
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
        let res2 = await baseURL.get(
          `service_categories.json?gender=${gender}&city_id=${cityId}`,
          header
        );

        dispatch({
          type: SERVICE_DATA,
          payload: res2.data,
        });
      } catch (error) {
        dispatch({
          type: SERVICE_DATA_ERROR,
          payload: error?.response?.data?.message,
        });
      }
    }
  } catch (error) {}
};

export const genderModal = (type, e) => async (dispatch) => {
  localStorage.setItem("gender", type);

  dispatch({
    type: GENDER_MODAL,
    gender: type,
    payload: false,
  });

  dispatch({
    type: CITY_MODAL,
    payload: e,
  });
  // history.push("/select-city");
};

// export const genderModal = (gender, history, cityModal) => async (dispatch) => {
//   dispatch({
//     type: GENDER_MODAL,
//     payload: false,
//   });

//   history.push("/select-city");
//   dispatch({
//     type: CITY_MODAL,
//     payload: cityModal,
//     gender: gender,
//   });
// };

export const cityModal =
  (id, city, history, lat, lang, urlPath) => async (dispatch, getState) => {
    // const gender = getState().auth.gender;
    // dispatch({
    //   type: SERVICE_DATA,
    //   payload: null,
    // });

    // dispatch({
    //   type: LOGIN_LOADING,
    //   payload: true,
    // });

    dispatch({
      type: Action.SERVICE_LOADING,
      payload: true,
    });

    const userData = getState().auth.userData;
    const guestUser = getState().auth.guestUser;
    let gender;
    if (guestUser) {
      gender = localStorage.getItem("gender");
    } else if (userData?.gender !== null) {
      gender = userData?.gender;
    } else {
      gender = localStorage.getItem("gender");
    }

    dispatch({
      type: CITY_MODAL,
      city: id,
      payload: false,
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

      let apiPath = id
        ? `service_categories.json?gender=${gender}&city_id=${id}`
        : `service_categories.json?gender=${gender}&latitude=${lat}&longitude=${lang}`;

      let res = await baseURL.get(apiPath, header);

      if (id) {
        localStorage.setItem("cityId", id);
      }
      if (city) {
        localStorage.setItem("cityName", city);
      }
      localStorage.setItem("gender", gender);

      if (res) {
        dispatch({
          type: SERVICE_DATA,
          payload: res.data,
        });

        // dispatch({
        //   type: LOGIN_LOADING,
        //   payload: false,
        // });
        dispatch({
          type: Action.SERVICE_LOADING,
          payload: false,
        });

        if (!localStorage.getItem("changeCity")) {
          // history.push("/home/services");
          history.push("/home");
        }

        if (urlPath === "/home/checkout") {
          // history.push("/home/services");
          history.push("/home");
        }
      }
    } catch (error) {
      dispatch({
        type: SERVICE_DATA_ERROR,
        payload: error?.response?.data?.message,
      });
      // dispatch({
      //   type: LOGIN_LOADING,
      //   payload: true,
      // });
      // dispatch({
      //   type: Action.SERVICE_LOADING,
      //   payload: true,
      // });
    }
    let utm_code = cookie.get("utm_source");

    const headers = {
      headers: {
        "AUTH-TOKEN": localStorage.getItem("token"),
        "Content-Type": "application/json",
        REFERRER: `${utm_code}`,
      },
    };

    let userBody = {
      user: {
        gender: gender,
      },
    };
    let res2 = await baseURL.put(
      `users/${userData?.id}.json`,
      userBody,
      headers
    );

    // try {
    //   let res = await baseURL.get(
    //     `service_categories.json?gender=${gender}&city_id=${city}`
    //   );
    // } catch (error) {}
  };

export const selectGender = (type, history) => async (dispatch, getState) => {
  const checkout = getState().service.isCheckOut;
  const submit = getState().service.isSubmit;

  dispatch({
    type: GENDER_MODAL,
    payload: type,
    // gender: e,
  });
  // if (type === false && checkout === false && submit === false)
  // history.push("/home/services/facial");
  // let abc = localStorage.getItem("url");
  // if (type === false) {
  //   history.push(abc);
  // }
};

export const forgetPassword = (number, history) => async (dispatch) => {
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
    const body = {
      user: {
        country_code: "+92",
        phone: number.nmbr,
      },
    };
    let res = await baseURL.post(
      `user_sessions/forgot_password.json`,
      body,
      header
    );
    if (res) {
      dispatch({
        type: IS_VERIFICATON,
        number: number.nmbr,
      });
      history.push("/verification");
    }
  } catch (error) {
    dispatch({
      type: FORGET_PASSOWRD_ERROR,
      payload: error?.response?.data?.message,
    });
  }
};

export const updatePassword = (values, history) => async (dispatch) => {
  try {
    let body = {
      user: {
        country_code: "+92",
        phone: localStorage.getItem("number"),
        forgot_password_code: localStorage.getItem("forgetPin"),
        password: values.password,
        password_confirmation: values.confirmpassword,
      },
      user_session: {
        device_type: "web",
        device_token: "xxx",
      },
    };

    let res = await baseURL.post("user_sessions/update_password.json", body);
    dispatch({
      type: UPDATE_PASSWORD,
    });

    localStorage.setItem("token", res.data.auth_token);
    localStorage.setItem("userId", res.data.id);
    localStorage.setItem("login", true);

    dispatch({
      type: CITY_MODAL,
      payload: true,
    });
    dispatch({
      type: CITY_AFTER_LOGIN,
      payload: true,
    });

    history.push("/home");
  } catch (error) {}
};

export const geustUserType = (e) => async (dispatch) => {
  dispatch({
    type: GUEST_USER,
    payload: e,
  });
};

export const guestUserLogin = (obj, history) => async (dispatch) => {
  let body = {
    user: {
      phone: obj.nmbr,
    },
  };
  try {
    let res = await baseURL.post("registrations/guest_user.json", body);
    localStorage.setItem("token", res.data.auth_token);
    localStorage.setItem("userId", res.data.id);

    dispatch({
      type: GUEST_USER_DATA,
      payload: res.data,
    });
    dispatch({
      type: GUEST_USER_DATA_ERROR,
      payload: false,
    });

    if (res) {
      history.push("/home");
    }
  } catch (error) {
    dispatch({
      type: GUEST_USER_DATA_ERROR,
      error: error?.response?.data?.message,
      payload: true,
    });
  }
};

export const guestUserRegistrationProcess =
  (data, history) => async (dispatch, getState) => {
    const guestUserData = getState().auth.guestUserData;

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

      const body = {
        is_pin_sent: true,
        user: {
          first_name: data.firstName,
          last_name: data.lastName,
          cnic: data.cnic,
          password: data.password,
          password_confirmation: data.confirm_password,
        },
      };
      let res = await baseURL.put(
        `users/${guestUserData.id}.json`,
        body,
        header
      );

      dispatch({
        type: GUEST_USER_DATA,
        payload: res.data,
        verification: true,
      });
      if (res) {
        history.replace("/verification");
      }
    } catch (error) {
      dispatch({
        type: Action.PROFILE_UPDATE_ERROR,
        payload: error?.response?.data?.message,
      });
    }
  };

export const guestUserRegistrationSuccess = (v, n, h) => async (dispatch) => {
  try {
    const body = {
      user: {
        phone: n,
        phone_pin: v,
      },
      user_session: {
        device_type: "web",
        device_token: "xxx",
      },
    };
    let res = await baseURL.post("/user_sessions/pin_verification.json", body);

    dispatch({
      type: VERIFICATION_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: GUEST_USER,
      payload: false,
    });

    dispatch({
      type: Action.DISCOUNT_MODAL,
      payload: false,
    });

    h.replace("/home/order-detail");
  } catch (error) {
    dispatch({
      type: VERIFICATION_ERROR,
      payload: error?.response?.data?.message,
    });
  }
};

export const userExistError = (e) => async (dispatch) => {
  dispatch({
    type: GUEST_USER_DATA_ERROR,
    payload: e,
  });
};

export const logoClickedReload = (type) => async (dispatch) => {
  dispatch({
    type: LOGO_CLICKED_RELOAD,
    payload: type,
  });
};

export const sessionLogout = (history) => async (dispatch) => {
  // history.replace("/");
  // alert("session timeout");
};

export const backButton = (type) => async (dispatch) => {
  dispatch({
    type: BACK_BUTTON,
    payload: type,
  });
};

export const firstNotificationId = (id) => async (dispatch) => {
  dispatch({
    type: FIRST_NOTIFICAION_ID,
    payload: id,
  });
};

export const authType = () => async (dispatch) => {
  dispatch({
    type: AUTH_TYPE,
    payload: false,
  });
};

export const linktracking = () => async (dispatch) => {
  let utm_code = cookie.get("utm_source");
  if (utm_code) {
    let res = await baseURL.get(
      `walee_trackings/link_tracking.json?referrer=${utm_code}`
    );
    console.log(res);
  }
};

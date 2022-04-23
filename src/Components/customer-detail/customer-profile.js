import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../../images/profile.png";
import EditImage from "../../images/ic_edit.svg";
import Finder from "../../images/iconfinder.svg";
import EditGrey from "../../images/ic_edit_grey.svg";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Plus from "../../images/plus.svg";
import * as Action from "../../store/actions";
import AddAddress from "../add-address";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import EditGreyImg from "../../images/Edit.svg";
import Delete from "../../images/Delete.svg";
import Loader from "react-loader-spinner";
import BackArrow from "../../images/left_arrow.svg";
import Topinfobar from "./../fixed-top";
import { history } from "../../index";
import { toast, ToastContainer } from "react-toastify";

toast.configure();

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
    reset: reset2,
  } = useForm({
    mode: "onSubmit",
  });
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    errors: errors3,
    reset: reset3,
  } = useForm({
    mode: "onSubmit",
  });
  const {
    register: register4,
    handleSubmit: handleSubmit4,
    errors: errors4,
    reset: reset4,
  } = useForm({
    mode: "onSubmit",
  });

  const [numberError, setNumberError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [number, setNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [cnic, setCnic] = useState("");
  const [gender, setGender] = useState("");
  const [ageLimit, setAgeLimit] = useState("");
  const [skinType, setSkinType] = useState("");
  const [hairType, setHairType] = useState("");
  const [hairLength, setHairLength] = useState("");
  const [hairTexture, setHairTexture] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [reload, setReload] = useState(false);
  const [address1, setAddress1] = useState();
  const [editReload, setEditReload] = useState();
  const [condition, setCondition] = useState(true);
  const [memberShipCode, setMemberShipCode] = useState(null);
  const [cnicValue, setCnicValue] = useState(null);
  const [profilePasswordError, setProfilePasswordError] = useState(null);

  // const [addresses, setAddresses] = useState([]);

  const [ageLimitOptions, setAgeLimitOptions] = useState([
    "Below 18",
    "18 - 24",
    "25 - 34",
    "35 - 44",
    "45 - 60",
    "60+",
  ]);

  const data = useSelector(({ auth }) => auth.userData);
  const page1 = useSelector(({ service }) => service.editPage1);
  const page2 = useSelector(({ service }) => service.editPage2);
  const page3 = useSelector(({ service }) => service.editPage3);
  const page4 = useSelector(({ service }) => service.editPage4);

  const ee = useSelector(({ service }) => service.editAddress);
  const pageReload = useSelector(({ service }) => service.addressPageReload);
  const defaultLoading = useSelector(({ service }) => service.defaultLoading);
  const localAddresses = useSelector(({ service }) => service.addAddresses);
  const localCities = useSelector(({ service }) => service.localCities);
  const localAreas = useSelector(({ service }) => service.localAreas);

  const profileUpdateError = useSelector(
    ({ service }) => service.profileUpdateError
  );

  const addressModal = useSelector(({ service }) => service.isAddress);
  const address = useSelector(({ service }) => service.address);

  const editAddressPage = useSelector(({ service }) => service.editAddressPage);
  const passwordError = useSelector(
    ({ service }) => service.profilePasswordError
  );
  const successMsg = useSelector(({ service }) => service.profileSuccessMsg);
  const lastStateValue = useSelector(({ service }) => service.lastStateValue);

  let cityId = localStorage.getItem("cityId");

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  useEffect(() => {
    document.title = "Profile | GharPar";
  }, []);

  // useEffect(() => {
  //   if (passwordError) {
  //     notify(passwordError);
  //     dispatch({
  //       type: Action.PROFILE_PASSWORD_ERROR,
  //       payload: null,
  //     });
  //   }
  // }, [passwordError]);

  useEffect(() => {
    dispatch({
      type: Action.PROFILE_SUCCESS_MSG,
      payload: null,
    });
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (successMsg == true) {
        dispatch({
          type: Action.PROFILE_SUCCESS_MSG,
          payload: null,
        });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (passwordError) {
        dispatch({
          type: Action.PROFILE_PASSWORD_ERROR,
          payload: null,
        });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [passwordError]);

  // useEffect(() => {
  //   if (successMsg) {
  //     notify(successMsg);
  //     dispatch({
  //       type: Action.PROFILE_SUCCESS_MSG,
  //       payload: null,
  //     });
  //   }
  // }, [successMsg]);

  const notify = (msg) => {
    if (passwordError) {
      toast.error(msg);
    } else if (successMsg) {
      toast.success(msg);
    }
  };

  useEffect(() => {
    dispatch(Action.Addresses());
    dispatch(Action.removeCouponData());
  }, []);

  window.onbeforeunload = function (e) {
    e.preventDefault();

    // history.push("/home/services");

    dispatch(Action.lastStateValue(true));
  };

  useEffect(() => {
    dispatch(Action.editPage1(false));
    dispatch(Action.editPage2(false));
    dispatch(Action.editPage3(false));
    dispatch(Action.editPage4(false));
    dispatch({
      type: Action.ADD_ADDRESSES,
      payload: [],
    });
    dispatch({
      type: Action.LOCAL_AREAS,
      payload: [],
    });
    dispatch({
      type: Action.LOCAL_CITIES,
      payload: [],
    });
  }, []);

  useEffect(() => {
    let userGender = localStorage.getItem("gender");
    setGender(userGender);
    if (data) {
      setFirstName(data?.first_name);
      setLastName(data?.last_name);
      setNumber(data?.phone);
      setCnic(data?.cnic);
      setCnicValue(data?.cnic);
      setAgeLimit(data?.age_range);
      setHairTexture(data?.user_details?.hair_texture);
      setHairLength(data?.user_details?.hair_length);
      setHairType(data?.user_details?.hair_type);
      setSkinType(data?.user_details?.skin_type);
      setMemberShipCode(data?.membership_code);
      // setGender(data?.gender);
      setProfilePicture(
        data?.profile_picture ? data?.profile_picture : Profile
      );
    }
  }, [data, reload]);

  // useEffect(() => {
  //   let filterAddress = address.filter((x) => x.city_id == cityId);
  //   setAddresses(filterAddress);
  // }, [address]);

  useEffect(() => {
    dispatch(Action.Addresses());
  }, [editAddressPage, address1, reload, pageReload]);

  useEffect(() => {
    if (address.length > 0) {
      address.map((x) => {
        if (x.is_default) {
          setAddress1(x.id);
        }
      });
    }
  }, [address]);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      dispatch(Action.updateProfilePicture(file));
    }
  };

  const pageOneData = (values) => {
    let body;
    if (values.cnic.length === 15 || values.cnic.length === 13) {
      body = {
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          country_code: "+92",
          phone: number,
          cnic: values.cnic,
          age_range: values.ageLimit,
          gender: values.gender,
        },
      };
      dispatch(Action.updateProfile(body));
      // dispatch(Action.editPage1(!page1));
      return <Topinfobar name={values.firstName} />;
    } else {
      setNumberError("CNIC number must be 13 characters");
    }
  };
  const pageTwoData = (values) => {
    let body = {
      user: {
        user_details: {
          skin_type: values.skinType,
          hair_type: values.hairType,
          hair_length: values.hairLength,
          hair_texture: values.hairTexture,
        },
      },
    };
    dispatch(Action.updateProfile(body));
    // dispatch(Action.editPage2(false, false));
    // dispatch(Action.editPage3(false, false));
    setCondition(true);
  };
  const pageThreeData = (values) => {
    // let body = {
    //   user: {
    //     user_details: {
    //       skin_type: values.skinType,
    //       hair_type: values.hairType,
    //       hair_length: values.hairLength,
    //       hair_texture: values.hairTexture,
    //     },
    //   },
    // };
    // dispatch(Action.updateProfile(body));
    // dispatch(Action.editPage3(false, !page3));

    setReload(!reload);
    setCondition(true);
    dispatch(Action.addMultipleAddress());
    document.querySelector("#addresses").disabled = true;
    // document.getElementById('submitbutton').disabled = true
  };
  const pageFourData = (values) => {
    let body = {
      user: {
        old_password: values.oldPassword,
        password: values.newPassword,
        password_confirmation: values.verifyNewPassword,
      },
    };
    dispatch(Action.updateProfilePassword(body));
    // dispatch(Action.editPage2(false, false));
    // dispatch(Action.editPage3(false, false));
    setCondition(true);
  };

  return (
    <div className="container pb-5">
      {successMsg && (
        <div class="mt-4">
          <div
            style={{
              opacity: 1,
              transition: "opacity 2s linear",
            }}
            class="alert alert-success text-center"
            role="alert"
          >
            <span>Profile Updated</span>
          </div>
        </div>
      )}
      {passwordError && (
        <div class="mt-4">
          <div class="alert alert-danger text-center" role="alert">
            <span>{passwordError}</span>
          </div>
        </div>
      )}

      <div className="back-btn">
        <img
          onClick={() => {
            dispatch(Action.logoClickedReload(false));
            localStorage.removeItem("page");
            history.push("/home/services");
          }}
          src={BackArrow}
        />
      </div>
      <section className="customer-profile ">
        <div className="profile-img">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              style={{
                display: "none",
              }}
            />
            {profilePicture ? (
              <img
                src={profilePicture}
                ref={uploadedImage}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "acsolute",
                }}
                alt="profile-image"
              />
            ) : (
              <Loader
                type="Circles"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            )}

            {page1 || page2 || page3 || page4 ? (
              <span className="edit-image">
                <img
                  onClick={() => imageUploader.current.click()}
                  src={EditImage}
                  alt="Edit-image"
                />
              </span>
            ) : null}
          </div>

          <label>ID: {memberShipCode}</label>
        </div>
        <div className="customer-profile-dtl">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item ">
              <span
                className=" active tabs"
                id="pills-personal-tab"
                data-toggle="pill"
                href="#pills-personal"
                role="tab"
                aria-controls="pills-personal"
                aria-selected="true"
                onClick={() => {
                  setPageNo(1);
                  reset4({
                    oldPassword: "",
                    newPassword: "",
                    verifyNewPassword: "",
                  });
                  // dispatch(Action.editPage2(false, false));
                  // dispatch(Action.editPage3(false, false));
                }}
              >
                Personal Profile
              </span>
            </li>
            <li className="nav-item ">
              <span
                className="tabs"
                id="pills-beauty-tab"
                data-toggle="pill"
                href="#pills-beauty"
                role="tab"
                aria-controls="pills-beauty"
                aria-selected="false"
                onClick={() => {
                  setPageNo(2);
                  reset4({
                    oldPassword: "",
                    newPassword: "",
                    verifyNewPassword: "",
                  });
                  // dispatch(Action.editPage2(false, false));
                  // dispatch(Action.editPage3(false, false));
                }}
              >
                Beauty Profile
              </span>
            </li>
            <li className="nav-item ">
              <span
                className="tabs"
                id="pills-address-tab"
                data-toggle="pill"
                href="#pills-address"
                role="tab"
                aria-controls="pills-address"
                aria-selected="false"
                onClick={() => {
                  setPageNo(3);
                  reset4({
                    oldPassword: "",
                    newPassword: "",
                    verifyNewPassword: "",
                  });
                  // dispatch(Action.editPage1(false));
                  // dispatch(Action.editPage2(false, false));
                  // dispatch(Action.editPage3(false, false));
                }}
              >
                Address
              </span>
            </li>
            <li className="nav-item ">
              <span
                className="tabs"
                onClick={() => {
                  setPageNo(4);
                  // dispatch(Action.editPage1(false));
                  // dispatch(Action.editPage2(false, false));
                  // dispatch(Action.editPage3(false, false));
                }}
                id="pills-password-tab"
                data-toggle="pill"
                href="#pills-password"
                role="tab"
                aria-controls="pills-password"
                aria-selected="false"
              >
                Password
              </span>
            </li>

            <div className="edit-profile-btn">
              {page1 || page2 || page3 || page4 ? (
                <div class="adson-btn text-right customer-profile-btn">
                  {/* <span
                    onClick={() => {
                      dispatch(Action.editPage1(!page1));
                    }}
                    class="cancel-btn"
                  >
                    Cancel
                  </span>
                  <button type="submit4" class="done-btn">
                    Save Changes
                  </button> */}
                </div>
              ) : (
                <span className="edit-profile">
                  <img
                    onClick={() => {
                      if (pageNo === 1) {
                        dispatch(Action.editPage1(!page1));
                        setCondition(false);
                      } else if (pageNo === 2) {
                        dispatch(Action.editPage2(false, !page2));
                        setCondition(false);
                      } else if (pageNo === 3) {
                        dispatch(Action.editPage3(false, !page3));
                        setCondition(false);
                      } else if (pageNo === 4) {
                        dispatch(Action.editPage4(false, !page4));
                        setCondition(false);
                      }
                    }}
                    src={EditGrey}
                    alt="Edit-image"
                  />
                </span>
              )}
            </div>

            {/* <span className="edit-profile">
              <img
                onClick={() => {
                  if (pageNo === 1) {
                    dispatch(Action.editPage1(!page1));
                  } else if (pageNo === 2) {
                    dispatch(Action.editPage2(false, !page2));
                  } else if (pageNo === 3) {
                    dispatch(Action.editPage3(false, !page3));
                  }
                }}
                src={EditGrey}
                alt="Edit-image"
              />
            </span> */}
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-personal"
              role="tabpanel"
              aria-labelledby="pills-personal-tab"
            >
              <form
                onSubmit={handleSubmit(pageOneData)}
                className="profile-form"
              >
                <div className="row justify-content-between m-0">
                  <div className=" profile-col-width f-name col p-0">
                    <div className="form-group">
                      <label for="" className="">
                        First Name
                      </label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <input
                            type="text"
                            name="firstName"
                            // value={firstName}
                            defaultValue={firstName}
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            className="profile-input-display"
                            ref={register({
                              required: "First Name is Required",
                              pattern: {
                                value: /^([a-zA-Z0-9.]+|[a-zA-Z0-9.]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/,
                                message: "Invalid Name",
                              },
                            })}
                            style={{
                              border: errors.firstName
                                ? "1px solid red "
                                : "1px solid #E2DCD9",
                              outline: errors.firstName && "none",
                            }}
                          />
                          {errors.firstName && (
                            <div
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              {errors.firstName.message}
                            </div>
                          )}
                        </>
                      ) : (
                        <input
                          value={firstName}
                          placeholder="First Name"
                          className="profile-input-display"
                          style={{
                            backgroundColor: "#D3D3D3",
                            color: "transparent",
                            "text-shadow": "0 0 0 black",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className=" profile-col-width l-name col pr-0">
                    <div className="form-group">
                      <label for="" className="">
                        Last Name
                      </label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <input
                            name="lastName"
                            ref={register({
                              required: "Last Name is Required",
                              pattern: {
                                // value: /^[A-Za-z]+$/,
                                value: /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/,
                                message: "Invalid Last Name",
                              },
                            })}
                            type="text"
                            defaultValue={lastName}
                            // value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="last Name"
                            className="profile-input-display"
                            // onChange={() => setRegisterErrorMsg(null)}
                            style={{
                              border: errors.lastName
                                ? "1px solid red "
                                : "1px solid #E2DCD9",
                              outline: errors.lastName && "none",
                            }}
                          />
                          {errors.lastName && (
                            <div
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              {errors.lastName.message}
                            </div>
                          )}
                        </>
                      ) : (
                        <input
                          value={lastName}
                          placeholder="Last Name"
                          className="profile-input-display"
                          style={{
                            backgroundColor: "#D3D3D3",
                            color: "transparent",
                            "text-shadow": "0 0 0 black",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between m-0">
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Phone Number
                      </label>
                      {/* <input
                        type="phone"
                        placeholder="+92 300 123 4567"
                        className="profile-input-display"
                      /> */}
                      <input
                        name="number"
                        ref={register}
                        value={`+92${number}`}
                        className="profile-input-display"
                        style={{
                          backgroundColor:
                            page1 || page2 || page3 || page4 ? "" : "#D3D3D3",
                          color: "transparent",
                          "text-shadow": "0 0 0 black",
                        }}
                      />
                    </div>
                  </div>
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        CNIC
                      </label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          {cnic &&
                          (cnic?.length === 13 || cnic?.length === 15) ? (
                            <InputMask
                              name="cnic"
                              placeholder="35202-1234567-8"
                              className="profile-input-display"
                              mask="99999-9999999-9"
                              maskChar={null}
                              value={`${cnic}`}
                              // onChange={(e) => {
                              //   setNumberError("");
                              //   setCnic(e.target.value);
                              // }}
                              style={{
                                border: errors.cnic
                                  ? "1px solid red"
                                  : "1px solid #E2DCD9",
                                outline: errors.cnic && "none",
                                backgroundColor:
                                  page1 || page2 || page3 || page4
                                    ? ""
                                    : "#D3D3D3",
                                color: "transparent",
                                "text-shadow": "0 0 0 black",
                              }}
                            />
                          ) : (
                            <InputMask
                              name="cnic"
                              placeholder="35202-1234567-8"
                              className="profile-input-display"
                              mask="99999-9999999-9"
                              maskChar={null}
                              value={`${cnicValue}`}
                              onChange={(e) => {
                                setNumberError("");
                                setCnicValue(e.target.value);
                                dispatch(Action.profileUpdateError(null));
                              }}
                              style={{
                                border: errors.cnic
                                  ? "1px solid red"
                                  : "1px solid #E2DCD9",
                                outline: errors.cnic && "none",
                              }}
                            />
                          )}
                          {/* <InputMask
                            name="cnic"
                            placeholder="35202-1234567-8"
                            className="profile-input-display"
                            mask="99999-9999999-9"
                            maskChar={null}
                            value={`${cnic}`}
                            // onChange={(e) => {
                            //   setNumberError("");
                            //   setCnic(e.target.value);
                            // }}
                            style={{}}
                            style={{
                              border: errors.cnic
                                ? "1px solid red"
                                : "1px solid #E2DCD9",
                              outline: errors.cnic && "none",
                              backgroundColor:
                                page1 || page2 || page3 || page4? "" : "#D3D3D3",
                              color: "transparent",
                              "text-shadow": "0 0 0 black",
                            }}
                          /> */}
                          <input
                            name="cnic"
                            type="text"
                            value={cnic ? cnic : cnicValue}
                            ref={register({ required: "CNIC Is Required" })}
                            style={{ display: "none" }}
                          />
                          {errors.cnic && (
                            <div
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              {errors.cnic.message}
                            </div>
                          )}
                          {profileUpdateError && (
                            <div
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              {profileUpdateError}
                            </div>
                          )}
                          {numberError && (
                            <div
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              {numberError}
                            </div>
                          )}
                        </>
                      ) : (
                        <input
                          value={cnic}
                          disabled
                          placeholder="35202 1234567 8"
                          className="profile-input-display"
                          style={{
                            backgroundColor: "#D3D3D3",
                            color: "transparent",
                            "text-shadow": "0 0 0 black",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between m-0">
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Gender
                      </label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <div className="select-people">
                            <select
                              name="gender"
                              className="form-control profile-input-display"
                              id="exampleFormControlSelect1"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              style={{
                                backgroundColor:
                                  page1 || page2 || page3 || page4
                                    ? ""
                                    : "#D3D3D3",
                              }}
                              ref={register({
                                required: "Gender is required",
                              })}
                            >
                              <option value="Male" disabled>
                                Male
                              </option>
                              <option value="Female" disabled>
                                Female
                              </option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="select-people">
                            <select
                              className="form-control profile-input-display"
                              id="exampleFormControlSelect1"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              style={{
                                backgroundColor:
                                  page1 || page2 || page3 || page4
                                    ? ""
                                    : "#D3D3D3",
                              }}
                            >
                              <option value="Male" disabled>
                                Male
                              </option>
                              <option value="Female" disabled>
                                Female
                              </option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Age Limit
                      </label>
                      {/* <input
                        type="password"
                        placeholder="25 - 34"
                        className="profile-input-display"
                      /> */}
                      <div className="select-people">
                        <select
                          name="ageLimit"
                          className="form-control profile-input-display"
                          id="exampleFormControlSelect1"
                          onChange={(e) => setAgeLimit(e.target.value)}
                          ref={register({
                            required: "Age Limit is Required",
                          })}
                          value={ageLimit}
                          style={{
                            backgroundColor:
                              page1 || page2 || page3 || page4 ? "" : "#D3D3D3",
                          }}
                        >
                          {ageLimitOptions.map((y) => {
                            return page1 || page2 || page3 || page4 ? (
                              <option value={y}>{y}</option>
                            ) : (
                              <>
                                <option disabled value={y}>
                                  {y}
                                </option>
                              </>
                            );
                          })}
                        </select>
                        {errors.ageLimit && (
                          <div
                            style={{
                              width: "100%",
                              textAlign: "left",
                              color: "red",
                            }}
                          >
                            {errors.ageLimit.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col p-0">
                    <div className="address-wrap">
                      {address &&
                        address.map((x, index) => {
                          return (
                            <>
                              {x.is_default && (
                                <div className="address">
                                  <label>Address</label>
                                  <div
                                    className="form-group"
                                    style={{
                                      backgroundColor:
                                        page1 || page2 || page3 || page4
                                          ? ""
                                          : "#D3D3D3",
                                    }}
                                  >
                                    <div className="text-address">
                                      <span>Address 1</span>

                                      <span className="default-address-btn">
                                        Default Address
                                      </span>
                                      {/* <div className="mt-2 ">
                                        {x.address_1 +
                                          ", " +
                                          x.area.area +
                                          ", "}
                                        {x.city.city_name}
                                      </div> */}
                                      <div className="mt-2 address-wrapp">
                                        {x.address_1 ? x.address_1 : " "}
                                        {", " + x.area.area + ", "}
                                        {x.city.city_name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {page1 || page2 || page3 || page4 ? (
                  <div class="adson-btn text-right customer-profile-btn">
                    <span
                      onClick={() => {
                        dispatch(Action.profileUpdateError(null));
                        dispatch(Action.editPage1(!page1));
                        dispatch(Action.editPage2(false, false));
                        dispatch(Action.editPage3(false, false));
                        dispatch(Action.editPage4(false, false));
                        setReload(!reload);
                        setCondition(true);
                      }}
                      style={{ cursor: "pointer" }}
                      class="cancel-btn"
                    >
                      Cancel
                    </span>
                    <button type="submit4" class="done-btn">
                      Save Changes
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-beauty"
              role="tabpanel"
              aria-labelledby="pills-beauty-tab"
            >
              <form
                onSubmit={handleSubmit2(pageTwoData)}
                className="beauty-form"
              >
                <div className="row justify-content-between m-0">
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Skin Type
                      </label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <div className="select-people">
                            <select
                              name="skinType"
                              className="form-control profile-input-display"
                              id="exampleFormControlSelect1"
                              onChange={(e) => setSkinType(e.target.value)}
                              ref={register2({
                                required: "Skin Type is Required",
                              })}
                              value={skinType}
                            >
                              <option value="Dry">Dry</option>
                              <option value="Oily">Oily</option>
                              <option value="Combination">Combination</option>
                              <option value="Acne Prone">Acne Prone</option>
                            </select>
                            {errors2.skinType && (
                              <div
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  color: "red",
                                }}
                              >
                                {errors2.skinType.message}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="select-people">
                          <select
                            className="form-control profile-input-display"
                            id="exampleFormControlSelect1"
                            value={skinType}
                            style={{
                              backgroundColor:
                                page1 || page2 || page3 || page4
                                  ? ""
                                  : "#D3D3D3",
                            }}
                          >
                            {skinType ? (
                              <>
                                {" "}
                                <option disabled value="Dry">
                                  Dry
                                </option>
                                <option disabled value="Oily">
                                  Oily
                                </option>
                                <option disabled value="Combination">
                                  Combination
                                </option>
                                <option disabled value="Acne Prone">
                                  Acne Prone
                                </option>
                              </>
                            ) : (
                              <>
                                <option disabled selected>
                                  Select Skin Type
                                </option>
                                <option disabled value="Dry">
                                  Dry
                                </option>
                                <option disabled value="Oily">
                                  Oily
                                </option>
                                <option disabled value="Combination">
                                  Combination
                                </option>
                                <option disabled value="Acne Prone">
                                  Acne Prone
                                </option>
                              </>
                            )}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Hair Type
                      </label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <div className="select-people">
                            <select
                              name="hairType"
                              className="form-control profile-input-display"
                              id="exampleFormControlSelect1"
                              onChange={(e) => setHairType(e.target.value)}
                              ref={register2({
                                required: "Skin Type is Required",
                              })}
                              value={hairType}
                            >
                              <option value="Fine">Fine</option>
                              <option value="Dry">Dry</option>
                              <option value="Oily">Oily</option>
                            </select>
                            {errors2.hairType && (
                              <div
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  color: "red",
                                }}
                              >
                                {errors2.hairType.message}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="select-people">
                          <select
                            className="form-control profile-input-display"
                            id="exampleFormControlSelect1"
                            value={hairType}
                            style={{
                              backgroundColor:
                                page1 || page2 || page3 || page4
                                  ? ""
                                  : "#D3D3D3",
                            }}
                          >
                            {hairType ? (
                              <>
                                {" "}
                                <option disabled value="Fine">
                                  Fine
                                </option>
                                <option disabled value="Dry">
                                  Dry
                                </option>
                                <option disabled value="Oily">
                                  Oily
                                </option>
                              </>
                            ) : (
                              <>
                                <option disabled selected>
                                  Select Hair Type
                                </option>
                                <option disabled value="Fine">
                                  Fine
                                </option>
                                <option disabled value="Dry">
                                  Dry
                                </option>
                                <option disabled value="Oily">
                                  Oily
                                </option>
                              </>
                            )}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between m-0">
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Hair Length
                      </label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <div className="select-people">
                            <select
                              name="hairLength"
                              className="form-control profile-input-display"
                              id="exampleFormControlSelect1"
                              onChange={(e) => setHairLength(e.target.value)}
                              ref={register2({
                                required: "Skin Type is Required",
                              })}
                              value={hairLength}
                            >
                              <option value="Short">Short</option>
                              <option value="Upto shoulder">
                                Upto shoulder
                              </option>
                              <option value="Below shoulder">
                                Below shoulder
                              </option>
                              <option value="Upto waist">Upto waist</option>
                              <option value="Below waist">Below waist</option>
                            </select>
                            {errors2.hairLength && (
                              <div
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  color: "red",
                                }}
                              >
                                {errors2.hairLength.message}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="select-people">
                          <select
                            className="form-control profile-input-display"
                            id="exampleFormControlSelect1"
                            value={hairLength}
                            style={{
                              backgroundColor:
                                page1 || page2 || page3 || page4
                                  ? ""
                                  : "#D3D3D3",
                            }}
                          >
                            {hairLength ? (
                              <>
                                <option disabled value="Short">
                                  Short
                                </option>
                                <option disabled value="Upto shoulder">
                                  Upto shoulder
                                </option>
                                <option disabled value="Below shoulder">
                                  Below shoulder
                                </option>
                                <option disabled value="Upto waist">
                                  Upto waist
                                </option>
                                <option disabled value="Below waist">
                                  Below waist
                                </option>
                              </>
                            ) : (
                              <>
                                <option disabled selected>
                                  Select Hair Length
                                </option>
                                <option disabled value="Short">
                                  Short
                                </option>
                                <option disabled value="Upto shoulder">
                                  Upto shoulder
                                </option>
                                <option disabled value="Below shoulder">
                                  Below shoulder
                                </option>
                                <option disabled value="Upto waist">
                                  Upto waist
                                </option>
                                <option disabled value="Below waist">
                                  Below waist
                                </option>
                              </>
                            )}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Hair Texture
                      </label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <div className="select-people">
                            <select
                              name="hairTexture"
                              className="form-control profile-input-display"
                              id="exampleFormControlSelect1"
                              onChange={(e) => setHairTexture(e.target.value)}
                              ref={register2({
                                required: "Skin Type is Required",
                              })}
                              value={hairTexture}
                            >
                              <option value="Long">Long</option>
                              <option value="Medium">Medium</option>
                              <option value="Small">Small</option>
                            </select>
                            {errors2.hairTexture && (
                              <div
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  color: "red",
                                }}
                              >
                                {errors2.hairTexture.message}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="select-people">
                          <select
                            className="form-control profile-input-display"
                            id="exampleFormControlSelect1"
                            value={hairTexture}
                            style={{
                              backgroundColor:
                                page1 || page2 || page3 || page4
                                  ? ""
                                  : "#D3D3D3",
                            }}
                          >
                            {hairTexture ? (
                              <>
                                <option disabled>Long</option>
                                <option disabled>Medium</option>
                                <option disabled>Small</option>
                              </>
                            ) : (
                              <>
                                <option disabled selected>
                                  Select Hair Texture
                                </option>
                                <option disabled>Long</option>
                                <option disabled>Medium</option>
                                <option disabled>Small</option>
                              </>
                            )}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {page1 || page2 || page3 || page4 ? (
                  <div class="adson-btn text-right customer-profile-btn">
                    <span
                      onClick={() => {
                        // dispatch(Action.editPage2(!page2));
                        dispatch(Action.editPage2(false, false));
                        dispatch(Action.editPage3(false, false));
                        dispatch(Action.editPage4(false, false));
                        setReload(!reload);
                        setCondition(true);
                      }}
                      class="cancel-btn"
                      style={{ cursor: "pointer" }}
                    >
                      Cancel
                    </span>
                    <button type="submit5" class="done-btn">
                      Save Changes
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-address"
              role="tabpanel"
              aria-labelledby="pills-address-tab"
            >
              <form
                onSubmit={handleSubmit(pageThreeData)}
                className="edit-address-form"
              >
                <div className="row m-0">
                  <div className="col p-0">
                    <div className="address-wrap">
                      <div className="address  w-100">
                        {defaultLoading ? (
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
                            {address &&
                              address.length > 0 &&
                              address.map((x, index) => {
                                return (
                                  <>
                                    <div
                                      class="radiobtn text-address radio-inline square"
                                      id="myElement"
                                      style={{
                                        backgroundColor:
                                          page1 || page2 || page3 || page4
                                            ? ""
                                            : "#D3D3D3",
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        id={index}
                                        name="radio-button"
                                        // value={x.value}
                                        checked={address1 === x.id}
                                        onClick={() => {
                                          setAddress1(x.id);
                                          // setReload(!reload);
                                        }}
                                      />
                                      <label
                                        for={x.id}
                                        onClick={() => {
                                          if (condition) {
                                            dispatch(
                                              Action.updateDefaultAddress(
                                                x.id,
                                                true,
                                                !pageReload,
                                                true,
                                                x
                                              )
                                            );
                                          }
                                        }}
                                      >
                                        <div className="form-group">
                                          <div className="text-address">
                                            <span>Address {index + 1}</span>
                                            {x.is_default ? (
                                              <span className="default-address-btn">
                                                Default Address
                                              </span>
                                            ) : (
                                              <span className="default-address-disabled-btn">
                                                Make it default
                                              </span>
                                            )}
                                            <div className="mt-2 address-wrapp">
                                              {x.address_1 ? x?.address_1 : " "}
                                              {", " + x?.area?.area + ", "}
                                              {x?.city?.city_name}
                                            </div>
                                            {page3 ||
                                            page2 ||
                                            page1 ||
                                            page4 ? (
                                              <>
                                                <img
                                                  src={EditGreyImg}
                                                  onClick={() => {
                                                    dispatch(
                                                      Action.editAddressType(
                                                        !editAddressPage
                                                      )
                                                    );
                                                    dispatch(
                                                      Action.editAddress(x.id)
                                                    );
                                                    dispatch(
                                                      Action.addressModal(
                                                        !addressModal
                                                      )
                                                    );
                                                    localStorage.setItem(
                                                      "isDefaultAddress",
                                                      x.is_default
                                                    );
                                                    localStorage.setItem(
                                                      "editMod",
                                                      true
                                                    );
                                                  }}
                                                  alt="edit"
                                                  className="edit-img"
                                                />
                                                <img
                                                  onClick={() => {
                                                    dispatch(
                                                      Action.deleteAddress(x.id)
                                                    );
                                                    setReload(!reload);
                                                  }}
                                                  src={Delete}
                                                  alt="delete"
                                                  className="delete-img"
                                                />
                                              </>
                                            ) : null}
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                  </>
                                );
                              })}
                          </>
                        )}
                        {localAddresses &&
                          localAddresses.length > 0 &&
                          localAddresses.map((x, index) => {
                            return (
                              <>
                                <div
                                  class="radiobtn text-address radio-inline square"
                                  id="myElement"
                                  style={{
                                    backgroundColor:
                                      page1 || page2 || page3 || page4
                                        ? ""
                                        : "#D3D3D3",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    id={index}
                                    name="radio-button"
                                    // value={x.value}
                                    // checked={address1 === x.id}
                                    onClick={() => {
                                      // setAddress1(x.id);
                                      // setReload(!reload);
                                    }}
                                  />
                                  <label
                                    for={x.id}
                                    // onClick={() => {
                                    //   if (condition) {
                                    //     dispatch(
                                    //       Action.updateDefaultAddress(
                                    //         x.id,
                                    //         true,
                                    //         !pageReload,
                                    //         true,
                                    //         x
                                    //       )
                                    //     );
                                    //   }
                                    // }}
                                  >
                                    <div className="form-group">
                                      <div className="text-address">
                                        <span>Address {index + 1}</span>
                                        {x.is_default ? (
                                          <span className="default-address-btn">
                                            Default Address
                                          </span>
                                        ) : (
                                          <span className="default-address-disabled-btn">
                                            Make it default
                                          </span>
                                        )}
                                        <div className="mt-2 address-wrapp">
                                          {x.detail ? x.detail : " "}
                                          {", " + localAreas &&
                                            localAreas.length > 0 &&
                                            localAreas[index] + ", "}
                                          {localCities &&
                                            localCities.length > 0 &&
                                            localCities[index]}
                                        </div>
                                        {page3 || page2 || page1 || page4 ? (
                                          <>
                                            {/* <img
                                              src={EditGreyImg}
                                              onClick={() => {
                                                localStorage.setItem(
                                                  "editData",
                                                  JSON.stringify(x)
                                                );
                                                localStorage.setItem(
                                                  "index",
                                                  index
                                                );

                                                dispatch(
                                                  Action.editAddressType(
                                                    !editAddressPage
                                                  )
                                                );
                                                dispatch(
                                                  Action.editLocalAddress(
                                                    x,
                                                    index
                                                  )
                                                );
                                                dispatch(
                                                  Action.addressModal(
                                                    !addressModal
                                                  )
                                                );
                                                // localStorage.setItem(
                                                //   "isDefaultAddress",
                                                //   x.is_default
                                                // );
                                              }}
                                              alt="edit"
                                              className="edit-img"
                                            /> */}
                                            <img
                                              onClick={() => {
                                                dispatch(
                                                  Action.deleteLocalAddress(
                                                    x,
                                                    index
                                                  )
                                                );
                                                setReload(!reload);
                                              }}
                                              src={Delete}
                                              alt="delete"
                                              className="delete-img"
                                            />
                                          </>
                                        ) : null}
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              </>
                            );
                          })}

                        {page3 || page2 || page1 || page4 ? (
                          <div className="w-50">
                            <span
                              onClick={() => {
                                dispatch(Action.addressModal(!addressModal));
                                localStorage.setItem("profileAddress", true);
                              }}
                              className="add-picker"
                            >
                              <div
                                className="text-center d-block"
                                style={{ cursor: "pointer" }}
                              >
                                <div className="address-elipse">
                                  <img src={Plus} alt="Plus" />
                                </div>
                                <span className="d-block">add new address</span>
                              </div>
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                {page3 || page2 || page1 || page4 ? (
                  <div class="adson-btn text-right customer-profile-btn">
                    <span
                      onClick={() => {
                        dispatch(Action.editPage1(false));
                        dispatch(Action.editPage2(false, false));
                        dispatch(Action.editPage3(false, false));
                        dispatch(Action.editPage4(false, false));
                        dispatch({
                          type: Action.ADD_ADDRESSES,
                          payload: [],
                        });
                        dispatch({
                          type: Action.LOCAL_AREAS,
                          payload: [],
                        });
                        dispatch({
                          type: Action.LOCAL_CITIES,
                          payload: [],
                        });
                        setReload(!reload);
                        setCondition(true);
                      }}
                      class="cancel-btn"
                      style={{ cursor: "pointer" }}
                    >
                      Cancel
                    </span>
                    <button
                      onClick={() => {
                        // dispatch(Action.editPage1(false));
                        // dispatch(Action.editPage2(false, false));
                        // dispatch(Action.editPage3(false, false));
                        // dispatch(Action.editPage4(false, false));
                        // setReload(!reload);
                        // setCondition(true);
                        // dispatch(Action.addMultipleAddress());
                      }}
                      id="addresses"
                      type="submit5"
                      class="done-btn"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-password"
              role="tabpanel"
              aria-labelledby="pills-password-tab"
            >
              <form
                onSubmit={handleSubmit4(pageFourData)}
                className="password-form"
              >
                <div className="row justify-content-between m-0">
                  <div className="col p-0">
                    <div className="form-group">
                      <label for="">Old Password</label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <input
                            type="password"
                            name="oldPassword"
                            ref={register4({
                              required: "Old Password is Required",
                              validate: (value) =>
                                value.length >= 8 ||
                                "Password must be 8 characters long",
                              // pattern: {
                              //   value: /[^\s\\]/,
                              //   message: "Invalid Password",
                              // },
                              pattern: {
                                value: /^\S*$/,
                                message:
                                  "Old Password must not contain white spaces",
                              },
                            })}
                            className="profile-input-display"
                          />
                          {errors4.oldPassword && (
                            <div
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              {errors4.oldPassword.message}
                            </div>
                          )}
                        </>
                      ) : (
                        <input
                          className="profile-input-display"
                          disabled
                          style={{
                            backgroundColor: "#D3D3D3",
                            color: "transparent",
                            "text-shadow": "0 0 0 black",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between m-0">
                  <div className="p-0 col">
                    <div className="form-group">
                      <label for="">New Password</label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <input
                            type="password"
                            name="newPassword"
                            ref={register4({
                              required: "New Password is Required",
                              validate: (value) =>
                                value.length >= 8 ||
                                "New Password must be 8 characters long",
                              // pattern: {
                              //   value: /[^\s\\]/,
                              //   message: "Invalid Password",
                              // },
                              pattern: {
                                value: /^\S*$/,
                                message:
                                  "New  Password must not contain white spaces",
                              },
                            })}
                            className="profile-input-display"
                          />
                          {errors4.newPassword && (
                            <div
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              {errors4.newPassword.message}
                            </div>
                          )}
                        </>
                      ) : (
                        <input
                          className="profile-input-display"
                          disabled
                          style={{
                            backgroundColor: "#D3D3D3",
                            color: "transparent",
                            "text-shadow": "0 0 0 black",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between m-0">
                  <div className="col p-0">
                    <div className="form-group">
                      <label for="">Verify Password</label>
                      {page1 || page2 || page3 || page4 ? (
                        <>
                          <input
                            type="password"
                            name="verifyNewPassword"
                            ref={register4({
                              required: "Verify Password is Required",
                              validate: (value) =>
                                value.length >= 8 ||
                                "Verify Password must be 8 characters long",
                              // pattern: {
                              //   value: /[^\s\\]/,
                              //   message: "Invalid Password",
                              // },
                              pattern: {
                                value: /^\S*$/,
                                message:
                                  "Verify  Password must not contain white spaces",
                              },
                            })}
                            className="profile-input-display"
                          />
                          {errors4.verifyNewPassword && (
                            <div
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "red",
                              }}
                            >
                              {errors4.verifyNewPassword.message}
                            </div>
                          )}
                        </>
                      ) : (
                        <input
                          className="profile-input-display"
                          disabled
                          style={{
                            backgroundColor: "#D3D3D3",
                            color: "transparent",
                            "text-shadow": "0 0 0 black",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {page3 || page2 || page1 || page4 ? (
                  <div class="adson-btn text-right customer-profile-btn">
                    <span
                      onClick={() => {
                        dispatch(Action.editPage1(false));
                        dispatch(Action.editPage2(false, false));
                        dispatch(Action.editPage3(false, false));
                        dispatch(Action.editPage4(false, false));
                        setReload(!reload);
                        setCondition(true);
                      }}
                      class="cancel-btn"
                      style={{ cursor: "pointer" }}
                    >
                      Cancel
                    </span>
                    <button type="submit7" class="done-btn">
                      Save Changes
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
        <AddAddress open={addressModal} pageNo={pageNo} />
      </section>
    </div>
  );
};
export default CustomerProfile;

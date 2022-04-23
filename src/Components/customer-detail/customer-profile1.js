import React, { useState, useEffect } from "react";
import Profile from "../../images/profile.png";
import { useSelector, useDispatch } from "react-redux";
import EditImage from "../../images/ic_edit.svg";
import Finder from "../../images/iconfinder.svg";
import Plus from "../../images/plus.svg";
import * as Action from "../../store/actions";
import AddAddress from "../add-address";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const [address1, setAddress1] = useState();

  const { handleSubmit, register, errors, reset } = useForm({
    mode: "onSubmit",
  });
  const [numberError, setNumberError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [number, setNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [cnic, setCnic] = useState("");
  const [gender, setGender] = useState("");
  const [ageLimit, setAgeLimit] = useState("");
  const [ageLimitOptions, setAgeLimitOptions] = useState([
    "Below 18",
    "18 - 24",
    "25 - 34",
    "35 - 44",
    "45 - 60",
    "60+",
  ]);

  const data = useSelector(({ auth }) => auth.userData);
  const addressModal = useSelector(({ service }) => service.isAddress);
  const address = useSelector(({ service }) => service.address);
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  useEffect(() => {
    if (address.length > 0) {
      setAddress1(address[0].id);
    }
  }, [address]);

  useEffect(() => {
    if (data) {
      setFirstName(data?.first_name);
      setLastName(data?.last_name);
      setNumber(data?.phone);
      setCnic(data?.cnic);
      setAgeLimit(data?.age_range);
    }
  }, [data]);

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
      dispatch(Action.updateProfile(file));
    }
  };

  // const onChange = (e) => {
  //   setCnic(e.target.value);
  //   var value = e.target.value;
  //   var newState = {
  //     mask: "99999-9999999-9",
  //     value: value,
  //   };
  //   // if (/^3[47]/.test(value)) {
  //   //   newState.mask = '9999-999999-99999';
  //   // }
  //   setStatee(newState);
  // };

  const formData = (values) => {
    let body;
    if (values.cnic.length === 15) {
      body = {
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          country_code: "+92",
          phone: number,
          cnic: values.cnic,
          age_range: values.ageLimit,
        },
      };
      dispatch(Action.updateProfile(body));
    } else {
      setNumberError("CNIC number must be 13 characters");
    }
  };

  const save = () => {};

  return (
    <div className="container pb-5">
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
            <img
              src={Profile}
              ref={uploadedImage}
              style={{
                width: "100%",
                height: "100%",
                position: "acsolute",
              }}
              alt="profile-image"
            />
            <span className="edit-image">
              <img
                onClick={() => imageUploader.current.click()}
                src={EditImage}
                alt="Edit-image"
              />
            </span>
          </div>

          <label>User ID: {data.id}</label>
        </div>
        <div className="customer-profile-dtl">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item ">
              <a
                className=" active tabs"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Personal Profile
              </a>
            </li>
            <li className="nav-item ">
              <a
                className="tabs"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Beauty Profile
              </a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <form onSubmit={handleSubmit(formData)} className="profile-form ">
                <div className="row m-0">
                  <div className="f-name col pl-0">
                    <div className="form-group">
                      <label for="" className="">
                        First Name
                      </label>
                      {/* <input
                        value={data.first_name}
                        type="text"
                        placeholder="First Name"
                        className="profile-input-display"
                      /> */}
                      <input
                        name="firstName"
                        ref={register({ required: "First Name is Required" })}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="profile-input-display"
                        // onChange={() => setRegisterErrorMsg(null)}
                        // style={{
                        //   border: errors.firstName
                        //     ? "1px solid red "
                        //     : "0px solid white",
                        //   outline: errors.firstName && "none",
                        // }}
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
                    </div>
                  </div>
                  <div className="l-name col pr-0">
                    <div className="form-group">
                      <label for="" className="">
                        Last Name
                      </label>
                      {/* <input
                        value={data.last_name}
                        type="text"
                        placeholder="Last Name"
                        className="profile-input-display"
                      /> */}
                      <input
                        name="lastName"
                        ref={register({ required: "Last Name is Required" })}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="last Name"
                        className="profile-input-display"
                        // onChange={() => setRegisterErrorMsg(null)}
                        // style={{
                        //   border: errors.lastName
                        //     ? "1px solid red "
                        //     : "0px solid white",
                        //   outline: errors.lastName && "none",
                        // }}
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
                        value={`+92 ${data.phone}`}
                        type="text"
                        placeholder="+92 300 123 4567"
                        className="profile-input-display"
                      /> */}
                      {/* <InputMask
                        placeholder="+923XX XXXX XXX"
                        className="profile-input-display"
                        mask="+\993999999999"
                        maskChar={null}
                        value={`+92${data.phone}`}
                        onChange={(event) => {
                          setNumberError("");
                          setNumber(event.target.value);
                        }}
                        style={{
                          border: numberError
                            ? "1px solid red "
                            : "0px solid white",
                        }}
                      /> */}
                      <input
                        name="number"
                        ref={register}
                        value={`+92${number}`}
                        className="profile-input-display"
                        // style={{
                        //   display: "none",
                        // }}
                      />
                      {/* {numberError && (
                        <div
                          style={{
                            width: "100%",
                            textAlign: "left",
                            color: "red",
                          }}
                        >
                          {numberError}
                        </div>
                      )} */}
                    </div>
                  </div>
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        CNIC
                      </label>
                      {/* <input
                        type="text"
                        placeholder="35202 1234567 8"
                        className="profile-input-display"
                      /> */}
                      {/* <InputMask
                        name="cnic"
                        {...statee}
                        onChange={(e) => onChange(e)}
                        placeholder="35202-1234567-8"
                        className="profile-input-display"
                        value={`${cnic}`}
                        // onChange={(e) => setCnic(e.target.value)}
                        // style={{
                        //   border: numberError
                        //     ? "1px solid red "
                        //     : "0px solid white",
                        // }}
                      /> */}
                      <InputMask
                        name="cnic"
                        placeholder="35202-1234567-8"
                        className="profile-input-display"
                        mask="99999-9999999-9"
                        maskChar={null}
                        value={`${cnic}`}
                        onChange={(e) => {
                          setNumberError("");
                          setCnic(e.target.value);
                        }}
                        // style={{
                        //   border: numberError
                        //     ? "1px solid red "
                        //     : "0px solid white",
                        // }}
                      />
                      <input
                        name="cnic"
                        type="text"
                        value={cnic}
                        ref={register({ required: "CNIC Is Required" })}
                        style={{ display: "none" }}
                      />
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
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between m-0">
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Gender
                      </label>
                      <div className="select-people">
                        <select
                          className="form-control profile-input-display"
                          id="exampleFormControlSelect1"
                        >
                          <option value="Female">Female</option>
                          <option value="Male" disabled>
                            Male
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Age Limit
                      </label>
                      {/* <input
                        type="text"
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
                        >
                          {ageLimitOptions.map((y) => {
                            return <option value={y}>{y}</option>;
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
                    <div className="form-group">
                      <div className="address-wrap">
                        <div className="form-width address">
                          <label>MY ADDRESS</label>
                          <input
                            name="addressId"
                            style={{ display: "none" }}
                            value={address1}
                            // ref={register({ required: "Required" })}
                          />
                          <div className="myaddress-wrap">
                            <form className="address-radio-button">
                              {address &&
                                address.length > 0 &&
                                address.map((x, index) => {
                                  return (
                                    <>
                                      <div
                                        class="radiobtn text-address radio-inline square"
                                        id="myElement"
                                      >
                                        <input
                                          name="addressss"
                                          type="radio"
                                          id={index}
                                          style={{ display: "none" }}
                                          // value={x.id}
                                          checked={address1 === x.id}
                                          onClick={() => setAddress1(x.id)}
                                          // ref={register({
                                          //   required: "Required",
                                          // })}
                                        />
                                        <label for={index}>
                                          Address {index + 1}
                                          <br />
                                          {x.address_title +
                                            "," +
                                            x.area.area +
                                            ","}
                                          {x.city.city_name}
                                        </label>
                                      </div>
                                    </>
                                  );
                                })}
                            </form>
                          </div>
                        </div>
                        <div className="w-50 ">
                          <span className="add-picker">
                            <div className="text-center d-block">
                              <div className="address-elipse">
                                <span
                                  onClick={() => {
                                    dispatch(
                                      Action.addressModal(!addressModal)
                                    );
                                  }}
                                >
                                  <img src={Plus} alt="Plus" />
                                </span>
                              </div>
                              <span className="d-block">add new address</span>
                            </div>
                          </span>
                        </div>
                      </div>

                      <div class="adson-btn text-right marg-30 ">
                        <span class="cancel-btn">Cancel</span>
                        <button type="submit4" class="done-btn">
                          Save Changes
                        </button>
                      </div>

                      {/* <div className="address-wrap">
                        <div className="form-width address">
                          <label>Address</label>

                          <div className="form-group">
                            <div className="text-address">
                              <span>Address 1</span>
                            </div>
                            <textarea
                              className="add-address w-100"
                              rows="2"
                              id="comment"
                              placeholder="House no. 5/a, Street no. 15, Bilal Park, GT Road, Lahore"
                            ></textarea>
                          </div>
                        </div>
                        <div className="w-50">
                          <a href="#" className="add-picker">
                            <div className="text-center d-block">
                              <div className="address-elipse">
                                <img src={Plus} alt="Plus" />
                              </div>
                              <span className="d-block">add new address</span>
                            </div>
                          </a>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <form method="POST" action="" className="beauty-form">
                <div className="row justify-content-between m-0">
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Skin Type
                      </label>
                      <div className="select-people">
                        <select
                          className="form-control profile-input-display"
                          id="exampleFormControlSelect1"
                        >
                          <option>----</option>
                          <option></option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Hair Type
                      </label>
                      <div className="select-people">
                        <select
                          className="form-control profile-input-display"
                          id="exampleFormControlSelect1"
                        >
                          <option>----</option>
                          <option></option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between m-0">
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Hair Length
                      </label>
                      <div className="select-people">
                        <select
                          className="form-control profile-input-display"
                          id="exampleFormControlSelect1"
                        >
                          <option>----</option>
                          <option></option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="profile-col-width">
                    <div className="form-group">
                      <label for="" className="">
                        Hair Texture
                      </label>
                      <div className="select-people">
                        <select
                          className="form-control profile-input-display"
                          id="exampleFormControlSelect1"
                        >
                          <option>----</option>
                          <option></option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <div class="adson-btn text-right marg-30 ">
        <span class="cancel-btn">Cancel</span>
        <span onClick={save} class="done-btn">
          Save Changes
        </span>
      </div> */}
      <AddAddress open={addressModal} />
    </div>
  );
};

export default CustomerProfile;

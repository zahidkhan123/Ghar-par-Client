import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useSelector, useDispatch } from "react-redux";
import Close from "../images/ic_crossblack.svg";
import Plus from "../images/ic_plus.svg";
import ActivePlus from "../images/active_plus.svg";
import ActiveMinus from "../images/active_minus.svg";
import * as Action from "../store/actions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: theme.palette.background.paper,
    padding: 40,
    borderRadius: 12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 410,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  [theme.breakpoints.down("sm")]: {
    paper: {
      width: 350,
      padding: 20,
    },
  },
}));

export default function AddAddress(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [editArea, setEditArea] = useState("");
  const [editAddressDetail, setEditAddressDetail] = useState("");
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [city1, setCity1] = useState("");
  const [area, setArea] = useState("");
  const [area1, setArea1] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const { handleSubmit, register, errors, setValue } = useForm();

  let index = localStorage.getItem("index");
  let editData = JSON.parse(localStorage.getItem("editData"));

  let areaIdd = editData?.area;

  let cityIdd = editData?.city;

  let addressDetail = editData?.detail;

  const addressModal = useSelector(({ service }) => service.isAddress);
  const cities = useSelector(({ service }) => service.cities);
  const editAddress = useSelector(({ service }) => service.editAddress);
  const editAddressPage = useSelector(({ service }) => service.editAddressPage);
  const localCities = useSelector(({ service }) => service.localCities);

  let localCityName = localCities && localCities[index];

  const areas = useSelector(({ service }) => service.areas);

  // let cityId = localStorage.getItem("cityId");

  useEffect(() => {
    if (editAddress) {
      setEditAddressDetail(editAddress?.address_1);
      setEditArea(editAddress?.area?.id);
      setId(editAddress?.city?.id);
      setCityName(editAddress?.city?.city_name);
    } else {
      setId(localStorage.getItem("cityId"));
    }
  }, [editAddress]);

  useEffect(() => {
    if (id) {
      dispatch(Action.getArea(id));
    }
  }, [id]);

  const handleCity = (event) => {
    localStorage.setItem(
      "cityNameee",
      event.target.options[event.target.selectedIndex].dataset.label
    );
    localStorage.removeItem("editData");
    localStorage.removeItem("index");

    setCity(event.target.value);
    setId(event.target.value);
  };
  const handleArea = (event) => {
    setArea(event.target.value);
  };

  const handleClose = () => {
    dispatch(Action.addressModal(!addressModal));
    setArea(null);
    setCity(null);
    setEditArea("");
    setEditAddressDetail("");
    setCity("Lahore");
    setId(1);
    dispatch({
      type: Action.EDIT_ADDRESS,
      payload: null,
    });
    dispatch(Action.editAddressType(false));
    localStorage.removeItem("index");
    localStorage.removeItem("editData");
    localStorage.removeItem("editMod");
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = (values) => {
    let areaName = localStorage.getItem("areaName");
    let cityNameee = localStorage.getItem("cityNameee");
    let cityNamee = localStorage.getItem("cityName");
    let editMod = localStorage.getItem("editMod");

    if (props.pageNo === 3 && !editMod) {
      dispatch(Action.addAddresses(values));
      setArea(null);
      setCity(null);
      setEditArea("");
      setEditAddressDetail("");
      setCity("Lahore");
      setId(1);

      dispatch(Action.localAreas(areaName));
      dispatch(Action.localCities(cityNameee ? cityNameee : cityNamee));
    } else {
      dispatch(Action.addAddress(values, !addressModal));
      setArea(null);
      setCity(null);
      setEditArea("");
      setEditAddressDetail("");
    }
  };

  const body = (
    <section className="add-address">
      <div className={classes.paper}>
        <div id="simple-modal-title">
          <div className="container">
            <label className="add-label">Add Address</label>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="add-address-body" id="simple-modal-description">
            <div className="container ">
              <div>
                {localStorage.getItem("profileAddress") || index ? (
                  <div class="select-arrow">
                    <select
                      onChange={handleCity}
                      name="city"
                      ref={register}
                      // value={index && cityIdd}
                    >
                      <option
                        value={
                          index
                            ? cityIdd
                            : id
                            ? id
                            : localStorage.getItem("cityId")
                        }
                        disabled
                        selected
                        hidden
                      >
                        {index
                          ? localCityName
                          : cityName
                          ? cityName
                          : localStorage.getItem("cityName")}
                      </option>
                      {cities &&
                        cities.map((i) => {
                          return (
                            <option value={i.id} data-label={i.city_name}>
                              {i.city_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                ) : (
                  <div>
                    {/*class="select-arrow" */}
                    <select onChange={handleCity} name="city" ref={register}>
                      <option
                        value={id ? id : localStorage.getItem("cityId")}
                        disabled
                        selected
                        hidden
                      >
                        {cityName ? cityName : localStorage.getItem("cityName")}
                      </option>
                      {/* {cities &&
                      cities.map((i) => {
                        return <option value={i.id}>{i.city_name}</option>;
                      })} */}
                    </select>
                  </div>
                )}

                <div class="select-arrow">
                  <select
                    // onChange={handleArea}
                    onChange={(e) => {
                      localStorage.removeItem("editData");
                      localStorage.removeItem("index");

                      localStorage.setItem(
                        "areaName",
                        e.target.options[e.target.selectedIndex].dataset.label
                      );

                      setEditArea(e.target.value);
                    }}
                    name="area"
                    ref={register({ required: "Area Required" })}
                    value={index ? areaIdd : editArea}
                  >
                    <option value="" disabled selected hidden>
                      Select Area
                    </option>
                    {areas &&
                      areas.map((i) => {
                        return (
                          <option value={i.id} data-label={i.area}>
                            {i.area}
                          </option>
                        );
                      })}
                  </select>
                  {errors.area && (
                    <div
                      style={{ width: "100%", textAlign: "left", color: "red" }}
                    >
                      {errors.area.message}
                    </div>
                  )}
                </div>
              </div>

              <div class="input-group add-addr-input-group w-100 ">
                <input
                  name="detail"
                  ref={register({ required: "Address Required" })}
                  type="text"
                  class="form-control add-addr-input"
                  placeholder="Your Address"
                  value={index ? addressDetail : editAddressDetail}
                  onChange={(e) => {
                    localStorage.removeItem("editData");
                    setEditAddressDetail(e.target.value);
                  }}
                />
                {errors.detail && (
                  <div
                    style={{ width: "100%", textAlign: "left", color: "red" }}
                  >
                    {errors.detail.message}
                  </div>
                )}
              </div>

              <div className="addon-btn text-right">
                <span
                  type="button"
                  className="cancel-btn"
                  onClick={handleClose}
                  style={{ cursor: "pointer" }}
                >
                  Cancel
                </span>
                <button
                  type="submit4"
                  className="done-btn"
                  style={{ cursor: "pointer" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );

  return (
    <div>
      <Modal
        open={props.open}
        disableBackdropClick
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

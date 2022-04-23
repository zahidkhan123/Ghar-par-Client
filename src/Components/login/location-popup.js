import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CurrentLocation from "../../images/current-loc.svg";
import PinLocation from "../../images/ic_pin.svg";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../store/actions";
import useGeolocation from "react-hook-geolocation";
import Geocode from "react-geocode";
import { history } from "../../index";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 322,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
  //   [theme.breakpoints.down('sm')]: {
  //     paper: {
  //     width:320,
  //     padding: 24,
  //     }
  //   },
}));

const LocationPopup = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const geolocation = useGeolocation();

  const [open, setOpen] = React.useState(false);
  const [lat, setLat] = useState(null);
  const [lang, setLang] = useState(null);

  const cities = useSelector(({ service }) => service.cities);

  // const locationPopup = useSelector(({ service }) => service.locationPopup);

  useEffect(() => {
    let apiCall = async () => {
      await navigator;
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLang(position.coords.longitude);
      });
      // if (geolocation) {

      // }
    };
    apiCall();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(Action.locationPopup(false));
  };

  const handleCity = (id, cityName, history, lat, lang) => {
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
            response.results[4].address_components[0].long_name
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
    dispatch(Action.locationPopup(false));
  };

  const body = (
    <section className="location-popup">
      <div className={classes.paper}>
        <div className="location-title">
          <div className="container">
            <p>Select Location</p>
          </div>
        </div>
        <div className="location-popup-body" id="simple-modal-description">
          <a
            onClick={() => {
              localStorage.removeItem("cityId");
              let pre = localStorage.getItem("changeCityy");
              localStorage.setItem("changeCityy", pre ? parseInt(pre) + 1 : 1);
              handleCity(
                null,
                null,
                history,
                localStorage.getItem("latitude"),
                localStorage.getItem("longitude")
              );
            }}
          >
            <img src={CurrentLocation} alt="current loaction" />{" "}
            <span>Use Current Location</span>
          </a>
          <small>Select City</small>
          {cities &&
            cities?.map((x) => {
              return (
                <a
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
                </a>
              );
            })}
          {/* <a href="#">
            <img src={PinLocation} alt="pin loaction" /> <span>Lahore</span>
          </a>
          <a href="#">
            <img src={PinLocation} alt="pin loaction" /> <span>Islamabad</span>
          </a>
          <a href="#">
            <img src={PinLocation} alt="pin loaction" /> <span>Rawalpindi</span>
          </a> */}
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Location popup
      </button> */}
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default LocationPopup;

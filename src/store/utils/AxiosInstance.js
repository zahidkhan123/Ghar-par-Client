import axios from "axios";
import { servicePath } from "../../constants/defaultValues";
import cookie from "js-cookie";

const urlParams = new URLSearchParams(window.location.search);
const utm_source_param = urlParams.get("utm_source");

// alert(utm_source_param);

// let utm_source_cookie;
// if (cookie.get("utm_source")) {
//   utm_source_cookie = cookie.get("utm_source");
// }

// if (utm_source_cookie != undefined || null) {
//   if (utm_source_cookie == utm_source_param) {
//     // Do Nothing
//   } else {
//     alert(utm_source_param);
//     cookie.set("utm_source", utm_source_param, {
//       expires: 7,
//     });
//     utm_source_cookie = cookie.get("utm_source");
//   }
// }
if (utm_source_param) {
  cookie.set("utm_source", utm_source_param, {
    expires: 7,
  });
  // utm_source_cookie = cookie.get("utm_source");
}

let header;
if (utm_source_param) {
  header = {
    "Content-Type": "application/json",
    REFERRER: utm_source_param,
  };
} else {
  header = {
    "Content-Type": "application/json",
  };
}

const instance = axios.create({
  // baseURL: servicePath + "/api/v1/,
  // baseURL: servicePath + "/api/v2/",
  // baseURL: servicePath + "/api/v3/",
  // baseURL: servicePath + "/api/v4/",
  // baseURL: servicePath + "/api/v5/",
  baseURL: servicePath + "/api/v6/",

  headers: header,
});

export default instance;

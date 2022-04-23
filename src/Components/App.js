import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../scss/style.scss";
import "../index.css";

const Signing = lazy(() => import("./login/Signing"));
const OrderTable = lazy(() => import("./table"));
const CustomerRecep = lazy(() => import("./customer-detail/customer-recep"));
const OrderDetails = lazy(() => import("./orders-detail/order-details"));
const AddCity = lazy(() => import("./login/select-city"));
const Topinfobar = lazy(() => import("./fixed-top"));
const AddGender = lazy(() => import("./login/add-gender"));
const NewPassword = lazy(() => import("./login/new-password"));
const ForgetPassowrd = lazy(() => import("./login/forget-password"));
const Servicess = lazy(() => import("./servicess"));
const GuestUser = lazy(() => import("./guest-user-signup"));
const PinVerfication = lazy(() => import("./login/pin-verf"));
const AddRefferal = lazy(() => import("./login/add-refferal"));
const AlreadyExitNumber = lazy(() => import("./already-exit-number"));
const NotFound = lazy(() => import("./login/error-404"));

function App() {
  return (
    <div className="App" id="mainApp">
      <Suspense
        fallback={
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
        }
      >
        <Switch>
          <Route exact path="/" component={Signing} />
          <Route path="/home/order-detail" component={OrderTable} />
          <Route path="/home/recipient" component={CustomerRecep} />
          <Route path="/home/checkout" component={OrderDetails} />
          <Route path="/home/select-city" component={AddCity} />
          <Route path="/home/select-gender" component={AddGender} />
          <Route path="/home/servicess" component={Servicess} />
          <Route path="/home" render={() => <Topinfobar />} />
          <Route path="/verification" component={PinVerfication} />
          <Route path="/add-refferal" component={AddRefferal} />
          <Route path="/new-password" component={NewPassword} />
          <Route path="/forget-password" component={ForgetPassowrd} />
          <Route path="/guest-user" component={ForgetPassowrd} />
          <Route path="/guest-user-registration" component={GuestUser} />
          <Route path="/user-already-exist" component={AlreadyExitNumber} />
          <Route path="" component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;

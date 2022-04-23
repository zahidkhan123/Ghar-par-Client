import React, { useState, useEffect } from "react";
import DownArrow from "../../images/ic_downarrow.svg";
import Finder from "../../images/iconfinder.svg";
import Plus from "../../images/plus.svg";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import Topinfobar from "../fixed-top";
import FixedCart from "../fixed-cart";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../store/actions";
import AddAddress from "../add-address";
import { history } from "../../index";
import CustomerRecep from "../customer-detail/customer-recep";
import { Redirect, Route } from "react-router-dom";
import Home from "./../home";
import moment from "moment";
import { useRouteMatch } from "react-router-dom";
import $ from "jquery";

const OrderDetails = () => {
  const dispatch = useDispatch();
  let { url } = useRouteMatch();
  localStorage.setItem("url", url);
  const [date, setDate] = useState(null);
  const [address1, setAddress1] = useState();
  const { handleSubmit, register, errors } = useForm();
  const addressModal = useSelector(({ service }) => service.isAddress);
  const address = useSelector(({ service }) => service.address);
  const totalPrice = useSelector(({ service }) => service.totalPrice);

  useEffect(() => {
    dispatch(Action.Addresses());
  }, []);

  const onSubmit = (values) => {
    debugger;
    dispatch(Action.orderDetail(values, history));
  };

  const handleChange = (date) => {
    setDate(date);
  };

  if (totalPrice < 1200) {
    dispatch(Action.cartItemError(true));
    dispatch(Action.handleCheckOut1(false, history));
  }

  return (
    <>
      {/* <Topinfobar /> */}
      <section className="order-dtl">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="order-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-width">
                    <label>ORDER DETAILS</label>
                    <div className="form-group">
                      <div className="input-group date" id="datetimepicker1">
                        <input type="text" class="form-control" />
                        <span class="input-group-addon">
                          <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        {/* <DateTimePicker
                          style={{ height: "40px !important" }}
                          onChange={handleChange}
                          value={date}
                        />
                        <input
                          name="date"
                          ref={register({ required: "Required" })}
                          value={moment(date).format("YYYY-MM-DD")}
                          onChange={handleChange}
                          type="text"
                          style={{ display: "none" }}
                          className="form-control"
                          placeholder="Select Date & Time"
                        />
                        <input
                          name="time"
                          ref={register({ required: "Required" })}
                          value={moment(date).format("HH:mm")}
                          onChange={handleChange}
                          type="text"
                          style={{ display: "none" }}
                          className="form-control"
                          placeholder="Select Date & Time"
                        /> */}
                        {/* {errors.date && errors.date.message} */}
                        {/* <span className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar">
                        <img src={DownArrow} alt="downarrow" />
                      </span>
                    </span> */}
                      </div>
                    </div>
                  </div>

                  <div className="address-wrap">
                    <div className="form-width address">
                      <label>MY ADDRESS</label>
                      <div className="myaddress-wrap">
                        {address &&
                          address.length > 0 &&
                          address.map((x, index) => {
                            return (
                              <>
                                <form className="address-radio-button">
                                  <div
                                    class="radiobtn text-address radio-inline square"
                                    id="myElement"
                                  >
                                    <input
                                      type="radio"
                                      id={index}
                                      name="radio-button"
                                      value={x.id}
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
                                </form>
                              </>
                            );
                          })}
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
                  </div>

                  {/* <div>
                    <div className="form-group form-width">
                      <label for="exampleFormControlSelect1">
                        NUMBER OF PEOPLE
                      </label>
                      <div className="select-people">
                        <select
                          name="people"
                          ref={register({ required: "Required" })}
                          className="form-control"
                          id="exampleFormControlSelect1"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="spc-inst">
                      <label>SPECIAL INTRUCTIONS</label>

                      <div className="form-group">
                        <textarea
                          name="instruction"
                          ref={register({ required: "Required" })}
                          className="instr"
                          rows="3"
                          id="comment"
                          placeholder="Write special instructions regarding your services..."
                        />
                        {/* {errors.instruction && errors.instruction.message} */}
                      </div>
                    </div>
                  </div>
                  <button type="submit3" className="btn btn primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4 mt-5">
              <FixedCart />
            </div>
          </div>
        </div>
        {/* <Route path="/home/table" component={Home} /> */}
        <script type="text/javascript">
          $(function () {$("#datetimepicker1").datetimepicker()});
        </script>
        <AddAddress open={addressModal} />
      </section>
    </>
  );
};
export default OrderDetails;

// import React, { useState, useEffect } from "react";
// import DownArrow from "../../images/ic_downarrow.svg";
// import Finder from "../../images/iconfinder.svg";
// import Plus from "../../images/plus.svg";
// import DateTimePicker from "react-datetime-picker";
// import { useForm } from "react-hook-form";
// import Topinfobar from "../fixed-top";
// import FixedCart from "../fixed-cart";
// import { useSelector, useDispatch } from "react-redux";
// import * as Action from "../../store/actions";
// import AddAddress from "../add-address";

// const OrderDetails = () => {
//   const dispatch = useDispatch();
//   const [date, setDate] = useState(null);
//   const { handleSubmit, register, errors } = useForm();
//   const addressModal = useSelector(({ service }) => service.isAddress);
//   const address = useSelector(({ service }) => service.address);
//   const onSubmit = (values) => {
//   };

//   const handleChange = (date) => {
//     setDate(date);
//   };

//   return (
//     <>
//       <Topinfobar />
//       <section className="order-dtl">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8">
//               <div className="order-body">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className="form-width">
//                     <label>ORDER DETAILS</label>
//                     <div className="form-group">
//                       <div className="input-group date" id="datetimepicker1">
//                         <DateTimePicker
//                           name="date-picker"
//                           ref={register({ required: "" })}
//                           style={{ height: "40px !important" }}
//                           onChange={handleChange}import CustomerRecep from './../customer-detail/customer-recep';

//                           value={date}
//                         />
//                         <input
//                           name="date"
//                           ref={register({ required: "" })}
//                           value={date}
//                           onChange={handleChange}
//                           type="text"
//                           style={{ display: "none" }}
//                           className="form-control"
//                           placeholder="Select Date & Time"
//                         />
//                         {/* <span className="input-group-addon">
//                       <span className="glyphicon glyphicon-calendar">
//                         <img src={DownArrow} alt="downarrow" />
//                       </span>
//                     </span> */}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="address-wrap">
//                     <div className="form-width address">
//                       <label>MY ADDRESS</label>

//                       <div className="form-group">
//                         {address && (
//                           <>
//                             <div className="text-address">
//                               <span>Address 1</span>
//                             </div>
//                             <textarea
//                               name="address"
//                               ref={register({ required: "" })}
//                               className="add-address"
//                               rows="3"
//                               id="comment"
//                               placeholder="House no. 5/a, Street no. 15, Bilal Park, GT Road, Lahore"
//                             ></textarea>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                     <div className="w-50">
//                       <span href="#" className="add-picker">
//                         <div className="text-center d-block">
//                           <div className="address-elipse">
//                             <span
//                               onClick={() => {
//                                 dispatch(Action.addressModal(!addressModal));
//                               }}
//                             >
//                               <img src={Plus} alt="Plus" />
//                             </span>
//                           </div>
//                           <span className="d-block">add new address</span>
//                         </div>
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="form-group form-width">
//                       <label for="exampleFormControlSelect1">
//                         NUMBER OF PEOPLE
//                       </label>
//                       <div className="select-people">
//                         <select
//                           name="people"
//                           ref={register({ required: "" })}
//                           className="form-control"
//                           id="exampleFormControlSelect1"
//                         >
//                           <option>1</option>
//                           <option>2</option>
//                           <option>3</option>
//                           <option>4</option>
//                           <option>5</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="spc-inst">
//                       <label>SPECIAL INTRUCTIONS</label>

//                       <div className="form-group">
//                         <textarea
//                           name="instruction"
//                           ref={register({ required: "" })}
//                           className="instr"
//                           rows="3"
//                           id="comment"
//                           placeholder="Write special instructions regarding your services..."
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <button type="submit3" className="btn btn primary">
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//             <div className="col-lg-4 mt-5">
//               <FixedCart />
//             </div>
//           </div>
//         </div>
//       </section>
//       <AddAddress open={addressModal} />
//     </>
//   );
// };
// export default OrderDetails;

import React, { useState, Component } from "react";
import ForArrow from "../images/arrow-forward.svg";
import Close from "../images/close.png";
import Plus from "../images/ic_plus.svg";
// import AdsOn from "./ads-on";
import Modal from "react-modal";

const Servicess = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isActive: false,
  //     value: 0,
  //   };
  // }
  // componentWillMount() {
  //   Modal.setAppElement("body");
  // }
  // toggleModal = () => {
  //   this.setState({
  //     isActive: !this.state.isActive,
  //   });
  // };
  // increment = () => {
  //   this.setState((prevState) => ({
  //     value: prevState.value + 1,
  //   }));
  // };

  // decrement = () => {
  //   this.setState((prevState) => ({
  //     value: prevState.value - 1,
  //   }));
  // };
  // render() {
  return (
    <section className="service">
      <div className="services-tabs">
        <div className="container">
          <ul
            className="nav nav-pills d-flex justify-content-lg-center"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="pills-hair-tab"
                data-toggle="pill"
                href="#pills-hair"
                role="tab"
                aria-controls="pills-hair"
                aria-selected="true"
              >
                Hair
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-massage-tab"
                data-toggle="pill"
                href="#pills-massage"
                role="tab"
                aria-controls="pills-massage"
                aria-selected="false"
              >
                Massage
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-nail-tab"
                data-toggle="pill"
                href="#pills-nail"
                role="tab"
                aria-controls="pills-nail"
                aria-selected="false"
              >
                Nails
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-facial-tab"
                data-toggle="pill"
                href="#pills-facial"
                role="tab"
                aria-controls="pills-facial"
                aria-selected="true"
              >
                Facial
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-makeup-tab"
                data-toggle="pill"
                href="#pills-makeup"
                role="tab"
                aria-controls="pills-makeup"
                aria-selected="false"
              >
                Makeup
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-threading-tab"
                data-toggle="pill"
                href="#pills-threading"
                role="tab"
                aria-controls="pills-threading"
                aria-selected="false"
              >
                Threading
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-waxing-tab"
                data-toggle="pill"
                href="#pills-waxing"
                role="tab"
                aria-controls="pills-waxing"
                aria-selected="true"
              >
                Waxing
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-scrub-tab"
                data-toggle="pill"
                href="#pills-scrub"
                role="tab"
                aria-controls="pills-scrub"
                aria-selected="false"
              >
                Scrub
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-facepolisher-tab"
                data-toggle="pill"
                href="#pills-facepolisher"
                role="tab"
                aria-controls="pills-facepolisher"
                aria-selected="false"
              >
                Face Polisher
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-pakage-tab"
                data-toggle="pill"
                href="#pills-pakage"
                role="tab"
                aria-controls="pills-pakage"
                aria-selected="false"
              >
                Packages
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="services-details">
        <div className="container">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-hair"
              role="tabpanel"
              aria-labelledby="pills-hair-tab"
            >
              Hairs
            </div>
            <div
              className="tab-pane fade"
              id="pills-massage"
              role="tabpanel"
              aria-labelledby="pills-massage-tab"
            >
              Massage
            </div>
            <div
              className="tab-pane fade"
              id="pills-nail"
              role="tabpanel"
              aria-labelledby="pills-nail-tab"
            >
              Nails
            </div>
            <div
              className="tab-pane fade"
              id="pills-facial"
              role="tabpanel"
              aria-labelledby="pills-facial-tab"
            >
              Facial
            </div>
            <div
              className="tab-pane fade"
              id="pills-makeup"
              role="tabpanel"
              aria-labelledby="pills-makeup-tab"
            >
              Makeup
            </div>
            <div
              className="tab-pane fade"
              id="pills-threading"
              role="tabpanel"
              aria-labelledby="pills-threading-tab"
            >
              Threading
            </div>
            <div
              className="tab-pane fade"
              id="pills-waxing"
              role="tabpanel"
              aria-labelledby="pills-waxing-tab"
            >
              <div className="row">
                <div className="col-md-8">
                  <div className="services-detail">
                    <div className="accordion" id="accordionExample">
                      <div className="card">
                        <div className="card-header" id="headingOne">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Fruit Waxing
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <form className="address-radio-button">
                              <div class="radiobtn" id="myElement">
                                <input
                                  type="checkbox"
                                  id="address3"
                                  name="radio-button"
                                  value="address3"
                                />
                                <label
                                  for="address3"
                                  className="check-lab service-item"
                                >
                                  {/* <div className="service-item"> */}
                                  <div className="row">
                                    <div className="col-md-8">
                                      <label>Bikini</label>
                                    </div>
                                    <div className="col-md-4 price-tag">
                                      <label>Rs. 1250</label>
                                      <a
                                        href="#"
                                        type="button"
                                        onClick={this.toggleModal}
                                      >
                                        <img src={Plus} alt="plus" />
                                      </a>
                                      <Modal
                                        isOpen={this.state.isActive}
                                        onRequestClose={this.toggleModal}
                                        className="adson-modal"
                                      >
                                        {/* <AdsOn /> */}
                                      </Modal>
                                    </div>
                                  </div>
                                  {/* </div> */}
                                </label>
                              </div>
                              <div class="radiobtn" id="myElement">
                                <input
                                  type="checkbox"
                                  id="address4"
                                  name="radio-button"
                                  value="address4"
                                />
                                <label
                                  for="address4"
                                  className="check-lab  service-item"
                                >
                                  {/* <div className="service-item"> */}
                                  <div className="row">
                                    <div className="col-md-8">
                                      <label>Full Body</label>
                                    </div>
                                    <div className="col-md-4 price-tag">
                                      <label>Rs. 3750</label>
                                      <a type="button" onClick={this.decrement}>
                                        {" "}
                                        -
                                      </a>
                                      {this.state.value}
                                      <a type="button" onClick={this.increment}>
                                        {" "}
                                        <img src={Plus} alt="plus" />
                                      </a>
                                    </div>
                                  </div>
                                  {/* </div> */}
                                </label>
                              </div>
                            </form>
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>
                                    Full legs + Full arms + Underarms
                                  </label>
                                  <a href="#" className="ads-on">
                                    Add-ons
                                  </a>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 2200</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>
                                    Full legs + Full arms + Underarms + Bikini
                                  </label>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 2800</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>
                                    Half legs + Full arms + Underarms
                                  </label>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 1650</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>Underarms + Full arms</label>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 1250</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>Full Body Wax x 3</label>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 9600</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="headingTwo">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Sugar Waxing
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse"
                          aria-labelledby="headingTwo"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>Bikini</label>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 1250</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>Full Body</label>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 3750</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>
                                    Full legs + Full arms + Underarms
                                  </label>
                                  <a href="#" className="ads-on">
                                    Add-ons
                                  </a>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 2200</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>
                                    Full legs + Full arms + Underarms + Bikini
                                  </label>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 2800</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="service-item">
                              <div className="row">
                                <div className="col-md-8">
                                  <label>
                                    Half legs + Full arms + Underarms
                                  </label>
                                </div>
                                <div className="col-md-4 price-tag">
                                  <label>Rs. 1650</label>
                                  <a href="#">
                                    {" "}
                                    <img src={Plus} alt="plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-scrub"
              role="tabpanel"
              aria-labelledby="pills-scrub-tab"
            >
              Scrub
            </div>
            <div
              className="tab-pane fade"
              id="pills-facepolisher"
              role="tabpanel"
              aria-labelledby="pills-facepolisher-tab"
            >
              facepolisher
            </div>
            <div
              className="tab-pane fade"
              id="pills-pakage"
              role="tabpanel"
              aria-labelledby="pills-pakage-tab"
            >
              Packages
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-mob-total d-lg-none">
        <a href="" className="chk-btn">
          <label>My Cart</label>
          <label>4 items: Rs. 5,700</label>
        </a>
      </div>
    </section>
  );
  // }
};
export default Servicess;

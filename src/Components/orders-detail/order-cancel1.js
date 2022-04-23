import React from "react";
import Girl from "../../images/girl.png";
import Girl2 from "../../images/g2.png";
import YellowStar from "../../images/ic_staryellow.svg";
import Star from "../../images/ic_stargray.svg";

class OrderCancel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="order-clearance">
        <div className="recp-header">
          <div className="d-flex flex-column">
            <label>Order ID: 28109</label>
            <span>02 February, 2020 - 05:30</span>
          </div>
          <div className="order-cancel d-flex flex-column align-items-end">
            <a href="#" className="btn-cancel ">
              Cancelled
            </a>
            <small>Order Cancelled due to Shazia's unavailability</small>
          </div>
        </div>
        <div className="recp-location">
          <address>House no 5 a Street no 15 Bilal Park GT Road Lahore</address>
        </div>
        <div id="accordion">
          <div class="card resp-card">
            <div class="card-header" id="headingTh">
              <h5 class="mb-0">
                <button
                  class="btn w-100"
                  data-toggle="collapse"
                  data-target="#collapseTh"
                  aria-expanded="false"
                  aria-controls="collapseTh"
                >
                  <div className="resp-card-body">
                    <div className="d-flex">
                      <small className="no-assign">
                        No beautician Assigned
                      </small>
                    </div>
                    <div className="rating-star">
                      <img src={YellowStar} alt="star" />
                      <img src={YellowStar} alt="star" />
                      <img src={YellowStar} alt="star" />
                      <img src={YellowStar} alt="star" />
                      <img src={Star} alt="star" />
                    </div>
                  </div>
                </button>
              </h5>
            </div>
            <div
              id="collapseTh"
              class="collapse show"
              aria-labelledby="headingTh"
              data-parent="#accordion"
            >
              <div class="card-body">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Services</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Job Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Wash + Blowdry + Nail Polish + Threading</td>
                      <td>10:00 AM</td>
                      <td>1h 20m</td>
                      <td>Rs. 1000</td>
                    </tr>
                    <tr>
                      <td>Wash + Blowdry</td>
                      <td>11:20 AM</td>
                      <td>30m</td>
                      <td>Rs. 1000</td>
                    </tr>
                    <tr>
                      <td>Massage</td>
                      <td>11:50 AM</td>
                      <td>60m</td>
                      <td>Rs. 3200</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Rs. 5200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card resp-card">
            <div class="card-header pr-0" id="headingThree">
              <h5 class="mb-0">
                <button
                  class="btn w-100 collapsed"
                  data-toggle="collapse"
                  data-target="#collapseThr"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <div class="card-header" id="headingThr">
                    <h5 class="mb-0">
                      <button
                        class="btn w-100"
                        data-toggle="collapse"
                        data-target="#collapseThr"
                        aria-expanded="false"
                        aria-controls="collapseThr"
                      >
                        <div className="resp-card-body">
                          <div className="d-flex">
                            <small className="no-assign">
                              No beautician Assigned
                            </small>
                          </div>
                          <div className="comp-wrap">
                            <div className="rating-name comp-dtl">
                              <label>Services</label>
                              <span>Wash + Blowdry + Na...</span>
                            </div>
                            <div className="rating-name comp-dtl">
                              <label>Total Amount</label>
                              <span>Rs. 5200</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </h5>
                  </div>
                </button>
              </h5>
            </div>
            <div
              id="collapseThr"
              class="collapse"
              aria-labelledby="headingThr"
              data-parent="#accordion"
            >
              <div class="card-body">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Services</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Job Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Wash + Blowdry + Nail Polish + Threading</td>
                      <td>10:00 AM</td>
                      <td>1h 20m</td>
                      <td>Rs. 1000</td>
                    </tr>
                    <tr>
                      <td>Wash + Blowdry</td>
                      <td>11:20 AM</td>
                      <td>30m</td>
                      <td>Rs. 1000</td>
                    </tr>
                    <tr>
                      <td>Massage</td>
                      <td>11:50 AM</td>
                      <td>60m</td>
                      <td>Rs. 3200</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Rs. 5200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="recp-inst">
          <label>Special Instructions</label>
          <div className="form-group">
            <textarea
              className="instr"
              rows="3"
              id="comment"
              placeholder="special instructions"
            ></textarea>
          </div>
        </div>
      </section>
    );
  }
}
export default OrderCancel;

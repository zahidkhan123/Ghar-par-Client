import React from "react";
import RatingPopup from "./rating-popup";

class RateBeautician extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="rate">
        <a href="#" className="btn-rate">
          Rate Beautician
        </a>
        <div className="charges">
          <div className="net-charge">
            <label>Net Total</label>
            <span>Rs.5,200</span>
          </div>
          <div className="other-charges">
            <div className="d-flex justify-content-between">
              <label>Services Charges</label>
              <span>Rs. 6,000</span>
            </div>
            <div className="d-flex justify-content-between">
              <label>Travel Charges</label>
              <span>Rs. 200</span>
            </div>
            <div className="d-flex justify-content-between">
              <label>Waiting Charges</label>
              <span>Rs. 0</span>
            </div>
            <div className="d-flex justify-content-between">
              <label>Discount</label>
              <span> Rs. 500</span>
            </div>
            <div className="d-flex justify-content-between">
              <label>Job Discount</label>
              <span> Rs. 0</span>
            </div>
            <div className="d-flex justify-content-between">
              <label>Total Amount</label>
              <span> Rs. 6,700</span>
            </div>
          </div>
        </div>
        <RatingPopup open={ratingPopup} />
      </section>
    );
  }
}
export default RateBeautician;

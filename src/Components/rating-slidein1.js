import React from "react";
import RateBeautician from "./rate-beautician";
import OrderCancel from "./orders-detail/order-cancel";

class RatingSlideIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="slidein-modal">
        <button
          type="button"
          className="btn btn-demo"
          data-toggle="modal"
          data-target="#myModal"
        >
          Rating Sidebar
        </button>
        <div
          className="modal right fade"
          id="myModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {/* <div className="modal-header"> */}
              <button type="button" className="close-btn" data-dismiss="modal">
                {/* <span aria-hidden="true">&times;</span> */}
              </button>
              {/* </div> */}
              <div className="modal-body">
                <OrderCancel />
                <RateBeautician />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>
    );
  }
}
export default RatingSlideIn;

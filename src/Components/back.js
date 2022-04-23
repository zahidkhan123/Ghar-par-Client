import React from "react";
import LeftArrow from "../images/left_arrow.svg";

class Back extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <div className="back-btn">
          <img src={LeftArrow} alt="Backarrow" />
        </div>
      </section>
    );
  }
}
export default Back;

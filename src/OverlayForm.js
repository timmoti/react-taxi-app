import React from "react";

const OverlayForm = props => (
  <form className="overlay-form">
    <label>
      <input
        name="cbTraffic"
        type="checkbox"
        checked={props.showOverlay.traffic}
        onChange={props.handleTrafficCheckBoxChange}
      />
      Real-Time Traffic
    </label>
  </form>
);

export default OverlayForm;

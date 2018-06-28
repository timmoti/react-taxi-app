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
      <p>Real-Time Traffic</p>
    </label>
  </form>
);

export default OverlayForm;

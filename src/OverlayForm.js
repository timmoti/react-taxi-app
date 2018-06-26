import React from "react";

const OverlayForm = props => (
  <div className="overlay-form">
    <form>
      <label>
        Traffic Overlay
        <input
          name="cbTraffic"
          type="checkbox"
          checked={props.showOverlay.traffic}
          onChange={props.handleTrafficCheckBoxChange}
        />
      </label>
    </form>
  </div>
);

export default OverlayForm;

import React, { Component } from "react";
import OverlayForm from "./OverlayForm";

class TopBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <OverlayForm
          handleTrafficCheckBoxChange={this.props.handleTrafficCheckBoxChange}
          showOverlay={this.props.showOverlay}
          handleRecentre={this.props.handleRecentre}
        />
        <div className="sidebar-locations">
          <img
            src={"mylocation.png"}
            alt="my-location"
            className="sidebar-btn"
            onClick={this.props.handleRecentre}
          />
          Find My Location
        </div>
      </div>
    );
  }
}

export default TopBar;

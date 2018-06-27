import React, { Component } from "react";
import LocationSearchInput from "./LocationSearchInput";
import OverlayForm from "./OverlayForm";

class TopBar extends Component {
  // let input = React.createRef();
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
            className="topbar-btn"
            onClick={this.props.handleRecentre}
          />
          <LocationSearchInput
            address={this.props.address}
            bSearched={this.props.bSearched}
            mapOptions={this.props.mapOptions}
            handleSearchChange={this.props.handleSearchChange}
            handleSearchSelect={this.props.handleSearchSelect}
          />
        </div>
      </div>
    );
  }
}

export default TopBar;

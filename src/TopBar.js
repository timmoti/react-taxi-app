import React from "react";
import LocationSearchInput from "./LocationSearchInput";
import OverlayForm from "./OverlayForm";

const TopBar = props => {
  return (
    <div className="location-search-input-topbar">
      <LocationSearchInput
        address={props.address}
        bSearched={props.bSearched}
        mapOptions={props.mapOptions}
        handleSearchChange={props.handleSearchChange}
        handleSearchSelect={props.handleSearchSelect}
      />
      <OverlayForm
        handleTrafficCheckBoxChange={props.handleTrafficCheckBoxChange}
        showOverlay={props.showOverlay}
      />
    </div>
  );
};

export default TopBar;

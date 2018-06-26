import React from "react";
import LocationSearchInput from "./LocationSearchInput";
import OverlayForm from "./OverlayForm";

const TopBar = () => {
  return (
    <div className="location-search-input-topbar">
      <LocationSearchInput />
      <OverlayForm />
    </div>
  );
};

export default TopBar;

import React from "react";

const MarkerSearchedHere = props => {
  if (props.bSearched) return <div className="marker marker-searched-here" />;
  return <div />;
};

export default MarkerSearchedHere;

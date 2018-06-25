import React from "react";

const MarkerHere = props => {
  if (props.bSearched) return <div className="marker-here" />;
  return <div />;
};

export default MarkerHere;

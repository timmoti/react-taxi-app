import React from "react";

const MarkerUserHere = props => {
  if (props.bSearched) return <div className="marker-user-here" />;
  return <div />;
};

export default MarkerUserHere;

import React from "react";

const FindLocation = () => {
  let pos = {};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(() => {
      pos = {
        lat: position.coords.latitude
      };
    });
  }
};

export default FindLocation;

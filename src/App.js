/* global google */

import React, { Component } from "react";
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";
import "./App.css";

class TaxiApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      bSearched: false,
      searchedLocation: {},
      bUserFound: false,
      userLocation: {},
      mapOptions: {
        center: { lat: 1.35, lng: 103.82 },
        zoom: 12,
        bounds: ""
      },
      showOverlay: { traffic: false },
      overlays: ["TransitLayer"],
      loading: false
    };
  }

  render() {
    return (
      <div className="taxi-app">
        <MapComponent {...this.state} />

        <div className="taxi-app-sidebar">
          {/* Search Box */}
          <input
            className="taxi-app-searchbox"
            ref="input"
            {...this.props}
            type="text"
          />
          <Sidebar
            address={this.state.address}
            bSearched={this.state.bSearched}
            mapOptions={this.state.mapOptions}
            showOverlay={this.state.showOverlay}
            handleTrafficCheckBoxChange={this.handleTrafficCheckBoxChange}
            handleRecentre={this.getGeoLocation}
          />
        </div>
      </div>
    );
  }

  // For real-time traffic overlay
  handleTrafficCheckBoxChange = event => {
    const target = event.target;
    const { traffic } = this.state.showOverlay; // boolean for checkbox
    if (target.name === "cbTraffic") {
      this.setState({ showOverlay: { traffic: !traffic } });
      if (traffic) {
        this.setState({ overlays: ["TransitLayer"] });
      } else {
        this.setState({ overlays: ["TrafficLayer", "TransitLayer"] });
      }
    }
  };

  componentDidMount() {
    this.getGeoLocation();
    this.handleSearch();
  }

  //to find a user's location
  getGeoLocation = () => {
    if (navigator.geolocation) {
      this.setState({ loading: true });

      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          loading: false,
          bUserFound: true,
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          mapOptions: {
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            zoom: 17
          }
        });
      });
    }
  };

  // Searchbox with autocomplete
  handleSearch = () => {
    const input = this.refs.input;
    this.searchBox = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "sg" }
    });
    this.searchBox.addListener("place_changed", this.onPlacesChanged);
  };

  // for search box
  onPlacesChanged = () => {
    const lat = this.searchBox.getPlace().geometry.location.lat();
    const lng = this.searchBox.getPlace().geometry.location.lng();
    this.setState({
      bSearched: true,
      searchedLocation: {
        lat: lat,
        lng: lng
      },
      mapOptions: {
        center: { lat: lat, lng: lng },
        zoom: 17
      }
    });
  };
}
export default TaxiApp;

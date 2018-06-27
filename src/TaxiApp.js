/* global google */

import React, { Component } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";
import "./App.css";
// import PropTypes from "prop-types";

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
        zoom: 12
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
            handleSearchChange={this.handleSearchChange}
            handleSearchSelect={this.handleSearchSelect}
            handleTrafficCheckBoxChange={this.handleTrafficCheckBoxChange}
            handleRecentre={this.getGeoLocation}
          />
        </div>

        {/* Search Box */}
      </div>
    );
  }

  // for Autocomplete search
  handleSearchChange = address => this.setState({ address });
  // for Autocomplete search
  handleSearchSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          address: address,
          bSearched: true,
          searchedLocation: {
            lat: latLng.lat,
            lng: latLng.lng
          },
          mapOptions: {
            center: latLng,
            zoom: 17
          }
        });
      });
  };
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

  // static propTypes = {
  //   placeholder: PropTypes.string,
  //   onPlacesChanged: PropTypes.func
  // };
  onPlacesChanged = () => {
    console.log(this.searchBox.getPlace());
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlace());
    }
  };

  // componentWillUnmount() {
  //   // https://developers.google.com/maps/documentation/javascript/events#removing
  //   google.maps.event.clearInstanceListeners(this.searchBox);
  // }

  componentDidMount() {
    this.getGeoLocation();
    this.handleSearch();
  }

  // Searchbox with autocomplete
  handleSearch = () => {
    // const input = ReactDOM.findDOMNode(this.refs.input);
    const input = this.refs.input;
    this.searchBox = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "sg" }
    });
    this.searchBox.addListener("place_changed", this.onPlacesChanged);
  };

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
}
export default TaxiApp;

import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import MapComponent from "./MapComponent";

// TODO:
// places api
// confine search to only singapore
// Zoom in to searched location
// find own location based on gps

export default class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      bSearched: false,
      mapOptions: {
        center: { lat: 1.35, lng: 103.82 },
        zoom: 12
      }
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          bSearched: true,
          mapOptions: {
            center: latLng,
            zoom: 17
          }
        });
        console.log("Success in search", this.state.mapOptions.center);
      })
      .catch(error => console.error("Error in search", error));
  };

  render() {
    console.log("Within location search, zoom is", this.state.mapOptions.zoom);

    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <MapComponent
          mapOptions={this.state.mapOptions}
          bSearched={this.state.bSearched}
        />
      </div>
    );
  }
}

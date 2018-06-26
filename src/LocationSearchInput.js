import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
// import { GoogleApiWrapper } from "google-maps-react";
import MapComponent from "./MapComponent";

const searchOptions = {
  types: ["address"],
  componentRestrictions: { country: "sg" }
};

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
      .then(results => {
        console.log("results", results[0]);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        console.log("latlng", latLng);
        this.setState({
          bSearched: true,
          mapOptions: {
            center: latLng,
            zoom: 17
          }
        });
      })
      .catch(error => console.error("Error in search", error));
  };

  render() {
    // console.log("here==", this.props.google.maps.getLatLng(1.35, 103.82));
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          searchOptions={searchOptions}
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
                    ? { backgroundColor: "#fafafa" }
                    : { backgroundColor: "#ffffff" };
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
// export default GoogleApiWrapper({
//   apiKey: `AIzaSyD8ZaxmbQDYlVW1GfzJn_n3Syt3cm-AdPA`
// })(LocationSearchInput);

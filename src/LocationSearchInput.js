import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const searchOptions = {
  types: ["address"],
  componentRestrictions: { country: "sg" }
};

const LocationSearchInput = props => (
  <div>
    <PlacesAutocomplete
      value={props.address}
      onChange={props.handleSearchChange}
      onSelect={props.handleSearchSelect}
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
  </div>
);

export default LocationSearchInput;

import React, { Component } from "react";
// import MyMap from './MyMap';
// import AnotherMap from './AnotherMap';
import LocationSearchInput from "./LocationSearchInput";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <MyMap /> */}
        {/* <AnotherMap /> */}
        <LocationSearchInput />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
// import { GoogleApiWrapper } from "google-maps-react";
import TopBar from "./TopBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
      </div>
    );
  }
}
export default App;
// export default GoogleApiWrapper({
//   apiKey: `AIzaSyD8ZaxmbQDYlVW1GfzJn_n3Syt3cm-AdPA`
// })(App);

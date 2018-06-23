import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const MyGreatPlaceWithHover = ({ text }) => 
    <div className="marker">{text}</div>;

class MyMap extends Component {
  static defaultProps = {
    center: {
      lat: 1.283692,
      lng: 103.846772
    },
    zoom: 18
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `AIzaSyAn5Nt8e_rYahYmraxZSc5quaS0h4RfNwI` }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          
        >
          <MyGreatPlaceWithHover
            lat={1.283692}
            lng={103.846772}
            text={'TW SG'}

          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MyMap;
import React, { Component } from "react";
import GoogleMap from "google-map-react";
import supercluster from "points-cluster";
import MarkerSimple from "./MarkerSimple";
import MarkerCluster from "./MarkerCluster";
import MarkerSearchedHere from "./MarkerSearchedHere";
import MarkerUserHere from "./MarkerUserHere";

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxiCount: null,
      allTaxiCoordinates: [],
      clusters: []
    };
  }

  async componentDidMount() {
    const uri = "https://api.data.gov.sg/v1/transport/taxi-availability";
    const response = await fetch(uri);
    const data = await response.json();
    const allTaxiCoordGeo = data.features[0].geometry.coordinates.map(coord => {
      return { lng: coord[0], lat: coord[1] };
    });
    this.setState({
      taxiCount: data.features[0].properties.taxi_count,
      allTaxiCoordinates: allTaxiCoordGeo
    });
  }

  getClusters = () => {
    const clusters = supercluster(this.state.allTaxiCoordinates, {
      minZoom: 0,
      maxZoom: 16,
      radius: 120
    });
    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points
          }))
        : []
    });
  };

  handleClusterChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  render() {
    return (
      <div className="map-component" style={{ height: "100vh", width: "100%" }}>
        <GoogleMap
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          zoom={this.props.mapOptions.zoom}
          center={this.props.mapOptions.center}
          // options={this.state.mapOptions.styles}
          onChange={this.handleClusterChange}
          layerTypes={this.props.overlays}
          yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={this.onMapLoad}
        >
          {this.state.clusters.map((item, i) => {
            if (item.numPoints === 1) {
              return <MarkerSimple key={i} lat={item.lat} lng={item.lng} />;
            }
            return (
              <MarkerCluster
                key={i}
                lat={item.lat}
                lng={item.lng}
                text={item.numPoints}
              />
            );
          })}

          <MarkerSearchedHere
            lat={this.props.mapOptions.center.lat}
            lng={this.props.mapOptions.center.lng}
            bSearched={this.props.bSearched}
          />

          <MarkerUserHere
            bUserFound={this.props.bUserFound}
            lat={this.props.mapOptions.center.lat}
            lng={this.props.mapOptions.center.lng}
          />
        </GoogleMap>
      </div>
    );
  }
}
// export default GoogleApiWrapper({
//   apiKey: `AIzaSyD8ZaxmbQDYlVW1GfzJn_n3Syt3cm-AdPA`
// })(MapComponent);

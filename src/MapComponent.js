import React, { Component } from "react";
import GoogleMap from "google-map-react";
import supercluster from "points-cluster";
// import supercluster from "supercluster";
import SimpleMarker from "./SimpleMarker";
import ClusterMarker from "./ClusterMarker";

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
    let response = await fetch(uri);
    let data = await response.json();
    let allTaxiCoordGeo = data.features[0].geometry.coordinates.map(coord => {
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
      <div style={{ height: "100vh", width: "100%" }}>
        {console.log("zoom is", this.props.mapOptions.zoom)}

        <GoogleMap
          zoom={this.props.mapOptions.zoom}
          center={this.props.mapOptions.center}
          // options={this.state.mapOptions.styles}
          onChange={this.handleClusterChange}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.state.clusters.map((item, i) => {
            if (item.numPoints === 1) {
              return <SimpleMarker key={i} lat={item.lat} lng={item.lng} />;
            }

            return (
              <ClusterMarker
                key={i}
                lat={item.lat}
                lng={item.lng}
                text={item.numPoints}
              />
            );
          })}
        </GoogleMap>
      </div>
    );
  }
}

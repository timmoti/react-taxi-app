import React, { Component } from "react";
import GoogleMap from "google-map-react";
import supercluster from "points-cluster";
// import supercluster from "supercluster";
import {bootstrapURLKeys} from './config';
import SimpleMarker from "./SimpleMarker";
import ClusterMarker from "./ClusterMarker";

const MAP = {
  defaultZoom: 12,
  defaultCenter: { lat: 1.35, lng: 103.82 },
  options: {
    // styles: null,
    maxZoom: 19
  }
};

export default class AnotherMap extends Component {
  constructor() {
    super();
    this.state = {
      taxiCount: null,
      allTaxiCoordinates: [],
      clusterFakeData: [],
      clusters: [],
      mapOptions: {
        center: MAP.defaultCenter,
        zoom: MAP.defaultZoom
        // styles: MAP.options
      }
    };
  }

  async componentDidMount() {
    const uri = "https://api.data.gov.sg/v1/transport/taxi-availability";
    const response = await fetch(uri);
    const data = await response.json();
    const allTaxiCoordGeo = data.features[0].geometry.coordinates.map(coord => {
      return { lng: coord[0], lat: coord[1] };
    });
    console.log("I print ==>> data is", data);

    this.setState({
      taxiCount: data.features[0].properties.taxi_count,
      allTaxiCoordinates: allTaxiCoordGeo,
      // clusterFakeData: allTaxiCoordGeo
      // [
      //   { lng: 103.61462, lat: 1.25031 },
      //   { lng: 103.62201, lat: 1.28052 },
      //   { lng: 103.6234, lat: 1.28425 },
      //   { lng: 104.01366, lat: 1.3173 }
      // ]
    });

    console.log("I print ==>> taxi count is:", this.state.taxiCount);
    console.log(
      "I print ==>> all taxi coordinates are:",
       this.state.clusterFakeData       
    );
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

  handleMapChange = ({ center, zoom, bounds }) => {
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
        <GoogleMap
          bootstrapURLKeys={{ key: bootstrapURLKeys }}
          zoom={this.state.mapOptions.zoom}
          center={this.state.mapOptions.center}
          // options={this.state.mapOptions.styles}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.state.clusters.map((item, i) => {
            if (item.numPoints === 1) {
              return <SimpleMarker key={i} lat={item.lat} lng={item.lng} />;
            }

            return <ClusterMarker key={i} lat={item.lat} lng={item.lng} text={item.numPoints} />;
          })}
        </GoogleMap>
      </div>
    );
  }
}

import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  Button,
  TouchableHighlight,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import * as api from "../api";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class PlantMap extends React.Component {
  state = {
    region: {
      latitude: 53.79490447820361,
      longitude: -1.54636837019936,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    gardenCentres: [],
    errorMessage: "",
  };

  async componentDidMount() {
    this._getLocation();
  }

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission not granted!");
      this.setState({ errorMessage: "Permission not granted!" });
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      ...this.state.region,
    };
    await this.setState({ region });
    this.fetchGardenCentres();
  };

  fetchGardenCentres = () => {
    return new Promise((resolve, reject) => {
      resolve(
        api.getGardenCentres(
          this.state.region.latitude,
          this.state.region.longitude
        )
      );
    }).then(info => {
      this.setState({ gardenCentres: info });
    });
  };

  createMarkers() {
    return this.state.gardenCentres.map(centre => {
      return (
        <Marker
          coordinate={centre.coords}
          title={centre.name}
          pinColor="#aebb8f"
        >
          <Callout style={styles.callout}>
            <View>
              <Text>{centre.name}</Text>
              <Text
                onPress={() =>
                  Linking.openURL(
                    `http://maps.google.com/maps?daddr=${centre.coords.latitude},${centre.coords.longitude}`
                  )
                }
              >
                <Text>{centre.address}</Text>
              </Text>
              <Text>
                Open now • {centre.opening_hours === true ? "Open" : "Closed"}
              </Text>
              <Text>Ratings • {centre.user_ratings}</Text>
            </View>
          </Callout>
        </Marker>
      );
    });
  }

  getDirections = (coords): any => {
    console.log(coords);
  };

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        showsUserLocation
        customMapStyle={MapStyle}
        showsMyLocationButton
        initialRegion={{
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        }}
      >
        {this.createMarkers()}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 10,
    height: 300,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#000000",
  },
  callout: {
    flex: 1,
  },
});

const MapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

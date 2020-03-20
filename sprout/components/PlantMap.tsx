import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";

const gardenCentres = [
  { id: 1, title: "Shop1" },
  { id: 2, title: "Shop2" },
  { id: 3, title: "Shop3" },
  { id: 4, title: "Shop4" }
];

export default class PlantMap extends React.Component {
  state = {
    region: {
      latitude: 1,
      longitude: 1,
      latitudeDelta: 0.0043, // hardcode zoom levels just for example
      longitudeDelta: 0.0034
    },
    errorMessage: ""
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
    );
  }

  renderParking() {
    return (
      <View style={styles.parking}>
        <Text>parkings</Text>
      </View>
    );
  }
  renderParkings() {
    return (
      <ScrollView horizontal contentContainerStyle={styles.parkings}>
        {this.renderParking()}
      </ScrollView>
    );
  }

  //   componentDidMount() {
  //     this._getLocation();
  //   }
  //   _getLocation = async () => {
  //     const { status } = await Permissions.askAsync(Permissions.LOCATION);
  //     if (status !== "granted") {
  //       console.log("Permission not granted!");
  //       this.setState({ errorMessage: "Permission not granted!" });
  //     }
  //     const userLocation = await Location.getCurrentPositionAsync();
  //     const latitude: any = userLocation.coords.latitude;
  //     const longitude: any = userLocation.coords.longitude;
  //     this.setState({ ...this.state.region, latitude, longitude });
  //   };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        ></MapView>
        {this.renderParkings()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    flex: 3,
    height: 200,
    width: 200
  },
  header: {
    flex: 0.5,
    justifyContent: "center"
  },
  parkings: {
    flex: 1,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0
  },
  parking: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 24
  }
});

/** @format */

import React, { Component } from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import MedalsPage from "./MedalsPage";
import { getUser } from "../components/spec/index";
import GestureRecognizer from "react-native-swipe-gestures";
import { TouchableOpacity } from "react-native-gesture-handler";
import { buttonStyle } from "./ButtonCSS";

interface Props {
  navigation: any;
  route: any;
}

class UserPage extends Component<Props> {
  state = {
    isLoading: false,
    username: "",
    userMedals: [],
    scannedPlants: [],
  };

  componentDidMount() {
    getUser(this.props.route.params.username).then(userData => {
      this.setState(() => ({
        username: userData.username,
        userMedals: userData.medals,
        scannedPlants: userData.userScannedPlants,
        wishlist: userData.wishlist,
      }));
    });
  }

  speciesCount = () => {
    let species = [];
    this.state.scannedPlants.map(plant => {
      if (!species.includes(plant.family)) {
        species.push(plant.family);
      }
    });
    return species.length;
  };

  onSwipeLeft(gestureState) {
    console.log("Swiped left!");
    this.props.navigation.navigate("CameraPage");
  }

  render() {
    if (this.state.isLoading) return "Loading...";
    return (
      <GestureRecognizer
        onSwipeLeft={state => this.onSwipeLeft(state)}
        style={{ flex: 1 }}
      >
        <View>
          <ImageBackground
            source={require("./graphics/Background.jpg")}
            style={styles.backgroundImage}
          >
            <Text style={styles.header}>Welcome {this.state.username}! </Text>
            <Text style={styles.text}>
              Total Plants Scanned: {this.state.scannedPlants.length}
            </Text>
            <Text style={styles.text}>
              Total Species Scanned: {this.speciesCount()}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("ScannedPlants", {
                  scannedPlants: this.state.scannedPlants,
                  username: this.state.username,
                })
              }
            >
              <Text style={styles.button}>See Scanned Plants</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Wishlist", {
                  username: this.state.username,
                })
              }
            >
              <Text style={styles.button}>Go To My Wishlist</Text>
            </TouchableOpacity>
            <MedalsPage userMedals={this.state.userMedals} />
          </ImageBackground>
        </View>
      </GestureRecognizer>
    );
  }
}

export default UserPage;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#aebb8f",
    color: "white",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "center",
    width: "50%",
    justifyContent: "space-around",
    margin: 3,
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});

/** @format */

import React, { Component } from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import MedalsPage from "./MedalsPage";
import { getUser } from "../components/spec/index";
import GestureRecognizer from "react-native-swipe-gestures";
import { TouchableOpacity } from "react-native-gesture-handler";
import { buttonStyle } from "./ButtonCSS";
import styles from "./StyleCSS";

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
        <View style={styles.topMargin}>
          <ImageBackground
            source={require("./graphics/Background.jpg")}
            style={styles.backgroundImage}
          >
            <Text style={styles.pageheader}>
              Welcome {this.state.username}!{" "}
            </Text>
            <Text style={styles.header2}>
              Total Plants Scanned: {this.state.scannedPlants.length}
            </Text>
            <Text style={styles.header2}>
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
            <View style={{ padding: 10 }}>
              <Text style={styles.textItalic}>
                Keep scanning and adding plants to your garden to collect medals
              </Text>
            </View>
            <MedalsPage userMedals={this.state.userMedals} />
          </ImageBackground>
        </View>
      </GestureRecognizer>
    );
  }
}

export default UserPage;

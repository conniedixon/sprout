/** @format */

import React, { Component } from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import MedalsPage from "./MedalsPage";
import { getUser } from "../components/spec/index";
import GestureRecognizer from "react-native-swipe-gestures";

interface Props {
  navigation: any;
  route: any;
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});

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
            <Text>Welcome {this.state.username} </Text>
            <Text>Total Plants Scanned: {this.state.scannedPlants.length}</Text>
            <Text>Total Species Scanned: {this.speciesCount()}</Text>
            <Button
              title="See Scanned Plants"
              onPress={() =>
                this.props.navigation.navigate("ScannedPlants", {
                  scannedPlants: this.state.scannedPlants,
                  username: this.state.username,
                })
              }
            ></Button>
            <Button
              title="Go To My Wishlist"
              onPress={() =>
                this.props.navigation.navigate("Wishlist", {
                  username: this.state.username,
                })
              }
            ></Button>
            <MedalsPage userMedals={this.state.userMedals} />
          </ImageBackground>
        </View>
      </GestureRecognizer>
    );
  }
}

export default UserPage;

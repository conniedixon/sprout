/** @format */

import React, { Component } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getImagesForPlants } from "../utils/utils";

import styles from "./StyleCSS";

import * as Animatable from "react-native-animatable";
import LoadingScreen from "./LoadingScreen";

interface Props {
  navigation: any;
  route: any;
}

class ScannedPlants extends Component<Props> {
  state = {
    isLoading: true,
    username: this.props.route.params.username,
    scannedPlants: [],
  };

  componentDidMount() {
    const { scannedPlants, username } = this.props.route.params;
    return getImagesForPlants(username, scannedPlants)
      .then(plants => {
        this.setState({ scannedPlants: plants, isLoading: false });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { scannedPlants, username, isLoading } = this.state;
    // if (isLoading) return <LoadingScreen />;
    // else {
    return (
      <Animatable.View animation="fadeInUpBig" style={styles.topMargin}>
        <ImageBackground
          source={require("./graphics/Background.jpg")}
          style={styles.backgroundImage}
        >
          <Text style={styles.textItalic}>
            Click on an image to see more information and add to your wishlist
            or garden{" "}
          </Text>
          <View style={styles.rowscontainer}>
            {scannedPlants.map(plant => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("PlantPage", {
                      plantInfo: plant.plantInfo,
                      isInGarden: false,
                      username: username,
                      plantImage: plant.uri, //needs to be changed
                    });
                  }}
                  key={plant.timestamp}
                >
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 5,
                      margin: 3,
                    }}
                    source={{ uri: plant.uri }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ImageBackground>
      </Animatable.View>
    );
    // }
  }
  //sort by date added
  //delete a scanned plant
  //add to my wishlist
}

export default ScannedPlants;

/** @format */

import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getImagesForPlants } from "../utils/utils";

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
    if (isLoading) return <Text>Loading...</Text>;
    else {
      return (
        <View>

          <ImageBackground
            source={require("./graphics/Background.jpg")}
            style={styles.backgroundImage}
          >
            <Text style={styles.text}>
              Click on an image to see more information and add to your wishlist
              or garden{" "}
            </Text>
            <View style={styles.container}>
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
        </View>
      );
    }
  }
  //sort by date added
  //delete a scanned plant
  //add to my wishlist
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});

export default ScannedPlants;

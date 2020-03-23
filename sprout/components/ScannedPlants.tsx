/** @format */

import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getImageForPlant } from "../utils/utils";

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
    return Promise.all(
      scannedPlants.map(plant => {
        return getImageForPlant(username, plant);
      })
    ).then(plants => {
      this.setState({ scannedPlants: plants });
    });
  }

  render() {
    const { scannedPlants, username, isLoading } = this.state;
    if (isLoading) return <Text>Loading...</Text>;
    else {
      return (
        <View>
          <Text>My Scanned Plants:</Text>
          {scannedPlants.map(plant => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("PlantPage", {
                    plantInfo: plant,
                    isInGarden: false,
                    username: username,
                    plantImage: plant.images[0].url, //needs to be changed
                  });
                }}
                key={plant.timestamp}
              >
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: plant.uri }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
  }
  //sort by date added
  //delete a scanned plant
  //add to my wishlist
}

export default ScannedPlants;

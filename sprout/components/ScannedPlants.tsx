/** @format */

import React, { Component } from "react";
import { View, Text, Image } from "react-native";
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
          <Text>My Scanned Plants:</Text>
          {scannedPlants.map(plant => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("PlantPage", {
                    plantInfo: plant.plantInfo,
                    isInGarden: false,
                    username: username,
                    plantImage: plant.uri,
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
